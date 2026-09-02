# Product Requirements Document
## Meridian Physiotherapy Website

**Status:** Draft v1
**Last updated:** September 2026

---

## 1. Overview

A marketing and booking website for a physiotherapy clinic. The site's
core job is to convert visitors into booked appointments, with the
appointment request reaching the clinic owner on WhatsApp — the channel
they already use to manage patients — without requiring the owner to
check a separate dashboard or inbox.

## 2. Problem statement

Physiotherapy clients currently have no way to request an appointment
online. Enquiries come in by phone call or word of mouth, which:
- Requires the owner to be reachable in real time to take a booking
- Loses details that get relayed verbally (name, service, timing)
- Gives the clinic no online presence for people searching or comparing options

## 3. Goals

| Goal | Success looks like |
|---|---|
| Give the clinic a professional online presence | Visitors can learn about services, credentials, and FAQs without calling |
| Make booking self-serve | A client can request an appointment in under 2 minutes, unassisted |
| Get requests to the owner where they already work | Every submitted request reaches the owner's WhatsApp, pre-filled, same-day |
| Never lose a request | Every submission is saved even if the WhatsApp step fails or is skipped |
| Be transparent about data use | Clients can read a plain-language privacy policy and must actively consent before submitting |

## 4. Non-goals (v1)

- Real-time slot availability / calendar sync (the form collects a
  *preferred* date and time; the owner confirms manually)
- Payments or deposits
- Patient accounts / login
- Automated, no-tap WhatsApp delivery (v1 uses click-to-chat, which needs
  one tap from the client; see "Future" below)
- Multi-clinic / multi-practitioner support

## 5. Target users

- **Primary: prospective patients** — people in pain or recovering from
  injury/surgery, often first discovering the clinic via search or a
  referral link, on mobile.
- **Secondary: the clinic owner** — needs appointment requests to land
  somewhere they'll actually see promptly (WhatsApp), with enough detail
  to confirm or reschedule without a phone call.

## 6. User stories

- As a **prospective patient**, I want to see what services are offered
  so I know if this clinic treats my condition.
- As a **prospective patient**, I want to check the FAQ before booking so
  I don't have to call with basic questions.
- As a **prospective patient**, I want to request an appointment online
  with my preferred date/time so I don't have to call during clinic hours.
- As a **prospective patient**, I want to understand how my personal data
  will be used before I submit it.
- As the **clinic owner**, I want appointment requests to reach my
  WhatsApp with all the details already filled in, so confirming a slot
  takes one message, not a phone call.
- As the **clinic owner**, I want no request to be silently lost, even if
  WhatsApp fails to open on the client's device.

## 7. Scope — pages

| Page | Purpose |
|---|---|
| Landing (`/`) | Hero pitch, service highlights, how booking works, CTA |
| Services (`/services`) | Full list of services with what's included in each |
| About (`/about`) | Practitioner credentials, experience, practice philosophy |
| FAQ (`/faq`) | Common pre-booking questions, expandable accordion |
| Appointment (`/appointment`) | The booking form (see §8) |
| Privacy Consent (`/privacy`) | Plain-language data use policy |
| Contact (`/contact`) | Clinic address, phone, hours, secondary booking CTA |

## 8. Appointment flow — functional requirements

**Form fields:**
- Full name (required)
- Phone number (required)
- Email (optional)
- Service (required, dropdown)
- Preferred date (required)
- Preferred time (required, dropdown of clinic hours)
- Notes (optional, free text)
- Privacy consent checkbox (required — form cannot submit without it)

**On submit:**
1. Client-side validation (required fields, consent checked)
2. `POST /api/appointments` — server validates and writes the record to
   the database with status `new`
3. On success, a `wa.me` link is generated with the appointment details
   pre-filled as a message, addressed to the clinic's WhatsApp number,
   and opened in a new tab automatically
4. The client sees a confirmation screen with a fallback "Open WhatsApp"
   button in case the automatic popup was blocked by the browser

**Failure handling:**
- If the save fails, the client sees an inline error and can retry — no
  WhatsApp link is generated until the save succeeds, so the owner never
  gets a WhatsApp message for a request that wasn't actually recorded
- If WhatsApp fails to open (popup blocked, app not installed), the
  record is still saved and visible to the owner via the database; the
  fallback button lets the client retry the WhatsApp step independently

## 9. Non-functional requirements

- **Mobile-first:** most patients will book from a phone; the form and
  all pages must be fully usable at narrow widths
- **Accessible:** visible keyboard focus, adequate color contrast,
  reduced-motion respected
- **No account required:** booking must not require the client to create
  a login
- **Data minimalism:** only collect what's needed to schedule and confirm
  care (see `privacy.md` policy text on the Privacy Consent page)

## 10. Future considerations (not v1)

- **Automatic WhatsApp delivery** via WhatsApp Business Cloud API or
  Twilio, removing the one-tap-to-send step entirely (requires Meta
  Business verification)
- **Hosted database** (Postgres) to replace local SQLite once deployed
  to a platform without persistent local disk (e.g. Vercel)
- **Owner-facing dashboard** to view/manage appointment requests without
  querying the database directly
- **Calendar sync** to show real slot availability instead of a
  preferred-time request
- **SMS or email confirmation** to the client as a secondary channel

## 11. Open questions

- What is the clinic's actual WhatsApp Business number (currently a
  placeholder in `.env.example`)?
- Should there be a cancellation/reschedule self-service flow, or is
  WhatsApp message-back sufficient for v1?
- Does the clinic want appointment reminders (would require a
  notification channel beyond this site's scope)?
