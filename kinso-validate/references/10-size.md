# Stage 10 - Market size

Part B: runs only after "go" at the gate and the user's OK. Read `../RULES-RESEARCH.md` and `BRAIN.md` first. Paths are from `kinso-validate/`. Old rewrite: `references/rewrite/10-size.md`.

## Runs

1. `skills/startup-design/references/research-wave-1-market.md` A1 sizing (tied winner): 4 rounds including the reality check; TAM with two figures; SAM derivation; SOM from comparables.
2. `skills/market-sizing-analysis/SKILL.md` (wshobson) with `references/details.md` and `examples/`: top-down, bottom-up, value theory, triangulation, model-specific notes.
3. `skills/market-research/SKILL.md` (ECC, tied winner): explicit assumption for every leap.
4. Verification: `skills/startup-design/references/verification-agent.md`, run by a fresh agent.

Skip: paid reports in `skills/market-sizing-analysis/references/data-sources.md` (free sources only). `skills/startup-design/references/industry-benchmarks.md` as data: no source or date per number, so use only as a "far outside normal?" flag, tagged "unsourced benchmark".

## In

- `evidence/`, `market/RIVALS.md`, `market/REGION.md`, `market/DISTRIBUTION.md`, `idea/IDEA.md`, `START.md` (region).
- Shared rules: facts only, dated sources, free only, never a `-contributor` model, collector at the 30-second pace with `--out <job>/raw.jsonl`, privacy, user override. About 10 calls.

## Deal and pick

- Run the 3 methods as 3 separate passes, each blind to the others: A bottom-up (count x price x frequency), B top-down (only with a dated regional source; else "none"), C value theory (cost of the problem x share removed x 10 to 30%).
- Deal 2 buyer splits (for example free clubs vs paid events). Keep the split whose segments have counted sources.
- The judge compares: over 30% apart, name the input; over 50%, drop the weaker method for the number.
- Rubric lines (0 to 3): share of inputs with a source; gap between methods; SOM within 2 to 5% of SAM unless a named comparable.
- Write `<job>/picks/validate/10-PICK.md`.

## Guards

- Never buy a report. Never use a global figure as our market.
- No helper scripts; sums by hand.

## Checks after

- Every input tagged [Data] with link, [Guess] or [Calc]; sums step by step with units, redone by hand.
- Counts from official or dated directory sources; report figures traced to the original publisher, else "origin unchecked".
- **TAM, SAM and SOM in the chosen region**, with **Low** and **High** as separate columns, no middle number. SOM <= SAM <= TAM. Left-out parts of the region named.
- Value check present for a new category.
- Guess check against a published figure; downside line; plain-words line.
- The guess that moves the result most, with the cheapest test.
- **Fresh verification agent** recounts every sum and source. Critical issues fixed before the stage ends.
- Checks never rewrite the skill's voice.

## Override

As in `../RULES-RESEARCH.md` section 7.

## Out

- `market/SIZE.md`: 1 Bottom-up, 2 Top-down, 3 The number we would use, 4 TAM, SAM and SOM, 5 Gaps.
- `picks/validate/10-PICK.md`.
