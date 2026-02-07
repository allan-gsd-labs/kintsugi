# Codex Workpack — Kintsugi v1 (Mockup-locked)

This repo already contains a starter page that roughly matches the mockup (`src/app/page.tsx`). The goal is to **refactor and complete** the implementation to match the locked design/spec—**without redesigning**.

## What this is
A set of copy/paste prompts for Codex that:
- keeps changes local and minimal (to avoid permission/allow loops)
- prevents “drift” away from the mockup
- follows the required build order A→I
- enforces **continuous design verification** at every step

---

## 0) Paste this FIRST (Operating Rules)

Before starting, open:
- `design/mockup-v1.jpg`
- `design/NOTES.md`

**CODEX OPERATING RULES (LOCKED)**
- Implement a v1 **one-page** band website for “Kintsugi” in this repo.
- **Do not redesign**: refactor the existing scaffold in `src/app/page.tsx` into the component inventory and finish the spec.
- Routes: only `/` (App Router) plus API route handlers (e.g. `/api/mailing-list`, `/api/checkout`). No extra pages.
- No CMS. Minimal dependencies. **Do not add new packages**.
- Tailwind + CSS variables tokens.
- Match the mockup: dark atmospheric hero, subtle panel cards, thin red underline active nav, red as accent only.
- Motion: CSS transitions only; respect `prefers-reduced-motion`.
- Accessibility: visible focus, keyboard nav, AA contrast, real labels.
- Content driven by JSON files under `/content/*`.
- Stripe is **mocked for now**: no real Stripe integration; keep a stub endpoint.

**CONTINUOUS DESIGN VERIFICATION (MANDATORY)**
At the end of every step/milestone:
1) Re-open the provided mockup image and compare it against the current UI.
2) Verify the “Visual do-not-drift checklist” in section 3.
3) If anything is off, fix it **before** moving on.
4) Do not add decorative elements not present in the mockup/spec.

**ALLOW MINIMIZATION**
- Do not install packages.
- Do not fetch/download remote assets.
- Avoid running commands until the end of each milestone; batch them.

**STOP RULE (PREVENT RUNAWAY REFACTORS)**
- If a step would change more than ~10 files or rewrite the overall page structure, STOP and summarize before proceeding.

---

## Step completion template (paste after every milestone)

At the end of each step/milestone, paste this checklist and fill it in before moving on.

If any answer is “No”, fix it immediately before proceeding.

**STEP COMPLETION CHECK (MANDATORY)**
- Mockup re-checked: Yes/No
- Hero matches (bg overlay, centered stack, JOIN button): Yes/No
- Header matches (sticky minimal, active thin red underline only): Yes/No
- Panels/cards match (subtle surface + border, no heavy separators): Yes/No
- Red usage is accent-only (buttons/underline; no long red text): Yes/No
- Typography matches (Space Grotesk headings, correct sizes/tracking, body lh 1.6–1.7): Yes/No
- Spacing rhythm matches (8/16/24/40/64/96; max-w 1200): Yes/No
- Reduced motion respected: Yes/No
- Focus/keyboard nav OK: Yes/No
- Ran typecheck/lint (if scripts exist): Yes/No
- Notes / fixes made:

---

## 1) Master prompt (best attempt at near one-shot)

Paste this as the main instruction after the Operating Rules:

**MASTER PROMPT (REFACTOR, MOCKUP-LOCKED)**
Repo already contains a starter mockup-like page at `src/app/page.tsx` with `k-*` styling primitives. Evolve it into the locked spec **without changing the overall look/structure**.

Hard constraints:
- Keep one page route `/` only (App Router) plus API routes.
- Anchor IDs: `#home #music #gigs #merch #epk #contact`.
- Sticky header with active section tracking via IntersectionObserver; active underline is **thin** accent red.
- Smooth scroll via CSS `scroll-behavior: smooth` on `html`, but **disable** for reduced motion.
- Tokens via CSS variables: `--bg-main #0A0A0A --bg-surface #121212 --text-primary #F2F2F2 --text-muted #AFAFAF --accent-red #8F1D1D --border-subtle #1E1E1E`.
- Typography: **use Space Grotesk via `next/font/google`** for headings (locked). Body uses Inter (or existing body font) with 16–18px and line-height 1.6–1.7. H1 56–64 desktop / 40–44 mobile. Apply subtle tracking to H1/H2 to match the mockup.

### Typography recipe (copy/paste guidance)
- Load fonts in `src/app/layout.tsx` using `next/font/google`:
  - `Space_Grotesk` for headings (weights 500/600/700)
  - `Inter` for body (weights 400/500/600)
- Suggested class usage:
  - H1: `font-heading tracking-[-0.01em] uppercase` + size scale (`text-[44px] sm:text-[56px] md:text-[64px] leading-[0.95]`)
  - H2: `font-heading tracking-[0.02em]` (`text-[32px] md:text-[36px] leading-tight`)
  - Meta/labels: `text-[12px] tracking-[0.18em] uppercase text-kmuted`
  - Body: `text-[16px] md:text-[18px] leading-[1.65] text-kmuted`

If you introduce `font-heading`/`font-body` utilities, keep it minimal (e.g. define via CSS variables or Tailwind theme) and do not add dependencies.

---

## Asset wiring prompt (Hero + texture overlays)

Use this as a dedicated Codex prompt when wiring assets into the UI.

**PROMPT — WIRE LOCAL ASSETS INTO HERO (MOCKUP-LOCKED)**
- Use only local files (see `ASSETS_INBOX.md`). Copy the provided band photo to `public/assets/hero.jpg` and the grain texture to `public/assets/texture.jpg`.
- Update the Hero background to use `next/image` with `fill`, `priority`, and appropriate `sizes`.
- Layering (top to bottom) should be:
  1) Hero image (`/assets/hero.jpg`) covering the hero area
  2) Dark overlay gradient (top slightly lighter, bottom darker) to match the mockup
  3) Optional texture overlay (`/assets/texture.jpg`) at low opacity (e.g. 0.10–0.18) with `mix-blend-mode: overlay` or `soft-light` (choose the one that best matches, but keep it subtle)
  4) Foreground content (header + hero text + signup form)

- Keep hero height similar to the mockup (roughly ~520px on desktop; adjust responsively).
- Do NOT change the hero layout/typography other than what’s required to fit the background.
- Ensure text remains AA-contrast against the background (increase overlay darkness if needed).
- Reduced motion: no parallax. No heavy animation.

Acceptance check (must pass before moving on):
- Hero looks cinematic and legible; background reads as a photo, not a flat gradient.
- Texture is barely noticeable (adds grit, doesn’t distract).
- JOIN button remains accent red only.
- Quick compare against `design/mockup-v1.jpg`.
- Do not add dependencies.
- Use placeholders for real content where needed.

Implement build order A→I:
A) Create `tasks.md` + content JSON files with placeholders.
B) Add global styling tokens + container rules + base typography.
C) Implement component inventory and render the one-page structure in `/src/app/page.tsx`.
D) Implement header + active section tracking + smooth scroll + reduced motion handling.
E) Implement EmailSignupForm + `/api/mailing-list` with honeypot + in-memory rate limit + server-side email validation + ConsoleProvider; provider via env var `MAILING_LIST_PROVIDER` documented.
F) Implement GigsSection (featured next show + collapsible past).
G) Implement Merch grid + `/api/checkout` stub (501 Not Implemented) + status banner near Merch for `/?status=success|cancel`.
H) Implement EPK + Contact + Footer CTA.
I) Polish: motion, focus states, responsive checks.

Stripe:
- Do NOT implement real Stripe. `/api/checkout` must be a stub that returns 501.
- In Merch UI, if `stripePriceId` missing: show “Unavailable” and disable checkout.

After each milestone (only if scripts already exist): run `npm run typecheck` and `npm run lint` and fix issues.

When done: print (1) files changed, (2) remaining placeholders, (3) how to run dev/lint/typecheck/build.

---

## 2) If Codex drifts: phased prompts (A→I)

Use these prompts sequentially (one at a time). Each is deliberately small.

### Prompt A — scaffolding + content
Implement ONLY:
- `tasks.md` checklist A→I + “Decisions” section.
- `/content/site.json`, `/content/gigs.json`, `/content/merch.json` with realistic placeholders.
No UI work yet.

### Prompt B — tokens + typography + layout
Implement ONLY:
- CSS variables tokens in `globals.css`
- Tailwind config mapping colors to CSS vars
- Base typography scale + container (max width 1200)
No page layout yet.

### Prompt C — component inventory + page structure
Create components matching inventory:
- `SiteHeader({anchors, activeAnchor})`
- `HeroSection({headline, subhead, showSignup})`
- `EmailSignupForm({placeholder, submitText})` (UI only)
- `MusicSection({bandcampEmbedUrl})`
- `GigsSection({nextShow, pastShows})`
- `StatementSection({text})`
- `MerchSection({products})`
- `ProductCard({title, price, image, checkoutUrl})`
- `EPKSection` (bio/members/FFO/links/downloads)
- `ContactSection({bookingEmail, generalEmail})`
- `Footer({showSignup})`
Wire them into `/src/app/page.tsx` with correct section order and IDs.

### Prompt D — header + IO active section + reduced motion
Implement ONLY:
- Sticky header + IntersectionObserver active tracking
- thin red underline for active link
- smooth scroll with reduced-motion disable

### Prompt E — mailing list end-to-end
Implement:
- `/src/app/api/mailing-list/route.ts` (or equivalent)
- honeypot + in-memory rate limit + server-side email validation
- UI loading/success/error states, a11y labels
- ConsoleProvider default; env var `MAILING_LIST_PROVIDER` reserved + documented

### Prompt F — gigs logic
Implement:
- parse `gigs.json`
- compute next upcoming show by ISO date
- featured next show + collapsible past shows (accessible)

### Prompt G — merch + checkout stub + status banner
Implement:
- merch grid from `merch.json`
- show “Unavailable” if no `stripePriceId`
- `/api/checkout` stub returning 501 JSON message
- `/?status=success|cancel` banner/toast near merch

### Prompt H — EPK + Contact + Footer
Implement:
- EPK content driven from `site.json`
- contact emails + socials
- footer CTA mailing list again

### Prompt I — polish + QA
Implement:
- subtle motion timings with reduced-motion
- focus states and keyboard nav pass
- responsive checks
- run lint/typecheck/build (if scripts exist)

---

## 3) Visual “do-not-drift” checklist

Codex must confirm these **after every step** (not just at the end):
- Hero: atmospheric background + dark overlay; centered stack; big KINTSUGI H1; subhead; mailing list line; email + JOIN button inline.
- Header: minimal/sticky; active is a **thin** red underline only.
- Sections: subtle dark surface panels/cards; not lots of separators.
- Statement section text exactly: “Built from fracture. Forged to endure.”
- Merch: 3–4 cards with title/price; red only for accents.
- Contact: Booking/Press + General emails; socials row.
- Overall: quiet, cinematic, spaced, typographic.
