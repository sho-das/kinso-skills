# Stage 7 - Rivals and products in depth

Part B: runs only after "go" at the gate and the user's OK. Read `../RULES-RESEARCH.md` and `BRAIN.md` first. Paths are from `kinso-validate/`. Old rewrite: `references/rewrite/07-rivals.md`.

## Runs

1. `skills/startup-competitors/SKILL.md` (the stage winner), with its `references/`: wave 1 profiles and pricing, wave 2 sentiment mining, wave 3 GTM and strategic signals, battle cards, pricing landscape, switching-cost matrix.
2. `skills/competitive-platform-analysis/SKILL.md` (ECC): axes for the feature table.
3. `skills/claude-startup-validator/references/competitor-analysis-framework.md`: the 6 advantage types ("why this could still win").
4. Verification: `skills/startup-competitors/references/verification-agent.md`, run by a fresh agent.

Skip: full wave size (sequential lanes instead). Its user checkpoint after research (the stop point is after stage 11). Any price design for us (kinso-business).

## In

- `evidence/RIVALS-QUICK.md`, `evidence/SIGNALS.md`, `idea/IDEA.md`, `GATE.md`, `START.md`.
- Shared rules: facts only, dated sources, free only, never a `-contributor` model, collector at the 30-second pace with `--out <job>/raw.jsonl`, privacy, user override. About 20 calls plus 8 `reddit`.

## Deal and pick

- Seeded draw (CORE section 5) of 3 positioning angles from the 6 advantage types (timing, vertical, UX, price, distribution, technology). Test each against every main rival's page and checked reviews. Keep only angles with evidence; else "none".
- 3 lanes, one after another: A profiles and pricing (about 10), B sentiment (8 `reddit` plus review sites), C strategic signals (about 6: changelog, careers, funding).
- Rubric lines (0 to 3): each angle backed by two kinds of source; at least one "when they win" per main rival.
- Write `<job>/picks/validate/07-PICK.md`.

## Guards

- Public pages only; never create accounts or start trials.
- Ideas only; never copy code, text or design.
- Battle cards keep "when they win over you"; be fair to rivals.
- Never say what a rival "will" build.

## Checks after

- Prices dated, from the rival's own pricing page, with unit and period; else "not public" or "unchecked".
- Review count and rating per site, with the date; "only N reviews found" is a finding.
- Empty feature cells are "not checked", never "no".
- Dead attempts searched by name.
- Rival facts older than 12 months marked "old".
- No revenue guess without [Calc]. Hiring-pattern reading tagged [Opinion].
- Every quote passes `quote-check`.
- Cross-file: every rival in `FEATURES.md` is in `RIVALS.md`, with the same price, rating and threat level.
- **Fresh verification agent** runs the startup-competitors checks (battle cards vs report, matrix vs profiles, an opportunity needs two deliverables). Critical issues fixed before the stage ends.
- Checks never rewrite the skill's voice.

## Override

As in `../RULES-RESEARCH.md` section 7.

## Out

- `market/RIVALS.md`: 1 Rivals (threat level, price table, switching, pain table, market structure and moat, one battle card per main rival), 2 Dead or failed attempts, 3 Reason to switch, 4 Copy risk, 5 Decision, 6 Gaps.
- `market/FEATURES.md`: 1 Feature table, 2 Better, same or worse, 3 Features worth adopting.
- `picks/validate/07-PICK.md`.
