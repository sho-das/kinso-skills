# Stage 5 - Copy

Read `../RULES.md` and `../BRAIN.md` first. The old rewrite is in `rewrite/05-copy.md`. Its fact rules won its blind test; they come back below as checks. Its word budgets and banned lists do not.

## Runs

In order, each followed as its own file says:

1. The chosen designer's copy rules first:
   - taste-skill direction: `skills/taste-skill/references/copy.md` (five questions, two-line arithmetic, five headline shapes, proof without inventing, generated tells) and `skills/taste-skill/scripts/lint.mjs` for stock phrases.
   - Hallmark direction: `skills/hallmark/references/craft.md` L61-101 (the owner across a counter, swap test, three tests a line, its own budgets, missing facts, sample data) and gates 69 and 70 in `references/gates.md`.
2. `skills/frontend-design/SKILL.md` L61-71 - names users understand, an action keeps its name, errors never apologise.
3. `skills/impeccable/reference/clarify.md` - audit, hierarchy, rewrite by function, verify.
4. `skills/humanizer/SKILL.md` - a pass on the body copy to remove signs of AI writing.

Skip, and why: `skills/humanizer/scripts/` and `skills/humanizer/agents/` (scripts, not needed for a read-and-edit pass); any install or update command.

## In

`plan/PLAN.md`, `design/DESIGN.md`, `PRODUCT.md`, `ANSWERS.md`, `RESEARCH.md`, the project files. `RULES.md`.

**In, from the chain:** `handoff/PRODUCT.md`, `handoff/TEST-PAGE.md`, `OVERRIDES.md`, `business/RISK.md` section 5 ("Claims we must not make") and `../RULES-RESEARCH.md`.

## Deal and pick

- Deal 3 headline sets (headline, supporting line, main button). Each uses a different shape from taste-skill's five: the name, what it is, the claim, the instruction, the place or moment. Write them with the chosen designer's rules. Add a fourth from the client's own words when they have a voice of their own.
- A fresh picker scores 0 to 3 (CORE section 6) and writes `<job>/picks/frontend/05-PICK.md`:
  1. Every word traces to an input (hard gate: one untraced word fails the set).
  2. Swap test: the nearest rival's name in; if it still works, it loses.
  3. Three tests a line: can the reader picture it, could it be proven false, could only this business say it.
  4. Fits the direction's display size at 390, by taste-skill's two-line arithmetic.
  5. Answers the visitor's first question.
- Show the winner and the runner-up at the stop point.
- Body: one pass with the designer's rules, then the humanizer pass.

## Guards

- Facts only from `PRODUCT.md` and the inputs. Clash: taste-skill's invented "sample details" lose. A labelled Sample is allowed only where `PLAN.md` asks for one and a generic one is possible.
- Free only. Never deploy or post. No secrets. Scripts only in `tools/sandbox/run.sh`.

## Checks after

Never style: length, tone and word choice belong to the designer.
- Facts: a claims table maps every factual line to its input line. A line found only in `PLAN.md` is not a source.
- Must-not: no line in `COPY.md` makes a claim from the "Claims we must not make" list, in its words or in other words. A line that does is rewritten or becomes a slot. No override lifts this (CORE section 8 item 10).
- Approved tagline, names, nav and button labels unchanged, word for word.
- No success text ("Sent", "You're on the list") for a form with no real endpoint.
- No invented link targets: each button names its real target or a slot.
- Each slot is marked **show** or **leave out**, never both.
- Alt text for a missing photo is a clean slot.
- When `PLAN.md` asks for a labelled sample and the inputs allow a generic one, it is written in full and marked Sample.
- Every `PLAN.md` line kept, unless an input forbids it; a doubtful closing line is held as a slot.
- Interface text exists: page title, accessible names, skip link, labels, errors (what went wrong, how to fix), empty and loading states, language switch.

## Override

As in `RULES.md`. The client may take the runner-up headline or their own words; log it.

## Out

`copy/COPY.md`: voice profile, page copy (every string labelled), interface text, claims and sources, slots, assumptions. `picks/frontend/05-PICK.md`.

## Stop point

Stop. The client approves the copy. Wording they have not approved stays a slot.
