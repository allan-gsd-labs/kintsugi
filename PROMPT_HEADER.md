# Codex Prompt Header (paste at the top of every Codex run)

You are implementing a v1 one-page band website for **Kintsugi** in the existing repo.

## Hard constraints
- **Do not redesign**: refactor/evolve the existing scaffold (currently in `src/app/page.tsx`) into the required component inventory.
- Routes: **only** `/` (App Router) plus API route handlers (`/api/mailing-list`, `/api/checkout`). No extra pages.
- No CMS. Minimal dependencies. **Do not add new packages**.
- Tailwind + CSS variable tokens.
- Match mockup: dark atmospheric hero bg with overlay; subtle card panels; minimal sticky nav; active link = **thin red underline**; red is accent only.
- Motion: CSS transitions; respect `prefers-reduced-motion`.
- Accessibility: AA contrast; keyboard nav; visible focus; real labels.

## Design-lock protocol (run every step)
At the end of every step/milestone:
1) **Re-open** `design/mockup-v1.jpg` and compare against the current UI.
2) Review `design/NOTES.md` (pixel-critical rules).
3) Verify the **Visual “do-not-drift” checklist** in `CODEX_WORKPACK.md`.
4) Paste and complete the **Step completion template** in `CODEX_WORKPACK.md`.
5) If any mismatch is found, fix it **before** moving on.
6) Do not “improve” the design beyond the mockup/spec.

## Content-driven
Create/maintain:
- `/content/site.json`
- `/content/gigs.json`
- `/content/merch.json`

## Assets
Use local assets only (no downloads). See `ASSETS_INBOX.md` for provided images and suggested `public/assets/*` paths.

## Stripe (mocked for now)
- No real Stripe integration yet.
- `/api/checkout` must be a **stub** returning 501 Not Implemented.
- In UI: if `stripePriceId` missing, show **Unavailable** and disable checkout.

## Build order
Follow `tasks.md` build order A→I exactly.

## Allow minimization
- Do not install packages.
- Do not fetch/download remote assets.
- Avoid running commands until end of each milestone; batch them.
