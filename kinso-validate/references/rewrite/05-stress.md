# Stage 5 - Stress test

Draft from the stage 5 test (`tests/stage5/RESULTS.md`). Approved 2026-10-26 (V7).

Sources: Matt Pocock `grilling` (MIT) as the core, plus the failure-pattern table from `claude-startup-validator`. Rewritten in our own words.
Added 2026-10-26 from the coverage check (`coverage/05-COVERAGE.md`).

Read `../../RULES-RESEARCH.md` first. This file adds only the rules for this stage.

## Rules

- No new web research. Use only `idea/` and `evidence/`. A gap is written down as a gap, not filled.
- No verdict. Go, change or drop is stage 6.
- Every point names its line in the evidence (signal row, rival line, voice note). A point without one is marked "known pattern" or "guess".
- Say what each row proves, and no more. Spend on X is not demand for our X. A vendor's claim is positioning, not a user voice. A builder is not a buyer. One source is one case.
- Keep "checked" and "not checked" quotes apart. Founder-reported lines are marked as such.
- "We did not look" is not "it does not exist". A missing dead rival or feature becomes a search by name for later.

## Steps

1. **Question round.** Write the 3 to 6 questions that decide the idea (who pays, is the pain real, is the gap open, does a free option already do it). For each: the answer the evidence supports and a status ("answered", "open, one voice only", "open, no evidence"). Rules for the round:
   - Order the questions. If an answer depends on another open question, write it after that one and mark the dependency.
   - Name 3 buyer roles that show the problem in the evidence (for example 3 different links). Fewer than 3: the question is open, one voice only.
   - Do-nothing cost: what happens to this buyer if they do nothing, in a number or a quote. Say whether the idea fixes the pain itself or only a stand-in for it.
   - For ideas where software does the job: has the core task been shown to work? Say if the evidence shows a working example or only a claim.
2. **The case for.** The 3 to 5 strongest honest reasons, each tied to evidence.
3. **The case against.** The 3 to 5 strongest reasons it could fail, each tied to evidence or a known pattern.
4. **Failure patterns.** A table: pattern, applies here because, strength (high, medium, low), visible early or late. Check at least: no paying buyer, empty side of a marketplace, free substitute or built-in feature, habit that does not change, regulation, unit cost, and these:
   - Solution without a problem: no buyer shown, nobody asked, no named manual process.
   - Accuracy trap: works only if the output is near perfect and the user must fix the rest.
   - Slow buying chain: committee, security review, long cycle.
   - Too many connections: needs several other systems before it gives value.
   - Data moat that users will not feed.
   - Wrong time: too early (no budget line yet) or too late (many funded rivals).
   - Regulation: also write the cost of compliance (money, time) when the evidence has it, not only "a rule exists".
   Mark a row "known pattern" unless an evidence line shows it. In the case against (step 3), put the late-visible failures first, because the founder will not see them until after spending.
   - **Free-option check:** list each substitute by name (a person, a spreadsheet, a general chat tool, a no-code tool, the biggest incumbent). Say whether the evidence shows it already does the job for this buyer. This answers "why not just use X".
5. **Earlier attempts.** What the evidence shows about rivals that died or struggled, and the lesson. "Possibly dormant" without proof of death.
6. **What the evidence does not show.** For example rival prices, region rules, who exactly pays, delivery or unit cost.
7. **The narrowest version that survives.** One line: the smallest buyer, place or use where the case for still holds. A suggestion, not a verdict. Name 3 job titles or roles that would buy the narrow version. If you cannot, it is still too broad. Add a "Not in scope" list: what the narrow version leaves out, one line each.
8. **What would flip it.** 2 to 3 small tests with a number (for example "five landlords, one month"), each two-sided (if yes, then...; if no, then...) and tied to a line in `idea/ASSUMPTIONS.md`. For each test, rate how hard the first commitment is to undo (1 = cannot undo, 5 = easy). Cheap, reversible tests come first.
9. **Balance.** Which side is stronger today and why, in 3 lines.
10. **Open questions and assumptions used.** Every question still open and every assumption this file relied on, so nothing is assumed in silence. Stage 6 reads this block.

## Output

`review/STRESS.md`: 1 Question round, 2 Case for, 3 Case against, 4 Failure patterns, 5 Earlier attempts, 6 What the evidence does not show, 7 Narrowest version, 8 What would flip it, 9 Balance, 10 Open questions and assumptions used.
