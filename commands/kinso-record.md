---
description: Record a demo video of the locally built app - Playwright recording, zoom, cursor, highlights, title, Kokoro voice-over, Remotion render
argument-hint: job=<optional, default kinso/> code=<code folder> voice=<af_heart|am_michael|pf_dora|pm_alex> size=<landscape|portrait|both>
disable-model-invocation: true
---

# /kinso-record

Kinso root: `{{KINSO_ROOT}}`. Every Kinso path below is absolute. A path that starts with `<job>` or a job file name (`handoff/`, `promote/`) is inside the job folder.

- **Works from any folder.** The job folder is always `<project>/kinso/`, in the project folder you are in. One project, one job. `<job>` below means that folder. On every `run.sh` line, set `KINSO_ALLOWED_ROOTS=<project folder>` first, for example `KINSO_ALLOWED_ROOTS="$PWD" "{{KINSO_ROOT}}/kinso-frontend/tools/sandbox/run.sh" "<job>/<run folder>" <command>`.
- **One Kinso folder per project.** Everything Kinso makes goes under `<project>/kinso/`. Each skill keeps its own subfolder inside it (`validate/`, `business/`, `build/`, `picks/`, `handoff/`). Update `<project>/kinso/JOB.md` at every stop point.
- **Guards still hold outside the Kinso folder.** If this project has no Kinso guard hook in `.claude/settings.json`, follow the guards in the skill files by hand: no `rm`, scripts only through `run.sh`, web only through `collect.sh`, no WebFetch or WebSearch.
- **Clear English.** Talk to the user in clear English (the `clear-english` skill): short bullets, common words, one idea per sentence, no em dashes. The same goes for Kinso's own notes (`PROCESS.md`, PICK files, questions). Client-facing copy keeps the voice its skill and brief set.


Arguments given: $ARGUMENTS

## 1. Read the arguments

- `job=` optional; default `<project>/kinso/`. It must hold `promote/video/SCRIPT.md` and `SHOTS.md` (kinso-promote stage 8).
- `code=` the app's code folder, with `RUN.md` or a README that says how to start it.
- `voice=` default `af_heart`. Also `am_michael` (English, male), `pf_dora` and `pm_alex` (Portuguese; pass `pt-br` as the language to `reel_voice.py`).
- `size=` default `both`: 1920 x 1080 and 1080 x 1920.
- Anything missing: ask once, then wait.

## 2. Read, in this order

1. `{{KINSO_ROOT}}/RULES-RESEARCH.md` (root), section 4.
2. `{{KINSO_ROOT}}/kinso-promote/SKILL.md` "Tools and limits", and `{{KINSO_ROOT}}/kinso-promote/BRAIN.md`.
3. `{{KINSO_ROOT}}/commands/RECORD-TASK.md`. Follow its steps 0 to 7.
4. `{{KINSO_ROOT}}/kinso-promote/skills/ui-demo/SKILL.md`, for discover, rehearse, record and the cursor overlay.
5. `{{KINSO_ROOT}}/kinso-promote/references/08-video.md`, for the shot and caption rules.
6. `{{KINSO_ROOT}}/kinso-promote/tools/INSTALLED.md`, for the tool versions and limits.
7. In the job folder: `handoff/PROMOTE-BUILD.md`, `promote/FACTS.md`, `promote/MUST-NOT.md`, `promote/MESSAGE.md`, `promote/AUDIENCE.md`, `promote/video/`.

## 3. Steps

Preflight, discover, plan, rehearse, record, voice, compose and render, check. Details, In and Out: `{{KINSO_ROOT}}/commands/RECORD-TASK.md` and `{{KINSO_ROOT}}/commands/TASK-TABLES.md` "kinso-record".

## 4. Stop points

1. After preflight: the app URL, the shots, the voice, the length, and the tool OK.
2. After the plan: the shot plan and every voice line.
3. After the check: the final video. The user posts by hand.

## 5. At every stop point

- Show `PREFLIGHT.md`, `PLAN.md`, `voice.script.json` or `CHECK.md` as text blocks (path as heading, full file in a fenced block).
- Give video and image paths. Never upload them anywhere.

## 6. Guards (never break these)

- Local only: the app on `127.0.0.1`. No live, staging or rival site.
- No login on real accounts. Test accounts from the project's seed file only.
- No posting, uploading, scheduling or sharing.
- Free only. Never a Remotion `licenseKey`. No paid voice or stock media.
- No installs without the user's OK.
- Every command only through `{{KINSO_ROOT}}/kinso-frontend/tools/sandbox/run.sh`.
- One large local model at a time: `pgrep -fl "ollama serve|mflux-generate|mlx_wan"` must print nothing. Kokoro is exempt.
- Every caption and voice line traces to `promote/FACTS.md`. Nothing from `promote/MUST-NOT.md`.
- Never a `-contributor` model.
- Nothing deleted. Re-runs write a new numbered folder.
