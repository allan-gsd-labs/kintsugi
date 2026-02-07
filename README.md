# web-template

Template repo for new web apps in the **allan-gsd-labs** org.

## Stack
- Next.js + TypeScript
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

## Env
Copy `.env.example` to `.env` and fill values.

### Mailing list provider
- `MAILING_LIST_PROVIDER` (optional): defaults to `console`.
- Current supported value:
  - `console`: logs mailing-list signups server-side.
