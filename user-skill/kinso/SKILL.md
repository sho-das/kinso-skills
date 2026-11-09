---
name: kinso
description: Kinso founder studio - picks the best 2 or 3 of 252 bundled expert skills for a request, builds each option for real in parallel, has a fresh judge rank them, and hands back the winner plus the others. Use when the user wants something made or decided that a founder or studio would do - a logo, a landing page or site, app screens, launch posts, a video plan, pricing or a business plan, an idea check, market or rival research, a build plan, code for a feature, or a test pass on an app - and it is more than a one-line answer. Always ask once before starting a run.
---

# Kinso auto-start

Kinso root: `{{KINSO_ROOT}}`. Read `BRAIN-CORE.md` there before the first run. Talk in clear English.

## 1. Ask once before starting

**First time in a project** (no `<project>/kinso/` folder yet), explain how it works before asking, in 4 bullets:
- 2 or 3 expert skills each build the real thing (a full page, logo files, a plan), in parallel, without seeing each other.
- A fresh judge ranks the finished options without knowing which skill made which.
- You choose: take the winner or any other, merge parts ("the hero from 2"), or ask for a redraw with one reason. Your choice always wins and is saved, so Kinso learns your taste.
- The chosen one is then fixed against its failed checks before moving on.

Later runs in the same project skip this and only ask.

- Say in one line what you would run and the rough cost, for example: "Kinso can make 3 landing pages from 3 design skills and rank them - about 4 helpers. Run it?"
- If the owner says no, or the request is a quick question, answer normally and stop using this skill.
- If the owner names a Kinso command (`/kinso`, `/kinso-frontend` ...), follow that command instead.

## 2. Start from this chat

Follow "Start from this chat" in `~/.claude/commands/kinso.md`: sum up what the chat settled, write `<project>/kinso/CONTEXT.md`, and get the owner's confirm. The job folder is `<project>/kinso/`.

## 3. Search the index

- Read `{{KINSO_ROOT}}/SKILL-INDEX.md`.
- Match the request against the "Good at" text and skill names. Prefer skills a stage already uses (a number in "Stages") over unwired ones (`-`).
- Pick the best 3 (at least 2). Pick skills with different methods, not 3 that do the same thing.
- If a stage file already covers the request (for example `kinso-frontend/references/03-direction.md` for a look, `06-build.md` for a page), follow that stage file. It names its own skills and checks.
- Search the "User skills outside Kinso" table too. A row marked "first pick" there always takes one of the 3 places, for example `logo-design` for any logo.
- **Fill missing inputs first.** If the stage file needs files from an earlier stage (for example the copy from stage 05 before a page, or `RIVALS.md` before pricing), either run that earlier stage first or write a short stand-in from `CONTEXT.md`, marked `[assumed - not from the stage]`. Say which in one line.
- Show the owner the picks in one line each: skill, one reason. Go on unless they change it.

## 4. Build every option for real

- Each pick is a fresh subagent on `sonnet` that reads only its own `SKILL.md`, `CONTEXT.md` and the brief, and **makes the full deliverable**: a working landing page, a set of logo files, the posts, the plan, the code. Not a ranking, not an outline, not an empty file.
- Each writes only to `<project>/kinso/options/<n>-<skill>/`. Options never see each other.
- Scripts only through `{{KINSO_ROOT}}/kinso-frontend/tools/sandbox/run.sh`, with `KINSO_ALLOWED_ROOTS=<project>`. Web only through `tools/collect/collect.sh`.
- Pages and screens: each option also saves screenshots at desktop and phone width with the sandbox Chrome (`kinso-frontend/tools/capture.mjs`).

## 5. Judge, then hand back

- One fresh judge on `opus` sees the options as "Option 1, 2, 3", never the skill names, and scores each 0 to 3 per rule (BRAIN-CORE section 6).
- Write `<project>/kinso/picks/auto/NN-PICK.md` with the session id and model of every option and the judge.
- Hand back: the winner's folder and screenshots first, then the others in rank order, each with its score and one line why.
- Offer next steps: refine the winner, merge a part from another option, or go on to the matching Kinso stage.

## 6. Models and guards

- Models: BRAIN-CORE section 4, model table (`haiku` plain work, `sonnet` making, `opus` deciding).
- Guards: BRAIN-CORE section 8. No `rm`, nothing posted, deployed, committed or paid for. Never edit a skill under `skills/`.
