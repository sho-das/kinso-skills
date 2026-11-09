# Stage 2 - Know the job

Read `../RULES.md` and `../BRAIN.md` first. The old rewrite is in `rewrite/02-know-the-job.md`. Its fixed checklist found the hidden facts nobody else asked for; it comes back below as a check.

## Runs

In order, each followed as its own file says:

1. `skills/hallmark/SKILL.md` pre-flight and ask (about L54-76), with `skills/hallmark/references/flow.md` (pre-flight block) and `skills/hallmark/references/anatomy.md` (the job word and its anatomy). Signals in its fixed order; material first; "tone: pick an extreme"; the vibe in 4 to 8 words; genre and scope detection; material inventory: real, pictures, absent.
2. `skills/impeccable/reference/init.md` and `skills/impeccable/reference/shape.md` - what belongs in `PRODUCT.md`. `skills/impeccable/reference/new-work.md` L18-27: what success looks like, what must stay, what would make a polished result feel wrong.
3. `skills/design-consultation/SKILL.md` - the memorable-thing question, asked on its own (about L643-646).
4. `skills/frontend-design/SKILL.md` L13 - propose the subject, audience and job, then confirm.

Skip, and why:
- gstack taste-profile writes and `skills/gstack-shared/bin/`: they write under `~/.claude/skills/gstack` and send telemetry. Kinso keeps its own memory in `$KINSO_HOME/design-log.json` (stage 3).
- Hallmark signal 9 (`TOGETHER_API_KEY`, the comp step): paid.

## In

- The brief, `research/RESEARCH.md`, `existing/MAP.md` on an existing project, `START.md`.
- `RULES.md`.
- **In, from the chain:** `handoff/PRODUCT.md`, `handoff/TEST-PAGE.md`, `OVERRIDES.md`, `business/RISK.md` section 5 ("Claims we must not make") and `../RULES-RESEARCH.md`. On "From kinso-build", also `build/SPEC.md` and `build/STACK.md`. A fact in these files is "given"; it is never asked again.

## Deal and pick

- Pool every candidate question: Hallmark's four, Impeccable's "feel wrong", gstack's memorable thing, and the fact checklist below.
- Rank by one test: would the answer change the page? Keep 8 to 10. Leave out questions whose answer is likely "not decided".
- On "From kinso-build", first drop every question that `START.md`, `handoff/PRODUCT.md`, `handoff/TEST-PAGE.md`, `OVERRIDES.md` or `build/SPEC.md` already answers. Keep only the rest, even if fewer than 8, or none. Log each dropped question and the file that answers it in `02-PICK.md`.
- Keep "tone: pick one extreme" and "the vibe in 4 to 8 words". Stage 3 needs them. Ask how many design options (1 to 5, "not sure" means 5) and how much motion.
- Record the genre silently, Hallmark's way.
- Write `<job>/picks/frontend/02-PICK.md`: the pooled questions, the rank, the kept 8 to 10, and why each dropped one went.

## Guards

- Facts only from the brief, the project, the research and the client's answers. Never from memory notes or other products.
- Free only. Never deploy or post. No secrets.
- Brand colours, fonts and logos only from the client's own files or live site (home page and its CSS over https). Never redraw a logo.
- Scripts only through `tools/sandbox/run.sh`.

## Checks after

Never style.
- Every fact in `PRODUCT.md` is marked given, asked or inferred. A batch run says "inferred" in its first line.
- The fact checklist was covered, asked or already known: who is behind it; how it works; price, terms and limits; platforms; material they may show; what a visitor needs to act (hours, address, dates, booking); the memorable thing; dislikes; places only: the signature dishes or products by name and how they are served, menu and prices, size (seats or capacity), who it suits (children, groups), dietary needs, access. Ask "what are the dishes people come for?" in its own words: a question about showing the menu or its prices does not cover it.
- Dated facts (deadlines, launch dates) are product facts.
- Conflicts between sources are named, with the side kept and a question.
- No stack question on a new page. Target widths are in Constraints.
- `ANSWERS.md` holds the questions and answers word for word.

## Override

Override as in `RULES.md` and CORE section 8. "Go ahead" means: infer, state the inferences in one line. Facts are never inferred.

## Out

`research/PRODUCT.md` (product truth, visitor and job, actions, constraints, positioning, unknowns, memorable thing, inputs for direction, material on hand and absent, accessibility needs, tone and vibe, genre). `research/ANSWERS.md`. `picks/frontend/02-PICK.md`.

In a chain job, `research/PRODUCT.md` starts from `handoff/PRODUCT.md` and adds only the new answers. Its Constraints section copies the "Claims we must not make" list word for word from `handoff/PRODUCT.md`. Never a pointer, never a shorter list: later stages read `research/PRODUCT.md`.

## Stop point

Ask once: one message with the 8 to 10 questions. Wait for the answers before writing `PRODUCT.md`. On "From kinso-build", the message holds only the questions left after the drop step in "Deal and pick"; with none left, there is no stop here.
