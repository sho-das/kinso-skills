# Stage 10 - Market size

Draft from the stage 10 test (`tests/stage10/RESULTS.md`). Approved 2026-10-26 (V7). Part B: runs only after a "go" at the gate and your OK.

Sources: startup-skill `startup-design` wave 1 sizing and `industry-benchmarks` (MIT, ferdinandobons) and ECC `market-research` (MIT, affaan-m); they tied in the test. Rewritten in our own words.

Read `../../RULES-RESEARCH.md` first. This file adds only the rules for this stage.

## Rules

- Web only through the collector; about 10 calls.
- **Bottom-up first.** Top-down only with a named, dated source, and never a global industry figure used as our market.
- Tag every input **[Data]** (with link), **[Guess]** or **[Calc]**. Write the sums step by step, with the unit at each step. No helper scripts; the reader must be able to check by hand.
- Counts from official or dated directory sources, not blogs. Say when a count is an undercount. Two conflicting counts: show both and say which end each is used for.
- Prices: cap with free tiers and a rival's published price, from a page in the same country. A foreign price is "unchecked".
- Drop a high case that no source supports.

## Steps

1. **Split the buyers** before sizing (for example free clubs vs paid events, students vs company events, micro firms out).
2. **Bottom-up:** real buyers in the region x price x how often. Show full coverage first, then a realistic share, with the reason for the share.
3. **Supply check** if the idea has a supply side (for example meals per cook per day).
4. **Top-down:** only as above, or "none".
5. **The number we would use:** one range, with the weakest input named and a cheap test that would turn it into data.
6. **Gaps.**

## Output

`market/SIZE.md`: 1 Bottom-up, 2 Top-down, 3 The number we would use, 4 Gaps.
