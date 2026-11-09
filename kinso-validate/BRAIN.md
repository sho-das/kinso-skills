# kinso-validate - The brain

27 October 2026. Draft for your review. Context: `../CONDUCTOR-PLAN.md`, `STUDY.md` (Part A2), `SKILLS.md`.

All paths below are from `kinso-validate/`. The old rewritten stage files are in `references/rewrite/`, for comparison.

## What the brain is

- Each stage runs the **real skills** in `skills/`, as their own `SKILL.md` says: waves, lenses, question banks, verification agents.
- The brain does five things around them: **pass in**, **deal**, **pick**, **guard**, **check after**.
- The brain never rewrites a skill's method, voice or ideas. The checks cover facts, dates, counts, gate meanings and privacy only.

## Hard rules for the files (every stage)

Added 2026-10-27 after the stage tests (`FIXES.md` rows 1 and 3).

- Write only in the job folder. Scratch files and helper scripts go in `<job>/work/`, never in a scratchpad, `/tmp` or the home folder.
- Every script runs through `../kinso-frontend/tools/sandbox/run.sh <job> <command>`, even a one-line read-only `python` or `node` command. Plain reads (`cat`, `grep`, `wc`, `head`) need no sandbox.
- **Log the `run.sh` line for each script (added 2026-10-27, `REGRESSION-RUN.md`: `stage7/A/PROCESS.md:31` named `work/fix.py` with no `run.sh` note).** Every time `PROCESS.md` names a script (`.py`, `.js`, `.sh` in `work/`, or a `python`, `node` or `bash` call), write the exact command as run, starting with `run.sh`: for example "`../kinso-frontend/tools/sandbox/run.sh <job> python3 work/fix.py` - applied the 6 verifier fixes". A script named without its `run.sh` line fails regression item 1.
- Never delete anything, not even your own scratch file. No `rm`, no `mv` over a file. A file you no longer need stays; say so in `PROCESS.md`.
- Before you finish, write one line in `PROCESS.md`: "Files rules: held" or the slip.

## The loop at every stage

Shared loop, judge, seed, scale, paths and override: `../BRAIN-CORE.md` (CORE) sections 2 to 8. Below: what stays local.

1. **In.** Pass the job folder, `START.md`, the earlier stage files the stage names, and the shared rules:
   - `../RULES-RESEARCH.md` (facts only, tags, dated sources, privacy, section 7 user override);
   - free only, no paid key or API;
   - never a model name with `-contributor`;
   - web only through `../tools/collect/collect.sh`, at the 30-second pace, at most 2 runs searching at once (V9), with `--out <job>/raw.jsonl`.
2. **Deal.** Deal 3 options, never 1. Each option comes from a different skill or a different angle. At least one option is from a different family than the other two (for example one "cut" lens with two "expand" lenses).
   - Where a skill offers a menu (lenses, modes, personas, framings), pick with a **seeded random draw**. Draw by CORE section 5, seed `<job>-validate-NN[-<case>]`.
   - On web stages, the deal changes the query plan and the analysis, never the call budget. Lanes run one after another, not in parallel.
3. **Run.** Each dealt option runs as its own pass through the skill's method. Each pass runs in a fresh session started by the orchestrator (CORE section 4).
4. **Pick.** A fresh judge scores each pass, as CORE section 3 step 4. Keep the best, or merge named parts of two. **Never keep an option only because it is the safest.** The total only picks between passes; it never decides a verdict.
5. **Swap test.** CORE section 3 step 5. Local: swap in a different idea or region. If the line still fits word for word, it is generic. Redo it or cut it.
6. **Check after.** Run the stage's checks. A failed check is fixed by the brain or sent back to the skill. Each fix is one line in `<job>/validate/PROCESS.md`.
7. **Clash.** When a skill's rule clashes with a shared rule (a paid API, a made-up number, a price design in kinso-validate), the shared rule wins. Log the clash in `PROCESS.md`.

## Shared rubric lines (each stage adds its own)

| Line | 3 | 0 |
|---|---|---|
| Evidence tie | every claim points to a row, quote or founder line | no source |
| Specific | names a person type, place, number, date | "SMBs", "growing fast" |
| Non-obvious | something the founder likely did not see | repeats the brief |
| Decision use | changes what the founder does next | no action |
| Honest | says "weak" or "none found" when true | cheers or hedges |
| Swap test | fits only this idea | fits any idea |

## Skipped in every skill

- Paid search or keys: ECC `deep-research` Firecrawl and Exa; last30days engine and its keys; gstack Codex steps.
- Telemetry, preambles, install, update and setup commands; gstack `bin/` scripts (`skills/gstack-shared/bin/`, `skills/plan-ceo-review/bin/`).
- Any script in a skill: not run (for example `skills/idea-refine/scripts/`, `skills/last30days/scripts/`). The one exception (CORE section 8 item 7, user's call 2026-10-27): a script runs only if a stage file names it, it passed our scan, and it runs through `run.sh`. No kinso-validate stage file names one today.
- Writes outside the job folder (for example `~/.gstack/`, `~/Documents/Last30Days`).

## PICK.md template

Each stage writes `<job>/picks/validate/NN-PICK.md`. Header: CORE section 7.

```
# kinso-validate stage NN - Pick
Date:
Mode: deal | rotate | no deal
Seed: <job>-validate-NN[-<case>]   Hash (8 hex):   mod:
Draw: <menu> -> <cards drawn>   Draw rule or tool: <name, sha256 12 hex>   Menu: <file, sha256 12 hex>

## Dealt
| # | Option | Skill and path | Angle or family | Fresh session (agent or call id) |
|---|---|---|---|---|
| A | | | | yes - <id> |
| B | | | | yes - <id> |
| C | | | | yes - <id> |
| Judge | - | - | - | yes - <id> |

## Scores (0 to 3, judge did not see option names)
| Line | A | B | C |
|---|---|---|---|
| Evidence tie | | | |
| Specific | | | |
| Non-obvious | | | |
| Decision use | | | |
| Honest | | | |
| Swap test | | | |
| <stage lines> | | | |
| Total (pick only) | | | |

## Kept
- Kept: <option, or named parts of two>
- Why:
- Dropped, and why:
- Swap-test cuts: <lines cut or redone>

## Checks after
| Check | Pass or fail | Fix (also in PROCESS.md) |
|---|---|---|

## Overrides this stage
<none, or a link to the OVERRIDES.md row>
```

## Override

As CORE section 8 (tag "user override", the no-lift list). Local: the research is never deleted. A legal finding can only become "proceed at the user's risk".
