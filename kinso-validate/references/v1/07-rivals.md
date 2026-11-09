# Stage 7 - Rivals and products in depth

Draft from the stage 7 test (`tests/stage7/RESULTS.md`). Approved 2026-10-26 (V7). Runs only after a "go" at the gate and your OK.

Sources: startup-skill `startup-competitors` (MIT, ferdinandobons) wave 1 (profiles and pricing) and wave 2 (sentiment) as the core; ECC `competitive-platform-analysis` (MIT, affaan-m) for the feature-table axes. Rewritten in our own words.

Read `../../RULES-RESEARCH.md` first. This file adds only the rules for this stage.

## Rules

- Web only through the collector; about 20 calls, plus up to 8 `reddit` searches. Public pages only; never create accounts, never sign up for trials.
- Start from `evidence/RIVALS-QUICK.md`, then **search beyond it** for new names (direct, adjacent, do-it-yourself, big platforms' built-in features).
- **Read the pricing page** with `fetch --out` (not the home page). Quote the exact line and the date. No pricing page: "not public".
- **Search dead attempts by name** (for example "Zomato Everyday shut down"). Generic "failed startups" searches return noise.
- **User voice:** `reddit` for the problem and for big rivals; review sites (`--site g2`, `capterra`, `trustpilot`) for small rivals. Every quote checked with `quote-check`. A Reddit remark is not a review; a request shows demand, not willingness to pay; warn about promotion-like accounts.
- Keep vendor claims, builder posts and user voice apart. Flag same-name products.
- In the feature table, an empty cell is "not checked", never "no". "Not found on the page" is weaker than "does not have it".
- Ideas only from rivals: never copy code, text or design.

## Steps

1. Pick the buyer's 6 to 10 points from `idea/IDEA.md` (ECC axes: who pays, how specialised, size, engagement, market).
2. Profile each main rival (at least 5): how it works (sign-up flow, main features, who it serves), price from its page, alive with a dated page.
3. Test each claimed edge of our idea against each rival's page, one by one.
4. User love and hate per rival, quoted and checked, or "not found (searched: ...)".
5. Dead or failed attempts, by name, with the reason and a link.
6. Feature table, better, same or worse, features worth adopting.
7. Reason to switch (one line, or "none"), copy risk, and the decision: narrow, borrow, partner or drop, with the condition that would change it and a next test with a number.

## Output

`market/RIVALS.md`: 1 Rivals, 2 Dead or failed attempts, 3 Reason to switch, 4 Copy risk, 5 Decision.
`market/FEATURES.md`: 1 Feature table, 2 Better, same or worse, 3 Features worth adopting.
