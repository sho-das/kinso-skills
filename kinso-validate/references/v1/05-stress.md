# Stage 5 - Stress test

Draft from the stage 5 test (`tests/stage5/RESULTS.md`). Approved 2026-10-26 (V7).

Sources: Matt Pocock `grilling` (MIT) as the core, plus the failure-pattern table from `claude-startup-validator`. Rewritten in our own words.

Read `../../RULES-RESEARCH.md` first. This file adds only the rules for this stage.

## Rules

- No new web research. Use only `idea/` and `evidence/`. A gap is written down as a gap, not filled.
- No verdict. Go, change or drop is stage 6.
- Every point names its line in the evidence (signal row, rival line, voice note). A point without one is marked "known pattern" or "guess".
- Say what each row proves, and no more. Spend on X is not demand for our X. A vendor's claim is positioning, not a user voice. A builder is not a buyer. One source is one case.
- Keep "checked" and "not checked" quotes apart. Founder-reported lines are marked as such.
- "We did not look" is not "it does not exist". A missing dead rival or feature becomes a search by name for later.

## Steps

1. **Question round.** Write the 3 to 6 questions that decide the idea (who pays, is the pain real, is the gap open, does a free option already do it). For each: the answer the evidence supports and a status ("answered", "open, one voice only", "open, no evidence").
2. **The case for.** The 3 to 5 strongest honest reasons, each tied to evidence.
3. **The case against.** The 3 to 5 strongest reasons it could fail, each tied to evidence or a known pattern.
4. **Failure patterns.** A table: pattern, applies here because, strength (high, medium, low). Check at least: no paying buyer, empty side of a marketplace, free substitute or built-in feature, habit that does not change, regulation, unit cost.
5. **Earlier attempts.** What the evidence shows about rivals that died or struggled, and the lesson. "Possibly dormant" without proof of death.
6. **What the evidence does not show.** For example rival prices, region rules, who exactly pays, delivery or unit cost.
7. **The narrowest version that survives.** One line: the smallest buyer, place or use where the case for still holds. A suggestion, not a verdict.
8. **What would flip it.** 2 to 3 small tests with a number (for example "five landlords, one month"), each two-sided (if yes, then...; if no, then...) and tied to a line in `idea/ASSUMPTIONS.md`.
9. **Balance.** Which side is stronger today and why, in 3 lines.

## Output

`review/STRESS.md`: 1 Question round, 2 Case for, 3 Case against, 4 Failure patterns, 5 Earlier attempts, 6 What the evidence does not show, 7 Narrowest version, 8 What would flip it, 9 Balance.
