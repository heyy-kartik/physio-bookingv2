# Requirements Specification: Unwind Yoga Platform

**Project Goal:** Migrate the existing Unwind Webflow site to a modern, high-performance web application using a strict file-based routing architecture and CSS-first styling system.

**1. Technology Stack**

- **Framework:** Next.js 16 (App Router) using TypeScript[cite: 1].
- **Styling:** Tailwind CSS v4 relying exclusively on CSS variables in `globals.css` via the `@theme inline` directive[cite: 1].
- **Database:** Local SQLite managed via `better-sqlite3` to ensure zero external dependencies during v1[cite: 1].
- **Fonts:** `next/font/google` implementing Fraunces (display) and Inter (body) to prevent runtime layout shifts[cite: 1].

**2. Core User Interface Requirements**

- **Landing Experience:** Must feature the hero video and the social proof indicator highlighting "500+ students practicing with us"[cite: 2].
- **Class Roster:** Implement detailed views for three specific sessions:
  - Deep Restore: Focuses on long holds and nervous system resets[cite: 2].
  - Balance & Strength: A mindful flow for stability and confidence[cite: 2].
  - Slow Flow: Breath and movement synchronization[cite: 2].
- **Pricing & Memberships:** Display three distinct tiers:
  - Essential Flow ($89/month): Up to 8 regular classes[cite: 2].
  - Unlimited Practice ($129/month): Unlimited access and priority booking[cite: 2].
  - Build Your Own Practice ($89/month): Customized private sessions[cite: 2].
- **Community Testimonials:** Integrate 6 specific client reviews (including Theresa Webb, Eleanor Pena, and Wade Warren) highlighting the calm, supportive environment[cite: 2].

**3. API & Data Flow Architecture**

- **Database Schema:** A single `appointments` table stored in `data/appointments.db`, initialized dynamically upon first import via `src/lib/db.ts`[cite: 1].
- **Form Submission:** The client-side `AppointmentForm.tsx` must post data to `POST /api/appointments`[cite: 1].
- **Server Validation:** The Next.js API route must validate required fields and synchronously execute `insertAppointment()` before returning a 200 OK status[cite: 1].
- **WhatsApp Delivery:** The application must never trigger the `wa.me` URL generation (`src/lib/whatsapp.ts`) until the database successfully persists the record[cite: 1].

**4. Design System Tokens**

- **Backgrounds:** `--linen` (`#f3eee4`), `--surface` (`#fbf8f2`)[cite: 1].
- **Text:** `--ink` (`#1b2430`), `--ink-soft` (`#4a5361`)[cite: 1].
- **Accents:** `--accent` (`#0f6e5e`), `--sage` (`#2f6b4f`)[cite: 1].
- **Borders:** `--line` (`#ddd3bd`)[cite: 1].
- **Motifs:** Integrate the recurring "range of motion" SVG arc (`Arc.tsx`) strictly as a structural marker[cite: 1].
