# Stage 1 - Test plan: the matrix, risk-ranked

Read `BRAIN.md` first. Paths are from `kinso-qa/`.

## Runs

1. `skills/test-master/SKILL.md` (Jeff) with its `references/` - the test plan: scope, risks, entry and exit rules, defect format.
2. `skills/pict-test-designer/SKILL.md` (pypict) - pairwise design for the settings that multiply (browser x width x language x role x platform). `pypict` is not installed: the brain writes the pairs table by hand from the skill's method and `references/`. Its `scripts/` are never run.
3. `skills/testing-strategy/SKILL.md` (Anthropic) - the level for each cell (unit, integration, end to end, manual).

## In

- `qa/TEST-MAP.md`, `qa/INTAKE.md`, `qa/HOSTS.md`, `build/SPEC.md`, `business/RISK.md`, `<job>/handoff/BRIEF.md` (the riskiest assumption and the metric).
- `qa/regression/REGRESSION.md` and `qa/BUGS.md` from earlier runs.
- `banks/EDGE-CASES.md`, `banks/PERSONAS.md`, `banks/AI-ATTACKS.md`.

## The matrix

`qa/MATRIX.md`: one row per scenario (frontend, API, data, cloud and config, load and timeouts, region, AI evals or model evals, security, mobile), one column per track in use. Each cell gets:

- **Rank:** high, medium, low or not used.
- **Why:** harm (data loss, money, security, legal, blocked flow, wrong answer) x how likely, from the map, the spec, `RISK.md` and past bugs. A cell with a past S1 bug is at least high.
- **Testers:** 2 (high), 1 (medium), regression only (low).
- **Skills:** from that stage's "Runs".
- **Draws:** the edge cases, persona and (AI) attacks, by the seed rule. Seed `<job folder name>-qa-NN-<run>` for stage NN.
- **Pairs:** the pairwise rows that apply.

Always high: the riskiest assumption's flow and its metric; any money, login or personal-data flow; on AI tracks, prompt injection and "the model is down".

## Deal and pick

- No deal for the plan itself: one plan, written by the brain with test-master's template.
- A fresh reviewer (a new session, sees only the map and the plan) checks the ranks. Disagreements are listed; the founder decides at the stop point.
- Write `<job>/picks/qa/01-PICK.md` with the draws (8 hex digits, mod, items) per cell.

## Guards

- No tests run in this stage.
- No cell may plan a test on a host outside `qa/HOSTS.md`, or a load test on a host we do not own. Such a cell is written as "planned, not run - needs the founder's written OK".
- Free only: no cell may need a paid service or device farm.

## Checks after

- Every acceptance criterion maps to at least one cell and one test.
- Every outside API has a stubbed failure case in a cell.
- The pairwise table covers every pair of the chosen settings (count pairs covered vs pairs possible; show both numbers).
- Every draw can be recomputed from its seed.
- From kinso-build stage 5: `qa/TEST-PLAN.md` names, for each criterion, the failing test kinso-build should write first.

## Override

The founder may change a rank, drop a cell or add one. Logged in `<job>/OVERRIDES.md`; the report shows the verdict without the override.

## Out

- `<job>/qa/TEST-PLAN.md`, `<job>/qa/MATRIX.md`, `<job>/picks/qa/01-PICK.md`.

## Stop point

Yes. Show the matrix (cells, ranks, testers, what will not be run and why). Wait for the founder's OK. When called from kinso-build stage 5, this is the end of the call: hand `TEST-PLAN.md` back.
