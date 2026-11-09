# Stage 2 - Unit economics, per region

Both tracks. **Runs after stage 3, and after stage 4 on the AI track.** If `business/COSTS.md` is missing (or `AI-COSTS.md` on the AI track), stop and say so; never work out margin or break-even without them. Web: up to 10 collector calls. Paths are from the `kinso-business/` folder. How the brain works: `BRAIN.md`.

## Runs

Each skill is followed as its own `SKILL.md` says, read in place.

1. `skills/startup-metrics-framework/SKILL.md` - formulas for CAC, LTV, payback, margin; metrics by stage; marketplace and consumer sections when they fit.
2. `skills/startup-design/SKILL.md` - Phase 7 only: stage A or B label, ±30% sensitivity, break-even, 3 scenarios, top-5 assumptions each 50% worse. `references/industry-benchmarks.md` as a sanity band only. `references/research-wave-4-distribution.md` for channel CAC searches.
3. `skills/cash-flow-snapshot/SKILL.md` - on a CSV of projected rows. Never assume an opening balance.
4. `skills/charlie-cfo/SKILL.md` - bootstrap view: payback the founder's cash can carry.
5. Marketplace cases only, ideas read in place: `../vendor/refoundai_lenny-skills@13598cc/skills/marketplace-liquidity-take-rates/` and `.../marketplace-fundamentals/`. Never copied.

**Skip:** ledger connectors in cash-flow-snapshot (paid; use the CSV path); any benchmark table as a source.

## In

- Job folder: `START.md`, `VERDICT.md`, `market/DISTRIBUTION.md`, `market/REGION.md`, `business/PRICING.md`, `business/COSTS.md`, `business/AI-COSTS.md` (AI track), `OVERRIDES.md`.
- Numbers ledger: read `business/NUMBERS.md` first. Use its rows as they stand, add each new key number, and log every change (old value, new value, reason). Rules: `BRAIN.md`, "Numbers ledger". Fixed cost per month, variable cost per unit and fees come only from rows set by stage 3 (and 4).
- Shared rules (`../RULES-RESEARCH.md`): facts only; dated official sources; free only; never a `-contributor` model; collector with `--out <job>/raw.jsonl` and `--lang <search language from START.md>` on every search, at its 30-second pace; user override (CORE section 8).
- Numbers inside skill files are not sources (`STUDY.md` finding 2). SS benchmarks, WS ratios and charlie-cfo benchmarks are tagged "benchmark, unsourced, from <file>".

## Deal and pick

Deal **3 channel mixes** to win customers, each run as P10, P50 and P90:
- **Small** - cheapest organic channel from `market/DISTRIBUTION.md`.
- **Ideal** - the best-ranked channel on the evidence, often one paid channel with a regional CAC source.
- **Sideways** - seeded draw from partner, marketplace listing, sales-led or referral, excluding the 2 channels above.

Marketplace only: also deal 3 take rates (platform base, marketplace base, competition-adjusted).

Rubric, 0-3 per row, max 15: payback in the chosen region (P50); LTV:CAC (3+ at P50, above 1 at P10, or the founder's own bar from `START.md`); source quality (regional, dated CAC); fragility (no single 50% miss kills it); fit to stage.

Write `<job>/picks/business/02-PICK.md`.

## Guards

- Never invent ad costs, conversion rates or churn. Unknown = [Guess] with the reason, or "Not found".
- A US SaaS norm is never used as the region's number.
- Never re-derive a cost that stage 3 or 4 set. If a cost looks wrong, change the ledger row with a Changes row and say why.
- Not financial advice.

## Checks after

- Every number is tagged: [Source], [Stage], [Start], [Calc] or [Guess], and every key number matches `NUMBERS.md` (value, unit, tag).
- One break-even, written once in `NUMBERS.md`, naming the ledger rows it uses. A variant (with one-off costs, with the 20% buffer) is its own named row, never a second number under the same name.
- Every break-even in the ±30% table, the 3 scenarios and the top-5 "50% worse" table is its own variant row (`breakeven-price-m30`, `breakeven-price-p30`, `breakeven-a3-price-half`, ...), quoted with its ID (`BRAIN.md` ledger rule 6). Check: grep "reak-even" in `UNIT-ECONOMICS.md` and `02-PICK.md`; every number on a hit line carries an `N:breakeven...` ID.
- Closed clashes: if this run closes a clash named in the note under the Changes table, cut it from the note and cut every line in `business/` files and `PICK.md` files that describes it (`BRAIN.md` ledger rule 5). Check: grep -i "clash" in `business/*.md` and `picks/business/*.md` except `NUMBERS.md`: 0 hits about a clash between stages or ledger rows (a skill-rule clash, CORE section 3 step 7, may stay in `PICK.md` "Clashes").
- CAC, LTV, margin, payback and break-even rows are added to `NUMBERS.md` with "Set by" 2.
- The brain re-computes LTV, CAC, payback and margin from the inputs.
- Stage label A (assumptions) or B (evidence) at the top.
- Says plainly whether the numbers work **in the region chosen**.
- Every money figure has a currency, a unit and a period.
- Flags section at the end.

## Override

As in `../RULES-RESEARCH.md` section 7. A founder's CAC or churn is used tagged "user override", with a row in `OVERRIDES.md`.

## Out

`business/UNIT-ECONOMICS.md`: CAC per channel, LTV, margin, payback, the 3 scenarios, the top-5 assumption table, and for a marketplace the cut and the counts on each side. Fixes in `PROCESS.md`.

## Stop point

None. Go on to stage 5.
