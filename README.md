# Kintsugi — Band Site (v1)

One-page band website for **Kintsugi** (Next.js App Router + TypeScript + Tailwind), designed to match the provided mockup and locked spec.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Vitest

## Getting started

```bash
npm install
npm run dev
```

## Scripts
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

## Using Codex (recommended workflow)

This repo includes a **Codex workpack** to keep implementation spec-locked and prevent drift.

1) Open **PROMPT_HEADER.md** and paste it at the top of your Codex session.
2) Then follow **CODEX_WORKPACK.md** (use the Master prompt, or the phased prompts A→I).
3) Track progress in **tasks.md**.

Files:
- `PROMPT_HEADER.md` — paste-at-top header (hard constraints + allow minimization)
- `CODEX_WORKPACK.md` — master + phased prompts, visual checklist
- `tasks.md` — incremental checklist A→I
- `DECISIONS.md` + `ADR_TEMPLATE.md` — lightweight decision tracking

## Content

Site content is driven by JSON files (placeholders are fine for v1 scaffolding):
- `content/site.json`
- `content/gigs.json`
- `content/merch.json`

## Env

Copy `.env.example` to `.env` and fill values.

### Mailing list
- `MAILING_LIST_PROVIDER` (optional): defaults to a Console provider in v1.

### Stripe
Stripe is **mocked** for now (no real checkout). A stub `/api/checkout` may exist returning 501 until Stripe is enabled.
