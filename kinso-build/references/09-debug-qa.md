# Stage 9 - Debug and QA

Read `BRAIN.md` first. Paths are from `kinso-build/`.

## Runs

1. For each bug, rotate (seed `<job>-build-09`):
   - `skills/systematic-debugging/SKILL.md` (superpowers) - root cause before any fix;
   - `skills/diagnosing-bugs/SKILL.md` (Pocock).
2. For the whole product: `skills/webapp-testing/SKILL.md` (Anthropic) - Playwright on the local host, on every acceptance criterion. Its `scripts/with_server.py` runs only through the sandbox, and only after it passed our scan (CORE section 8 item 7).
3. Screenshots for the handoff: `../kinso-frontend/tools/capture.mjs`, through the sandbox, one capture at a time.
4. **kinso-qa**, way in "From kinso-build, stage 9" (`../kinso-qa/SKILL.md`): stage 0 refresh, its stages 2 to 10 on the cells ranked high or medium in `qa/MATRIX.md`, then its stage 11. It tests and reports; it never fixes. Its bugs come back in `<job>/qa/BUGS.md` (fixed format, with "Send to"); this stage fixes those marked "kinso-build stage 9" with the rotated debugging skill above, and sends the others to the stage named. After the fixes, run kinso-qa's regression run once. kinso-qa keeps its own brain, guards and stop points.

**Skip:** any example in systematic-debugging that lists keychain identities or reads system secrets. Any browser use outside the local host. Log each skip in `build/PROCESS.md`.

## In

- `<code>/`, `build/SPEC.md` (acceptance criteria), `build/TEST-PLAN.md`, `build/SECURITY.md`, `build/PROGRESS.md`.
- From kinso-qa: `<job>/qa/BUGS.md`, `qa/REPORT.md`, `qa/regression/REGRESSION.md`.

## Deal and pick

- Rotate, do not deal. Write which skill ran for each bug.
- Rubric, 0 to 3 per line: each bug has a cause, a fix and a test that would have caught it.
- Write `<job>/picks/build/09-PICK.md`.

## Guards

- Never push, deploy, commit or merge without the founder's OK.
- Secrets never in files, screenshots or logs.
- Production data read-only. Screens show seed data, marked "test data".
- Free only. Never a `-contributor` model.
- Every script, Playwright run and dev server through `../kinso-frontend/tools/sandbox/run.sh <run folder> <command>`.

## Checks after

- The tests pass, including the new test for each bug. Logs saved.
- The app starts from the README steps in the sandbox. Before stage 11 there is no README yet: stage 6 writes a short `<code>/RUN.md` (start command, port, seed step), and stages 9 and 10 start the app from it.
- Every acceptance criterion passed in the browser or the API, with the evidence named in `QA.md`.
- No secrets in the repo (grep).
- The riskiest assumption's metric shows a number in the running app, and the number matches the seed data by hand.
- Real screenshots of the main screens are in `build/screens/`. Never a mock-up. The "Screenshots are newer than the code" check in `BRAIN.md` prints nothing; its output is in `build/runs/screens-age.log`.
- Every kinso-qa bug marked "kinso-build stage 9" is fixed, or listed in `build/LIMITS.md` with the founder's override; kinso-qa's regression set passes after the fixes.

## Override

The founder may ship with a known bug. It is listed in `build/LIMITS.md` and logged in `<job>/OVERRIDES.md`.

## Out

- `<job>/build/QA.md` - criteria, result, evidence; bugs, cause, fix, test.
- `<job>/build/screens/`.
- `<job>/picks/build/09-PICK.md`.

## Stop point

None. Go on to stage 10.
