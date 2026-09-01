# Meridian Physiotherapy — Website

A Next.js site for a physiotherapy clinic: landing page, services, about,
FAQ, an appointment booking form, privacy consent, and contact — with
appointment requests saved to a local database and forwarded to the
owner's WhatsApp via a click-to-chat link.

## Setup

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` and set your WhatsApp number:

```
NEXT_PUBLIC_OWNER_WHATSAPP_NUMBER=91XXXXXXXXXX
```

(Country code + number, digits only — no `+`, no spaces.)

Then run:

```bash
npm run dev
```

## How appointment booking works

1. Client fills out the form at `/appointment`.
2. On submit, the details are saved to a local SQLite database
   (`data/appointments.db`) via `/api/appointments` — so nothing is lost
   even if the next step fails.
3. A WhatsApp click-to-chat link (`wa.me`) opens automatically in a new
   tab, pre-filled with the appointment details, addressed to the
   clinic's number. The client just taps **Send**.
4. If the popup is blocked, a fallback "Open WhatsApp to confirm" button
   is shown on the confirmation screen.

### Upgrading to fully automatic WhatsApp delivery

Right now the client has to tap Send once WhatsApp opens. To skip that
step entirely (message sent automatically, no client action), swap the
`buildWhatsAppLink` step in `src/components/AppointmentForm.tsx` for a
server-side call to the WhatsApp Business Cloud API (or Twilio) inside
`src/app/api/appointments/route.ts`. This needs Meta Business
verification and a registered WhatsApp Business number.

### Moving off SQLite

`data/appointments.db` is a local file — fine for a single small
deployment, but it won't persist on serverless platforms like Vercel
between deploys. For production, swap `src/lib/db.ts` for a hosted
Postgres database (e.g. via Prisma + Neon/Supabase) using the same
`insertAppointment` function signature so nothing else needs to change.

## Editing content

- Clinic name, address, phone, hours: `src/components/Header.tsx`,
  `src/components/Footer.tsx`, `src/app/contact/page.tsx`
- Services offered: `src/app/services/page.tsx` and the `services` array
  in `src/app/page.tsx`
- About / credentials: `src/app/about/page.tsx`
- FAQ: `src/app/faq/page.tsx`
- Privacy policy text: `src/app/privacy/page.tsx`

## Build

```bash
npm run build
npm start
```
# physio-booking
