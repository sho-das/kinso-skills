# Stage 9 - Security

Read `BRAIN.md` first. Paths are from `kinso-qa/`.

kinso-qa does **not** hold its own security skills. It runs kinso-build stage 8 as written, so the two skills never drift apart.

## Runs

1. Follow `../kinso-build/references/08-security.md` "Runs", with the skills in `../kinso-build/skills/`:
   - deal 2 of: `security-and-hardening` (Addy), `security-review` (ECC), `vibesec` (VibeSec), `insecure-defaults` (Trail of Bits);
   - `fp-check` (Trail of Bits) on every finding: prove it or drop it;
   - `sharp-edges` (Trail of Bits) when the app exposes config or an API to others;
   - Semgrep only if the founder already approved it for kinso-build, with `--metrics=off`.
2. kinso-qa adds the **dynamic** side, on the running app on a host in `qa/HOSTS.md`: the hostile persona's cases from stages 2 and 3 (script tags in every field, other users' ids, missing auth, replayed requests), and on AI tracks the injection results from stage 8.
3. When kinso-build already wrote `build/SECURITY.md` for this code version, read it and test only what changed since, plus the regression set.

**Skip:** everything kinso-build stage 8 skips. Any scanner or attack tool aimed at a host not in `qa/HOSTS.md`. Log each skip in `qa/PROCESS.md`.

## In

- `qa/MATRIX.md` (security cells), `build/SECURITY.md` (if any), `<code>/`, `build/API.md`, `build/DATA-MODEL.md`, `build/DEPENDENCIES.md`, `business/RISK.md`, the findings of stages 2, 3 and 8, `qa/HOSTS.md`.
- Draws: the hostile user persona is fixed for this stage; edge cases from E2 and E3 marked as security (E2-10, E3-04, E3-05, E3-08).

## Deal and pick

- As kinso-build stage 8: 2 independent reviews, fp-check on each finding. The brain's pick rules (`BRAIN.md`) apply on top.
- Write `<job>/picks/qa/09-PICK.md`.

## Guards

- **Only hosts in `qa/HOSTS.md`.** Never scan, fuzz or attack any other host, including the app's outside APIs.
- No secret printed in full in any file: mask all but the last 4 characters.
- Test accounts only. Never a real user's data.
- Through the sandbox. Never fix the app. Never `rm`. Never commit.

## Checks after

- Every finding has file and line or request and response, a severity, and an fp-check result.
- No secret in the repo or its history (grep), `.env` ignored.
- Auth and input checks: every route in `API.md` has a missing-auth case and another-user case (from stage 3), passed or a finding.
- Dependency licences and known advisories listed (copied from `build/SECURITY.md` when current).

## Override

The founder may accept a risk "at the founder's risk". High-severity items stay S1 in the report and block "go".

## Out

- `<job>/qa/SECURITY.md` - what kinso-build stage 8 found (by reference), what the dynamic tests found, fp-check results.
- `<job>/qa/runs/security/<run>/`, `<job>/picks/qa/09-PICK.md`.

## Stop point

Yes, when a finding needs a decision (an accepted risk, or a fix that changes the product). Otherwise go on to stage 10 or 11.
