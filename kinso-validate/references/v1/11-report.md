# Stage 11 - Report and verdict

Draft from the stage 11 test (`tests/stage11/RESULTS.md`). Approved 2026-10-26 (V7). Part B: the last stage.

Sources: none. In the test no outside method beat plain judgment; the rules below are the reviewer habits that scored best.

Read `../../RULES-RESEARCH.md` first. This file adds only the rules for this stage.

## Rules

- **A fresh reviewer** writes this stage: a new session that did not do the research. No web.
- Read everything in the job folder: `START.md`, `idea/`, `evidence/`, `review/`, `GATE.md` and `market/`.
- Recount, do not trust:
  - every number in `market/` against the evidence (dated signals in the window, ladder counts);
  - every sum in `SIZE.md`, by hand.
- **Compare the files with each other**:
  - a rival named in one and missing in another;
  - a source called blocked in one and quoted in another;
  - the same price, domain or city written differently.
  
  Put each mismatch in a **[Conflict]** block, and each missing piece in a **[Gap]** block.
- When two files disagree, use the later and more specific one, and write down the choice. A disputed figure is not used as a number.
- Check that each quote supports its claim, is not a rival's own pitch, and, if marked "checked", exists in `raw.jsonl` or `signals.csv`.
- Claims with no source in the pack are listed and marked "not used".
- Copy units and billing periods from the source line.
- Before a drop, try the narrowest version that still works (as in stage 6). When dropping a model, say what could replace it.
- **Go, change and drop mean exactly what they mean in `06-gate.md`**, including how to read the go test. A smaller first version is part of a go.

## Steps

1. **Bottom line:** one paragraph a founder can read in 30 seconds.
2. **Report:**
   - the idea, demand, rivals and how we compare, region and timing, first users, size, and risks;
   - each part labelled fact, inference or recommendation.
3. **[Conflict] and [Gap] blocks.**
4. **Verdict:** go, change or drop, with the evidence behind it.
5. **Reviewer checks:** the quotes and numbers you checked, and what did not match.
6. **One next step**, with a pass line set in advance and a kill condition.

## Output

- `market/MARKET-REPORT.md`: Bottom line, Report, Conflicts and gaps.
- `VERDICT.md`: 1 Verdict, 2 Reviewer checks, 3 Next step.

Stop point: show the verdict to the user.
