# Kinso task tables

DRAFT, 27 October 2026. One table per skill. `/kinso` and each skill command show these tables and mark each row done, skipped or failed.

How to read the columns:

- **In** and **Out**: paths inside the job folder. Out is from each `SKILL.md`. In is from `SKILL.md`, `KINSO-CHAIN.md` section 2 and the stage order. The `references/NN-*.md` files were not read for this draft, so check In against them.
- **Stop**: yes when the skill stops for the user's OK after (or inside) that stage.
- **Minutes** and **tokens**: runner only, from the test results named under each table. Scorers and pickers add about 70k tokens and 0.3 to 1 minute each. A range means several runs or reruns. [Guess] means no run recorded it.
- Every stage also writes a `picks/.../NN-PICK.md` and adds to `PROCESS.md`. Those are left out of the Out column.

## kinso-validate

Source for minutes and tokens: `kinso-validate/tests/new/RESULTS.md`, "Tokens and minutes per stage".

| # | Stage | What it does | In | Out | Stop | Minutes | Tokens |
|---|---|---|---|---|---|---|---|
| - | Start | Start questions once | user | `START.md` | yes | [Guess] 1 | [Guess] 20k |
| 0 | Explore | Finds what a sector complains about or pays for (about 25 web calls) | `START.md` | `explore/TOPICS.md`, `explore/signals.csv` | yes (explore only) | 21.6 | 155k |
| 1 | Brainstorm | Turns rough talk into clear problems and interview questions | `START.md`, `explore/TOPICS.md` | `idea/BRAINSTORM.md`, `idea/QUESTIONS.md` | yes | 2.4 | 104k |
| 2 | Frame | Writes the idea, the five fatal questions and pass or fail numbers | `idea/BRAINSTORM.md` | `idea/IDEA.md`, `idea/ASSUMPTIONS.md` | yes | 2.2 | 95k |
| 3 | Demand | Finds real signals and willingness to pay (15 to 25 calls) | `idea/IDEA.md`, `idea/ASSUMPTIONS.md` | `evidence/SIGNALS.md`, `evidence/signals.csv` | no | 12.6 to 35.4 | 155k to 189k |
| 4 | Quick rivals | Finds rivals, free tools and dead rivals (10 to 15 calls) | `idea/IDEA.md`, `evidence/SIGNALS.md` | `evidence/RIVALS-QUICK.md` | no | 5.4 to 20.8 | 129k to 159k |
| 5 | Stress test | Grills the idea against failure patterns | `idea/`, `evidence/` | `review/STRESS.md` | no | 4.3 | 127k |
| 6 | Gate | Go, change or drop, with a fresh reviewer | `idea/`, `evidence/`, `review/STRESS.md` | `GATE.md`, `review/GATE-REVIEW.md` | yes | 4.1 | 125k |
| 7 | Rivals in depth | Rival products, feature table, better or worse (about 28 calls) | `GATE.md`, `evidence/RIVALS-QUICK.md` | `market/RIVALS.md`, `market/FEATURES.md` | no | 10.7 | 170k |
| 8 | Region and why now | Region rules from official pages (about 12 calls) | `GATE.md`, `START.md` | `market/REGION.md` | no | 4.9 to 6.7 | 128k to 142k |
| 9 | First 100 users | A counted list of places to find first users (about 12 calls) | `market/REGION.md`, `idea/IDEA.md` | `market/DISTRIBUTION.md` | no | 7.6 to 7.7 | 149k to 158k |
| 10 | Market size | TAM, SAM and SOM, Low and High (about 10 calls) | `market/REGION.md`, `market/RIVALS.md` | `market/SIZE.md` | no | 7.9 | 149k |
| 11 | Report and verdict | Joins all files, finds conflicts, 2 fresh reviewers | `idea/`, `evidence/`, `review/`, `market/`, `OVERRIDES.md` | `market/MARKET-REPORT.md`, `VERDICT.md` | yes | 7.1 | 108k |

Full brainstorm run (1 to 11): about 70 to 110 minutes and about 1.5 million runner tokens.

## kinso-business

Source: `kinso-business/tests/new/RESULTS.md`, "Time", "Time (re-run 2)" and "Time (re-run 3)". Run order: 1, 3, 4, 2, 5, 6, 7, 8.

| # | Stage | What it does | In | Out | Stop | Minutes | Tokens |
|---|---|---|---|---|---|---|---|
| - | Start | Asks only what `START.md` lacks: track, founders, money, region, platforms | `START.md`, `VERDICT.md` | `START.md` | yes | [Guess] 1 | [Guess] 20k |
| 1 | Market and pricing | Rival prices, tiers, the price to test (up to 20 calls) | `VERDICT.md`, `market/` | `business/PRICING.md`, `business/NUMBERS.md` | yes | 6 to 8 | about 165k |
| 3 | Cost to build and run | Build and running cost (up to 15 calls) | `business/PRICING.md`, `START.md` | `business/COSTS.md` | no | 6 | about 150k |
| 4 | AI costs (AI track) | Model cost per user, compared (up to 12 calls) | `business/COSTS.md`, `START.md` | `business/AI-COSTS.md` | no | 5 | [Guess] 130k |
| 2 | Unit economics | Per region, from prices and costs (up to 10 calls) | `business/PRICING.md`, `COSTS.md`, `AI-COSTS.md` | `business/UNIT-ECONOMICS.md` | no | 7 to 11 | about 150k |
| 5 | Funding | Bootstrap or raise, from dated facts (up to 12 calls) | `business/UNIT-ECONOMICS.md` | `business/FUNDING.md` | no | 8 to 11 | about 161k |
| 6 | Guards | Legal, platform and limits, from official pages (up to 20 calls) | `business/`, `market/REGION.md` | `business/RISK.md` | yes | 4 per pass, plus 2 to 3 merge | 120k to 130k per pass, 106k merge |
| 7 | First version | What to build first | `business/`, `idea/IDEA.md` | `business/FIRST-VERSION.md` | no | 4 to 5 | about 136k |
| 8 | Decision and handoff | Build, change or stop; 4 handoff files; checks every number | `business/`, `NUMBERS.md`, `OVERRIDES.md` | `business/DECISION.md`, `handoff/BRIEF.md`, `PRODUCT.md`, `TEST-PAGE.md`, `PROMOTE.md` | yes | 5 to 9 | 150k to 231k |

Full run: about 47 to 62 minutes of runner time (the whole first run took about 80 minutes with scorers).

## kinso-build

Source: `kinso-build/tests/new2/RESULTS.md` (case D, regular track) and `kinso-build/tests/new3/RESULTS.md` (case F, AI track). The runners grouped stages, so some rows share one figure.

| # | Stage | What it does | In | Out | Stop | Minutes | Tokens |
|---|---|---|---|---|---|---|---|
| 0 | Intake and guards | Reads the brief; where code lives; commit rule | `handoff/BRIEF.md`, `business/`, `OVERRIDES.md` | `build/INTAKE.md`, `CONSTRAINTS.md`, `GUARDS.md` | yes | 2.0 to 2.6 (with stage 1 form) | 101k to 113k (with stage 1 form) |
| 1 | Platform and stack | Deals 2 or 3 stacks as a form; founder picks | `build/INTAKE.md`, `business/COSTS.md` | `build/STACK.md` | yes (form) | founder 0.3; STACK.md part of next row | founder 61k to 64k |
| 2 | Spec | Deal 2 spec skills | `build/STACK.md`, `handoff/BRIEF.md` | `build/SPEC.md` | yes | 14.5 for stages 1 to 4 | 233k for stages 1 to 4 |
| 3 | Plan and tasks | Deal 2 planners, then a plan review | `build/SPEC.md` | `build/PLAN.md`, `tasks/`, `DEPENDENCIES.md` | yes | (in row above) | (in row above) |
| 4 | Data model and backend | Data model and API design | `build/SPEC.md`, `build/PLAN.md` | `build/DATA-MODEL.md`, `API.md` | yes (with 3) | (in row above) | (in row above) |
| 5 | Tests first | kinso-qa stages 0 and 1, then failing tests | `build/SPEC.md`, `API.md`, `DATA-MODEL.md` | `tests/`, `build/TEST-PLAN.md`, `qa/TEST-PLAN.md` | no | 28.9 for stages 5 and 6 | 243k for stages 5 and 6 |
| 6 | Build | Small steps; kinso-frontend per platform | `build/PLAN.md`, `tasks/`, `tests/` | the code, `build/PROGRESS.md` | no | (in row above) | (in row above) |
| 7 | AI feature (AI track) | Adapter, evals, cost caps | `build/STACK.md`, `business/AI-COSTS.md` | `build/AI.md`, `evals/` | yes (fine-tune only) | 4 to 10 | 171k (with STACK.md) |
| 8 | Security | Deal 2 security skills, then a false-positive check | the code | `build/SECURITY.md` | yes (if a decision is needed) | 16.9 for stages 8 and 9 | 252k for stages 8 and 9 |
| 9 | Debug and QA | Debug skills; kinso-qa stages 2 to 11 | the code, `qa/TEST-PLAN.md` | `build/QA.md`, `screens/`, `qa/` | no | (in row above) | (in row above) |
| 10 | Review | Deal 2 reviewers; spec to code check | the code, `build/SPEC.md`, `qa/REPORT.md` | `build/REVIEW.md` | yes | 7.7 for stages 10 and 11 | 194k for stages 10 and 11 |
| 11 | Ship ready | README, deploy plan, limits; kinso-qa regression run | `build/`, `qa/REPORT.md` | `README.md`, `build/DEPLOY.md`, `LIMITS.md`, `handoff/PROMOTE-BUILD.md` | yes (before any push or deploy) | (in row above) | (in row above) |

Full run (case D, stages 0 to 11): about 70 minutes and 1.1 million runner tokens. kinso-qa time inside stages 5, 9 and 11 is in the kinso-qa table below.

## kinso-frontend

Source: `kinso-frontend/tests/new/RESULTS.md`, "Tokens and minutes per stage".

| # | Stage | What it does | In | Out | Stop | Minutes | Tokens |
|---|---|---|---|---|---|---|---|
| 0 | Existing project | Maps the project and what must stay | the project folder | `existing/MAP.md`, `design/DESIGN.md`, `tokens.json` | yes | 3 | 98k |
| 1 | Research | Closest rivals captured and measured | `START.md`, `handoff/PRODUCT.md` | `research/RESEARCH.md` | no | 9 | 148k |
| 2 | Know the job | Hidden-fact, design and motion questions, asked once | `research/RESEARCH.md`, `handoff/PRODUCT.md` | `research/PRODUCT.md`, `ANSWERS.md` | yes | 2 | about 88k |
| 3 | Direction | Design studio deals options; client picks | `research/`, `ANSWERS.md`, `~/.kinso/design-log.json` | `design/OPTIONS.md`, `DESIGN.md`, `tokens.json`, `preview.html` | yes (twice) | 12 to 14 | 203k to 211k |
| 4 | Plan | Build order and fallbacks | `design/`, `research/PRODUCT.md` | `plan/PLAN.md` | no | 4 to 5 | 95k to 110k |
| 5 | Copy | Page text; approved wording never changed | `plan/PLAN.md`, `research/PRODUCT.md` | `copy/COPY.md` | yes | 4 | about 110k |
| 6 | Build | The chosen designer builds end to end | `design/`, `plan/`, `copy/` | `site/` | no | 7 to 10 | about 200k to 276k |
| 7 | Check in browser | Links, widths, accessibility | `site/` | `check/CHECK.md` | no | 4 | 109k |
| 8 | SEO and AEO | Public pages only; slot pages kept out of the index | `site/` | `seo/SEO.md` | no | 7 | about 150k |
| 9 | Review | Code and design review; launch gate | `site/`, `check/`, `seo/` | `review/REVIEW.md` | yes | 3 to 4 | 107k to 132k |
| 10 | App screens | Dashboards, lists, settings (inside 6) | `design/`, `build/SPEC.md` | `app/` | no | 6 | 207k |
| 11 | Diagrams | Diagrams with real links (inside 6) | `design/`, `copy/` | `diagram/` | no | 6 | about 150k |

Full new page (1 to 9): about 55 to 65 minutes and 1.2 million runner tokens, plus about 70k per picker, client or scorer.

## kinso-qa

Source: `kinso-qa/tests/new/RESULTS.md`. Case R (regular) unless the row says W (AI wrapper) or M (own model).

| # | Stage | What it does | In | Out | Stop | Minutes | Tokens |
|---|---|---|---|---|---|---|---|
| 0 | Intake and test map | Every criterion and outside API on the map; allowed hosts | `build/SPEC.md`, `STACK.md`, `<code>/RUN.md` | `qa/INTAKE.md`, `TEST-MAP.md`, `HOSTS.md` | yes | 1.2 to 3.2 | 91k to 125k |
| 1 | Test plan and matrix | Risk-ranked track x scenario matrix; seeded draws | `qa/TEST-MAP.md`, `banks/` | `qa/TEST-PLAN.md`, `MATRIX.md` | yes | 3.7 to 5.7 | 120k to 154k |
| 2 | Frontend | 2 browsers, 2 widths per criterion | `qa/MATRIX.md`, the running app | `qa/FRONTEND.md`, `screens/` | no | 6.3 to 6.9 | 144k |
| 3 | API and backend | Contract, property and silent-failure tests; APIs stubbed | `build/API.md`, `qa/MATRIX.md` | `qa/API.md` | no | 7.1 to 9.8 | 143k to 178k |
| 4 | Database | Test copy only; migrations up, down, up | `build/DATA-MODEL.md` | `qa/DATA.md` | no | 3.2 to 5.6 | 110k to 144k |
| 5 | Cloud and config | Config, health checks, no real keys | `build/STACK.md`, `build/DEPLOY.md` | `qa/CONFIG.md` | no | 4.2 to 5.4 | 124k to 133k |
| 6 | Load and timeouts | k6 on our own host only | `qa/HOSTS.md`, `qa/MATRIX.md` | `qa/LOAD.md` | yes (any host but 127.0.0.1) | 4.4 to 18.5 | 122k to 168k |
| 7 | Region | Locale captures; dates and data-law facts | `business/RISK.md`, `START.md` | `qa/REGION.md` | no | 6.6 to 6.9 | 147k to 155k |
| 8a | AI evals (W) | Wrapper evals, injection, model down, cost caps | `build/AI.md`, `evals/` | `qa/AI-EVALS.md`, `evals/` | no | 12.4 | 359k |
| 8b | Model evals (M) | Benchmarks, safety, version drift | `build/AI.md` | `qa/MODEL-EVALS.md`, `evals/` | yes (long run) | 8.4 to 10.5 | 139k to 154k |
| 9 | Security | kinso-build stage 8 skills plus dynamic tests | the code | `qa/SECURITY.md` | yes (if a decision is needed) | 5.2 to 8.7 | 117k to 167k |
| 10 | Mobile | Local emulators and simulators only | the mobile build | `qa/MOBILE.md` | no | [Guess] 10 | [Guess] 150k |
| 11 | Report and regression | Go or no-go; one failing test per bug | all of `qa/` | `qa/REPORT.md`, `BUGS.md`, `regression/` | yes | 3.6 to 7.9 | 135k to 181k |

Full run, case R: about 52 minutes and 1.4 million runner tokens. All 3 cases together: about 3.4 hours and 4.1 million tokens.

## kinso-promote

Source: `kinso-promote/tests/new/RESULTS.md`, "Tokens and minutes per stage (runner)" (run 1) and the stage 9 rerun line.

| # | Stage | What it does | In | Out (under `promote/`) | Stop | Minutes | Tokens |
|---|---|---|---|---|---|---|---|
| - | Start | Start questions as a form | `START.md`, `handoff/PROMOTE.md` | `START.md` | yes | [Guess] 1 | [Guess] 20k |
| 0 | Read the job | Facts, must-not list, gaps | `handoff/PROMOTE.md`, `handoff/PROMOTE-BUILD.md`, `market/`, `business/` | `FACTS.md`, `MUST-NOT.md`, `GAPS.md` | no | 1.6 to 1.7 | 90k to 91k |
| 1 | Audience and plan | 2 to 4 audiences; per-platform format, length, times, measure | `FACTS.md`, `market/DISTRIBUTION.md` | `AUDIENCE.md` | yes | 2.4 to 2.5 | 107k to 114k |
| 2 | Message and angle | Deal 3 angles, rival test | `FACTS.md`, `AUDIENCE.md` | `MESSAGE.md`, `CONTEXT.md` | yes | [Guess] 3 | [Guess] 110k |
| 3 | README | Repo README (skipped with no repo) | `MESSAGE.md`, `handoff/PROMOTE-BUILD.md` | `README.md` | no | 1.5 to 2.1 | 89k to 105k |
| 4 | Blog | Launch post and ideas | `MESSAGE.md`, `AUDIENCE.md` | `blog/LAUNCH-POST.md`, `blog/IDEAS.md` | no | 4.5 to 8.0 | 119k to 131k |
| 5 | Social posts | LinkedIn, X, Instagram | `MESSAGE.md`, `AUDIENCE.md` | `social/LINKEDIN.md`, `X.md`, `INSTAGRAM.md` | yes | 6.4 | 156k |
| 6 | Launch plan | Dated plan; press pitch | `AUDIENCE.md`, `social/` | `LAUNCH-PLAN.md`, `PRESS-PITCH.md` | yes (short) | 1.7 to 2.9 | 102k to 126k |
| 7 | Visuals | HTML to PNG with Playwright; alt text | `MESSAGE.md`, real screenshots | `visuals/`, `visuals/ALT-TEXT.md` | yes | 3.8 | 108k |
| 8 | Video script | Script and shot list | `MESSAGE.md`, `handoff/PROMOTE-BUILD.md` | `video/SCRIPT.md`, `video/SHOTS.md` | no | 0.4 to 3.8 | 75k to 129k |
| 9 | Final edit | Humanizer, clear English, fresh reviewer | all of `promote/` | `REVIEW.md`, `LAUNCH-KIT.md` | yes | 1.9 | 112k |

Full run (0 to 9): about 30 to 40 minutes and 1.2 million runner tokens.

## kinso-record (proposed, see `RECORD-TASK.md`)

No test run yet. All figures are [Guess].

| # | Step | What it does | In | Out (under `promote/video/record/`) | Stop | Minutes | Tokens |
|---|---|---|---|---|---|---|---|
| 0 | Preflight | App starts locally; tools present; no other model running | `handoff/PROMOTE-BUILD.md`, `<code>/RUN.md` | `PREFLIGHT.md` | yes (tool OK) | [Guess] 2 | [Guess] 40k |
| 1 | Discover | Lists the real buttons and fields on each page in `SHOTS.md` | `promote/video/SHOTS.md`, the running app | `DISCOVER.md` | no | [Guess] 4 | [Guess] 80k |
| 2 | Plan | Shot timings, zoom points, highlights, title, voice lines | `SCRIPT.md`, `SHOTS.md`, `DISCOVER.md`, `FACTS.md` | `PLAN.md`, `voice.script.json`, `zoom.json` | yes | [Guess] 4 | [Guess] 80k |
| 3 | Rehearse | Runs the Playwright flow without video | `record.mjs` | `REHEARSE.md` | no | [Guess] 3 | [Guess] 50k |
| 4 | Record | Playwright video with cursor overlay | `record.mjs` | `raw/*.webm`, `raw/*.mp4` | no | [Guess] 3 | [Guess] 40k |
| 5 | Voice | Kokoro voice track and timing | `voice.script.json` | `voice.wav`, `voice.timing.json` | no | [Guess] 2 | [Guess] 30k |
| 6 | Compose and render | Remotion: zoom, highlights, title, captions, voice | `raw/`, `voice.*`, `zoom.json` | `out/demo.mp4`, `out/cover.png` | no | [Guess] 6 | [Guess] 100k |
| 7 | Check | Facts, must-not, length, size, nothing private on screen | `out/`, `FACTS.md`, `MUST-NOT.md` | `CHECK.md` | yes (final) | [Guess] 3 | [Guess] 60k |
