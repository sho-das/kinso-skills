# Stage 11 - Report, go or no-go, and the regression set

Read `BRAIN.md` first. Paths are from `kinso-qa/`.

## Runs

1. `skills/verification-loop/SKILL.md` (ECC) - before the report: the app builds, its own tests pass, the regression set passes, no secrets in `qa/`.
2. `skills/addy-test-driven-development/SKILL.md` (Addy; `skills/addy-references/testing-patterns.md`) - one test per kept bug, written in `qa/regression/`, that **fails now** (shows the bug). After kinso-build's fix, the same test must pass.
3. `skills/pr-review-toolkit/agents/pr-test-analyzer.md` (Anthropic) - on a regression run: do the tests cover the change? Gaps become findings or new regression lines.
4. `skills/test-master/SKILL.md` (Jeff) - the defect report format, mapped to `PLAN.md` section 9.
5. When a bug's cause is unclear: `../kinso-build/skills/systematic-debugging/SKILL.md` or `diagnosing-bugs`, to find the cause, never to fix it.
6. A fresh reviewer (a new session that ran no test) reads `REPORT.md` and `BUGS.md` and checks each S1 and S2 against its evidence.

## In

- Every stage file from this run (`FRONTEND.md` to `MOBILE.md`), `picks/qa/`, `qa/MATRIX.md`, `qa/regression/`, `<job>/OVERRIDES.md`, `build/SPEC.md`.

## The report

`<job>/qa/REPORT.md`:

- **Verdict:** go, go with limits, or no-go (`PLAN.md` section 9). No-go on any open S1, any failing regression test, or a broken guard.
- **Matrix result:** each cell - tested, passed, findings, or "planned, not run" and why.
- **Bugs:** counts by severity, copied from `BUGS.md`.
- **Overrides:** each one, and the verdict without it.
- **Not tested:** cells, hosts, platforms or tools not available, with the reason.
- **Regression set:** checks before and after this run (counts from `REGRESSION.md`).

`<job>/qa/BUGS.md`: the fixed format in `PLAN.md` section 9, one row per kept bug, with "Send to" (kinso-build stage 6, 7, 8 or 9).

## The regression set

- `<job>/qa/regression/REGRESSION.md`: one line per check - id, date, the bug or risk it guards, the command, status (active or retired with date and reason).
- Every kept bug adds a test that fails now. Every drawn edge case that found a bug adds a line. Every AI eval case that failed adds a line (AI tracks).
- On a regression run: run the whole set first; any fail is a finding and the verdict is no-go.
- Nothing is removed. A check that no longer applies is marked retired.

## Deal and pick

- No deal. Write `<job>/picks/qa/11-PICK.md` with the verdict, the counts (each copied from a named file) and the fresh reviewer's notes.

## Guards

- Never fix the app; the bug list goes to kinso-build.
- Never commit, push or merge. Never `rm`.
- Every count is copied from a named file.

## Checks after

- Every S1 and S2 in `BUGS.md` has steps, evidence and a regression test that fails now.
- The fresh reviewer agreed with each S1 and S2, or the disagreement is written.
- The verdict follows the rule; overrides are listed.
- `REGRESSION.md` count after = count before + new lines (retired lines kept).

## Override

The founder may ship on "go with limits" or even "no-go". The report keeps the verdict without the override, and each override is in `<job>/OVERRIDES.md`. Guards are never overridden.

## Out

- `<job>/qa/REPORT.md`, `<job>/qa/BUGS.md`, `<job>/qa/regression/`, `<job>/picks/qa/11-PICK.md`.
- Called from kinso-build: kinso-build reads `qa/BUGS.md` (stage 9) and `qa/REPORT.md` (stages 10 and 11).

## Stop point

Yes. Show the verdict, the S1 and S2 bugs and what goes back to kinso-build. Wait for the founder.
