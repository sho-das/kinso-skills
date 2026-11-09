# Stage 3 - Cost to build and run the business

Both tracks. **Runs right after stage 1, before stage 2.** Web: up to 15 collector calls. Paths are from the `kinso-business/` folder. How the brain works: `BRAIN.md`.

## Runs

Each skill is followed as its own `SKILL.md` says, read in place.

1. `skills/product-lens/SKILL.md` - modes 1 and 4 only: the 7 questions, the anti-goal, ICE scoring. Modes 2 and 3 read a repo; skip them.
2. `skills/startup-financial-modeling/SKILL.md` - 4 cost buckets, fixed vs variable, runway and funding need, the 20% buffer, the sanity checklist.
3. `skills/team-composition-analysis/SKILL.md` - team shape, full-time vs contractor, fully loaded cost, hiring lag.
4. `skills/vendor-review/SKILL.md` (reads `skills/kw-shared/`) - each paid tool against a free one: year 1 and 3-year cost, exit cost, lock-in.
5. `skills/charlie-cfo/SKILL.md` - burn and hiring return for a bootstrapped founder.

**Skip:** venture-only tables in team-composition (seed and Series A shapes) unless the founder will raise; any connector step in vendor-review.

## In

- Job folder: `START.md` (founders, skills, time, budget, platforms), `VERDICT.md`, `market/`, `business/PRICING.md`, `OVERRIDES.md`.
- Numbers ledger: read `business/NUMBERS.md` first. Use its rows as they stand, add each new key number, and log every change (old value, new value, reason). Rules: `BRAIN.md`, "Numbers ledger".
- Shared rules (`../RULES-RESEARCH.md`): facts only; dated official sources; free only; never a `-contributor` model; collector with `--out <job>/raw.jsonl` and `--lang <search language from START.md>` on every search, at its 30-second pace; user override (CORE section 8).
- Numbers inside skill files are not sources (`STUDY.md` finding 2). WS salaries are "US, 2024", unsourced.
- Official price pages: AWS, Google Cloud, Azure, and each tool's own pricing page. Salaries: US BLS, UK ONS, Eurostat, Stack Overflow Developer Survey, or the region's own statistics office.

## Deal and pick

Deal **3 build-and-team plans**:
- **Small** - founders only, free stack: each paid tool swapped for a free one where possible.
- **Ideal** - founders plus contractors for the skill gap named in `START.md`.
- **Sideways** - seeded draw from: buy or white-label the hard part, a no-code first build, or a part-time hire, excluding the 2 plans above.

**Platforms** (start question 6 in `START.md`): cost each plan for every platform the founder named. Per platform: build effort (one cross-platform app such as Flutter or React Native, or one native app per platform), store fees (Google Play, Apple Developer Program) from the official page with the date read, and running cost of the shared backend at 100 and at 1,000 users. For each free host (for example Supabase, Cloudflare, Fly.io, Render, Vercel, Google Cloud), write its free tier limit from the official page with the date, and mark AWS and Azure "free tier ends". No platform answer = cost web only and flag it. kinso-build stage 1 reads these numbers and only confirms the platforms.

Rubric, 0-3 per row, max 15: months of runway on the founder's budget (12+ at P50); skill fit; cost evidence (official, dated); lock-in (exit cost); effort realism (hiring lag and the 20% buffer).

Write `<job>/picks/business/03-PICK.md`.

## Guards

- Never invent a salary, a contractor rate or a cloud price. No regional source = "Not found" or [Guess] with the reason.
- Never use another country's salary for this region.
- No paid tool is recommended without its free alternative and the saving.
- Never work out break-even, CAC or payback here. They belong to stage 2. Write the inputs stage 2 needs instead: fixed cost per month, variable cost per unit, one-off costs, fees.
- Not financial advice.

## Checks after

- Every number is tagged: [Source], [Stage], [Start], [Calc] or [Guess].
- `NUMBERS.md` has a row for each: fixed cost per month, variable cost per unit, each fee, each one-off cost, monthly burn, runway, team hours and rate. A stage 1 [Guess] cost is replaced with a Changes row.
- The brain re-adds every total: monthly burn, runway, year 1 cost.
- Cloud prices from the official page, with the date read.
- Salaries from a regional public source, with the year.
- Every platform in `START.md` has its build effort, store fee and running cost, or "Not found".
- `NUMBERS.md` has the row `cash-after-build` (budget less one-offs with buffer), set by stage 3 (`BRAIN.md` rule 4).
- Pointers into other files carry an anchor and pass `tools/check-pointers.py` (`BRAIN.md`, "Pointers into another file").
- Flags section at the end.

## Override

As in `../RULES-RESEARCH.md` section 7. A founder's own rate or tool choice is tagged "user override", with a row in `OVERRIDES.md`.

## Out

`business/COSTS.md`: the platforms and the cost of each (build effort, store fees, running cost at 100 and 1,000 users, free tier limits per host with the date), build effort and hard parts, cloud and tools at the expected users, paid tool vs free alternative and the saving, team cost, monthly burn, how long the budget lasts. Fixes in `PROCESS.md`.

## Stop point

None. AI track goes to stage 4; regular track goes to stage 2.
