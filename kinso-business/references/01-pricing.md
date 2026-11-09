# Stage 1 - Market and pricing research

Both tracks. Web: up to 20 collector calls. Paths are from the `kinso-business/` folder. How the brain works: `BRAIN.md`.

## Runs

Each skill is followed as its own `SKILL.md` says, read in place.

1. `skills/startup-competitors/SKILL.md` - pricing wave only: `references/research-wave-1-profiles-pricing.md` (rival tiers, pricing whitespace), `references/honesty-protocol.md`. Light depth (`references/research-scaling.md`). Skip rivals already in `market/RIVALS.md`.
2. `skills/pricing-strategy/SKILL.md` (emotix, reads `skills/shared/conventions.md`) - 6 models scored, 3 tiers, unit check per tier.
3. `skills/monetization-strategy/SKILL.md` - 3 to 5 revenue models with a test each.
4. `skills/competitive-landscape/SKILL.md` - price bands, positioning map, beachhead test for the region.
5. Lenny, ideas only, read in place: `../vendor/refoundai_lenny-skills@13598cc/skills/pricing-strategy/` (value metric, willingness-to-pay method picker, Van Westendorp). Never copied; name the post for each idea used.

**Skip:** any paid data step; SS multi-agent waves beyond Light; the emotix "reuse earlier prices" rule when the earlier price has no date.

## In

- Job folder from kinso-validate: `VERDICT.md`, `market/RIVALS.md`, `market/REGION.md`, `market/SIZE.md`, `START.md`, `OVERRIDES.md`.
- Numbers ledger: read `business/NUMBERS.md` first. Use its rows as they stand, add each new key number, and log every change (old value, new value, reason). Rules: `BRAIN.md`, "Numbers ledger". Stage 1 creates the file.
- Shared rules (`../RULES-RESEARCH.md`): facts only; dated official sources; free only; never a `-contributor` model; web only through `../tools/collect/collect.sh` with `--out <job>/raw.jsonl` and `--lang <search language from START.md>` on every search, at its 30-second pace; user override (CORE section 8).
- Numbers inside skill files are not sources (`STUDY.md` section 9, finding 2). Example: emotix "$29/$99" tiers.

## Deal and pick

Deal **3 pricing structures**:
- **Small** - market anchor: the most common value metric in the rival set, priced near the rival median.
- **Ideal** - gap play: aimed at the pricing whitespace or a buyer priced out.
- **Sideways** - seeded draw from the pooled models (usage credits, outcome-based, reverse trial, a cut, one-off fee), excluding the 2 models most rivals use.

Deal **3 start regions** the same way: Small = the founder's home region (`START.md`), Ideal = best beachhead on the evidence, Sideways = seeded draw (CORE section 5, seed `<job>-business-01-region`) from regions in `market/REGION.md` not used above.

Then pick **1 price-test method** for the winner (Lenny method picker; no Van Westendorp for a new-to-the-world product).

Rubric, 0-3 per row, max 18: value metric fit; rival evidence (3+ dated rival prices from own pages); gap evidence (tied to a complaint or a priced-out buyer); margin at each tier (stage 3 and 4 costs, or [Guess] until they exist); simplicity; testability this month.

Write `<job>/picks/business/01-PICK.md`.

## Guards

- Never invent a rival price. Hidden price = "Not found", with what was searched.
- Prices from the rival's own page, same country, with date. A snippet or blog price is "unchecked".
- Never work out break-even, CAC or payback here. They belong to stage 2: write "[Pending stage 2]". A cost used for the margin row is a [Guess] row in `NUMBERS.md`; stage 3 replaces it.
- Not financial advice.

## Checks after

- Every number is tagged: [Source] link and date, [Stage] file, [Start] founder input, [Calc] with the sum, or [Guess] with the reason.
- The brain re-does every sum (tier maths, medians).
- Region claims come from official pages or `market/REGION.md`.
- Anti-average: if the 3 structures share a model and sit within 20% on price, re-deal the sideways slot.
- Ends with Red flags and Yellow flags, or "No flags identified".

## Override

As in `../RULES-RESEARCH.md` section 7. Show the evidence once, ask to confirm, then use the founder's price or region, tagged "user override", with a row in `OVERRIDES.md`.

## Out

`business/PRICING.md`: who pays and how, rival prices tier by tier with dates, ideal ticket size, gaps, start region, tiers to offer, the price to test. Log fixes and clashes in `PROCESS.md`.

## Stop point

Yes. Show the 3 structures, the 3 regions, the score table and the pick. Wait for the founder's OK on market, tiers and test price. Next: stage 3 (the run order is 1, 3, 4, 2, 5, 6, 7, 8).
