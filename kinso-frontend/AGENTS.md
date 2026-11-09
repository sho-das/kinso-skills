# kinso-frontend - for any model or agent tool

This folder is a skill for building or changing web pages, app screens and diagrams. It works with any model. Nothing in it needs a Claude tool.

Each stage runs real outside skills from `skills/`, unchanged. Our brain (`BRAIN.md`) deals options, picks the best with a written rubric, guards the shared rules and checks the result. The checks never touch style.

## Start here

1. Read `RULES.md` and `BRAIN.md`. They apply to every stage.
2. Read `SKILL.md`. It picks the way in (new page or existing project), lists the 12 stages in order, and names the points where you stop for the client's OK.
3. For each stage, read that stage's file in `references/`, the skill files its "Runs" section names, and the inputs it names.

## If your tool can read files and run commands

Follow `SKILL.md` as written. Run every script, ours or a skill's, only through `tools/sandbox/run.sh`.

- Follow each skill's `SKILL.md` as written, including its critique loops, linters and reviewers, except the parts the stage file says to skip (paid makers, telemetry, installs, updates, gstack `bin/`).
- A "fresh reviewer" or "fresh picker" is a new session or sub-agent with no history of the work it judges. It gets the brief and the output, never the drafter's reasoning.
- Write each stage's pick to `<job>/picks/frontend/NN-PICK.md` (`../BRAIN-CORE.md` section 2), in the template in `BRAIN.md`.
- Stage 3 reads `~/.kinso/design-log.json` and, after the client's pick, adds one entry. Scripts never write it; the sandbox blocks writes outside the job.

## If your model has no tools (plain API)

Use the runner. It sends `RULES.md`, one stage file and that stage's inputs to an OpenAI-compatible API, then saves the files the model writes.

```bash
export KINSO_API_BASE="https://your-provider/v1"
export KINSO_MODEL="the-model-name"
export KINSO_TOKEN_BUDGET=200000
python3 tools/runner/run_stage.py --stage 3 --job path/to/job --dry-run
```

- Set `KINSO_API_KEY` yourself, in your own shell. Never write the key into a file in this folder.
- `--dry-run` builds the prompt and checks the budget. It sends nothing.
- The runner logs every call's tokens in `<job>/runner-usage.jsonl`. It stops before a call that could go past `KINSO_TOKEN_BUDGET`.
- `KINSO_MAX_OUTPUT_TOKENS` (default 8000) caps each answer.
- Optional dollar limit: set `KINSO_PRICE_IN`, `KINSO_PRICE_OUT` and `KINSO_PRICE_CACHED` (USD per 1M tokens) and `KINSO_SPEND_LIMIT_USD`. The runner logs each call's cost and stops before a call that could go past the limit.
- It refuses any model name with `-contributor`.
- It never sends secret files (`.env`, keys, credentials). It writes only into the stage's own output folders.
- Stages 0 and 1 need a tool that reads the repo or the web. With the runner, pass the files yourself with `--input`.
- The runner does not load skill files on its own. Pass the files named in the stage's "Runs" section with `--input`.
- A plain API has no sub-agents. Run each fresh reviewer or picker as its own runner call, with only the brief and the output as input.
- Stage 3 with the runner: run `tools/draw/draw.py` through the sandbox first, then pass `design/DECK.md` and the last 3 entries of `~/.kinso/design-log.json` with `--input`.
- Stages 7 and 9: add `--capture "file:///full/path/site/index.html"` to send the capture measures with the prompt.
- After stages 0, 2, 3, 5 and 9 it prints `STOP`. Get the client's OK before the next stage.

## Sandbox

`tools/sandbox/run.sh <run folder> <command>`:

- macOS: `sandbox-exec`. It blocks reading keys, browser data, `~/.ssh`, `~/.aws` and similar, and allows writes only in the run folder and the temp folders. Add more blocked folders with `KINSO_SANDBOX_DENY="/path/one:/path/two"`.
- Linux: `bwrap` (bubblewrap). The home folder is hidden, the system is read-only, and only the run folder can be written. Add read-only folders with `KINSO_SANDBOX_READ`. Without `bwrap` it refuses to run.
- The capture tool needs Node and Playwright. Set `PLAYWRIGHT_BROWSERS_PATH` and `NODE_PATH` when they are not in the default places.
