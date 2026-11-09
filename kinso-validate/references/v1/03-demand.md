# Stage 3 - Demand and willingness to pay

Draft from the stage 3 test (`tests/stage3/RESULTS.md`) and the collector test (`tests/stepT/RESULTS.md`). Approved 2026-10-26 (V7).

Sources: startup-skill `startup-design` research principles, customer research wave, synthesis, verification agent and honesty protocol (MIT, ferdinandobons) as the core; last30days runbook (MIT, mvanhorn) for recency and per-source reporting. Rewritten in our own words.

Read `../../RULES-RESEARCH.md` first. This file adds only the rules for this stage.

## Rules

- Web only through the collector (`tools/collect/`), following its "which source for which job" table. About 15 to 25 calls.
- **Honest counts.** Vendor pages, listicles, press releases and sponsor announcements are level 1 or not a signal, never level 5. A person building their own tool is a builder, not a buyer. A "loose" level is marked loose and counted apart.
- **Region check.** A post from outside the region is not counted for the region.
- **Quote check** before a signal is "verified"; a failed check drops the quote; review sites and blocked pages stay "snippet only".
- **Window.** Aim for 20 or more relevant signals in the window. If there are fewer, extend to 90 days: older signals are marked "older" and counted apart. Then say "weak" or "none found" if that is the truth.

## Steps

1. Search with the frame's search words, the way users type them, on the sources the table names for this job (Reddit and LinkedIn for pain; Trustpilot and G2 for people paying a rival; Hacker News for tech ideas; jobs only when the idea replaces paid staff). For a marketplace, search both sides. Search for evidence **against** too ("is free", "don't need", "stopped using").
2. Look for the users' own places (club pages, forums, community posts), not vendor blogs.
3. Record each signal: short exact quote, link, date, source, role, side, ladder level, quote checked, in window.
4. Separate pains: count each problem in the frame on its own ("consent pain found" is not "follow-up pain found").
5. Name what people use today, including free tiers and built-in features (the price floor), and record "it's always free" as evidence against paying.

## Output

- `evidence/signals.csv`.
- `evidence/SIGNALS.md`: 1 Demand strength (strong, medium, weak or none found, one line why), 2 Counts (by ladder, source, side, window; loose and older apart), 3 Best evidence (5 to 8, level 4 to 6 first), 4 Evidence against, 5 What people use today, 6 Gaps (failed or throttled sources, checks not done).
