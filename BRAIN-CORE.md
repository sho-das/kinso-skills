# Kinso brain core

27 October 2026. Draft for your review. The one loop that all 6 brains share. Sources: `reviews/2026-10-27/CEO-REVIEW.md` findings 1, 2, 3, 6, 7, 8; `reviews/2026-10-27/ENG-REVIEW.md` R7, R10. Most text is lifted from `kinso-build/BRAIN.md`, the version that passed its proof run (`kinso-build/FIXES.md`, last table).

## 1. Read order and what stays local

- Every stage reads, in order: `RULES-RESEARCH.md`, this file, the skill's `BRAIN.md`, the stage file, then only the inputs the stage file names. kinso-frontend reads its `RULES.md` before this file.
- This file wins over a brain or stage file on the topics below. A brain may add to a rule here. It may not loosen one.
- Each brain keeps, local: its deal roles and option count, its rubric lines, its stage exceptions, its guards list, its standing checks and its own PICK body.
- Skill names in paths and seeds are the short names: `validate`, `business`, `build`, `frontend`, `qa`, `promote`.

## 2. Paths in the shared job folder

| What | Path | Note |
|---|---|---|
| Pick file | `<job>/picks/<skill>/NN-PICK.md` | One folder per skill, so stage numbers never collide |
| Process log | `<job>/<skill>/PROCESS.md` | A bare `PROCESS.md` in any brain or stage file means this path |
| Option outputs | `<job>/<skill>/options/` | Where a stage file names no other place |
| Overrides | `<job>/OVERRIDES.md` | Shared by all 6 skills, one table |
| Design log | `$KINSO_HOME/design-log.json` | Section 11 |

- Nothing is written directly under `<job>/picks/`. A regression check: `find <job>/picks -maxdepth 1 -type f` prints nothing.
- `NN` is the stage number with 2 digits. A stage that writes 2 picks adds a suffix: `08-PICK-ai.md`.

## 3. The loop at every stage

1. **In.** Pass the inputs the stage file names, `RULES-RESEARCH.md`, this file and the brain's guards. Every count later copied into a PICK.md comes from a named file, never from memory.
2. **Deal.** Run at least 2 options on the same input, each from a different skill, angle or family. The brain names how many and which roles. Never 3 near-twins. Where a skill offers a menu, draw from it by the seed rule (section 5).
3. **Run each option.** Each option runs as its own pass through its skill's method, in its own fresh session (section 4). It never sees the other options.
4. **Pick.** A fresh judge scores each option 0 to 3 per rubric line, option and skill names hidden (section 6). A failed "must" line drops the option. Reasons decide; the total only picks between options. Keep one, or merge named parts and say which part came from which option. Never keep an option only because it is the safest.
5. **Rival test.** For each kept line, put in the nearest rival's name, or swap in a different idea or region. If the line still fits word for word, it is generic: redo it or cut it. kinso-validate calls this the swap test.
6. **Check after.** Run the stage checks. Fix a failure, or send it back to the skill. One line per fix in `<job>/<skill>/PROCESS.md`. A re-run of an earlier stage refreshes the counts in every later pick it changes.
7. **Clash.** When a skill's rule clashes with a guard or a shared rule, the guard wins. Log the clash in `PROCESS.md`: stage, skill rule, guard, what was done.

Stages with no deal write "Mode: no deal" in the PICK header and still run steps 1, 6 and 7.

## 4. Who starts option runs and the judge

- **The orchestrator** is the session that runs the Kinso skill for the user. Only it starts subagents.
- It starts **each dealt option** as its own fresh subagent. It starts **the judge** as one more fresh subagent.
- A **runner** (a subagent) cannot start agents. So a runner never deals. It prepares the stage inputs, writes "deal pending: orchestrator" in `PROCESS.md`, and stops.
- An option subagent gets only: its skill's `SKILL.md` path, the stage In files, the guards, and its own output path. Never another option's name, path or output.
- The judge gets the rubric and the option files renamed "Option 1", "Option 2", ... Never the skill names. It writes the scores. The orchestrator writes the PICK.md from them.
- With no subagents (a plain API): each option is a separate call with no shared history. The judge is one more separate call.
- The same rule covers every "fresh" role a stage file names: judge, picker, reviewer, verification agent, tester, pass. Each is started by the orchestrator, and its id is recorded.
- **Session ids.** The PICK records each agent id or call id in the "Fresh session" column. A PICK.md with an empty or missing id for a dealt option or the judge **fails "Ran"**. Two options written in one session are logged as a fail of this rule, never as "yes".
- A score the writer gave itself is never final. Where a runner cannot start a judge, it writes "pending fresh judge", and the orchestrator runs the judge.

### Which model each role uses (user's rule, 2026-11-09)

Use the smallest model that can do the job. Only decisions run on the biggest model.

| Role | Model | Examples |
|---|---|---|
| Plain work | `haiku` (Haiku 5.5) | collector searches, copying inputs, counting, format checks, regression checks, file listings |
| Making things | `sonnet` (Sonnet 5.5), with Opus as advisor where the tool allows it | dealt options, drafts, designs, code, test runs, testers, fresh reviewers |
| Decisions | `opus` (Opus 5.5) | the judge, the go / change / drop gate, merging options, the final verdict, picking where to start |

- The orchestrator passes the model each time it starts a subagent. It never leaves the model to the default.
- A role not in the table uses `sonnet`.
- If a `haiku` run fails a check twice, rerun that step once on `sonnet` and log it in `PROCESS.md`.
- Each PICK.md records the model next to each session id, for example `ad87f826ccc37ae6c (sonnet)`.
- A stage may run 3 coders in parallel only on `sonnet`. Compare its tokens with a single run before making it the default.

## 5. Seed rule

- **Seed** = `<job>-<skill>-<NN>[-<case>]`. `<job>` is the job folder name. `<case>` is optional: a post id, a cell, a run number, a pass letter. Examples: `D-build-04`, `kinbeat-promote-05-li-2`, `D-qa-02-1`.
- **Hash** = sha256 of the seed text with no newline. Read the first 8 hex digits as one number: `printf %s D-build-04 | shasum -a 256 | cut -c1-8`.
- **First card** = hash mod menu size (items counted from 0, in the menu's own order).
- **Next card**: hash `<seed>-2`, then `<seed>-3`, and so on, by the same rule. Skip a repeat and hash the next suffix.
- **Redraw** (for a stated reason only): add `-r<n>` to the seed, for example `D-frontend-03-r1`. Its next cards are `<seed>-r1-2`, ... Log the reason.
- **Record in the PICK**: the seed, the 8 hex digits, the mod, the cards, and one of:
  - `Draw rule: BRAIN-CORE section 5` for a hand draw, plus `Menu: <file> sha256 <first 12 hex>`;
  - `Draw tool: <path> sha256 <first 12 hex>` for a tool, plus the hash of each menu file it reads.
- A tool that takes a number gets the hash as a number. kinso-frontend: `draw.py --seed $((16#<8 hex>))`.
- The same seed, the same menu hash and the same tool hash must give the same cards. If a menu or tool changed, say so in the PICK; an old draw is not expected to repeat.

## 6. Score scale

- Picks score **0 to 3** per rubric line: 0 missing or wrong, 1 weak, 2 good, 3 strong and specific.
- kinso-frontend stage files score 1 to 5 today. They move to 0 to 3. Until a stage file is changed, map a 1 to 5 score as: 1 -> 0, 2 -> 1, 3 -> 2, 4 -> 2, 5 -> 3. Write both numbers in the PICK.
- Gate scores are not pick scores and keep their own scale: "sounds human", "useful" and the AI-look gate score 1 to 10, pass at 7 (section 9).

## 7. PICK.md shared header

Every PICK.md starts with these lines. The body (scores table, kept, checks after) stays in each brain.

```
# kinso-<skill> stage NN - Pick
Date:
Mode: deal | rotate | no deal
Seed: <job>-<skill>-NN[-<case>]   Hash (8 hex):   mod:
Draw: <menu> -> <cards>   Draw rule or tool: <name, sha256 12 hex>   Menu: <file, sha256 12 hex>

| # | Option, skill and path | Fresh session (started by the orchestrator; agent or call id) | Output file |
|---|---|---|---|
| A | | yes - <id> | |
| Judge | - | yes - <id> | (scores below) |
```

## 8. Override

- At any stop point, or any time, the user may overrule a pick, finding, check or number. The founder or the client is "the user" here.
- Steps, as in `RULES-RESEARCH.md` section 7: show the evidence once, plus the strongest case for the user; ask to confirm; on OK, follow the user.
- **One tag: "user override".** Add a row to `<job>/OVERRIDES.md`: date, skill, stage, what the rule or finding said (with its source line), what the user chose, why, the risk, signed off by whom and when. The final verdict of each skill lists every row and how it would differ without it.
- **Risk only.** These can become only "proceed at the user's risk", and stay red flags in every verdict and handoff: a legal finding or pause; an accessibility failure; a data-law finding; a "must not make" claim in a private planning file only; a high-severity security finding; a failing test; a QA no-go or an S1 bug.
- **No override lifts these** (union of the guard lists in the 6 brains, `kinso-frontend/RULES.md` and `RULES-RESEARCH.md` section 4):
  1. Never push, commit, deploy, merge, publish, post, like, message or schedule. A per-action OK in chat is the guard's own path, not an override.
  2. Secrets never opened, printed, sent or written to a file.
  3. Production and real user data are read-only and never tested without a written OK that names the host and the data.
  4. Free only: no paid API, key, service, trial or generator.
  5. Never a `-contributor` model.
  6. Scripts only through `kinso-frontend/tools/sandbox/run.sh`; the local model only under `tools/ollama/no-net.sb`.
  7. Nothing in `vendor/` or `skills/` is installed or run as a program: no hooks, preambles, `bin/`, launchers, telemetry or update checks. Any install needs the user's OK first. **One exception (user's call, 2026-10-27):** a vendor script may run only if a stage file names it, it passed our scan, and it runs through `run.sh`. No other vendor script ever runs.
  10. **A "must not make" claim never goes public (user's call, 2026-10-27):** never on a site, page, post, caption, video or any file meant for the public. Only in private planning files may the user override it, at their risk, logged in `OVERRIDES.md`.
  8. Never load-test or attack a host the user does not own.
  9. Never delete: no `rm`, no `mv` over a file.
  10. Web only through `tools/collect/`. Never get past a bot check, CAPTCHA or login wall.
  11. Never log in, never use the user's main accounts, never create accounts.
  12. Privacy: never name private people or join one person's details across sites.
  13. One local AI model at a time (section 12).
  14. Writes only inside the job folder, plus the design log (section 11).
  15. Telemetry off for every tool. Test data only, marked "test data".
  16. kinso-qa never edits the app's code.

## 9. No house style

No house style. The checks never rewrite a skill's method, voice, layout, colour, type, motion, structure or length. These gates are allowed, because they catch sameness or AI tells, not taste:

| Gate | Where |
|---|---|
| Rival test and swap test (section 3 step 5) | all brains; `kinso-validate/BRAIN.md` loop 5; `kinso-promote/BRAIN.md` loop 5 |
| Never keep the safest option only because it is safe | validate, frontend, promote |
| Never blend; near-same options mean a failed deal and a re-deal | `kinso-business/BRAIN.md` "Never blend"; promote loop 3; frontend 03 "Adopt, do not blend" |
| Never 3 near-twins; at least 2 sources across kept options | `kinso-frontend/BRAIN.md` loop 3; `references/03-direction.md` |
| Template test (the page any model makes for the category) | `kinso-frontend/references/03-direction.md`, `06-build.md` rubric |
| Fingerprint memory: reject more than 3 of 6 axes shared with the last 3 log entries | `kinso-frontend/BRAIN.md` "Memory across jobs" |
| Sameness check: screenshots side by side, grey and blurred | `kinso-frontend/references/03-direction.md` |
| AI-look gate: fresh reviewer, 1 to 10, under 7 not shown | `kinso-frontend/references/03-direction.md`; `FIXES.md` row 3 |
| Humanizer pass, all 26 patterns, table in `promote/HUMANIZER.md`; clear-English pass for mixed readers | `kinso-promote/BRAIN.md` checks after, rule 8 |
| "Sounds human" and "useful", fresh judge, 1 to 10, under 7 goes back once | `kinso-promote/BRAIN.md` |
| Rhythm from the thought: one sentence of 15+ words and one of 5 or fewer per piece over 60 words; no 3 openings alike; at most one fragment and one list of three | `kinso-promote/BRAIN.md` rule 5 |
| No text about the text; blog is not an info page; each piece leads with its own scene; one image in at most 2 pieces; no two pieces open the same way | `kinso-promote/BRAIN.md` rules 3, 6, 7 and checks after |
| No em dashes in Kinso files and in promote texts | `RULES-RESEARCH.md` section 6; `kinso-promote/BRAIN.md`; `kinso-qa/BRAIN.md` guard 13; `kinso-frontend/RULES.md` |

- A new gate is added to this table first. A check that is not in this table and judges taste is not run.
- Page and post copy follows the chosen skill's voice. Our writing rules cover Kinso's own notes, picks and reports.

## 10. Report files come back as text blocks

- Claude Code refuses report-like files (`REPORT.md`, `FINDINGS.md`, `SUMMARY.md` and similar) from a subagent's Write tool.
- So a runner never saves a report itself. It returns each one in its final message:

```
=== FILE: <path relative to the job or run folder> ===
<full file text>
=== END FILE ===
```

- Other outputs (code, data, PICK.md, PROCESS.md) the runner writes itself. Any file the Write tool refuses also comes back as a block. Never work around a refusal with the shell, a redirect, a new name or another tool.
- The orchestrator saves each block word for word with the Write tool, and notes in `PROCESS.md` which files it saved. A missing block counts as a missing file for "Ran".
- This holds in real jobs too. Handoffs at risk: `qa/REPORT.md`, `market/MARKET-REPORT.md`, `review/REVIEW.md`.

## 11. Design log

- Path: `$KINSO_HOME/design-log.json`. `KINSO_HOME` defaults to `<Kinso root>/home/`, inside the repo.
- Tests set `KINSO_HOME=<run folder>/home`, so test jobs never fill the real log.
- It is the one allowed write outside the job folder. The brain writes it after the client's pick, never a script.

## 12. One local AI model at a time

- As `RULES-RESEARCH.md` section 4: Ollama, mflux and FastVideo never run together. Kokoro is exempt.
- Before a start: `pgrep -fl "ollama serve|mflux-generate|mlx_wan"` prints nothing. If one runs, wait.
- Never stop another runner's model. Stop only the process you started, by its own pid, and confirm its port is closed.
- Ollama runs only under `tools/ollama/no-net.sb`, never through `run.sh`.
- This is a check, not a lock. A lock file is needed before any scheduler runs jobs.

## 13. How each guard is enforced

| Guard | Enforced by | Gap |
|---|---|---|
| No `rm` | hook: `tools/hooks/guard.py` (Bash, terminal, Write, Edit, WebFetch, WebSearch, Agent; swapped 2026-10-27) | `rm`, `unlink`, `rmdir`, `shred` blocked; text match only, cases in `tools/hooks/test_guard.py` |
| Scripts, runners, package managers only through `run.sh` | hook: `guard.py` | text match; cannot see what a variable, alias or script does at run time |
| Scripts write only in the run folder | sandbox: `run.sh` | run folder must be inside the Kinso folder or `KINSO_ALLOWED_ROOTS`; TMPDIR is `<run>/.tmp`; reads of `$HOME` denied |
| Keys in shell variables kept from scripts | sandbox: `run.sh` uses `env -i` | holds |
| Local model has no network | sandbox: `tools/ollama/no-net.sb` | only when started that way |
| Search cap and 30-second pace | tool: `tools/collect/collect.sh` (cap 20 per skill and stage, mkdir lock) | counter file is writable |
| Pointers anchored | tool: `kinso-business/tools/check-pointers.py` | business only |
| Seeded deck | tool: `kinso-frontend/tools/draw/draw.py` | random unless `--seed` is passed |
| Write and Edit only in the job folder | hook blocks `.claude/`, `tools/hooks/`, the sandbox folder; rest rule only | other paths outside the job are not blocked |
| Web only through the collector | hook blocks WebFetch and WebSearch | `curl` inside `run.sh` still has network unless `--no-net` |
| Never push, commit, deploy, merge, post | rule only | |
| Never a `-contributor` model | hook: `guard.py` | text match only |
| Production data read-only; own hosts only | rule only | network open |
| Telemetry off | sandbox: `run.sh` sets `DO_NOT_TRACK`, `K6_NO_USAGE_REPORT` and the 4 `PROMPTFOO_*` variables | tools that read other variables |
| Fresh sessions and judge ids | rule, checked by the orchestrator ("Ran" fails without ids) | |
| One local model | rule plus `pgrep` check | no lock |
| Skill scripts | rule only: named in a stage file, scanned, through `run.sh` (section 8 item 7, user's call 2026-10-27) | the hook cannot tell a named script from another |
