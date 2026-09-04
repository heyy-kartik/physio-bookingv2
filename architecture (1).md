# Architecture
## Meridian Physiotherapy Website

**Last updated:** September 2026

---

## 1. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router, TypeScript) | File-based routing fits the fixed page set; server + client components in one project; deploys cleanly to Vercel |
| Styling | Tailwind CSS v4 + CSS variables | Design tokens (color/type) centralized in `globals.css`, used via `var(--*)` so the palette can be swapped without touching component code |
| Fonts | `next/font/google` (Fraunces + Inter) | Self-hosted at build time by Next.js, no runtime font-loading flash |
| Database | Postgres (Neon), via `@neondatabase/serverless` | HTTP-based driver built for serverless/edge functions — avoids the TCP connection-pool exhaustion that plain `pg` or Prisma can hit on Vercel; no ORM/schema-migration layer needed for a single evolving table |
| Booking delivery | WhatsApp click-to-chat (`wa.me` link) | No approval process, no cost, works immediately; trade-off is one manual tap from the client (see PRD §10 for the automated-API upgrade path) |

## 2. High-level flow

```
┌─────────────┐      1. submit form      ┌──────────────────────┐
│   Client     │ ───────────────────────▶│ POST /api/appointments│
│  (/appointment) │                       │  (Next.js route)      │
└─────────────┘                          └──────────┬────────────┘
                                                     │ 2. validate + insert
                                                     │    (HTTPS, via
                                                     │    @neondatabase/serverless)
                                                     ▼
                                          ┌──────────────────────┐
                                          │   Neon (Postgres)    │
                                          │   Appointment table   │
                                          └──────────┬────────────┘
                                                     │ 3. 200 OK {id}
                                                     ▼
┌─────────────┐   4. build wa.me link,   ┌──────────────────────┐
│   Client     │◀── open in new tab ─────│  AppointmentForm.tsx  │
│ (confirmation) │   5. client taps Send  └──────────────────────┘
└──────┬──────┘
       ▼
┌─────────────┐
│ Owner's      │
│ WhatsApp     │
└─────────────┘
```

Step 2 runs over HTTPS rather than a persistent TCP connection — Neon's
serverless driver issues each query as an HTTP request, which is what
makes it safe to call from a stateless serverless function without
exhausting a connection pool (each invocation doesn't need to hold a
long-lived DB connection open).

The save (step 2–3) always happens before the WhatsApp link is generated
(step 4), so a request is never sent to WhatsApp without first being
durably recorded — see PRD §8, "Failure handling."

## 3. Directory structure

```
src/
  app/
    layout.tsx              Root layout: fonts, Header, Footer
    globals.css             Design tokens (color/type CSS variables)
    page.tsx                Landing page
    services/page.tsx
    about/page.tsx
    faq/page.tsx
    appointment/page.tsx    Thin wrapper around AppointmentForm
    privacy/page.tsx
    contact/page.tsx
    api/
      appointments/route.ts POST handler — validates + persists
  components/
    Header.tsx
    Footer.tsx
    Arc.tsx                 Recurring "range of motion" motif (SVG)
    FaqItem.tsx              Accordion item (client component)
    AppointmentForm.tsx      Booking form (client component)
  lib/
    db.ts                   Neon client (@neondatabase/serverless), insertAppointment()
    whatsapp.ts              buildWhatsAppLink() — formats wa.me URL
```

## 4. Key modules

### `src/lib/db.ts`
- Creates a Neon SQL client via `neon(process.env.DATABASE_URL)` —
  no connection pool to manage; each query is a single HTTPS request
- The `Appointment` table is created once, manually, via a plain SQL
  statement run against the Neon console or `psql` (no migration tool
  for v1 — see §6)
- Exposes `insertAppointment()` (async, returns a Promise), the single
  write path used by the API route — keeping the query and shape in one
  place makes it a clean seam if a migration tool or ORM is added later

### `src/lib/whatsapp.ts`
- `buildWhatsAppLink()` takes the submitted appointment fields and
  returns a `https://wa.me/<number>?text=<encoded message>` URL
- The clinic's WhatsApp number is read from
  `NEXT_PUBLIC_OWNER_WHATSAPP_NUMBER` (public env var, since it's used
  client-side to build the link in the browser)

### `src/app/api/appointments/route.ts`
- `POST` only
- Validates required fields server-side (never trusts client-side
  validation alone)
- `await`s `insertAppointment()`, since the Neon driver is async
  (unlike the earlier synchronous SQLite version)
- Returns `400` with a message on invalid input, `500` on unexpected
  failure, `200 {ok, id}` on success

### `src/components/AppointmentForm.tsx`
- Client component owning form state
- On submit: calls the API, and only on a successful save builds the
  WhatsApp link and opens it (`window.open`) — with a fallback button on
  the confirmation screen in case the popup was blocked

## 5. Design system

Tokens live as CSS custom properties in `globals.css` and are mapped
into Tailwind's `@theme inline` block, so both raw CSS and Tailwind
utility classes (`text-[var(--ink)]`, etc.) read from the same source:

| Token | Value | Role |
|---|---|---|
| `--linen` | `#f3eee4` | Page background |
| `--surface` | `#fbf8f2` | Card/panel background |
| `--ink` | `#1b2430` | Primary text |
| `--ink-soft` | `#4a5361` | Secondary text |
| `--accent` | `#0f6e5e` | Deep teal — CTAs, primary emphasis |
| `--sage` | `#2f6b4f` | Forest green — secondary accent, section labels |
| `--line` | `#ddd3bd` | Borders, dividers |

Chosen for a trustworthy-but-approachable read: teal signals clinical
confidence without feeling cold, forest green (replacing an earlier
ochre) reinforces a "recovery/wellness" tone rather than a corporate-
medical one, and both sit on the warm linen base rather than a sterile
white.

Typography: **Fraunces** (display/headings) + **Inter** (body) — set via
`next/font/google` in `layout.tsx`, exposed as CSS variables and mapped
in `globals.css`.

The recurring arc motif (`components/Arc.tsx`) is a small SVG referencing
"range of motion," used as a structural marker (above headings, as the
FAQ accordion's expand indicator) rather than decoration.

## 6. Known constraints & upgrade paths

| Constraint (v1) | Why | Upgrade path |
|---|---|---|
| No ORM / schema migrations | Single `Appointment` table, created once by hand; not worth the overhead yet | Introduce Prisma or Drizzle against the same Neon database if the schema starts changing frequently or more tables are added |
| WhatsApp delivery needs one client tap | No business verification or ongoing cost | Move link-building server-side and call the WhatsApp Business Cloud API (or Twilio) from `api/appointments/route.ts` after the DB insert, for fully automatic delivery |
| No admin view of appointments | Out of scope for v1 | Add an authenticated `/admin` route querying the same Neon table |

## 7. Build/runtime notes

- Development note: `@neondatabase/serverless` was chosen over Prisma
  specifically to avoid two things Prisma introduces — a query-engine
  binary download at `generate`/`db push` time (which fails in
  network-restricted environments), and a persistent TCP connection
  pool that doesn't suit serverless functions. Neon's driver talks HTTP,
  so each request is self-contained
- Required environment variable: `DATABASE_URL` (the Neon pooled
  connection string), in addition to
  `NEXT_PUBLIC_OWNER_WHATSAPP_NUMBER` for the WhatsApp link
