# Stage 2 - Frame

Draft from the stage 2 test (`tests/stage2/RESULTS.md`). Approved 2026-10-26 (V7).

Sources: startup-skill `startup-design` intake questions, frameworks and honesty protocol (MIT, ferdinandobons) as the core; Addy Osmani `idea-refine` (MIT); emotix `validate-idea` (MIT). Rewritten in our own words.

Added 2026-10-26 from the coverage check (`coverage/02-COVERAGE.md`).

Read `../../RULES-RESEARCH.md` first. This file adds only the rules for this stage.

## Rules

- No research and no verdict in this stage. Every price, size, rule or rival is a guess until stage 3 or 4; tag it "Guess, not tested".
- **Inputs that disagree** (the brainstorm, the pick, the founder's words) are flagged as a question for the founder; never pick one silently.
- No filler: an assumption that would not change a decision is left out.
- The one-line idea promises nothing that is not decided (no "offline", "AI", "for everyone" unless the founder said so).
- **Challenge claims that cannot be checked.** For "everyone needs it", "there is no competition" or "small businesses", ask for the narrow form: which people, what they do today, what the evidence is. Put the first unsupported claim under "Input conflicts".
- **Founder-reported items are tagged** ("as reported"). Customer talks count only as a number and what was said; a compliment is not a signal.
- Date each file and tag it "Guess, not tested". On a pivot, keep the old file as `IDEA.pre-pivot.md`, note what changed, and re-run only the stages that changed.

## Steps

1. **One line:** who, what problem, what we offer.
2. **Ask the founder, only what is not yet answered** (short answers, no scoring): what triggered the idea and what exists already; background, time and budget; first geography and why now; constraints (platform, language, budget; rules are "check with an official source"); what was tried before and why it did not stick; their biggest worry. Hard questions: "What would make you drop this idea?" and "What is the strongest argument against it?" (write the answers as the first two lines of `ASSUMPTIONS.md`, tagged "founder's words"; if none, write "no kill condition given" and ask once); "Why are you the right person to build this?" (record as "founder fit, as reported"); "Have you talked to real people about this? How many? What did they say? Did anyone offer money or time?" (record the count, or "none"); "If a large, funded player launched this next month, what would you do?" (record as the assumption "an incumbent could add this"; stages 4 and 7 test it); "It is 12 months later and this failed. What are the 3 most likely reasons?" (use it to check the list is complete; also record what we choose to ignore for now, and why that is fine).
3. **Type:** pain, want, marketplace or business tool. For a marketplace, both sides and the **harder side** to win.
4. **Who pays and who only uses it.** The likely payer, how (subscription, per use, fee, cut), and what they use or pay for today instead (name it as a guess; stage 4 checks it). Name the first, narrowest users (the few who feel the pain most) apart from the wider group.
5. **What it is not:** 2 to 4 things left out on purpose.
6. **Search words:** 6 to 10 phrases the way the user would type them, not product words.
7. **Assumptions, riskiest first** (how bad if wrong x how little we know). Put the payment assumption first when the model depends on it. For each: why it is risky, what would prove it **false**, the cheapest check, and the **pass or fail number set before the check**. Ask what causes the problem before assuming the fix. Prefer checks on past data (old records, past events) and manual tests with a comparison. Test types to pick from: past data check, a hand-made manual version, a fake sign-up page, a paid pre-order, a deposit, an intro to one named buyer. Each names pass, fail and inconclusive numbers in advance and tests money or time given, not "I would use it". Limit: about two weeks of work and a small cash cap the founder sets.
   - **Cover the five fatal questions** as assumptions, each "Guess, not tested" with the check that would settle it: who pays and will pay now; why nobody solved it (what changed); how the first users are reached; whether this is a product or a feature a big player adds; whether the founder can build or run it.
   - **Cover every kind of risk:** market (demand, timing), product (can we build it), business (can we earn and grow), team (skills we lack), money (cost to reach one customer, runway). If a kind has none, write "none, because ..."; no filler.
   - **Status column:** untested, testing, supported, broken. Later stages update it; stage 6 reads it.

## Output

- `idea/IDEA.md`: 1 One line, 2 Type, 3 Who pays, 4 What it is not, 5 Search words, 6 Input conflicts (if any).
- `idea/ASSUMPTIONS.md`: ranked, top 3 marked, with a status column.
- `idea/QUESTIONS.md`, only when stage 1 was skipped (the Validate way in): write it as in `01-brainstorm.md` step 9, aimed at the top 3 assumptions.

- Both files end with flags. Red: something that could end the idea (for example "no one named who pays"). Yellow: needs a look (for example "founder has no direct contact with users"). If none, "No flags identified".

**Stop for the founder's OK** on the frame before stage 3.
