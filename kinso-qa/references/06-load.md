# Stage 6 - Load and timeouts

Read `BRAIN.md` first. Paths are from `kinso-qa/`. Tool facts: `TOOLS.md`.

## Runs

1. **The load tool: k6** (`TOOLS.md`), only if the founder approved its install at stop point 1. Each test is a k6 script in `qa/load/` with **thresholds** (for example p95 under 500 ms, errors under 1%), so a broken threshold fails the run. Run line, always:
   `../kinso-frontend/tools/sandbox/run.sh <run folder> /usr/bin/env K6_NO_USAGE_REPORT=true /opt/homebrew/bin/k6 run --no-usage-report <script>`
   K6_NO_USAGE_REPORT=true goes **after** `run.sh`: `run.sh` starts with `env -i`, so a variable set before it never reaches k6. The full path is needed because `/opt/homebrew/bin` is not on the sandbox PATH. Installed copy and test: `tools/INSTALLED.md`.
   Without k6: write the scripts, mark the load cases "planned, not run", and run only the timeout cases in plain test code.
2. `skills/ecc-benchmark/SKILL.md` (ECC) - baselines: API latency percentiles and Core Web Vitals, saved so later runs compare.
3. `skills/performance-optimization/SKILL.md` (Addy) with `skills/addy-references/performance-checklist.md` - where the time goes, measured first.
4. `skills/gstack-benchmark/SKILL.md` (gstack) - its regression method (baseline, compare, budget). Method text only; its browser binary is never run.
5. **A timeout at each hop:** `skills/chaos-engineer/SKILL.md` (Jeff) - one fault at a time, a steady state, a stop rule. Hops: browser to app, app to database, app to each outside API (the stub from stage 3), app to the model (AI tracks, the stub). `skills/error-handling/SKILL.md` (ECC) for retries, backoff and circuit breakers.
6. Slow network in the browser: Playwright network throttling (about 400 kbit/s, 400 ms delay).
7. High cells: k6 (with ecc-benchmark) and chaos-engineer as the 2 testers.

**Skip:** k6 Cloud, `k6 login`, any output to Grafana Cloud; any chaos tool that needs an install or a cluster; Artillery and Locust cloud runs. Log each skip in `qa/PROCESS.md`.

## In

- `qa/MATRIX.md` (load cells), `qa/HOSTS.md`, `build/SPEC.md` (any time limits), `build/STACK.md`, `<code>/RUN.md`, the stubs from stage 3, earlier baselines in `qa/runs/load/`.
- Draws: `banks/EDGE-CASES.md` section E6, one persona.

## Deal and pick

- As `BRAIN.md`. Write `<job>/picks/qa/06-PICK.md` with the thresholds and the baseline used.

## Guards

- **Never load-test a host you do not own.** Only `127.0.0.1`, `localhost`, `::1`, or a host in `qa/HOSTS.md` that the founder named in chat as theirs. The k6 script's target is read from `qa/HOSTS.md`, never typed by hand. The brain greps every script for host names before the run.
- Outside APIs, model providers, CDNs and payment providers are never load-tested: always the stub.
- Peak load and duration are in the plan, with a stop rule (for example "stop when errors pass 20%").
- Telemetry off (`K6_NO_USAGE_REPORT=true` after `run.sh`, and `--no-usage-report`) on every k6 run, including runs adapted from skill templates (for example `skills/api-to-testcase-generator/reference/framework-templates.md`, whose `k6 run` line has neither). Through the sandbox. Never `rm`. Never commit.

## Checks after

- Each load script has thresholds and a saved summary (p50, p95, p99, error rate, requests per second).
- The baseline is saved; a later run shows the change against it.
- Each hop's timeout case shows: the app's own time limit, the message the user sees, and no stuck request on the server.
- Retries are capped and spaced (count them in the stub's log).
- No request went to a host outside `qa/HOSTS.md` (grep the k6 output and the stub logs).

## Override

The founder may set looser thresholds for the first version. Logged; the report shows both.

## Out

- `<job>/qa/LOAD.md` - scripts, thresholds, results, baselines, timeout and retry results, findings.
- `<job>/qa/load/` (scripts), `<job>/qa/runs/load/<run>/`, `<job>/picks/qa/06-PICK.md`.

## Stop point

Yes, before any run on a host other than `127.0.0.1`: show the host, its owner, the peak load, the duration and the stop rule, and wait for the founder's written OK.
