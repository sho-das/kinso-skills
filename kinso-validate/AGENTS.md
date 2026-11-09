# kinso-validate - for any model or agent tool

This folder is a skill for brainstorming, validating and researching product ideas. It works with any model. Nothing in it needs a Claude tool.

## Start here

1. Read `../RULES-RESEARCH.md`. It applies to every stage.
2. Read `SKILL.md`. It asks the start questions, picks the way in, lists the stages in order, and names the points where you stop for the user's OK.
3. For each stage, read only that stage's file in `references/` and the inputs it names.

## If your tool can read files and run commands

Follow `SKILL.md` as written.

- Web access only through `../tools/collect/collect.sh`, which runs inside the sandbox (`../kinso-frontend/tools/sandbox/run.sh`). No other web tool.
- The collector needs the local search server running: from `../tools/collect`, run `../../kinso-frontend/tools/sandbox/run.sh run ./venv-searxng/bin/python searxng_run.py` in the background.
- The collector keeps 30 seconds between searches and stops at 20 searches per run folder. Never sleep yourself.
- A "fresh reviewer" (stages 6 and 11) is a new session with no history of the research.

## If your model has no tools (plain API)

Only the stages with no web can run this way: 1, 2, 5, 6 and 11. Pass the stage file and its inputs in the prompt. The web stages (0, 3, 4, 7 to 10) need an agent that can run the collector.

The kinso-frontend runner (`../kinso-frontend/tools/runner/run_stage.py`) has the token and dollar limits to reuse, but it knows only kinso-frontend's stages for now. Adding kinso-validate's no-web stages to it is a later step.

## Rules for any tool

- Never set up keys or accounts on the user's behalf. The user sets `KINSO_API_KEY` in their own shell.
- Never use a model name with `-contributor`.
- Never write outside the job folder.
