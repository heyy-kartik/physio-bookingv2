# Project: Meridian Physiotherapy Site — Footer Design

## Original problem statement
Create the best footer design for an agency/portfolio-style site.
- Visual style: Light, clean & minimal
- Contents: All standard links + contact info / address / CTA
- Delivery: React component inside the app

## Architecture
Next.js 16 (App Router) full-stack app, NOT split FastAPI+React.
- `/app/frontend` — Next.js app (moved here from `/app` root on 2026-09-02 to satisfy
  platform supervisor which requires directory=/app/frontend, command="yarn start").
  - `package.json` start script changed to `next dev -H 0.0.0.0` (was `next start`,
    which failed because no production build existed — dev server matches platform's
    hot-reload expectation).
  - `better-sqlite3@^11.10.0` — confirmed working fine on Node 20.20.2, no downgrade needed.
  - DB: local SQLite at `frontend/data/appointments.db` (tables: appointments, subscribers).
- `/app/backend` — minimal FastAPI stub (`server.py`, only `/api/health`) created only to
  satisfy supervisor's backend program (directory=/app/backend, uvicorn server:app).
  Not used by the app; all real logic lives in Next.js API routes.
- Next.js internal API routes renamed from `/api/*` to `/internal-api/*`
  (`src/app/internal-api/newsletter`, `src/app/internal-api/appointments`) because the
  platform ingress reserves the `/api` prefix for the Python backend on port 8001.
  Frontend fetch calls in `FooterNewsletter.tsx` and `AppointmentForm.tsx` updated to match.
- `frontend/.env` created with `REACT_APP_BACKEND_URL=https://design-footer-1.preview.emergentagent.com`
  (actual preview URL, confirmed via `preview_endpoint` env var in the pod — do NOT reuse
  older preview URLs from previous handoffs).
- `next.config.ts` — added `allowedDevOrigins` for `*.preview.emergentcf.cloud` and
  `*.preview.emergentagent.com` to avoid Next dev-server cross-origin HMR blocking.

## What's been implemented (2026-09-02)
- Fixed root cause of "can't see preview": app was living at `/app` root instead of the
  `/app/frontend` + `/app/backend` split required by the READONLY supervisor config —
  both services were FATAL (`couldn't chdir to /app/frontend|backend: ENOENT`).
- Moved entire Next.js app to `/app/frontend`, created backend stub, fixed start script,
  renamed API routes to avoid `/api` ingress collision, added env files.
- Verified: site loads (curl 200, screenshot shows hero + nav), footer renders (Footer,
  Newsletter, Subscribe, Back to top all present in HTML), newsletter API returns
  `{"ok":true}` end-to-end via the live preview URL.
- Footer components (Footer.tsx, FooterTop.tsx, FooterNewsletter.tsx, FooterColumns.tsx,
  BackToTop.tsx) — built in a previous session, now confirmed rendering correctly.

## Known constraints
- This app intentionally does NOT use the Python backend for real logic — it's a Next.js
  monolith. Backend stub exists only to keep supervisor happy.
- If future 3rd-party integrations are needed, they should be added as Next.js API routes
  under `src/app/internal-api/*` (not `/api/*`), OR implemented properly in the FastAPI
  backend if a real split becomes necessary.

## Testing status
- Self-tested via curl + screenshot_tool (site 200 OK, footer text present, newsletter
  API POST succeeds). Testing agent NOT invoked (single infra fix, no new feature).

## Next steps / backlog
- None explicitly requested beyond delivering the working footer + fixing the preview.
