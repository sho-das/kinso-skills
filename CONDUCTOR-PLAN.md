# Conductor plan - run the real skills, keep our brain

27 October 2026. Updated the same day to match the repo. All 6 Kinso skills now run this setup: each has a `BRAIN.md`, a `skills/` folder with the real skills, a `FIXES.md` and a `tests/REGRESSION.md`. The text before this update is kept in `reviews/2026-10-27/CONDUCTOR-PLAN.before.md`. Reviews of this plan: `reviews/2026-10-27/CEO-REVIEW.md` and `ENG-REVIEW.md`.

## The decision (yours, 2026-10-27)

- Every stage of every Kinso skill runs the **original outside skill**, from its local copy in `<kinso-skill>/skills/` (copied unchanged from the scanned, pinned repo in `vendor/`). We stop rewriting them into our own words.
- Our stage file becomes the **brain** around it: what goes in, which skill runs, and what is checked after.
- Reason: our rewrites merged several skills into one voice. For design, that averaged them into the AI look. Running the real skills keeps each one's own ideas and avoids our bias.
- All the skills in `vendor/` passed SkillSpector and our scanner, with no injected or harmful content.

## What the brain does at each stage

1. **Before:** passes the inputs (job folder, start answers, earlier stage files) and the shared rules:
   - facts only from the inputs;
   - free tools only, no paid API;
   - user override;
   - the page language;
   - never a `-contributor` model.
2. **Run:** points the model at the original skill's `SKILL.md` and its reference files, in place, and lets it do the work its own way. Where a stage has more than one strong skill, it runs each one (for example the design studio below).
3. **After:** checks the output against our **check list**:
   - These are the rules that won in our blind tests. For example: no invented facts, the launch gate on pages with visible slots, Approve blocked on failed tests, and the gate meanings go, change and drop.
   - The brain fixes what fails, or sends it back to the skill.
   - Each fix is logged in `PROCESS.md`.
4. **Clash:** when the skill's own rule clashes with a shared rule (for example a paid image API, or a made-up number), the shared rule wins, and the clash is logged.

So the gains from our tests are kept, as checks after the skill instead of as a rewrite of it.

**The checks never touch style.** They cover facts, accessibility, broken links, SEO and the launch gates only. Style limits from our rewrite are not checks, because they flattened the designs: one accent only, about 80 words on the first screen, the house layout rules, "no random draws". The designer skill's own choices on layout, colour, type, motion and length stand.

Why the originals vary more (read 2026-10-27):
- **They deal a direction at random from a large library**, then the model must adopt it, not blend it back into its usual page (taste-skill `draw.mjs --options 3`, Hallmark themes). We banned random draws after one bad colour pick, and that removed the variety. In the studio, keep the draw and choose by subject. The kinso-frontend brain now deals from 4 sources through `kinso-frontend/tools/draw/draw.py` (see the stage 3 row below).
- **They describe our page and refuse it.** Hallmark says the page every model makes is a split hero with the head on the left and a picture on the right, a pale ground and one careful accent. That is exactly what we produced.
- **An idea sentence with a rival test:** "On this page, [something only this client has] becomes [the device]". If the nearest rival's name still fits, start again.
- **One live thing:** something the visitor can try, made from the real content (taste-skill).
- **A full page:** 6 to 9 sections, each with something worth looking at (Hallmark). Our final pages were a hero and one section.
- **Ambition in the prompt:** a design lead whose client has turned down every template (frontend-design, Hallmark).

**How many options each brain deals today** (not yet the same, see CEO review finding 2): validate 3, business 3 fixed roles, build 2, qa 2 per high cell, frontend 4 sources at stage 3. A shared `BRAIN-CORE.md` is proposed in the reviews; it does not exist yet.

## Scripts in the skills

- Use them directly, as you said, but only through `kinso-frontend/tools/sandbox/run.sh`. There is no `tools/sandbox/` at the root. It allows writes only in the run folder, and blocks keys and browser data.
- Never: install commands, hooks, telemetry, update checks.
- Never: anything that needs a paid key or a paid API. Examples: the UI UX Pro Max logo and icon makers (Gemini and other paid services), and image generation. The free-only rule wins.
- A script that calls the web goes through the local collector `tools/collect/`, at our 30-second pace.
- After any `vendor/` update: scan again with SkillSpector and our scanner, then pin the new version.

## Which skill runs at each stage

The first pick is the skill that won that stage in round 1. Where two were close, both run, and the brain merges their results. Each skill's `SKILL.md` and `references/NN-*.md` are the current record. The tables below are the summary.

### kinso-validate

| Stage | Runs | Brain checks after (from our tests) |
|---|---|---|
| 0 Explore | ECC `deep-research` | dated sources, signal ladder |
| 1 Brainstorm | Anthropic `product-brainstorming` | questions file when stage 1 is skipped |
| 2 Frame | startup-skill `startup-design` (intake) | the five fatal questions, pass and fail numbers set in advance |
| 3 Demand | startup-skill `startup-design` research wave, last30days for recency | quotes checked against raw data, 18-month limit |
| 4 Rivals, quick | ECC `competitive-platform-analysis` | a free tool that already does the job |
| 5 Stress | Matt Pocock `grilling` | failure-pattern table |
| 6 Gate | emotix `validate-idea`, startup-skill verification agent (`skills/startup-design/references/verification-agent.md`) | gate meanings (go, change, drop), missing evidence is not a drop |
| 7 Rivals, full | startup-skill `startup-competitors` | prices dated, from own pages |
| 8 Region | ECC `market-research` | region rules from official pages |
| 9 First users | emotix `go-to-market`, `persona-gen` | a counted list of targets |
| 10 Size | startup-skill sizing, wshobson `market-sizing-analysis` | TAM, SAM and SOM in the chosen region, Low and High, value check |
| 11 Report | none won; stays our review | as now |

### kinso-frontend

| Stage | Runs | Brain checks after |
|---|---|---|
| 0 Existing project | ponytail-audit, Impeccable `document` (`skills/impeccable/reference/document.md`) | as now |
| 1 Research | taste-skill study method | closest rivals captured and measured |
| 2 Know the job | Hallmark pre-flight | hidden-fact questions, design options and motion questions |
| 3 Direction | **Design studio:** `kinso-frontend/tools/draw/draw.py` deals from 4 sources: taste-skill, Hallmark, a real site (awesome-design-md) and StyleSeed. The brain is the **curator**: it drops AI-looking ones and offers clearly different directions. A fresh-context picker scores them (`kinso-frontend/BRAIN.md` step 3 and 5) | no AI layouts, sameness check on screenshots and against the last 3 jobs in the design log, client limits, no empty picture boxes |
| 4 Plan | frontend-design, Addy Osmani planning | build order, fallbacks for missing material |
| 5 Copy | taste-skill copy, humanizer | approved wording never changed |
| 6 Build | Hallmark build rules | no build notes on the page, keep the first-screen layout |
| 7 Check | Addy Osmani browser testing | no `href="#"`, slot links real |
| 8 SEO | claude-seo | pages with slots kept out of the index |
| 9 Review | Matt Pocock `code-review` | launch gate with visible slots |
| 10 App screens | UI UX Pro Max (daangn-seed as a reference) | Approve blocked on failed tests, true 0 chart axis |
| 11 Diagrams | Hallmark map-diagram | the section's action kept as a real link |

### kinso-qa (added 2026-10-27; plan in `kinso-qa/PLAN.md`)

Its own skill, called by kinso-build at stages 5, 9 and 11, or used alone (full run, regression run, one scenario). Three tracks (regular, AI wrapper, frontier or own model); a risk-ranked matrix of track x scenario; 2 independent testers per high cell; seeded edge cases and "break it" personas from `kinso-qa/banks/`.

| Stage | Runs | Brain checks after |
|---|---|---|
| 0 Intake and test map | Anthropic `testing-strategy`, gstack `test-audit` | every criterion and outside API on the map; hosts only from `qa/HOSTS.md` |
| 1 Test plan | Jeff `test-master`, pypict `pict-test-designer` | pairwise coverage counted; draws recomputable from the seed |
| 2 Frontend | kinso-frontend stage 7; Anthropic `webapp-testing`, gstack `qa-only`, ECC `e2e-testing`, Jeff `playwright-expert` (deal 2) | 2 browsers and 2 widths per criterion; findings reproduced |
| 3 API | LambdaTest `api-to-testcase-generator`, `api-mocking`; ECC `contract-first`; ToB `property-based-testing`; Anthropic `silent-failure-hunter` | outside APIs always stubbed |
| 4 Data | Jeff `database-optimizer`, ECC `database-migrations` | test copy only; migrations up, down, up |
| 5 Cloud and config | ECC `production-audit`, `canary-watch`; Anthropic `deploy-checklist`; Jeff `sre-engineer` | no real keys; health check fails when the database is down |
| 6 Load and timeouts | k6 (telemetry off, see `kinso-qa/TOOLS.md`), ECC `benchmark`, Jeff `chaos-engineer` | never a host we do not own; thresholds fail the run |
| 7 Region | ECC `i18n-sync`, locale captures | data-law facts only from `business/` |
| 8a AI evals / 8b model evals | ECC `eval-harness`, `ai-regression-testing`, `agent-eval`; wshobson `llm-evaluation`; gstack `eval-plan`; promptfoo skills (no `--remote`) | stub in tests, local model only, drift bar |
| 9 Security | kinso-build stage 8 skills, never copied | as kinso-build stage 8 |
| 10 Mobile | LambdaTest `flutter-testing`, `detox`, `espresso`, `xcuitest`, `appium` (local parts only) | no cloud devices |
| 11 Report | ECC `verification-loop`, Addy `test-driven-development`, Anthropic `pr-test-analyzer` | go or no-go; one failing regression test per bug |

### kinso-business, kinso-build and kinso-promote

- Built the same way. Their stage tests picked the skill for each stage. The picks are in each skill's `SKILL.md` and `references/NN-*.md`; results in `<kinso-skill>/tests/new/RESULTS.md`.

## Where the skills live (done 2026-10-27)

Each Kinso skill holds its own copy of the real skills it runs, under `skills/`. Counts on 27 October 2026 (folders in each `skills/`):

| Kinso skill | Entries in `skills/` |
|---|---|
| kinso-validate | 28 |
| kinso-business | 40 |
| kinso-build | 95 |
| kinso-frontend | 33 |
| kinso-promote | 33 |
| kinso-qa | 48 (list in `kinso-qa/SKILLS.md`) |
| **All** | **277** |

kinso-qa includes 4 new repos scanned and saved for it: LambdaTest agent-skills, pypict-claude-skill, promptfoo's plugin folder, Anthropic claude-plugins-official.

Each copy is unchanged from the scanned and pinned copy in `vendor/`. It holds a `LICENSE` and a `SOURCE.md` (repo, commit and path). `vendor/` keeps the whole repos and stays the source for any rescan. After a `vendor/` update and rescan, the copies are refreshed from it.

The skills once listed as "still to find" are now all copied:
- startup-skill's verification agent: `kinso-validate/skills/startup-design/references/verification-agent.md`;
- Addy Osmani `idea-refine`, `mom-test` and gstack `office-hours`: in `kinso-validate/skills/`;
- Impeccable `document`: `kinso-frontend/skills/impeccable/reference/document.md`;
- humanizer: in `kinso-frontend/skills/` and `kinso-promote/skills/`.

## What changes in the files

- Each `references/NN-*.md` becomes short:
  - **Runs:** which skill, with its path;
  - **In:** what to pass in;
  - **Checks:** the check list from our tests;
  - **Out:** the output files.
- The current rewritten text moves to `references/rewrite/`, for comparison, until the tests below prove the new way.
- `NOTICE.md` lists each skill used, with its licence and author. If a Kinso skill is ever shared, the vendor files go with it under their own licences. Note: react-bits is MIT plus a "no resale" clause. **Not done yet:** no Kinso skill has a `NOTICE.md` on 27 October 2026.

## Test before switching

- For each stage, 2 cases: **conductor** (real skill plus our checks) vs **our rewrite**, on Sonnet, scored blind. Design stages also get an "AI look" score.
- Order:
  1. kinso-frontend stage 3 (the studio test you approved);
  2. the rest of kinso-frontend;
  3. kinso-validate, after its web-stage check finishes.
- A stage switches when the conductor scores at least as well as the rewrite (a gap under 0.5 is noise), or better on AI look.
- **Which skills have a rewrite baseline** (27 October 2026):
  - kinso-validate: yes, 12 stage files in `references/rewrite/`.
  - kinso-frontend: yes, 12 stage files in `references/rewrite/`.
  - kinso-business: no. `references/rewrite/` holds only a `README.md` ("no rewritten stage files").
  - kinso-build, kinso-promote, kinso-qa: no. They have no `references/rewrite/` folder.
  - For these 4 skills the "conductor vs rewrite" comparison cannot run. Their stages are judged on the pass line in `TEST-NEW-SETUP.md` and, when in doubt, against plain Claude only.

## How we validate the new setup (all 6 skills)

The same loop as before: test, find what fails, fix one small thing, test again. The 6 skills: kinso-validate, kinso-business, kinso-build, kinso-frontend, kinso-qa and kinso-promote.

1. **Small test per stage:** 1 or 2 cases, with Sonnet runs. Protocol: `TEST-NEW-SETUP.md`.
   - **Automatic checks:** every fact has a source, an input or a [Guess] tag; hidden answer keys are found; guards hold (free only, no `-contributor` models, never post or deploy, no secrets); links, contrast and layout pass; and for kinso-build, the tests pass and the app starts.
   - **The brain's pick is recorded.** `picks/<kinso-skill>/NN-PICK.md` shows the dealt options, the scores and the reason, so a bad pick can be traced.
   - **You look** at anything visual or written for people: designs, posts, the README.
2. **Blind comparison only when in doubt:** the new setup vs the old rewrite (kept in `references/rewrite/`, validate and frontend only) vs plain Claude, on the same case, scored by a scorer who wrote no run.
3. **Fix log.** Each failure goes in `<skill>/FIXES.md`: the stage, what failed, and the fix. Fixes go into the brain, the guards or the checks, never into the vendor skills. Then only that stage is re-run.
4. **Regression set.** The checks from earlier fixes stay as a short list in `<skill>/tests/REGRESSION.md` (all 6 skills have one), run after every change, so an old fault cannot come back.
5. **End to end.** See the test plan below.
6. **Hidden answer keys** exist for kinso-validate and kinso-business (cases A to F). kinso-build has an expected-behaviour list per case (`kinso-build/tests/cases.md`). kinso-promote has a list of claims that must not appear and facts that must.

## End-to-end test plan

**Goal.** One job runs through all 6 skills in one job folder, on real output from the skill before it. No skill has been tested on real handoff output yet (ENG review R8).

**The chain under test**
- kinso-validate -> kinso-business -> kinso-build.
- kinso-build calls kinso-frontend at stage 6 and kinso-qa at stages 5, 9 and 11.
- The qa loop: kinso-qa writes `qa/BUGS.md`. kinso-build stage 9 (`kinso-build/references/09-debug-qa.md`) fixes each bug marked "kinso-build stage 9". It sends the rest to the stage named. Then kinso-qa runs its regression set once.
- kinso-build -> kinso-promote.

**Cases and order**
1. **Case D, regular track** (certificate date tracker, UK). Inputs from `kinso-business/tests/inputs/D/`.
2. **Case F, AI track** (hackathon judging with a feedback summary). Runs only after D passes.
- Note: the stage-test verdict for both D and F was DROP (`kinso-build/tests/cases.md:23,49`). The answer file decides what the founder says at the gate. If the founder goes on, that is logged in `OVERRIDES.md`.

**Who runs it**
- One orchestrator session. Only it starts runners and judges (`kinso-build/BRAIN.md:16-20`).
- Runners: Sonnet everywhere for this run (CEO review Q5). Haiku is a later, separate run.
- Runner rules: the shared rules in `TEST-NEW-SETUP.md` step 3, including FILE blocks for report files.

**Fixed answers at stop points**
- The stand-in founder answers only from `kinso-build/tests/e2e/D/ANSWERS.md` (and `.../F/ANSWERS.md` for case F). One answer per stop point, for all 6 skills (about 37 stop points, ENG review R8).
- The file is hidden from runners, like `tests/hidden/`. Only the orchestrator reads it.
- A stop point with no answer in the file: stop the run and report. Never invent an answer.
- Not written yet.

**Token cap per skill and the stop rule**
- First caps, per case. Set from the stage tests (kinso-qa used about 1.4 million tokens per case, `kinso-qa/tests/new/RESULTS.md:92`). Change them if you want.

| Skill | Cap per case |
|---|---|
| kinso-validate | 4 million tokens |
| kinso-business | 2.5 million |
| kinso-build (without frontend and qa) | 3 million |
| kinso-frontend | 2.5 million |
| kinso-qa | 2 million |
| kinso-promote | 1.5 million |

- The orchestrator adds up each skill's tokens after every stage.
- At 80% of a cap: write a warning line in `RUN-LOG.md` and go on.
- If the next stage would pass the cap: **stop**. Do not start the next stage. Write the stop report in `RUN-LOG.md` (skill, stage, tokens used, what is left) and ask you.
- Also stop and report on: a guard broken, a stop point with no fixed answer, or a handoff file missing.

**Run record: `<job>/RUN-LOG.md`**
- Written by the orchestrator only, never by a runner.
- One row per stage: skill, stage, agent ids (runners and judge), tokens, minutes, collector calls, outcome (pass, fail, stopped).
- One total row per skill and one for the case.
- The stop report, if any.

**Regression contract.** All must hold for a pass.
1. One pick path per skill: every PICK file is under `picks/<skill>/`. No file sits directly under `<job>/picks/`.
2. Collector count per stage under its budget from the stage table. Until the per-stage counter exists (ENG review R1), the orchestrator notes `.collect-count` before and after each stage in `RUN-LOG.md`.
3. Every item on the "must not make" list is absent from `site/` and `promote/` (checked with grep).
4. kinso-frontend stage 3 (the design studio) ran in the chain, with its `picks/frontend/03-PICK.md`.
5. Every `qa/BUGS.md` item is closed, or carried into `build/LIMITS.md` with the founder's override.
6. Every report file is saved: each FILE block a runner returned is in the job folder, and listed in `PROCESS.md`.
7. All 6 regression lists (`<kinso-skill>/tests/REGRESSION.md`) run after each handoff, not only at the end.

**Other checks** (kept from the earlier list)
- Each handoff file is read, and nothing is researched twice.
- `START.md` is asked once.
- Every override is in `OVERRIDES.md`.
- Each skill's stop points are shown and answered from the answer file.
- The product builds, its tests pass and it starts.
- Tokens and time per skill are in `RUN-LOG.md`.

**Known open faults** (27 October 2026). They are expected. List them in the result so they do not hide new faults. A fault leaves this list only when its fix row is in that skill's `FIXES.md`.
- kinso-promote: "sounds human" still 6 after fixes; needs real voice samples from the owner (`kinso-promote/FIXES.md`). Give the case real voice samples.
- kinso-business: regression check 2 fails with 3 stale lines (`kinso-business/tests/new/RESULTS.md:114`).
- kinso-frontend: usefulness exactly 7 at stages 5, 6, 8 and 11 (`kinso-frontend/tests/new/RESULTS.md:60`).
- kinso-qa: case M-04 still missed; the subagent Write tool refuses report files (`kinso-qa/tests/new/RESULTS.md:111-112`).
- Collector cap of 20 searches per run folder stops research early in a shared job folder (ENG review R1).
- The "must not make" list and `handoff/PRODUCT.md` are not read by kinso-frontend (ENG review R2).
- kinso-build calls kinso-frontend by the "Existing project" way in, so stage 3 may be skipped (ENG review R3).
- PICK and log paths can collide in the shared job folder (CEO review finding 3, ENG review R7).
- Judges are not fully fresh outside kinso-build (CEO review finding 1).
- `~/.kinso/design-log.json` is written outside the job folder (CEO review finding 8).

**Pass line.** The regression contract holds, the other checks pass, no skill passes its cap, and every fault found is either new and logged in `FIXES.md`, or on the known list above.

## Order (yours, 2026-10-27)

1. **Finish the 6 skills:** small stage tests and fixes for validate, business, build, frontend, promote and qa.
2. **Make each skill run on its own:** per-skill commands, task tables, the `/kinso` front door and the record task.
3. **Then the end-to-end test** above: case D, then case F.
4. **Then you go back to your hackathon project.**

Paused for the future: the scheduler (vendor update checks) and the MCP server. Do not start them early.

## Open questions

1. Cost: the design studio now deals from 4 sources (`kinso-frontend/BRAIN.md` step 3). The CEO review suggests keeping 4 and not running 6 designers. Still yours to confirm.
2. Model: Sonnet for the designer runs and Haiku for the rest, or Sonnet everywhere? The first end-to-end run uses Sonnet everywhere.
