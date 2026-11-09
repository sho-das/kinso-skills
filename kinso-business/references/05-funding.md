# Stage 5 - Funding reality check

Both tracks. Web: up to 12 collector calls. Paths are from the `kinso-business/` folder. How the brain works: `BRAIN.md`.

## Runs

Each skill is followed as its own `SKILL.md` says, read in place.

1. `skills/fundraise-prep/SKILL.md` (reads `skills/shared/conventions.md`) - readiness on 6 dimensions, the gap, ready / 1-3 months / too early.
2. `skills/charlie-cfo/SKILL.md` - the bootstrap case: what the founders' own money buys.
3. `skills/market-research/SKILL.md` - investor diligence fields and the quality gate.
4. `skills/investor-materials/SKILL.md` - one source of truth for numbers; bear, base, bull.
5. Ideas only, read in place: `../vendor/refoundai_lenny-skills@13598cc/skills/fundraising/` (bootstrap vs raise, VC-fit test, non-VC paths). Never copied; name the post or guest per idea.

**Skip:** PitchBook and paid Crunchbase steps in fundraise-prep (paid; logged as a clash); the 50-investor list and the 12-week raise plan unless the venture path wins.

## In

- Job folder: `START.md` (money, wish to raise, founders' experience, region), `VERDICT.md`, `business/COSTS.md` (burn), `business/UNIT-ECONOMICS.md`, `business/AI-COSTS.md` if present, `OVERRIDES.md`.
- Numbers ledger: read `business/NUMBERS.md` first. Use its rows as they stand, add each new key number, and log every change (old value, new value, reason). Rules: `BRAIN.md`, "Numbers ledger". Burn and runway come from the stage 3 rows; break-even from the stage 2 row.
- Shared rules (`../RULES-RESEARCH.md`): facts only; dated official sources; free only; never a `-contributor` model; collector with `--out <job>/raw.jsonl` and `--lang <search language from START.md>` on every search, at its 30-second pace; user override (CORE section 8).
- Numbers inside skill files are not sources (`STUDY.md` finding 2).
- Free funding sources only: company announcements, the press, US SEC EDGAR Form D, UK Companies House, the region's official register.

## Deal and pick

Deal **3 funding paths**:
- **Small** - bootstrap: what the founders' own money buys, month by month, from stage 3 burn.
- **Ideal** - the path that best fits the goal in `START.md` and the stage 2 economics (often angels, revenue-based finance, a grant or customer pre-pay).
- **Sideways** - seeded draw from the other paths (venture round, grant, revenue-based finance, pre-sales, sale), excluding the 2 above. A venture round is dealt only if the VC-fit test passes.

Rubric, 0-3 per row, max 18: fit to the founder's goal; rival rounds from free sources, dated; team realism (what teams like this raised in this region, with examples); runway to the next proof milestone plus 6 months; control and dilution in numbers; what the money must prove, tied to a stage 7 metric.

Write `<job>/picks/business/05-PICK.md`.

## Guards

- Never invent a raise, a valuation, a round size or an investor. "Not found" with what was searched.
- Never name a fund without a link.
- Bootstrap stays a full option; no bias toward raising.
- Not financial advice. The decision on money is the founder's.

## Checks after

- Every number is tagged: [Source], [Stage], [Start], [Calc] or [Guess].
- Each rival round has a date, an amount, a stage and a free source link.
- The brain re-computes runway and dilution; numbers match stages 2 and 3.
- Flags section at the end.

## Override

As in `../RULES-RESEARCH.md` section 7. A founder's choice to raise or not is tagged "user override", with a row in `OVERRIDES.md`.

## Out

`business/FUNDING.md`: bootstrap or raise, own money and how long it lasts, rival rounds with dates, what this team can realistically raise here, what the money must prove first. Fixes and clashes in `PROCESS.md`.

## Stop point

None. Go on to stage 6.
