# Stage 3 - Demand and willingness to pay

Draft from the stage 3 test (`tests/stage3/RESULTS.md`) and the collector test (`tests/stepT/RESULTS.md`). Approved 2026-10-26 (V7).

Sources: startup-skill `startup-design` research principles, customer research wave, synthesis, verification agent and honesty protocol (MIT, ferdinandobons) as the core; last30days runbook (MIT, mvanhorn) for recency and per-source reporting. Rewritten in our own words.

Added 2026-10-26 from the coverage check (`coverage/03-COVERAGE.md`).

Read `../../RULES-RESEARCH.md` first. This file adds only the rules for this stage.

## Rules

- Web only through the collector (`tools/collect/`), following its "which source for which job" table. About 15 to 25 calls.
- **Honest counts.** Vendor pages, listicles, press releases and sponsor announcements are level 1 or not a signal, never level 5. A person building their own tool is a builder, not a buyer. A "loose" level is marked loose and counted apart.
- **Region check.** A post from outside the region is not counted for the region.
- **Quote check** before a signal is "verified"; a failed check drops the quote; review sites and blocked pages stay "snippet only".
- **Strong needs two kinds of source** (for example Reddit and a review site) and at least 2 separate threads that are not copies. A pain seen in one place is "single-source" and cannot be "strong". When sources disagree, say which one you trust and why.
- **Different problem, different row.** If people describe a problem other than the one in the frame, record it as its own pain. It does not support the frame. Say so in Gaps.
- **Specific beats general.** A short dated story with a cost in time or money ("last Tuesday I spent 3 hours fixing this by hand") ranks higher inside its level than "it is annoying". Write the cost in the row. General complaints stay at level 1 or 2.
- **"What do you use for X?"** A thread where several different people answer is one signal at level 3. Write the number of independent repliers. Promotion-like accounts do not count.
- **Founder-reported evidence** is tagged "founder-reported, not checked". It may shape the next search; it never raises the ladder count.
- **Engagement is a hint, not a count.** Upvotes, likes and replies are never a count of people and never proof of demand.
- **Before "none found",** try 3 different wordings and list them. In each gap, say what would fill it (a named source or a test).
- **Window.** Aim for 20 or more relevant signals in the window. If there are fewer, extend to 90 days: older signals are marked "older" and counted apart. Then say "weak" or "none found" if that is the truth.

## Steps

1. Search with the frame's search words, written the way people post ("my invoice chasing is a mess", not "how to chase invoices"), on the sources the table names for this job (Reddit and LinkedIn for pain; Trustpilot and G2 for people paying a rival; Hacker News for tech ideas; jobs only when the idea replaces paid staff). For a marketplace, search both sides. Search for evidence **against** too ("is free", "don't need", "stopped using"). For willingness to pay, also try "worth paying for", "how much do you pay for", "my budget for" and "alternative to <paid tool>"; a person naming a price they pay is level 5. Narrow one-word topics before searching. Drop numbers or ages that clash with other topics. Keep dates and the word "recent" out of the search text; filter by date after. For a non-English market, search in that language too and say what English sources may have missed. For jobs, write what the posts show ("6 open roles mention invoice follow-up"), not what a company will do.
2. Look for the users' own places (club pages, forums, community posts), not vendor blogs.
3. Record each signal: short exact quote, link, date, source, role, side, ladder level, quote checked, in window, engagement (upvotes, likes, replies). Read the top comments of a thread, not only the post.
4. Separate pains: count each problem in the frame on its own ("consent pain found" is not "follow-up pain found").
5. Recount before you finish. Every number in `SIGNALS.md` must match `signals.csv`; a number in two files must be the same number; each "strong" must point to rows that support it.
6. Name what people use today, including free tiers and built-in features (the price floor), and record "it's always free" as evidence against paying.

## Output

- `evidence/signals.csv`.
- `evidence/SIGNALS.md`: 1 Demand strength (strong, medium, weak or none found, one line why), 2 Counts (by ladder, source, side, window; loose and older apart), 3 Best evidence (5 to 8, level 4 to 6 first), 4 Evidence against, 5 What people use today, 6 Words users use (exact words for the problem, the result they want and what frustrates them; feeds the next search), 7 Gaps (failed or throttled sources, checks not done), then one Method line: searches run, sources used, calls used out of the budget, windows used.
