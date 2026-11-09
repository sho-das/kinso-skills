---
name: kinso-build
description: Turn a product brief (first version, riskiest assumption, metric, limits) into a working, tested first version, stage by stage - platform and stack (web, Android, iOS; language, backend, database, cloud, chosen by the founder in a form), spec, plan, data model, tests first, small build steps, AI feature, security, QA, a fresh review, and a ship-ready handoff. Each stage runs real engineering skills as they are, and a brain around them deals or rotates them, picks the best result, guards the rules and checks the result. Calls kinso-frontend for every page and screen. Use after kinso-business hands over handoff/BRIEF.md, to change an existing project from a short brief, or for one stage alone (for example "security check this repo" or "review this branch"). Never pushes, deploys, commits or merges without the founder's OK.
---

# kinso-build

Each stage runs the original skills in `skills/`, unchanged, as their own `SKILL.md` says. Our part is the brain (`BRAIN.md`): what goes in, what is dealt or rotated and picked, the guards, and the checks after. The checks cover facts, tests, security, limits, accessibility and the guards. They never touch code style.

`SKILLS.md` lists every skill, its stage, source and licence. `PLAN.md` holds the reasons behind each stage. Test cases: `tests/cases.md`.

## Before anything

1. Read `../RULES-RESEARCH.md`, then `../BRAIN-CORE.md`, then `BRAIN.md`. They apply to every stage.
2. Pick the way in:

| Way | You give | Stages |
|---|---|---|
| **From the chain** | A job folder with `handoff/BRIEF.md` (and `business/`, `OVERRIDES.md`) | 0 to 11 (7 only on the AI track) |
| **Existing code** | A project folder plus a short brief of the change | 0, then kinso-frontend stage 0 (map), then 1 (confirms the stack the code already uses) to 11 |
| **One stage** | One job, for example "security check this repo" | That stage only, with its guards and checks |

Not sure which: ask once, "Build from the brief, or change this project?"

3. Make `<job>/build/` with `options/` and `runs/` inside, and `<job>/picks/build/`.

## Start questions

Ask only what `START.md`, `handoff/BRIEF.md`, `business/` and `OVERRIDES.md` do not hold. One message, then wait.

1. **Where the code lives:** a new folder (path), or an existing repo.
2. **Git:** may the skill make local commits on a new branch as checkpoints? Default: no. Without a yes, nothing is committed.

Platforms, mobile approach, language, backend, database, cloud, login and (AI track) the model host and the AI architecture are not start questions. Stage 1 asks them as a form, with options, reasons and a recommendation (`references/01-platform-stack.md`). Platforms are pre-filled from `START.md` (kinso-business start question 6) or `handoff/BRIEF.md`; the form shows them once as "Already chosen" and does not ask again.

## Stages

| # | Stage | File | Runs (main skills) | Output |
|---|---|---|---|---|
| 0 | Intake and guards | `references/00-intake.md` | constraint-driven-development, search-first | `build/INTAKE.md`, `CONSTRAINTS.md`, `GUARDS.md` |
| 1 | Platform and stack | `references/01-platform-stack.md` | the brain deals 2 or 3 stack combinations; the founder picks in a form; cloud-architect for the hosting plan; AI track: the AI architecture block (build approach, pattern, model access, long jobs, RAG data) | `build/STACK.md` (with "AI architecture" on the AI track) |
| 2 | Spec | `references/02-spec.md` | deal 2: spec-driven-development, brainstorming, feature-forge, spec | `build/SPEC.md` |
| 3 | Plan and tasks | `references/03-plan.md` | deal 2: planning-and-task-breakdown, writing-plans, blueprint; then plan-eng-review or doubt-driven-development | `build/PLAN.md`, `tasks/`, `DEPENDENCIES.md` |
| 4 | Data model and backend | `references/04-data-model.md` | domain-modeling; deal 2: api-and-interface-design, api-design, api-designer; the database and backend skills from `STACK.md` | `build/DATA-MODEL.md`, `API.md` |
| 5 | Tests first | `references/05-tests-first.md` | **kinso-qa** stages 0-1 (test map, risk matrix); rotate: tdd, sp- or addy-test-driven-development; property-based-testing; the language skill from `STACK.md` | `tests/`, `build/TEST-PLAN.md` (reads `qa/TEST-PLAN.md`, which kinso-qa stage 1 writes and owns) |
| 6 | Build in small steps | `references/06-build.md` | rotate: incremental-implementation, executing-plans, subagent-driven-development; the language and platform skills from `STACK.md`; **kinso-frontend** ("From kinso-build") with the platform target | the code, `build/PROGRESS.md` |
| 7 | AI feature (AI track) | `references/07-ai-feature.md` | eval-harness, prompt-engineer, cost-aware-llm-pipeline, ai-regression-testing; the pattern skills from `STACK.md` "AI architecture" (RAG, agent, WebSocket, fine-tune) | `build/AI.md`, `evals/`, the model adapter and call log |
| 8 | Security | `references/08-security.md` | deal 2: security-and-hardening, security-review, vibesec, insecure-defaults; fp-check | `build/SECURITY.md` |
| 9 | Debug and QA | `references/09-debug-qa.md` | rotate: systematic-debugging, diagnosing-bugs; webapp-testing; **kinso-qa** stages 2-11 (bugs back in `qa/BUGS.md`) | `build/QA.md`, `screens/`, `qa/` |
| 10 | Review | `references/10-review.md` | deal 2: code-review, requesting-code-review or code-review-and-quality; spec-to-code-compliance | `build/REVIEW.md` |
| 11 | Ship ready and handoff | `references/11-ship.md` | shipping-and-launch, observability, ci-cd, deployment-patterns; the cloud skills from `STACK.md`; **kinso-qa** regression run and go or no-go | `README.md`, `build/DEPLOY.md`, `LIMITS.md`, `handoff/PROMOTE-BUILD.md` |

Every stage also writes `picks/build/NN-PICK.md` (template in `BRAIN.md`) and adds to `build/PROCESS.md`.

## Stop for the founder's OK

1. **After stage 0:** where the code lives, commit permission, gaps in the brief.
2. **Stage 1, the form:** platforms (pre-filled from `START.md`, shown as "Already chosen"), mobile approach, language, backend, database, cloud, login, (AI track) model host and the AI architecture block; build order and "all now or one first". Wait for the founder's choices.
3. **After stage 2:** the spec.
4. **After stages 3 and 4:** the plan, the data model and the new dependencies.
5. **Stage 7, AI track:** a fine-tune training run needs an OK; "train your own model" stops with a research plan only.
6. **After stage 8:** any security finding that needs a decision.
7. **After stage 10:** the verdict.
8. **Before any push, deploy, PR, merge, commit or install.** One OK per action. Also before the supabase `.mcp.json` step.

Between these points, go on without asking.

## Handoffs

- **In, from kinso-business:** `handoff/BRIEF.md` (first version, riskiest assumption, metric, limits) and `handoff/PRODUCT.md`, plus `business/` and `OVERRIDES.md`. Read, never researched again.
- **Out, to kinso-frontend (stage 6):** way in "From kinso-build", with `build/SPEC.md`, `build/STACK.md`, `handoff/PRODUCT.md`, `handoff/TEST-PAGE.md`, `OVERRIDES.md` and `business/RISK.md`, and the platform target and pages path from `STACK.md` (web, Flutter, React Native, Android Kotlin or iOS Swift). Pages go in `<code>/<pages path>`, never `<job>/site/`. One call per platform, in the build order from `STACK.md`. Its stage 10 for app screens. kinso-frontend keeps its own brain and stop points.
- **Out, to kinso-promote (stage 11):** `handoff/PROMOTE-BUILD.md` - what was built, real screenshots from `build/screens/`, real limits, the metric, how to try it.

## Tools

- `../kinso-frontend/tools/sandbox/run.sh <run folder> <command>` - every script, test run and dev server. The project hook blocks `python3` or `node` anywhere else: start the command line with `run.sh`, and do not wrap it in a subshell, `bash -c` or a heredoc. Put a script in a file first, then run the file through `run.sh`. A background server: `run.sh <run folder> python3 <server file> &` on its own line. The run folder must sit inside the Kinso folder. For client code elsewhere, put that folder on the same line: `KINSO_ALLOWED_ROOTS=/path/to/client-code ../kinso-frontend/tools/sandbox/run.sh ...`. Never `~` or `/`. Temp files go to `<run folder>/.tmp`; `/private/tmp` is not writable. Add `--no-net` when the step needs no network.
- `../kinso-frontend/tools/capture.mjs` - real screenshots, through the sandbox. The sandbox clears the environment, so set the two paths on the same line, or the browser does not start: `NODE_PATH="<folder holding node_modules/playwright>" PLAYWRIGHT_BROWSERS_PATH="$HOME/Library/Caches/ms-playwright" ../kinso-frontend/tools/sandbox/run.sh <run folder> node ../kinso-frontend/tools/capture.mjs "http://localhost:<port>/" <out folder> <label> en-GB 45`. On this Mac, Playwright is in `<a folder holding node_modules/playwright>`. Start the app server first, and stop it after.
- `../tools/ollama/` - the free local model (AI track). Start it only under the no-network profile, never through `run.sh` (its profile allows outbound network, and the server then calls ollama.com). From the Kinso folder: `(env -i HOME="<run folder>/home" OLLAMA_MODELS="$HOME/.ollama/models" OLLAMA_HOST=127.0.0.1:11434 /usr/bin/sandbox-exec -f tools/ollama/no-net.sb tools/ollama/v0.40.2/bin/ollama serve > <run folder>/build/runs/ollama.log 2>&1 &)`. Only one local AI model runs at a time (`../RULES-RESEARCH.md` section 4): check first with `pgrep -fl "ollama serve|mflux-generate|mlx_wan"`. Stop only the server you started, by its pid (`../BRAIN-CORE.md` section 12), and confirm port 11434 is closed. The log should show "connect: operation not permitted" for any outbound call. `../tools/collect/` - library docs from the web.

## Every job ends with

- A working product whose tests pass and which starts from its README.
- `build/REVIEW.md` with a verdict: ship, fix or rebuild.
- `build/STACK.md`, `handoff/PROMOTE-BUILD.md`, `build/LIMITS.md`, `build/DEPLOY.md`.
- `OVERRIDES.md`, `picks/build/` and `build/PROCESS.md` (clashes, skips and fixes).
- Nothing pushed, deployed, committed or merged without the founder's OK.
