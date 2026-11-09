# Stage 5 - Tests first

Read `BRAIN.md` first. Paths are from `kinso-build/`.

## Runs

1. Rotate one per job (only one test suite can be used):
   - `skills/tdd/SKILL.md` (Pocock);
   - `skills/sp-test-driven-development/SKILL.md` (superpowers);
   - `skills/addy-test-driven-development/SKILL.md` (Addy; its `../../references/testing-patterns.md` is in `skills/addy-references/`).
2. For maths, dates or scoring logic, add `skills/property-based-testing/skills/property-based-testing/SKILL.md` (Trail of Bits). Read only; the folder is CC-BY-SA-4.0 and stays unchanged.
3. The language skill that `build/STACK.md` names for stage 5 (for example `skills/fastapi-expert/` for Python, `skills/nestjs-expert/` for TypeScript, `skills/golang-pro/` for Go, `skills/kotlin-specialist/` for Kotlin, `skills/swift-expert/` for Swift, `skills/flutter-expert/` for Dart). Tests are written in the chosen language with its usual test tool (for example pytest, Vitest or Jest, `go test`, JUnit, XCTest, `flutter test`). App tests that need an emulator or simulator wait for the founder's OK to install it; until then, test the logic without the device.

4. **kinso-qa**, way in "From kinso-build, stage 5" (`../kinso-qa/SKILL.md`): its stages 0 and 1 write `<job>/qa/TEST-MAP.md`, `qa/MATRIX.md` (track x scenario, risk-ranked) and `qa/TEST-PLAN.md`, which names the failing test to write first for each acceptance criterion. Run it before the rotated skill above; the tests written here follow `qa/TEST-PLAN.md`. kinso-qa keeps its own brain, guards and stop points (its stage 1 stop point is the founder's OK on the matrix).

**Skip:** the property-based-testing `evals/` and `run.sh`; any library install without the stage 4 OK. Log each skip in `build/PROCESS.md`.

## In

- `build/SPEC.md` (acceptance criteria and named edge cases), `build/PLAN.md`, `build/tasks/`, `build/DATA-MODEL.md`, `build/API.md`.
- `build/STACK.md` - the chosen language, backend and platforms (tests for the platforms marked "now" only).
- The approved dependencies from `build/DEPENDENCIES.md`.
- `<job>/qa/TEST-PLAN.md` and `qa/MATRIX.md` from kinso-qa.

## Deal and pick

- Rotate, do not deal. The order across jobs is in `BRAIN.md` (seed `<job>-build-05`). Write which skill ran.
- Rubric, 0 to 3 per line, logged in `build/PROCESS.md` so stage tests learn which skill wins:
  - (must) one failing test for each acceptance criterion before code;
  - tests run in the sandbox;
  - no network and no paid model in tests;
  - edge cases named in the spec are tested.
- Write `<job>/picks/build/05-PICK.md`.

## Guards

- Never push, deploy, commit or merge without the founder's OK.
- Secrets never in files, including test fixtures and logs.
- Production data read-only. Tests use seed data marked "test data".
- Free only. Never a `-contributor` model. AI features use a stub model in tests.
- Every test run goes through `../kinso-frontend/tools/sandbox/run.sh <run folder> <command>`.

## Checks after

- The tests fail for the right reason (red): a missing feature, not a syntax or import error. The run log is saved.
- Each acceptance criterion has a test, by name, in `TEST-PLAN.md`.
- Each high cell in kinso-qa's `qa/MATRIX.md` that can be tested before code has at least one test.
- The riskiest assumption's metric has a test: the event or row is counted, and the shown number is right.
- No test calls the network or a real model.
- No secret in `tests/` (grep for keys, tokens, passwords).

## Override

The founder may skip a test. It is listed as a known gap in `build/LIMITS.md` and the handoff, and logged in `<job>/OVERRIDES.md`.

## Out

- `<code>/tests/`.
- `<job>/build/TEST-PLAN.md`, `<job>/build/runs/red.log`.
- `<job>/picks/build/05-PICK.md`.

## Stop point

None. Go on to stage 6.
