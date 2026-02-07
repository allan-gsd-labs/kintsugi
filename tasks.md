# Kintsugi v1 One-Page Site Tasks

## Scope
- Single-page Next.js App Router site at `/` only.
- Locked section order and component inventory from product spec.
- JSON-driven content for site, gigs, and merch.

## Decisions
- Heading font: Space Grotesk (`next/font/google`), body font: Inter.
- Social destination source: Linktree at `https://linktr.ee/kintsugi.gla`.
- Stripe not yet configured: keep product cards and mark checkout unavailable when `stripePriceId` is empty.

## Incremental Checklist
- [x] A) Create `tasks.md` and content JSON files with placeholders.
- [x] B) Add global styling tokens + layout container rules + base typography.
- [x] C) Implement components scaffold and render one-page structure in `src/app/page.tsx`.
- [x] D) Implement header + active section tracking + smooth scroll + reduced motion handling.
- [x] E) Implement `EmailSignupForm` + `POST /api/mailing-list`.
- [x] E2) Asset-driven visual polish (logo + hero image + atmospheric treatment).
- [ ] E3) Design realignment to mockup direction (gritty editorial system).
- [x] E3.1) Build page shell: stacked cards, stronger outer gutters, section panel rhythm.
- [x] E3.2) Hero composition: distressed logotype sizing, left-aligned copy block, single CTA row.
- [x] E3.3) Texture treatment: unify grain/overlay system (one reusable utility, consistent opacity scale).
- [x] E3.4) Typography hierarchy: heavier display usage, tighter heading tracking, cleaner body contrast.
- [x] E3.5) Component visual pass: cards for Music/Gigs/Merch/Contact with shared border and divider language.
- [x] E3.6) CTA system: one primary red button style, one quiet secondary style, no mixed button patterns.
- [ ] E3.7) Mobile pass: preserve hierarchy and panel rhythm on small screens (no cramped two-column artifacts).
- [ ] E3.8) Asset quality checkpoint: replace weak/low-res assets if needed and normalize crops.
- [ ] F) Implement `GigsSection` (featured next show + collapsible past).
- [ ] G) Implement merch grid + Stripe checkout `POST /api/checkout`.
- [ ] H) Implement EPK + Contact + Footer CTA.
- [ ] I) Polish motion, focus states, status banner, responsive checks.

## Validation Log
- [x] Task A validated (typecheck + lint pass).
- [x] Task B validated (typecheck + lint pass).
- [x] Task C validated (typecheck + lint pass).
- [x] Task D validated (typecheck + lint pass).
- [x] Task E validated (typecheck + lint pass).
- [x] Task E2 validated (typecheck + lint pass).
- [ ] Task E3 validated (typecheck + lint pass).
- [ ] Task F validated (typecheck + lint pass).
- [ ] Task G validated (typecheck + lint pass).
- [ ] Task H validated (typecheck + lint pass).
- [ ] Task I validated (typecheck + lint pass).
