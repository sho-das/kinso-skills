# Stage 8 - Region and why now

Draft from the stage 8 test (`tests/stage8/RESULTS.md`). Approved 2026-10-26 (V7). Part B: runs only after a "go" at the gate and your OK.

Sources: ECC `market-research` (MIT, affaan-m) as the core. Rewritten in our own words.

Read `../../RULES-RESEARCH.md` first. This file adds only the rules for this stage.

## Rules

- Web only through the collector; about 12 calls. Search in the local language too when the region has one.
- **Rules of the sector:** facts only, from an official page (government or regulator), read with `fetch` and quoted with the exact line and date. If the official page is blocked or shows only a title, write the rule as "unread". A rule number from an unofficial source is written "do not use until checked". Never use another state's or country's rule. No risk call here; that is kinso-business.
- Mark law-firm, blog and vendor sources as unofficial or vendor claims.
- Every event has a date and a link. Undated results never count as recent. Check whether a growth number is old.
- New launches show supply, not demand. Many posts from one challenge or one company are one source.
- A statistic whose quote check fails is dropped, and the drop is noted.

## Steps

1. **Local rivals and habits:** the biggest incumbent and the free directories **by name** (for example Strava's Events tab, Devpost, MLH, Swiggy, Zomato), local players, and do-it-yourself ways (spreadsheet, calendar, WhatsApp) in the same pass. Local threads with `reddit --sub <city or country>`.
2. **Rules of the sector here:** official pages only, as above.
3. **Rising or falling:** dated news, posts and search evidence.
4. **What changed in the last 12 months:** search "<rival> shut down", "<rival> price per <unit>", new laws, platform changes, shortages; each dated and linked.
5. **Gaps:** what was not read and why.

## Output

`market/REGION.md`: 1 Local rivals and habits, 2 Rules of the sector here, 3 Rising or falling, 4 What changed recently, 5 Gaps.
