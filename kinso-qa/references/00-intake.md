# Stage 0 - Intake and test map

Read `BRAIN.md` first. Paths are from `kinso-qa/`. `<job>` is the job folder, `<code>` the app folder.

## Runs

1. `skills/testing-strategy/SKILL.md` (Anthropic) - what to test at which level (unit, integration, end to end), for this app.
2. `skills/test-audit/SKILL.md` (gstack) - on the app's existing tests: which are low value, duplicated, or test only mocks. Method text only; skip its preamble and `bin/`.
3. The brain builds the **test map**: every surface the app has (pages, routes, jobs, outside APIs, the database, settings, model calls, mobile apps), each with its file or URL.

**Skip:** gstack preambles, telemetry and `~/.gstack/` writes. Log each skip in `qa/PROCESS.md`.

## In

- `<job>/START.md`, `build/STACK.md` (platforms, stack, "AI architecture"), `build/SPEC.md` (acceptance criteria), `build/API.md`, `build/DATA-MODEL.md`, `<code>/RUN.md`, `<code>/README.md`, `<job>/OVERRIDES.md`, `<job>/business/RISK.md`.
- An earlier `qa/` folder, if any: `qa/regression/REGRESSION.md`, `qa/RUNS.md`, `qa/BUGS.md`.
- Existing app with no `build/`: the project folder, and kinso-frontend's `existing/MAP.md` if it exists.

## Start form

Ask only what the inputs do not hold (`PLAN.md` section 4). In Claude Code use AskUserQuestion, up to 4 questions per call, the recommended option first with "(Recommended)", one description line per option (reason and cost). Elsewhere, a numbered form with lettered options, then wait.

- Track: regular / AI wrapper / frontier or own model.
- Platforms: web, Android, iOS (multi-select); mobile approach.
- Where to test: local only (Recommended) / also a test host I own (name it).
- Regions: languages, time zones, currencies, data-law countries.
- Installs: k6, promptfoo, an emulator or simulator - each yes or no (default no).

Production is never offered in the form. If the founder asks for it, guard 1 applies: a written OK naming the host and the data.

## Deal and pick

- No deal. The brain writes the map and the founder confirms the hosts.
- Write `<job>/picks/qa/00-PICK.md` with "no deal" and the checks table.
- Start `qa/RUNS.md` (run number, date, way in, change under test) and `qa/HOSTS.md` (host, owner, who confirmed, date).

## Guards

- Read only. No test runs yet, except starting the app once from `RUN.md` to confirm it starts.
- Never a host outside `qa/HOSTS.md`. Never production.
- Never `rm`, never commit.

## Checks after

- Every acceptance criterion in `build/SPEC.md` is on the map, with its surface.
- Every outside API the code calls is on the map, with "stub exists: yes or no".
- The track is set, with its source (`STACK.md` or the founder's answer).
- `qa/HOSTS.md` lists only `127.0.0.1` unless the founder named another host in chat.
- The app starts from `RUN.md` (or "does not start" is finding QA-000, S1).

## Override

The founder may add a host they own or drop a surface. Logged in `<job>/OVERRIDES.md`.

## Out

- `<job>/qa/INTAKE.md` - way in, track, platforms, regions, installs allowed, gaps.
- `<job>/qa/TEST-MAP.md` - surface, file or URL, outside calls, existing tests, test-audit notes.
- `<job>/qa/HOSTS.md`, `<job>/qa/RUNS.md`, `<job>/picks/qa/00-PICK.md`.

## Stop point

Yes. Show the map, the hosts and the install answers. Wait for the founder's OK.
