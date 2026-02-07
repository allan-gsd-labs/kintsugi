# Kintsugi v1 - tasks

This checklist is spec-locked. Goal: one-page site matching the provided mockup and design notes.

## Build order (A-I)

### A) Project scaffolding
- [x] Create `/content/site.json` placeholders (copy, emails, socials, EPK content, Bandcamp embed URL)
- [x] Create `/content/gigs.json` placeholders (upcoming[], past[] ISO dates)
- [x] Create `/content/merch.json` placeholders (3-4 products; include `stripePriceId` optional for now)
- [x] Add/confirm placeholder hero background image in `/public` (no remote fetch)

### B) Global styling + tokens
- [x] Tokens as CSS vars in `globals.css`
- [x] Tailwind uses CSS vars for colors
- [x] Typography scale + line-height 1.6-1.7 baseline
- [x] Container max width 1200 + spacing rhythm

### C) Component inventory + page structure
- [x] `SiteHeader({ anchors, activeAnchor })`
- [x] `HeroSection({ headline, subhead, showSignup })`
- [x] `EmailSignupForm({ placeholder, submitText })`
- [x] `MusicSection({ bandcampEmbedUrl })`
- [x] `GigsSection({ nextShow, pastShows })`
- [x] `StatementSection({ text })`
- [x] `MerchSection({ products })`
- [x] `ProductCard({ title, price, image, checkoutUrl })`
- [x] `EPKSection` (bio/members/FFO/links/downloads)
- [x] `ContactSection({ bookingEmail, generalEmail })`
- [x] `Footer({ showSignup })`
- [x] Wire into `/src/app/page.tsx` as a single route with anchor sections

### D) Sticky nav + active section tracking + scroll behavior
- [x] IntersectionObserver active anchor
- [x] Active link underline: thin accent red
- [x] CSS smooth scroll on `html`; disabled for reduced motion

### E) Mailing list
- [x] EmailSignupForm posts to `/api/mailing-list`
- [x] Server-side email validation
- [x] Honeypot
- [x] In-memory rate limit (best-effort)
- [x] Console provider default; `MAILING_LIST_PROVIDER` reserved
- [x] UI success/error states; accessible labels

### F) Gigs
- [x] Compute next show from `gigs.json` upcoming
- [x] Featured upcoming show card + CTA
- [x] Past shows collapsed (`aria-expanded`)

### G) Merch + checkout stub
- [x] Merch grid from `merch.json`
- [x] If no `stripePriceId`: show `Unavailable` + disable CTA
- [x] `/api/checkout` stub returns 501 Not Implemented (Stripe mocked)
- [x] Read `/?status=success|cancel` and show status banner near Merch

### H) EPK + Contact + Footer
- [x] EPK content from `site.json`
- [x] Contact emails + socials
- [x] Footer CTA includes mailing list again + socials + copyright

### I) Polish + QA
- [x] Motion timings + transitions
- [x] Reduced motion support
- [x] Focus styles + keyboard navigation
- [x] AA contrast sanity check (manual)
- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run build`

## Decisions (ADR-lite)
- Font: Accepted - Space Grotesk for headings (Inter for body/fallback)
- Motion: CSS-only; no framer-motion
- Stripe: mocked in v1; checkout endpoint stub only

