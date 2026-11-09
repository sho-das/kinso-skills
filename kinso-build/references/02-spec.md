# Stage 2 - Spec

Read `BRAIN.md` first. Paths are from `kinso-build/`.

## Runs

Deal 2 of these 4. Each runs in a fresh session, unaware of the other, as its own `SKILL.md` says:

- `skills/spec-driven-development/SKILL.md` (Addy).
- `skills/brainstorming/SKILL.md` (superpowers) - text only. Never start its visual companion server in `scripts/`.
- `skills/feature-forge/SKILL.md` (Jeff) with its `references/`.
- `skills/spec/SKILL.md` (gstack) with `sections/` - method text only. Its support files are in `skills/gstack-shared/`.

**Skip:** the gstack preamble, `bin/` calls, telemetry and Codex steps; any step that opens an issue or a PR. Log each skip in `build/PROCESS.md`.

## In

- `build/INTAKE.md`, `build/CONSTRAINTS.md`, `build/GUARDS.md` and the founder's stage 0 answers.
- `build/STACK.md` - the platforms and the build order. The spec writes acceptance criteria per platform where a screen or flow differs (for example a push alert on the phone, an email on the web), and only for the platforms marked "now".
- `<job>/handoff/BRIEF.md`, `<job>/business/FIRST-VERSION.md`, `RISK.md`, `<job>/START.md`.
- Questions a skill asks are answered from these files first. Only what they do not hold goes to the founder, in one message.

## Deal and pick

- Who deals: the orchestrator (the session running the skill) starts each dealt option as its own fresh subagent, and the judge as one more fresh subagent with the option names hidden (CORE section 4). A runner never deals. Where no subagents exist (a plain API), run each option as a separate call with no shared history, and the judge as another. Name each agent id or call id in the pick.
- Pick the 2 by the rotation in `BRAIN.md` (seed `<job>-build-02`). Write the seed and the draw.
- Rubric, 0 to 3 per line:
  - (must) the spec tests the riskiest assumption from `BRIEF.md`;
  - (must) the metric can be counted by the product;
  - (must) nothing from "not build";
  - acceptance criteria a test can check;
  - an out-of-scope list;
  - open questions instead of guesses;
  - fits the founder's hours in `START.md`.
- A failed "must" drops the spec. Keep one, or merge named parts ("criteria from A, out of scope from B").
- Write `<job>/picks/build/02-PICK.md`.

## Guards

- Never push, deploy, commit or merge without the founder's OK.
- Secrets never in files. Production data read-only. Free only. Never a `-contributor` model.
- No code in this stage. Scripts only through the sandbox.
- No invented user numbers, prices, legal rules or model terms.
- A legal "pause until a lawyer" item from `RISK.md` is not specified.

## Checks after

- Every requirement traces to `BRIEF.md`, `FIRST-VERSION.md` or a founder answer (file and line).
- The riskiest assumption has its own acceptance criterion, and the metric has a defined event or row.
- Every acceptance criterion names how a test would check it.
- No not-build item appears, even as "later".
- Legal pauses are kept and named.
- Input that contradicts itself (for example a "done" date after its "due" date, an end before a start) is rejected with a clear message by default, with an acceptance criterion and a test. This is plain input checking, not a guess; the founder may turn it off at the stop point. Never leave it as an open question with "allowed" as the provisional answer.
- A legal not-build item is specified as the claims the product must not make (a legal rule, a legal period, "your legal duty is", "required by law"), never as a ban on single words. Where the brief has a legal risk, the spec asks for one short line on every page: the dates or facts are the user's own and the tool is not legal advice. A word-ban acceptance criterion that would block that line, or ordinary words such as an HTML `required` attribute or "Action", fails this check.

## Override

The founder may add or drop a feature. If it touches the riskiest assumption or a not-build item, say so once, then follow, and log it in `<job>/OVERRIDES.md`.

## Out

- `<job>/build/SPEC.md` - with acceptance criteria, out of scope and open questions.
- `<job>/build/options/spec-A.md`, `spec-B.md`.
- `<job>/picks/build/02-PICK.md`.

## Stop point

Yes. Show the spec and a short view of both options. Wait for the founder's OK before stage 3.
