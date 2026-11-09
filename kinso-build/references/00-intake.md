# Stage 0 - Intake and guards

Read `BRAIN.md` first. Paths are from `kinso-build/`. `<job>` is the job folder. `<code>` is the folder that holds the code (the founder's answer to start question 1).

## Runs

Each skill is read in place and followed as its own `SKILL.md` says.

1. `skills/constraint-driven-development/SKILL.md` - the quality bar as `build/CONSTRAINTS.md`.
2. `skills/search-first/SKILL.md` - for each part of the first version: adopt, extend or build.

No deal at this stage. There is one intake.

**Skip:** any install or package search command in search-first. Adopt candidates are named only; nothing is installed here.

## In

- `<job>/handoff/BRIEF.md` - first version, riskiest assumption, metric, limits (time, money, model), not build.
- `<job>/business/FIRST-VERSION.md`, `RISK.md`, `AI-COSTS.md`, `COSTS.md`, if present.
- `<job>/START.md`, `<job>/OVERRIDES.md`.
- Existing code way in: `<code>` plus the founder's short brief of the change. Then kinso-frontend stage 0 maps it (`../kinso-frontend/references/00-existing.md`).
- Shared rules: `../RULES-RESEARCH.md`, the guards in `BRAIN.md`.

## Deal and pick

- No deal. The brain writes `build/GUARDS.md`: the shared guards plus this job's limits (hours a week, money, model, region, not-build items, legal pauses).
- Write `<job>/picks/build/00-PICK.md` with "no deal" and the checks table.

## Guards

- Never push, deploy, commit or merge without the founder's OK in chat, for that action.
- Secrets never in files. Only `.env.example` with empty values; `.env` in `.gitignore`.
- Production data is read-only. Never delete or change it.
- Free only. No paid API, service, key or trial.
- Never a `-contributor` model.
- Scripts only through `../kinso-frontend/tools/sandbox/run.sh <run folder> <command>`.
- Nothing in `vendor/` or `skills/` is run, installed or loaded. One exception (CORE section 8 item 7): a script a stage file names, that passed our scan, run through `run.sh`.
- The supabase skill's `.mcp.json` step needs the founder's OK first (stages 4 and 6).
- A gap in the brief is a gap. Never fill it with a guess.

## Checks after

- Every brief item (first version, riskiest assumption, metric, limits, not build) is quoted with its source file and line.
- Missing items are listed as gaps for the founder, never filled in.
- Each "adopt" tool is free, with its licence named. None is installed yet.
- The riskiest assumption and its metric are written in `INTAKE.md` word for word, with the pass line if the brief has one.
- `GUARDS.md` holds every guard above and every red flag from `RISK.md`.

## Override

The founder may change a limit or a not-build item. The stack is chosen in stage 1. Show the brief line once, confirm, then log a row in `<job>/OVERRIDES.md`. A legal pause can only become "proceed at the founder's risk".

## Out

- `<job>/build/INTAKE.md` - brief items with sources, gaps, adopt / extend / build list.
- `<job>/build/CONSTRAINTS.md`, `<job>/build/GUARDS.md`.
- `<job>/picks/build/00-PICK.md`, `<job>/build/PROCESS.md` (first lines).

## Stop point

Yes. Show where the code lives, the commit answer and the gaps. Wait for the founder's answer before stage 1 (platform and stack).
