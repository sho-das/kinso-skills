# kinso-qa - for any model or agent tool

This folder is a skill for testing an app again and again: a test map, a risk-ranked matrix, tests per scenario, a bug list in a fixed format, a regression set, and a go or no-go. It works with any model. Nothing in it needs a Claude tool.

Each stage runs real outside skills from `skills/`, unchanged. Our brain (`BRAIN.md`) deals testers, draws seeded edge cases and personas, picks the findings that reproduce, guards the rules and checks the result. QA never fixes the app.

## Start here

1. Read `../RULES-RESEARCH.md` and `BRAIN.md`. They apply to every stage.
2. Read `SKILL.md`. It picks the way in (from kinso-build, full run, regression run, one scenario), lists the stages and the stop points.
3. For each stage, read that stage's file in `references/`, the skill files its "Runs" section names, and the inputs it names.

## If your tool can read files and run commands

Follow `SKILL.md` as written.

- Run every test, script, server, Playwright, k6, promptfoo and model run only through `../kinso-frontend/tools/sandbox/run.sh <run folder> <command>`.
- Test only hosts listed in `<job>/qa/HOSTS.md`. The default is `127.0.0.1`. Never production, never a host the founder does not own, never a load test on an outside API.
- Turn telemetry off on every tool, as `TOOLS.md` says.
- A "tester" is a fresh session or sub-agent with no history of the other tester's work. It gets the stage file, its skill, its draws and the inputs.
- A "fresh reviewer" gets only the report and the evidence, never the testers' reasoning.
- Never delete anything; each run writes a new folder. Never commit, push or deploy.

## If your model has no tools (plain API)

Use the kinso-frontend runner (`../kinso-frontend/AGENTS.md`, "If your model has no tools") with its token and dollar budget. It refuses `-contributor` models and never sends secret files.

- Pass `BRAIN.md`, one stage file, the skill files its "Runs" names, and the inputs, with `--input`.
- A plain API cannot run tests. With the runner, stages 0, 1 and 11 (planning, matrix, report) work; stages 2 to 10 produce test files and a plan, marked "planned, not run", for a person or a tool-using agent to run.
- Run each tester and each fresh reviewer as its own runner call.
- Stop at each stop point in `SKILL.md` and get the founder's OK.

## Draws

The seed rule is in `BRAIN.md`. Any tool can compute it: `printf %s <seed> | shasum -a 256 | cut -c1-8`, read as a hex number, mod the list length. The banks are in `banks/`.
