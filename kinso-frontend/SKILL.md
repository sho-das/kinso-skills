---
name: kinso-frontend
description: Build or change a web page, landing page, app screen or diagram for a client, stage by stage, from research to a reviewed page, with only true facts and the client's approval at set points. Each stage runs real designer and engineering skills as they are, and a brain around them deals options, picks the best, guards the rules and checks the result. Use for a new page or site, a redesign, app screens (dashboards, lists, settings), or a change to an existing frontend project. Not for backend-only work.
---

# kinso-frontend

Each stage runs the original skills in `skills/`, unchanged, as their own `SKILL.md` says, including their critique loops, fresh-context reviewers and linters. Our part is the brain (`BRAIN.md`): what goes in, what is dealt and picked, the guards, and the checks after. The checks cover facts, accessibility, links, SEO and the launch gate. They never touch style.

## Before anything

1. Read `RULES.md`, then `../BRAIN-CORE.md`, then `BRAIN.md`. They apply to every stage.
2. Pick the way in:
   - **New page:** no site or repo for this job exists yet. Start at stage 1.
   - **Existing project:** the project folder holds a site or app to change. Start at stage 0.
   - **From kinso-build:** kinso-build stage 6 calls this skill with a job folder and a platform target. Run stages 1, 2, 3, 4, 5, 6 (with 10 and 11 inside it), 7, 8 (public pages only) and 9. Skip stage 0; when kinso-build came in by "Existing code", read the `existing/MAP.md` it already made.
     - **Read first,** before stage 1: `handoff/PRODUCT.md`, `handoff/TEST-PAGE.md`, `START.md`, `OVERRIDES.md`, `business/RISK.md` section 5 ("Claims we must not make"), `../RULES-RESEARCH.md`, `build/STACK.md` and `build/SPEC.md`. Facts in these files are never researched or asked again.
     - **Stage 1:** capture only. Take the rivals from `market/RIVALS.md`; do not search for new ones. The aspirational deal runs as written.
     - **Stage 2:** ask only what the files above do not answer. When nothing is missing, there is no question message.
     - **Stage 3:** the studio always runs, with one exception. When kinso-build came in by "Existing code", the current look stays by default, and stage 3 runs only if the user asks for a new look.
     - **Where pages go:** into `<code>/<pages path>`, the path in the platform's row of `build/STACK.md` ("Platforms and build order"). In every stage file, `site/` means that folder on this way in. Notes, picks, design, copy, captures and `PROCESS.md` stay in the job folder, never in `<code>/`.
     - One call per platform target. Stop points are the same as below.
   - Not sure: ask once, "Change this project, or start a new page?" Never ask it when kinso-build is the caller; that is always "From kinso-build".
3. Make a job folder, with `picks/frontend/` inside. Every stage writes its output there (the paths below).

## Stages

| # | Stage | File | Runs (main skills) | Output |
|---|---|---|---|---|
| 0 | Existing project | `references/00-existing.md` | ponytail-audit, Impeccable document | `existing/MAP.md`, `design/DESIGN.md`, `tokens.json` |
| 1 | Research | `references/01-research.md` | taste-skill study, gstack research | `research/RESEARCH.md` |
| 2 | Know the job | `references/02-know-the-job.md` | Hallmark pre-flight, Impeccable init | `research/PRODUCT.md`, `ANSWERS.md` |
| 3 | Direction | `references/03-direction.md` | `tools/draw/draw.py`, then taste-skill, Hallmark, a real site's system or StyleSeed | `design/OPTIONS.md`, then `DESIGN.md`, `tokens.json`, `preview.html` |
| 4 | Plan | `references/04-plan.md` | frontend-design, Addy planning | `plan/PLAN.md` |
| 5 | Copy | `references/05-copy.md` | the designer's copy rules, humanizer | `copy/COPY.md` |
| 6 | Build | `references/06-build.md` | the chosen designer, end to end | `site/` |
| 7 | Check in browser | `references/07-check.md` | Addy browser testing, web-design-guidelines, Impeccable harden | `check/CHECK.md` |
| 8 | SEO and AEO | `references/08-seo.md` | claude-seo and its sub-skills | `seo/SEO.md` |
| 9 | Review | `references/09-review.md` | Matt Pocock code-review, a design reviewer | `review/REVIEW.md` |
| 10 | App screens | `references/10-app-screens.md` | taste-skill app screens, UI UX Pro Max | `app/` |
| 11 | Diagrams | `references/11-diagrams.md` | Hallmark map-diagram | `diagram/` |

Every stage also writes `picks/frontend/NN-PICK.md`. Stages 10 and 11 run inside stage 6; stages 7 and 9 check their output too. On the "Existing project" way in, stage 3 runs only if the client wants a new look. On "From kinso-build", stage 3 runs (see the way in). Stage 8 runs for public pages.

`SKILLS.md` lists every skill, its source and licence. The old rewritten stage files are in `references/rewrite/`, for comparison only.

## Stop for the client's OK

1. **After stage 0** (existing project): the map and the list of what must stay.
2. **Stage 2, ask once:** the questions in one message; wait for the answers.
3. **Stage 3, after the options:** the client picks one direction or a mix. Then, **after stage 3:** the final direction (`preview.html`).
4. **After stage 5:** the copy.
5. **After stage 9:** the verdict and the findings. Nothing is published, committed or merged without the client.

Between these points, go on without asking.

## Tools

- `tools/draw/draw.py`: the stage 3 deal. Runs only during a real job, through the sandbox.
- `tools/capture.mjs`: screenshots and measures. `tools/sandbox/run.sh <job> node tools/capture.mjs "<file:// URL>" <out folder> <label> <locale> 45`. One capture at a time.
- `tools/runner/run_stage.py`: runs one stage with any OpenAI-compatible model. See `AGENTS.md`.
- Every script, ours or a skill's, runs only through `tools/sandbox/run.sh`. A skill's script (from `skills/` or `vendor/`) runs only if a stage file names it and it passed our scan (`../BRAIN-CORE.md` section 8 item 7, user's call 2026-10-27). No other vendor script ever runs.

## Memory across jobs

`$KINSO_HOME/design-log.json` (default `<Kinso root>/home/`; tests point it into the run folder) holds each job's direction fingerprint. Stage 3 reads it before the pick and the brain adds one entry after the client's pick. See `BRAIN.md`.

## Every job ends with

- `review/REVIEW.md` with a verdict: ship, fix or rebuild.
- `OVERRIDES.md`, the `picks/frontend/` folder and `PROCESS.md` (clashes and fixes).
- A list of open slots and questions for the client.
- A list of every changed file (existing project).
