# kinso-qa - Tools (pre-download scan)

27 October 2026. **Nothing was downloaded, installed or run.** Facts come from metadata (Homebrew's index with `brew info --json=v2` and `brew deps`, HEAD requests for bottle sizes, the npm registry) and from source code read in memory (our scanner, then a pattern search on the same archive). Same method as `../kinso-promote/APP-SCAN.md`. This Mac: macOS, Apple silicon (arm64), Homebrew bottles for `arm64_tahoe`. Sizes in MB (1 MB = 1,000,000 bytes).

## 1. Load-testing tools compared

| Tool | Version (Homebrew) | Licence | Telemetry by default | How to turn it off | Install route and size | Scripting | Fit for API and web load |
|---|---|---|---|---|---|---|---|
| **k6** (Grafana) | 2.3.0 | AGPL-3.0-or-later | **On.** An anonymous usage report after each run to `https://stats.grafana.org/k6-usage-report` (k6 version, OS, CI flag, duration, max virtual users, iterations, executors, extensions, and an installation ID kept in the user config folder) | `K6_NO_USAGE_REPORT=true` or `--no-usage-report` on every run. `k6 cloud run` turns it off itself | Homebrew core bottle, 15.7 MB, **no dependencies** (one Go binary) | JavaScript test files: scenarios, ramping, checks, **thresholds that fail the run** (exit code), groups, tags | API: very good. Web: page loads by HTTP; a browser module exists for real page timings. One binary, CI-friendly pass or fail |
| **Locust** | 2.47.0 | MIT | **Off.** No usage report or update check found in `locust/`. OpenTelemetry only when you turn it on (`LOCUST_ENABLE_OPENTELEMETRY`) and point it at your own collector | Nothing to turn off | Homebrew core bottle 7.1 MB, plus Python 3.15 (20.2 MB), zeromq (1.7 MB), libsodium (0.4 MB), certifi: **29.4 MB** new | Python test files (user classes, tasks, wait times); a local web page with live charts; headless mode with CSV output | API: very good, flows as Python code. Web: HTTP only. Pass or fail needs a small event hook; no built-in thresholds |
| Artillery | 2.0.34 | MPL-2.0 | **On** (its docs: "a telemetry feature that collects limited & anonymous usage information") | `ARTILLERY_DISABLE_TELEMETRY=true` **[check in source before use]** | Homebrew bottle 45.3 MB plus Node and 14 more formulas not on this Mac | YAML scenarios, JavaScript hooks, a Playwright engine | Good, but the docs push paid runs (`run-lambda`, `run-fargate`, `run-aci`, Artillery Pro). Not scanned (not in the top 2) |
| vegeta | 12.13.0 | MIT | None known **[not scanned]** | - | Homebrew bottle 4.5 MB, no dependencies | A targets file; a constant request rate; Go library | API at a fixed rate: good for "what happens at 50 requests a second". No user flows |
| oha | 1.16.0 | MIT | None known **[not scanned]** | - | Homebrew bottle 4.2 MB, no dependencies | Command-line flags only | A quick smoke load on one URL. No flows, no thresholds |

## 2. Scans of the top 2

| Repo | Ref | Our scanner (in memory) | SkillSpector | Checked by hand |
|---|---|---|---|---|
| grafana/k6 | v2.3.0 (commit `e088784`). The tag archive's sha256 `35d0e4ce...a2097` equals Homebrew's source checksum | 4,078 files, 55 MB. 0 unsafe paths. 2 hidden characters (emoji joiners in release notes). One link `CLAUDE.md -> AGENTS.md`. 407 "telemetry" hits (OpenTelemetry output code, the usage report, test data) | Whole repo too large for its git limit ("byte_budget_exhausted"). Re-run on the source folders (`api cloudapi cmd errext ext internal js lib metrics output secretsource subcommand`, 1,024 files, copied from the same in-memory archive, sha256 checked): 124 findings, CRITICAL score, "Do not install", 0% fully inspected. Report: `../tools/scan/reports/apps/app-k6.json` | All false alarms: `git push` in `AGENTS.md` (contributor notes), `rm -f ./k6` in the Makefile, "access token" in the k6 Cloud login code, test fixtures. **Real, and handled:** the usage report above; `k6 cloud` sends results to Grafana Cloud (never used) |
| locustio/locust | 2.47.0 (commit `66279c9`) | 431 files, 10 MB. Clean: 0 hidden characters, 0 unsafe paths, 0 links. Hits are the docs build, the changelog script and a bundled yarn release | 351 findings, CRITICAL score, "Do not install", 94.2% inspected. Report: `../tools/scan/reports/apps/locustio_locust-skillspector.json` | All false alarms: `subprocess.run` in `generate_changelog.py`; `yarn install` in `hatch_build.py` (build time only); `exec` in a benchmark script; `.env` matches the module `locust/env.py`; base64 and "keyring" in `yarn-4.12.0.cjs` and `uv.lock` |

## 3. Recommendation: k6

- **One binary, no dependencies, 15.7 MB.** Nothing else lands on the Mac.
- **Thresholds fail the run.** "p95 under 500 ms and errors under 1%" is a line in the test file, and k6 exits non-zero when it is broken. That makes each load test a regression check with no extra code.
- **Scenarios** cover the stage 6 cases: a ramp to N users, a spike, a soak, a constant arrival rate.
- **The cost:** telemetry is on by default, so every run sets `K6_NO_USAGE_REPORT=true` (the brain's guard 8, and the sandbox run line in stage 6). AGPL-3.0 is fine for running the tool; it matters only if we change k6 and share it.
- **Second choice:** Locust (MIT, no telemetry) when the founder prefers Python test files, at 29.4 MB with its Python.
- **Quick checks:** oha for a one-URL smoke run; not needed if k6 is installed.

## 4. Other tools stages use

| Tool | Stage | State | Telemetry |
|---|---|---|---|
| Playwright and its browsers | 2, 7 | Already on this Mac (`<a folder holding node_modules/playwright>`, `~/Library/Caches/ms-playwright`) | None |
| Ollama v0.40.2 with `llama3.2` and `gemma3` | 8a, 8b | Already on this Mac (`../tools/ollama/`), run only under `no-net.sb` | The no-network profile blocks outbound calls |
| promptfoo 0.125.1 (npm) | 8a, 8b, optional | Not installed. MIT, 32.9 MB unpacked, 766 files, 76 direct dependencies | **On:** telemetry, update check, sharing and remote attack generation. Off with `PROMPTFOO_DISABLE_TELEMETRY=1`, `PROMPTFOO_DISABLE_UPDATE=1`, `PROMPTFOO_DISABLE_SHARING=1`, `PROMPTFOO_DISABLE_REMOTE_GENERATION=true` (all four names found in its `src/`), and never `--remote` (its own red-team skills use `--remote`; the brain removes it). The package itself was not scanned; scan it before install |
| Android emulator, iOS Simulator | 10 | Not checked. Xcode's simulator may already be on this Mac | Founder's call at stop point 1; until then stage 10 tests logic and widgets without a device |

## 5. Download list for your approval

| # | What | Source | Size (MB) | Licence | Hash |
|---|---|---|---|---|---|
| 1 | **k6 2.3.0** | Homebrew core bottle (ghcr.io), `arm64_tahoe` | 15.7 | AGPL-3.0-or-later | bottle sha256 `7228c2394a74d6174596016cdbe20c3125a1c58c4f83a18a62b5600cd2b6d820`; source sha256 `35d0e4ce17ac3b7557f220a63bd9486f24dd63e032fbe1aed8a79326191a2097` |
| 2 | promptfoo 0.125.1 (optional, stage 8a) | registry.npmjs.org | 32.9 unpacked, plus its dependencies (not resolved yet) | MIT | resolve a lock file with `--ignore-scripts` first, then scan, then ask again |
| - | Locust 2.47.0 (only if you prefer it to k6) | Homebrew core bottles | 29.4 | MIT | locust `07b2fa9b1c33e540e7f0f120b4dfb1ceef34ede26266d3d4bd564e98fe162287`, python@3.15 `bb47727bd27838ec92ca33730df0211bf077fed2c8828c87e4ce8c1490e4bbb1`, zeromq `76e3d40941eb6d5d2ea5f94c017fd3503b68aee2aefc017291ab38b729fbcf08`, libsodium `665929906297818edf15955cf4e4faefca7d717271c9fa448291989d2511d266`, certifi `45011f7d0ff99c9f4945e2c5f9da4ce5d5027ff104c69bb563a70f826cb8d186` |

**Homebrew analytics:** `brew analytics state` says "InfluxDB analytics are enabled", so a `brew install` sends an anonymous install event to Homebrew. Not changed. To stop it for one install: `HOMEBREW_NO_ANALYTICS=1 brew install k6`. Your call.

## 6. After download, before first use

1. Check the bottle hash (Homebrew does it on install) and `k6 version` says 2.3.0.
2. Every run: `K6_NO_USAGE_REPORT=true`, through `../kinso-frontend/tools/sandbox/run.sh`, against a host in `<job>/qa/HOSTS.md` only.
3. Never `k6 cloud`, never `k6 login`, never an output to Grafana Cloud.
