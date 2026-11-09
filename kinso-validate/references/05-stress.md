# Stage 5 - Stress test

Read `../RULES-RESEARCH.md` and `BRAIN.md` first. Paths are from `kinso-validate/`. Old rewrite: `references/rewrite/05-stress.md`.

## Runs

1. `skills/grilling/SKILL.md` (Matt Pocock, the stage winner): decision tree, frontier rounds, dependent questions wait, done when the frontier is empty.
2. `skills/claude-startup-validator/references/failure-patterns.md`: 10 modes with warning signs and de-risk lines; pre-mortem questions.
3. `skills/strategy-red-team/SKILL.md`: steelman then attack each load-bearing claim; rank by impact x likelihood x cheapness to test.
4. `skills/pre-mortem/SKILL.md`: Tigers, Paper Tigers, Elephants.
5. `skills/plan-ceo-review/SKILL.md` Step 0 only: premise challenge, reversibility, "not in scope".

Skip: grilling's fact-finding sub-agent on the web (no web here; a gap stays a gap). plan-ceo-review preamble, `bin/`, hooks, telemetry and Codex steps. The validator's pre-mortem pass count (it claimed scores the pack did not support).

## In

- `idea/`, `evidence/`, `START.md`.
- Shared rules: facts only, free only, never a `-contributor` model, privacy, user override. No web.

## Deal and pick

- Deal 3 skeptic roles, each from a different skill, each reading only the evidence pack:
  - A the buyer who holds the budget (red-team);
  - B the product lead at the biggest incumbent: could they add it as a feature? (plan-ceo-review premise challenge);
  - C the founder 12 months later, after failure (pre-mortem).
- Skeptics do not debate (the bull vs bear debate scored lowest).
- The full failure-card list is still checked; only the top 3 get the full story and a de-risk test.
- Rubric lines (0 to 3): tied to an evidence line; visible late; de-risk test with a number.
- Keep 3 to 5 points. Write `<job>/picks/validate/05-PICK.md`.

## Guards

- No new web research. No verdict (that is stage 6).
- "Case for" gets the same space as "case against".
- A mode that does not fit the idea (for example an AI accuracy trap for a lunch service) is marked "does not apply".

## Checks after

- Failure-pattern table: pattern, applies because, strength, early or late.
- Every point names its evidence line, or is tagged "known pattern" or "guess".
- Checked and not-checked quotes kept apart; founder lines marked.
- Free-option check by name.
- Narrowest version with 3 job titles, plus "Not in scope".
- Flip tests two-sided, with numbers and a reversibility score.
- "What the evidence does not show" block; open questions and assumptions block.
- Checks never rewrite a skeptic's voice.

## Override

As in `../RULES-RESEARCH.md` section 7.

## Out

- `review/STRESS.md`: 1 Question round, 2 Case for, 3 Case against, 4 Failure patterns, 5 Earlier attempts, 6 What the evidence does not show, 7 Narrowest version, 8 What would flip it, 9 Balance, 10 Open questions and assumptions used.
- `picks/validate/05-PICK.md`.
