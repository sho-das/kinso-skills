# Stage 11 - Report and verdict

Part B: the last stage. Read `../RULES-RESEARCH.md` and `BRAIN.md` first. Paths are from `kinso-validate/`. Old rewrite: `references/rewrite/11-report.md`.

## Runs

No outside skill beat plain judgment in the stage 11 test. This stage stays our own review. It reads, as checklists only:

1. `skills/startup-design/SKILL.md` final assessment and confidence dashboard (claim, source tier, number of sources, confidence, age), with `references/output-guidelines.md`.
2. `skills/startup-design/references/verification-agent.md` and `skills/startup-competitors/references/verification-agent.md`.

Skip: startup-design's scorecards as a decider.

## In

- Everything in the job folder: `START.md`, `idea/`, `evidence/`, `review/`, `GATE.md`, `market/`, `OVERRIDES.md`.
- Shared rules: facts only, free only, never a `-contributor` model, privacy, user override. No web.

## Deal and pick

- Deal 2 fresh reviewers, each with a different focus card: A numbers (recount every count and sum), B cross-file (rivals, prices, places, dates).
- Take the union of their [Conflict] and [Gap] blocks.
- The verdict is written once, after both, with the stage 6 meanings.
- Rubric lines (0 to 3): real mismatches found; every count with n; no stub.
- Write `<job>/picks/validate/11-PICK.md`.

## Guards

- Reviewers report problems; they do not change the verdict alone (a fresh verifier once turned "change" into "drop").
- Before a drop, try the narrowest version that still works.

## Checks after

- Go, change and drop mean exactly what they mean in `references/06-gate.md`. Missing evidence is not a drop.
- n next to every count; fewer than 5 people is a hypothesis; data older than 18 months marked "old".
- Each supporting claim tagged "checked" or "not checked"; quotes found in `raw.jsonl` or `signals.csv`.
- "Claims that carry the verdict" table; high confidence needs several checked signals from different people.
- Two files that disagree: check for different groups, places or dates first.
- One next step with a pass line and a kill condition; concrete (who, what, how many, by when).
- A Critical issue goes at the top of `VERDICT.md`.
- The report has a "Who tried this before" section: every dead or sold attempt from stages 3, 4 and 7 in one table (name, years alive, why it ended, source, does the reason still apply). If none were found, list the searches tried.
- Checks never rewrite the report's voice.

## Override

As in `../RULES-RESEARCH.md` section 7. The verdict lists every override and says how it would differ without it. Legal overrides stay red flags.

## Out

- `market/MARKET-REPORT.md`: Bottom line, Report, Conflicts and gaps.
- `VERDICT.md`: 1 Verdict, 2 Reviewer checks, 3 Next step.
- `picks/validate/11-PICK.md`.

## Stop point

Show the verdict to the user.
