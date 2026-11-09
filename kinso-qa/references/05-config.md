# Stage 5 - Cloud and config

Read `BRAIN.md` first. Paths are from `kinso-qa/`.

## Runs

1. `skills/production-audit/SKILL.md` (ECC) - readiness from local evidence only (code, settings, Dockerfiles, CI files); it sends nothing anywhere.
2. `skills/deploy-checklist/SKILL.md` (Anthropic) - settings and secrets per environment (development, test, production plan).
3. `skills/canary-watch/SKILL.md` (ECC) - health checks, endpoints and static files, **on `127.0.0.1` or a test host in `qa/HOSTS.md` only**.
4. `skills/sre-engineer/SKILL.md` (Jeff) - what a health check must prove (database reachable, model reachable or stubbed), and a simple SLO for the report.
5. High cells: production-audit and deploy-checklist as the 2 testers.

**Skip:** any cloud CLI login, `terraform apply`, deploy, or check against a production URL. Log each skip in `qa/PROCESS.md`.

## In

- `qa/MATRIX.md` (config cells), `build/STACK.md`, `build/DEPLOY.md` (if written), `<code>/.env.example`, the settings code, Dockerfile and CI files, `<code>/RUN.md`, `qa/HOSTS.md`.
- Draws: `banks/EDGE-CASES.md` section E5, one persona.

## Deal and pick

- As `BRAIN.md`. Write `<job>/picks/qa/05-PICK.md`.

## Guards

- Start the app with test settings only, in the sandbox. Never with a real key: the key fields stay empty and the outside APIs are stubbed.
- Never read a real `.env` into a log or a report. Values are masked.
- No host outside `qa/HOSTS.md`. Never deploy. Never `rm`. Never commit.

## Checks after

- Each setting the code reads is in `.env.example` with no value; each one missing or wrong gives a clear start-up error (one test per setting).
- The health check says "not healthy" when the database is down, and "healthy" when it is up.
- Cold start: the time to the first good answer after a fresh start, measured 3 times.
- Debug mode, stack traces on error pages and default secrets are off under the test "production-like" settings.
- No secret, token or personal data in the logs of the runs.

## Override

The founder may accept a config gap for the first version (for example "no health check yet"). Logged, and listed in the report.

## Out

- `<job>/qa/CONFIG.md` - settings table, per-environment notes, health checks, cold start times, findings.
- `<job>/qa/runs/config/<run>/`, `<job>/picks/qa/05-PICK.md`.

## Stop point

None, unless a test needs a host not in `qa/HOSTS.md`: then stop and ask (it is planned, not run, until the founder names the host in chat as theirs).
