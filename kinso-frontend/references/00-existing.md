# Stage 0 - Existing project

Read `../RULES.md` and `../BRAIN.md` first. The old rewrite of this stage is in `rewrite/00-existing.md`, for comparison only.

## Runs

Two readers, in parallel, each in its own fresh context. Each follows its own `SKILL.md` as written.

1. `skills/ponytail-audit/SKILL.md` - the code reader. Map first, name the expected load, trace the main flows end to end (login, forms, money, user data), say what was not read, four-part findings, the Verdict and Lean lines.
2. `skills/impeccable/reference/document.md` and `skills/impeccable/reference/extract.md` - the design reader, by the manual path. The documenter brief is `skills/impeccable-agents/impeccable-documenter.md`. It asks the owner to name the feel in their own words.
3. `skills/ponytail/SKILL.md` - the smallest-change ladder and the "never cut" list. These become the guardrails for every later stage.
4. A `before/` capture set: `tools/sandbox/run.sh <job> node tools/capture.mjs "<page URL>" <job>/existing/before before <locale> 45`, at 1440 and 390. Stages 7 and 9 compare against it.

Skip, and why:
- `skills/impeccable/scripts/impeccable` and `impeccable.cmd`: the launcher downloads a binary on first run.
- ponytail `review`, `debt`, `gain`, `help`: not this stage.
- Any install, update, hook or telemetry command a skill shows.

## In

- The project folder, read only. `START.md` answers if they exist.
- `RULES.md`: facts, safety, user override.

## Deal and pick

- No deal. This is fact work.
- The brain merges the two readers into `existing/MAP.md`. Where they disagree, the line becomes a question for the client, not a choice.
- Write `<job>/picks/frontend/00-PICK.md`: "No deal", then the merge table (topic, code reader, design reader, kept or asked).

## Guards

- Facts only from the project files and the client. Repo evidence is a fact about the code, not the client's approval.
- Free only. Never deploy, post, commit, push or merge.
- No secrets: never open or print `.env`, key or credential files. Name them only. List files by name; never `cat *`.
- Production data is read-only. Run only read-only project commands, and only through `tools/sandbox/run.sh`.
- A skill rule that clashes with a shared rule: the shared rule wins. Log it in `<job>/frontend/PROCESS.md`.

## Checks after

Never style. The brain checks, fixes or sends back:
- Facts: every line in `MAP.md` and `DESIGN.md` has a file and line, or is marked **missing**.
- Risks: each has a concrete case (file, line, input, what goes wrong). No case, no risk. A `shortcut:` comment is a decision, not a finding.
- "Unused" only after a search of the whole tree, including tests, config and string references.
- Secrets: none printed anywhere in the job folder.
- Tests: the command is recorded, with pass or fail now.
- An existing `DESIGN.md` was not overwritten silently: refresh, overwrite or merge was asked.

Guardrails written into `MAP.md` for every later stage: change only what the job names; reuse shared components first; app differences only in that app's tokens; never fork a shared component; owner's OK before changing a shared library; new values as tokens; 44px targets; lists from the project's own data; tests pass before and after; work on a new branch; end with the list of changed files.

## Override

Override as in `RULES.md` and CORE section 8: show the reason once, ask, follow the client on OK, tag it "user override" and add a row to `OVERRIDES.md`. Secrets and production data are never overridden.

## Out

- `existing/MAP.md`: what the repo does, Stack, Pages, Data sources, Shared components and themes, Tests, What must stay, Risks, Not read, Guardrails.
- `design/DESIGN.md` and `design/tokens.json` (found values only).
- `existing/before/` captures. `picks/frontend/00-PICK.md`.

## Stop point

Stop. Show the client the map and the "what must stay" list. Go on only on their OK.
