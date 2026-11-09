---
name: kinso-validate
description: Turn a rough idea, a list of problems, or a sector into a clear idea, check it against real, recent evidence from the web, decide go, change or drop at a gate, and only after a "go" research the market and rivals in depth. Each stage runs the original outside skills from skills/ as they are, deals several options, keeps the best, and checks the facts after. Use when someone wants to brainstorm or validate a startup or product idea, explore what a group of people complain about or pay for, compare ideas, or get a market and competitor report. Not for pricing and unit economics (kinso-business) or building (kinso-build).
---

# kinso-validate

Each stage runs the **real skills** in `skills/` as their own `SKILL.md` says, with our **brain** around them (`BRAIN.md`):

- **In:** the inputs and the shared rules.
- **Deal and pick:** 3 options from different skills or angles, scored 0 to 3 by a fresh judge the orchestrator starts (`../BRAIN-CORE.md` (CORE) section 4); the best is kept, never the safest only because it is safe. Written to `<job>/picks/validate/NN-PICK.md`.
- **Guards:** what must never happen.
- **Checks after:** the rules that won our blind tests (`tests/stage<N>/RESULTS.md`, `DECISIONS.md`). They check facts, dates, counts, gate meanings and privacy. They never flatten a skill's style or content into one voice.

Which skill serves which stage: `SKILLS.md`. The old rewritten stage files are in `references/rewrite/`, for comparison.

## Before anything

1. Read `../RULES-RESEARCH.md`, then `../BRAIN-CORE.md`. They apply to every stage.
2. Ask the start questions once, in one message, and save the answers in `START.md`:
   1. What you want to do, in your own words. Talk freely.
   2. Region: a country, a list, or global.
   3. Time window: 30 days by default; 45 or 60.
   4. Context: budget, deadline, team size, any judging rules.
   5. Source level: 1 (free, no accounts) or 2 (adds your free Reddit app and a spare X account).
3. Pick the way in:

| Way | The user gives | Stages |
|---|---|---|
| **Brainstorm** (default) | A rough idea, a problem, or just talk | 1, then 2 to 6; 7 to 11 after "go" |
| **Validate** | A clear idea | 2 to 6 (stage 2 also writes `idea/QUESTIONS.md`, as in stage 1's last step); 7 to 11 after "go" |
| **Explore** | A sector or audience, no idea yet | 0, then 1 on the topic the user picks |
| **Compare** | 2 to 5 ideas | 2 to 4 for each, one ranking table, then 5 and 6 for the top one |
| **Improve** | An existing product (theirs or a rival's) | 0 on its users, 7, 11 |
| **Report** | A market question, no build decision | 7, 8, 10, 11 |
| **Update** | New evidence (their own talks, test-page sign-ups, replies) | Added to `updates/`, then 5, 6 and 11 again. Compliments and "I would use it" never count |

4. Make a job folder. Every stage writes its output there.

## Stages

| # | Stage | File | Runs (from `skills/`) | Output | Web |
|---|---|---|---|---|---|
| 0 | Explore | `references/00-explore.md` | deep-research, last30days runbook, claude-startup-validator | `explore/TOPICS.md`, `explore/signals.csv` | Yes, about 25 calls |
| 1 | Brainstorm | `references/01-brainstorm.md` | product-brainstorming, idea-refine, office-hours, mom-test | `idea/BRAINSTORM.md`, `idea/QUESTIONS.md` | No |
| 2 | Frame | `references/02-frame.md` | startup-design intake, validate-idea, identify-assumptions-new | `idea/IDEA.md`, `idea/ASSUMPTIONS.md` | No |
| 3 | Demand and willingness to pay | `references/03-demand.md` | startup-design wave 3, last30days runbook, mom-test; fresh verification agent | `evidence/SIGNALS.md`, `evidence/signals.csv` | Yes, 15 to 25 calls |
| 4 | Quick rival check | `references/04-rivals-quick.md` | startup-design pre-flight, competitive-platform-analysis, claude-startup-validator | `evidence/RIVALS-QUICK.md` | Yes, 10 to 15 calls |
| 5 | Stress test | `references/05-stress.md` | grilling, failure patterns, strategy-red-team, pre-mortem, plan-ceo-review Step 0 | `review/STRESS.md` | No |
| 6 | Gate | `references/06-gate.md` | validate-idea, mom-test-gate; fresh reviewer | `GATE.md`, `review/GATE-REVIEW.md` | No |
| 7 | Rivals and products in depth | `references/07-rivals.md` | startup-competitors, competitive-platform-analysis; fresh verification agent | `market/RIVALS.md`, `market/FEATURES.md` | Yes, about 28 calls |
| 8 | Region and why now | `references/08-region.md` | market-research, startup-design waves 1 and 4, office-hours landscape | `market/REGION.md` | Yes, about 12 calls |
| 9 | First 100 users | `references/09-first-users.md` | go-to-market, persona-gen, beachhead-segment, mom-test-outreach | `market/DISTRIBUTION.md` | Yes, about 12 calls |
| 10 | Market size | `references/10-size.md` | startup-design A1, market-sizing-analysis, market-research; fresh verification agent | `market/SIZE.md` | Yes, about 10 calls |
| 11 | Report and verdict | `references/11-report.md` | none won; our review, 2 fresh reviewers | `market/MARKET-REPORT.md`, `VERDICT.md` | No |

Each stage reads `../RULES-RESEARCH.md`, `../BRAIN-CORE.md` and `BRAIN.md`, then its own file, then only the inputs its file names. Part A is stages 1 to 6. Part B (7 to 11) runs only after "go" at the gate and the user's OK.

## Stop for the user's OK

1. After the start questions.
2. After stage 0, to pick a topic (Explore only).
3. After stage 1, to pick the problem and direction.
4. After stage 2, the frame.
5. After stage 6, the gate. Part B starts only on the user's OK.
6. After stage 11, the verdict.

Between these points, go on without asking.

## Tools

- Web only through the collector at `../tools/collect/collect.sh <job folder> <command> ...` (commands: `search`, `reddit`, `hn`, `bluesky`, `jobs`, `fetch`, `quote-check`; see `../tools/collect/README.md` and its "which source for which job" table). It runs inside the sandbox. Always add `--out <job folder>/raw.jsonl`.
- The skill plans tests; the user runs them. It never posts, messages or contacts anyone.
- The skills in `skills/` are followed as they are. Never run their scripts (one exception, CORE section 8 item 7: a script a stage file names, that passed our scan, run through `run.sh`), preambles, telemetry, install or update commands, or gstack `bin/` scripts. Never use a part that needs a paid key. When a skill's rule clashes with a shared rule, the shared rule wins and the clash is logged in `PROCESS.md`.
- Every script of our own (for example `work/fix.py`) runs through `../kinso-frontend/tools/sandbox/run.sh <job> <command>`, and `PROCESS.md` logs that exact `run.sh` line each time (BRAIN "Files rules").
- Every stage also writes `picks/validate/NN-PICK.md`. Overrides go in `OVERRIDES.md` (CORE section 8).

## Every job ends with

- `VERDICT.md` (go, change or drop) after stage 11, or `GATE.md` when the work stops at the gate.
- `idea/QUESTIONS.md`: questions about what people did, for when the user talks to people.
- The next step: the cheapest test, with pass and fail numbers set in advance.
- Handover to kinso-business: `VERDICT.md`, `idea/`, `evidence/` and `market/`.
