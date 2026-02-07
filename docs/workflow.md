# Workflow (soft-enforced)

We are on GitHub Free with private repos, so some branch protections may not be technically enforceable yet.
We still follow these rules as process.

## Default flow
- **No direct pushes to `main`** (except bootstrapping or emergency fixes)
- Create a branch per feature/fix:
  - `feature/<short-name>`
  - `fix/<short-name>`
  - `chore/<short-name>`
- Open a PR early.
- **1 PR per feature**.

## PR expectations
- Keep PRs small.
- Include: what/why/how tested/risk/rollback.
- CI must be green (lint/typecheck/test/build + gitleaks).

## Approvals and sensitive areas
Anything involving **auth**, **payments**, **infra**, or **irreversible** changes requires explicit approval.
(See `docs/autonomy-policy.md`.)

## When we upgrade
If/when we move to GitHub Team (or make repos public), turn on strict branch protections for `main`.
