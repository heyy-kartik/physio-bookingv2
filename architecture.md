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
| Database | SQLite via `better-sqlite3` | Zero external services for v1; synchronous API keeps the API route simple; pure npm package (no native binary download step), unlike Prisma's engine binaries |
| Booking delivery | WhatsApp click-to-chat (`wa.me` link) | No approval process, no cost, works immediately; trade-off is one manual tap from the client (see PRD §10 for the automated-API upgrade path) |

## 2. High-level flow

```
┌─────────────┐      1. submit form      ┌──────────────────────┐
│   Client     │ ───────────────────────▶│ POST /api/appointments│
│  (/appointment) │                       │  (Next.js route)      │
└─────────────┘                          └──────────┬────────────┘
                                                     │ 2. validate + insert
                                                     ▼
                                          ┌──────────────────────┐
                                          │  SQLite (data/*.db)  │
                                          │  via better-sqlite3  │
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
    db.ts                   better-sqlite3 setup, schema, insertAppointment()
    whatsapp.ts              buildWhatsAppLink() — formats wa.me URL
data/
  appointments.db            SQLite file (gitignored, created at runtime)
```

## 4. Key modules

### `src/lib/db.ts`
- Opens (or creates) `data/appointments.db` on first import
- Creates the `appointments` table if it doesn't exist (no migration
  tool for v1 — schema changes are manual `ALTER TABLE` or a fresh file)
- Exposes `insertAppointment()`, the single write path used by the API
  route — keeping the schema and insert logic in one place makes it a
  clean seam for swapping in a hosted database later (see §6)

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

Typography: **Fraunces** (display/headings) + **Inter** (body) — set via
`next/font/google` in `layout.tsx`, exposed as CSS variables and mapped
in `globals.css`.

The recurring arc motif (`components/Arc.tsx`) is a small SVG referencing
"range of motion," used as a structural marker (above headings, as the
FAQ accordion's expand indicator) rather than decoration.

## 6. Known constraints & upgrade paths

| Constraint (v1) | Why | Upgrade path |
|---|---|---|
| SQLite is a local file | Zero setup, zero cost, works for a single small deployment | Swap `src/lib/db.ts` for a hosted Postgres client (e.g. Prisma + Neon/Supabase), keeping `insertAppointment()`'s signature so callers don't change. Required before deploying to a platform without persistent disk (e.g. Vercel's serverless functions) |
| WhatsApp delivery needs one client tap | No business verification or ongoing cost | Move link-building server-side and call the WhatsApp Business Cloud API (or Twilio) from `api/appointments/route.ts` after the DB insert, for fully automatic delivery |
| No admin view of appointments | Out of scope for v1 | Add an authenticated `/admin` route reading from the same `appointments` table/DB client |
| No schema migrations | Single `CREATE TABLE IF NOT EXISTS`, fine for one evolving table | Introduce a migration tool (e.g. Prisma Migrate or Drizzle) if the schema starts changing frequently or once moved to Postgres |

## 7. Build/runtime notes

- Development note: `better-sqlite3` was chosen over Prisma specifically
  because Prisma's CLI downloads a query-engine binary from an external
  host at `generate`/`db push` time — in network-restricted environments
  this fails, whereas `better-sqlite3` only needs the npm registry
- No environment variables are required for local dev to boot, but
  `NEXT_PUBLIC_OWNER_WHATSAPP_NUMBER` must be set (see `.env.example`)
  before the WhatsApp link will point at the real clinic number
