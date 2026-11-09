# Stage 3 - API and backend

Read `BRAIN.md` first. Paths are from `kinso-qa/`.

## Runs

1. High cells: deal 2 testers from these, each a fresh session:
   - `skills/api-to-testcase-generator/SKILL.md` (LambdaTest) with its `reference/` - cases from `build/API.md` or the routes. Tests are written in the app's own test tool (for example `unittest`, pytest, Vitest); never Newman or HyperExecute in the cloud;
   - `skills/contract-first/SKILL.md` (ECC) - every route against one machine-readable contract (OpenAPI or JSON Schema); the response shapes and error shapes match;
   - `skills/property-based-testing/skills/property-based-testing/SKILL.md` (Trail of Bits) - generated inputs for parsers, dates and maths. Read only; CC-BY-SA-4.0.
2. Every outside API: `skills/api-mocking/SKILL.md` (LambdaTest) - a local stub that can answer slowly, fail, or send bad JSON. The app is pointed at the stub by its own settings.
3. Errors: `skills/debugging-and-error-recovery/SKILL.md` (Addy) - reproduce before reporting; `skills/pr-review-toolkit/agents/silent-failure-hunter.md` (Anthropic) on the error paths in the code (swallowed errors, empty catch blocks, fallbacks that hide a failure); `skills/error-handling/SKILL.md` (ECC) for what good handling looks like.
4. The language test skill named in `build/STACK.md`, read from `../kinso-build/skills/`.

**Skip:** HyperExecute links and the Newman cloud steps; Postman account steps; `api-skill/installer/`. Log each skip in `qa/PROCESS.md`.

## In

- `qa/MATRIX.md` (API cells), `build/API.md`, `build/SPEC.md`, `build/DATA-MODEL.md`, `<code>/`, `<code>/RUN.md`, `qa/HOSTS.md`, `qa/regression/`.
- Draws: `banks/EDGE-CASES.md` section E3, one persona.

## Deal and pick

- As `BRAIN.md`. Rubric per finding: harm, how often, reproduced (must).
- Write `<job>/picks/qa/03-PICK.md`.

## Guards

- Requests only to hosts in `qa/HOSTS.md`. Outside APIs are always the stub, never the real service.
- Auth tests use test accounts made for the job (seed data), never a real user.
- Tests through the sandbox. Never fix the app. Never `rm`. Never commit.

## Checks after

- Every route in `API.md` (or in the code, when `API.md` is missing) has: a good request, a missing field, a wrong type, no auth, another user's id, and the error shape check.
- Every outside API has a stub case for: 500, timeout, bad JSON.
- No request reached a host outside `qa/HOSTS.md` (grep the run logs).
- Each finding has the request, the response (status and body, secrets masked) and a severity.

## Override

The founder may accept an API bug. Auth or data-exposure bugs stay flagged as S1 in the report.

## Out

- `<job>/qa/API.md` - routes, cases, results, findings, stubs used.
- `<job>/qa/runs/api/<run>/`, `<job>/picks/qa/03-PICK.md`, new test files under `qa/tests/api/` (never inside `<code>/`).

## Stop point

None. Go on to stage 4.
