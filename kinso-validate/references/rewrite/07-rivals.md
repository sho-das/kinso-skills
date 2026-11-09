# Stage 7 - Rivals and products in depth

Draft from the stage 7 test (`tests/stage7/RESULTS.md`). Approved 2026-10-26 (V7). Runs only after a "go" at the gate and your OK.

Sources: startup-skill `startup-competitors` (MIT, ferdinandobons) wave 1 (profiles and pricing) and wave 2 (sentiment) as the core; ECC `competitive-platform-analysis` (MIT, affaan-m) for the feature-table axes. Rewritten in our own words.
Added 2026-10-26 from the coverage check (`coverage/07-COVERAGE.md`).

Read `../../RULES-RESEARCH.md` first. This file adds only the rules for this stage.

## Rules

- Web only through the collector; about 20 calls, plus up to 8 `reddit` searches. Public pages only; never create accounts, never sign up for trials.
- Start from `evidence/RIVALS-QUICK.md`, then **search beyond it** for new names (direct, adjacent, do-it-yourself, big platforms' built-in features).
- **Read the pricing page** with `fetch --out` (not the home page). Quote the exact line and the date. No pricing page: "not public".
- **Search dead attempts by name** (for example "Zomato Everyday shut down"). Generic "failed startups" searches return noise.
- **User voice:** `reddit` for the problem and for big rivals; review sites (`--site g2`, `capterra`, `trustpilot`) for small rivals. Every quote checked with `quote-check`. A Reddit remark is not a review; a request shows demand, not willingness to pay; warn about promotion-like accounts.
- **Show proportion.** For each main rival, give the review count and average rating on each site, with the date. A few angry posts do not outweigh 500 reviews at 4.5. If a rival has very few reviews, write "only N reviews found". That is a finding, not a failure.
- Keep vendor claims, builder posts and user voice apart. Flag same-name products.
- In the feature table, an empty cell is "not checked", never "no". "Not found on the page" is weaker than "does not have it".
- Ideas only from rivals: never copy code, text or design.
- **Be fair to rivals.** Do not cheer for our idea. For each main rival, say where it is truly strong.
- **Look for the opposite.** When the evidence agrees with what the user hoped about a rival, run one more search for the opposite before you write it.
- **Old facts.** A fact about a rival that is older than 12 months is marked "old".
- Do not say what a rival "will" build. Do not guess a rival's revenue without showing the sum [Calc].
- Do not design our price here. That is kinso-business.

## Steps

1. Pick the buyer's 6 to 10 points from `idea/IDEA.md` (ECC axes: who pays, how specialised, size, engagement, market).
2. Profile each main rival (at least 5): how it works (sign-up flow, main features, who it serves), price from its page, alive with a dated page.
   - Tag each one direct, adjacent or substitute.
   - Give team size or funding stage, with a link and a date.
   - Give the last few dated changelog, news or product lines from the past 6 months.
   - If the careers page is public, say what it shows ("6 roles mention X").
3. Test each claimed edge of our idea against each rival's page, one by one.
4. User love and hate per rival, quoted and checked, or "not found (searched: ...)".
   - Add the review count and rating per site, with the date (see Rules).
   - Make a small pain table: pain by rival, the count of checked quotes, and a severity word (annoyance, blocker, deal-breaker). A pain found at two or more rivals is a gap in the whole market, so mark it.
   - List the features users ask for most.
5. Switching. Search "switched from <rival>", "alternative to <rival>" and "why I left <rival>".
   - For each story found, record from, to, why, and what was lost. A person leaving a paid rival is level 6 on the ladder.
   - For each main rival, add one line on switching cost: can users export their data, is there a contract, how long to learn.
   - For manual and do-it-yourself ways, say why people choose them and what makes them stop.
6. Dead or failed attempts, by name, with the reason and a link.
7. Price table for the main rivals: what they charge for (per seat, per use, flat), free tier, entry price, top price, annual discount, the date, and the page. Add the price range and the middle price. Note price points that nobody uses.
8. Market structure and moat:
   - How many rivals were found and how many were profiled.
   - Is the market one big player, a few, or many small ones?
   - Who has a moat (network effect, lock-in, data, brand, scale)?
   - Which big platform could add this as a feature, and what sign did you see (roadmap, beta, hiring), or "no sign found"?
   - If you use funded-rival count bands to call a market crowded, mark the bands [Opinion].
   - "No rivals found" does not mean an open market.
9. Feature table, better, same or worse, features worth adopting. Add a short list of features where every rival is weak or "not found on the page", labelled as weaker than "does not have it".
10. Connect the findings before the decision. Each link needs evidence from at least two kinds of source.
    - A repeated complaint plus a high price or lock-in is a possible opening.
    - A rival hiring or shipping in our area is a threat.
    - A big team plus funding means do not compete on features.
11. Reason to switch (one line, or "none"). Test it against six types: timing, narrower focus, easier to use, price, easier to get, better technology. Each type claimed needs evidence from a rival page or a checked review. Otherwise write "none".
12. Copy risk, and the decision: narrow, borrow, partner or drop, with the condition that would change it and a next test with a number. In each decision line, say how sure you are and why: the number of independent sources and how old they are. For each main rival, add one line: "This rival is the better choice for ...".
13. Cross-file check before finishing:
    - Every rival in `FEATURES.md` has a profile in `RIVALS.md`.
    - The same rival shows the same price, rating and threat level in both files.
    - Every feature cell has a link or says "not checked".

## Output

`market/RIVALS.md`: 1 Rivals (with threat level, price table, switching, pain table, market structure and moat), 2 Dead or failed attempts, 3 Reason to switch, 4 Copy risk, 5 Decision, 6 Gaps.
`market/FEATURES.md`: 1 Feature table, 2 Better, same or worse, 3 Features worth adopting (with the gap list).

Gaps (RIVALS.md section 6): list what could not be found or checked. For each gap, say why it matters for the decision and what would fill it (a named source or a test). Include blocked pages, rivals with no reviews, and rivals with no public price.
