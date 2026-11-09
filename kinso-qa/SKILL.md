---
name: kinso-qa
description: Test an app all the time, not once - map what it has, rank the risks in a matrix (track x scenario), test each risky area with two independent testers and seeded edge cases, hand bugs back in a fixed format, keep a regression set that runs on every change, and end with a go or no-go. Three tracks - regular app, AI app on a model wrapper (evals, prompt injection, wrong answers, model down, cost caps, drift), and frontier or own model (benchmarks, safety evals, regression across versions). Scenarios - frontend, API, database, cloud and config, load and timeouts, region, security, mobile. Each stage runs real testing skills as they are, and a brain around them deals, draws, picks, guards and checks. Called by kinso-build at stages 5, 9 and 11, or used alone for a full run, a regression run after a change, or one scenario (for example "load test the API" or "check this app in Hindi"). Never tests production, never load-tests a host you do not own, never fixes or commits.
---

# kinso-qa

Each stage runs the original skills in `skills/`, unchanged, as their own `SKILL.md` says. Our part is the brain (`BRAIN.md`): what goes in, what is dealt and drawn, the pick, the guards and the checks after. QA reports; it never fixes the app. Bugs go back to kinso-build in `qa/BUGS.md`.

`PLAN.md` holds the reasons. `SKILLS.md` lists every skill, its stage, source and licence. `CANDIDATES.md` holds the market search. `TOOLS.md` holds the load tool and other tools. Banks for the draws: `banks/`. Test cases: `tests/cases.md`.

## Before anything

1. Read `../RULES-RESEARCH.md`, then `../BRAIN-CORE.md`, then `BRAIN.md`. They apply to every stage.
2. Pick the way in:

| Way | You give | Stages |
|---|---|---|
| **From kinso-build, stage 5** | The job folder after kinso-build stage 4 | 0 and 1; hand `qa/TEST-PLAN.md` back |
| **From kinso-build, stage 9** | The job folder and the running code | 0 (refresh), 2 to 10 on high and medium cells, 11 |
| **From kinso-build, stage 11** | The job folder before ship | Regression run, 5, 11 |
| **Full run** | A project folder and how to start it | 0 to 11 |
| **Regression run** | A job folder with `qa/regression/`, and the change | Regression set, the stages the change touches, 11 |
| **One scenario** | One job, for example "load test the API" | 0 (short), that stage, 11 (short) |

Not sure which: ask once, "Full test, regression run, or one scenario?"

3. Make `<job>/qa/` with `options/`, `runs/`, `regression/` inside, and `<job>/picks/qa/`. Add a row to `qa/RUNS.md`.

## Start questions

Read `START.md`, `build/STACK.md`, `build/SPEC.md`, `<code>/RUN.md`, `OVERRIDES.md` and any earlier `qa/` first. Ask only what is missing, as a form (AskUserQuestion in Claude Code; a numbered form elsewhere), as `references/00-intake.md` says: track, platforms, where to test (local only is recommended; production is never offered), regions, installs.

## Stages

| # | Stage | File | Runs (main skills) | Output |
|---|---|---|---|---|
| 0 | Intake and test map | `references/00-intake.md` | testing-strategy, test-audit | `qa/INTAKE.md`, `TEST-MAP.md`, `HOSTS.md` |
| 1 | Test plan, risk-ranked matrix | `references/01-test-plan.md` | test-master, pict-test-designer, bank draws | `qa/TEST-PLAN.md`, `MATRIX.md` |
| 2 | Frontend | `references/02-frontend.md` | kinso-frontend stage 7; deal 2 of webapp-testing, qa-only, e2e-testing, playwright-expert; click-path-audit, accessibility, screen-reader-testing | `qa/FRONTEND.md`, `screens/` |
| 3 | API and backend | `references/03-api.md` | deal 2 of api-to-testcase-generator, contract-first, property-based-testing; api-mocking; silent-failure-hunter | `qa/API.md` |
| 4 | Database and queries | `references/04-data.md` | database-optimizer, database-migrations, property-based-testing | `qa/DATA.md` |
| 5 | Cloud and config | `references/05-config.md` | production-audit, deploy-checklist, canary-watch, sre-engineer | `qa/CONFIG.md` |
| 6 | Load and timeouts | `references/06-load.md` | k6 (`TOOLS.md`), ecc-benchmark, performance-optimization, chaos-engineer, error-handling | `qa/LOAD.md` |
| 7 | Region | `references/07-region.md` | i18n-sync, locale captures, property-based-testing on dates | `qa/REGION.md` |
| 8a | AI evals (wrapper track) | `references/08a-ai-evals.md` | eval-harness, llm-evaluation, ai-regression-testing, promptfoo skills (if approved) | `qa/AI-EVALS.md`, `evals/` |
| 8b | Model evals (frontier track) | `references/08b-model-evals.md` | eval-plan, eval-harness, llm-evaluation, agent-eval | `qa/MODEL-EVALS.md`, `evals/` |
| 9 | Security | `references/09-security.md` | kinso-build stage 8 skills (never copied), plus dynamic tests | `qa/SECURITY.md` |
| 10 | Mobile | `references/10-mobile.md` | flutter-testing, detox, espresso, xcuitest, appium; accessibility, screen-reader-testing | `qa/MOBILE.md` |
| 11 | Report and regression set | `references/11-report.md` | verification-loop, addy-test-driven-development, pr-test-analyzer, test-master | `qa/REPORT.md`, `BUGS.md`, `regression/` |

Every stage also writes `picks/qa/NN-PICK.md` (template in `BRAIN.md`) and adds to `qa/PROCESS.md`. Stages 2 to 10 run only for cells stage 1 ranked high or medium.

## Stop for the founder's OK

1. **After stage 0:** the map, the hosts we may test, and any install (k6, promptfoo, emulator or simulator).
2. **After stage 1:** the test plan and the matrix.
3. **Stage 6, before any load run on a host other than `127.0.0.1`:** host, owner, peak load, duration, stop rule, in writing.
4. **Before any test on production or real user data:** a written OK naming the host and the data. Without it, the test is planned, not run.
5. **Stage 8b, before a long eval run:** the plan, the time and any cost.
6. **Stage 9:** a security finding that needs a decision.
7. **After stage 11:** go or no-go, and the bugs that go back to kinso-build.

Between these points, go on without asking.

## Handoffs

- **In, from kinso-build:** `build/SPEC.md`, `build/STACK.md`, `build/API.md`, `build/DATA-MODEL.md`, `build/AI.md`, `<code>/RUN.md`, `OVERRIDES.md`. Read, never researched again.
- **Out, to kinso-build:** `qa/TEST-PLAN.md` (to stage 5), `qa/BUGS.md` in the fixed format (to stage 9), `qa/REPORT.md` with the verdict (to stages 10 and 11).
- **Out, to kinso-frontend:** none. kinso-qa runs kinso-frontend's stage 7 checks in place.
- **Out, to kinso-promote:** `qa/REPORT.md` "Not tested" and the open bugs feed `handoff/PROMOTE-BUILD.md` limits (through kinso-build stage 11).

## Tools

- `../kinso-frontend/tools/sandbox/run.sh <run folder> <command>` - every test, script, dev server, Playwright run, k6 and promptfoo run. The project hook blocks `python3`, `node` and `npx` elsewhere. The run folder must sit inside the Kinso folder. For client code elsewhere, put that folder on the same line: `KINSO_ALLOWED_ROOTS=/path/to/client-code ../kinso-frontend/tools/sandbox/run.sh ...`. Never `~` or `/`. Temp files go to `<run folder>/.tmp`; `/private/tmp` is not writable. Add `--no-net` when the step needs no network.
- `../kinso-frontend/tools/capture.mjs` - screenshots per width and locale (see `../kinso-build/SKILL.md` "Tools" for the `NODE_PATH` and `PLAYWRIGHT_BROWSERS_PATH` line).
- `../tools/ollama/` - the free local model, only under `no-net.sb` (as `../kinso-build/SKILL.md` says). Installed models on this Mac: `llama3.2`, `gemma3`.
- k6 and promptfoo: only after the founder's OK (`TOOLS.md`), with telemetry off.
- `../tools/collect/collect.sh` - docs from the web, at its own pace.

## Every run ends with

- `qa/REPORT.md` with a verdict: go, go with limits, or no-go.
- `qa/BUGS.md` in the fixed format, and `qa/regression/` grown by one failing test per new bug.
- `OVERRIDES.md`, `picks/qa/`, `qa/PROCESS.md` (clashes, skips).
- Nothing deleted, committed, pushed or deployed. No host tested that is not in `qa/HOSTS.md`.
