# Stage 6 - Gate

Draft from the stage 6 test (`tests/stage6/RESULTS.md`). Approved 2026-10-26 (V7).

Sources: emotix `validate-idea` (MIT, emotixco) for the verdict and the change; startup-skill `verification-agent` (MIT, ferdinandobons) for the fresh review. Rewritten in our own words.

Read `../../RULES-RESEARCH.md` first. This file adds only the rules for this stage.

## Rules

- No web. Use `START.md`, `idea/`, `evidence/` and `review/STRESS.md`.
- One verdict: **go**, **change** or **drop**. A total score never decides it; the reasons do.
- **Go** = the problem, the buyer and the way of charging hold up on the evidence (several checked signals at ladder 4 to 6 from different people, and no rival or free tool already does the job for this buyer). A smaller first version and a pre-sale test are part of a go, not a change. Open risks that the next test can check do not turn a go into a change.
- **Change** = the buyer, the problem, the region or the way of charging must change. Cutting features from the first version is not a change.
- How to read the go test:
  - **Counts** use only rows with quote_checked = yes. Show the sum. With no person IDs, count different links and accounts. "Several" means 5 or more.
  - **The way of charging holds** if spend on the job today is above the price and no checked signal says the price or the unit is wrong. An untested price is an open risk for the next test (try two price arms in one pre-sale), not a reason to change.
  - **A free tool that takes hours and often fails** is a workaround, not a rival that does the job.
  - A go **may carry a condition**, but only as the test in step 5, never as a re-check of the inputs.
  - A gatekeeper check (an insurer, a platform, a regulator) passes only on written acceptance. "Will review" is not acceptance.
  - Factor words read one way: "strong" is always good for the idea (write "rival gap: strong", not "rival strength: none").
- **Before any drop, try the narrowest version that still works** (one buyer, one place, one use). Say what it is and why it fails too. Only then drop.
- A **change** is concrete: who, what, where; it cuts the build; it fits the deadline, budget and skills in `START.md`; and it says why it is stronger than the original.
- A **drop** says what would have to be true to come back, including a rival weakness that would reopen it.
- Tag each claim: data (with its evidence line), assumption or opinion. Builders are not buyers. One row is "better bet, not proven".
- Never put the user's private details into a test (client codes, not client names).

## Steps

1. List the few deciding factors (demand, willingness to pay, rival strength, reach to first users, fit with the founder), each with the evidence it rests on and a word (strong, some, none). No composite score.
2. Try the narrowest version that still works.
3. Verdict, with a one-line reason.
4. Change detail or drop detail.
5. **The cheapest next test** of the riskiest assumption (often: does the payer pay?):
   - step 0: read the closest rival's product page;
   - what to do, how long, what it costs;
   - pass, fail and inconclusive numbers set in advance, plus what to do if inconclusive;
   - the pass signal is a pre-commitment or a payment, never "I would use it";
   - where possible, run it offline on past data or by hand (a concierge version) before any build.
6. Fit with the founder's context.
7. Confidence (high, medium, low) and the evidence gap behind it.
8. **Fresh review:** a separate reviewer reads `GATE.md` against the inputs, checks every quote and number, and lists problems; fix them and log the changes in `review/GATE-REVIEW.md`.

## Output

`GATE.md`: 1 Verdict, 2 Deciding factors, 3 Narrowest version, 4 Change or drop detail, 5 Cheapest next test, 6 Fit, 7 Confidence.
`review/GATE-REVIEW.md`: what the reviewer checked and changed.

Stop point: show the verdict to the user. Part B starts only after "go" (or an approved change that passes its test) and the user's OK.
