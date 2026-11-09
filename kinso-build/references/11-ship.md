# Stage 11 - Ship ready and handoff

Read `BRAIN.md` first. Paths are from `kinso-build/`.

## Runs

1. `skills/shipping-and-launch/SKILL.md` (Addy; checklists in `skills/addy-references/`).
2. `skills/observability-and-instrumentation/SKILL.md` (Addy) - the brief's metric visible and readable.
3. `skills/ci-cd-and-automation/SKILL.md` (Addy) - a CI file, written, not pushed.
4. `skills/deployment-patterns/SKILL.md` (ECC) - the free hosting plan, health check, rollback, on the cloud chosen in `build/STACK.md`.
5. `skills/cloud-architect/SKILL.md` (Jeff) for the hosting plan of every part in `STACK.md` "How they connect" (API, database, file store, push, each app). `skills/terraform-engineer/SKILL.md` only when the founder chose infrastructure as code: files written, never applied.
6. **kinso-qa**, way in "From kinso-build, stage 11" (`../kinso-qa/SKILL.md`): its regression run, its stage 5 (config per environment, health checks, cold start) and its stage 11 (go, go with limits, or no-go in `<job>/qa/REPORT.md`). Nothing ships on "no-go" without the founder's override, logged in `OVERRIDES.md`.
7. More than one platform: a ship plan per app (web host; Google Play and Apple App Store steps, listed but never started). Store accounts and their fees come from `business/COSTS.md`, or "not checked".

The brain **prepares, never performs**. Push, deploy, PR and merge each wait for the founder's OK in chat. With an OK to open a PR: create it, confirm it can merge, hand over the link. Never merge.

**Skip:** any step that pushes, deploys, tags, opens a PR, or signs up for a host. Any paid monitoring or hosting tier. Log each skip in `build/PROCESS.md`.

## In

- `<code>/`, `build/REVIEW.md` (verdict and overrides), `build/QA.md`, `build/screens/`, `build/SECURITY.md`, `build/AI.md`.
- `build/STACK.md` - the chosen cloud and hosting, the platforms and the connection plan.
- `<job>/handoff/BRIEF.md`, `<job>/handoff/PROMOTE.md`, `<job>/business/RISK.md`, `<job>/OVERRIDES.md`.

## Deal and pick

- No deal. One hosting plan, on the cloud from `build/STACK.md`, free tiers only; a second only if the founder asked at stage 1.
- Write `<job>/picks/build/11-PICK.md` with "no deal" and the checks table.

## Guards

- Never push, deploy, commit or merge without the founder's OK, one OK per action.
- Secrets never in files. `.env.example` lists every setting with empty values.
- Production data read-only. Free only. Never a `-contributor` model.
- Scripts only through the sandbox.
- The handoff makes no claim from the "must not make" list.

## Checks after

- The README run steps work from a clean copy in the sandbox: install (approved packages only), start, tests.
- The tests pass. The app starts.
- No secrets in the repo (grep); `.env` ignored; `.env.example` has no values.
- The riskiest assumption's metric shows a number, and `PROMOTE-BUILD.md` says where it is counted and how to read it.
- The limits match the review verdict and every override.
- kinso-qa's `qa/REPORT.md` says go or go with limits (or the founder's override is logged), its regression set passes, and its "Not tested" list is in `build/LIMITS.md`.
- Every screenshot in the handoff is real, from `build/screens/`, with test data marked.

## Override

The founder may skip the CI file or pick another host. Log in `<job>/OVERRIDES.md`.

## Out

- `<code>/README.md`, `<code>/.env.example`, the CI file (not pushed).
- `<job>/build/DEPLOY.md` (free hosting plan, rollback), `<job>/build/LIMITS.md`.
- `<job>/handoff/PROMOTE-BUILD.md` for kinso-promote: what was built (feature, spec line, test), real screenshots, real limits, the metric, how to try it.
- `<job>/picks/build/11-PICK.md`.

## Stop point

Yes, before any push, deploy, PR or merge. Show what is ready and wait for the founder's OK for each action.
