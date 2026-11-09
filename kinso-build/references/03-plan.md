# Stage 3 - Plan and tasks

Read `BRAIN.md` first. Paths are from `kinso-build/`.

## Runs

1. Deal 2 of these 3, each in a fresh session:
   - `skills/planning-and-task-breakdown/SKILL.md` (Addy; its `../../references/definition-of-done.md` is in `skills/addy-references/`).
   - `skills/writing-plans/SKILL.md` (superpowers).
   - `skills/blueprint/SKILL.md` (ECC).
2. Then one fresh check on the chosen plan, rotated by job:
   - `skills/plan-eng-review/SKILL.md` with `sections/` (gstack, method text only), or
   - `skills/doubt-driven-development/SKILL.md` (Addy; reads `skills/addy-references/orchestration-patterns.md`). Pass the plan and the spec, never the brain's reasons. 3 cycles at most.

**Skip:** the gstack preamble, `bin/`, Codex outside voice; Addy's cross-model CLIs (paid); any worktree, branch or commit step. Log each skip in `build/PROCESS.md`.

## In

- `build/SPEC.md` (approved), `build/CONSTRAINTS.md`, `build/GUARDS.md`, `build/INTAKE.md` (adopt list).
- `<job>/START.md` for the founder's hours.

## Deal and pick

- Who deals: the orchestrator (the session running the skill) starts each dealt option as its own fresh subagent, and the judge as one more fresh subagent with the option names hidden (CORE section 4). A runner never deals. Where no subagents exist (a plain API), run each option as a separate call with no shared history, and the judge as another. Name each agent id or call id in the pick.
- Seed `<job>-build-03`. Write the seed and the draw.
- Rubric, 0 to 3 per line:
  - (must) the riskiest assumption is built and testable first;
  - (must) each task names its test;
  - tasks of about 1 hour or less;
  - a working slice after each task;
  - dependencies listed with licence;
  - total fits the founder's hours.
- The plan check's findings are verified against the spec before they change the plan.
- Write `<job>/picks/build/03-PICK.md`.

## Guards

- Never push, deploy, commit or merge without the founder's OK. No branch is made without the commit OK from stage 0.
- Secrets never in files. Production data read-only. Free only. Never a `-contributor` model.
- Scripts only through the sandbox. No install in this stage.
- Each new dependency: name, licence, why, pinned version, and whether it runs install scripts.

## Checks after

- Every spec criterion maps to at least one task.
- No task builds a not-build item.
- The first task (or first two) builds the riskiest assumption and the code that counts its metric.
- Every new dependency is in `DEPENDENCIES.md` for approval. A paid or trial one is dropped.

## Override

The founder may reorder or cut tasks. If a cut task carries the riskiest assumption or its metric, say so once. Log in `<job>/OVERRIDES.md`.

## Out

- `<job>/build/PLAN.md`, `<job>/build/tasks/NN-*.md`, `<job>/build/DEPENDENCIES.md`.
- `<job>/build/options/plan-A.md`, `plan-B.md`, `<job>/build/PLAN-CHECK.md`.
- `<job>/picks/build/03-PICK.md`.

## Stop point

Yes, shared with stage 4. After stage 4, show the plan, the data model and the new dependencies together. Wait for the founder's OK, including one OK per install.
