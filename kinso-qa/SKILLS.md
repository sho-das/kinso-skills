# kinso-qa - Skills index

27 October 2026. Every folder in `skills/` is an unchanged copy from the scanned and pinned repos in `vendor/` (see `../LOCK.json`), made with `cp -RL`. Each holds its licence and a 4-line `SOURCE.md` (repo, path, copy date, licence). Nothing here was run, installed or loaded by the copy step. The copy list is `research/copy-skills.sh`. Stage numbers are from `PLAN.md`.

Renamed to avoid clashes: `addy-test-driven-development` (repo name `test-driven-development`), `gstack-benchmark` and `ecc-benchmark` (both `benchmark`).

## Skills

| Skill | Source repo | Licence | Stages | Why |
|---|---|---|---|---|
| testing-strategy | anthropics_knowledge-work-plugins (engineering) | Apache-2.0 | 0, 1 | Anthropic's test strategy: what to test at which level |
| test-audit | garrytan_gstack | MIT | 0 | Finds low-value or duplicate tests in the existing suite. Method text only |
| test-master | Jeffallan_claude-skills | MIT | 1, 11 | Test plans, risk ranking, defect reports |
| pict-test-designer | omkamal_pypict-claude-skill | MIT | 1 | Pairwise design: every pair of settings covered with few runs. Its `scripts/` need `pypict` (not installed): the brain writes the pairs by hand from the method |
| webapp-testing | anthropics_skills | Apache-2.0 | 2 | Playwright on the local host. `scripts/with_server.py` only through the sandbox |
| browser-testing-with-devtools | addyosmani_agent-skills | MIT | 2 | Reproduce, inspect, console, accessibility tree |
| qa-only | garrytan_gstack | MIT | 2 | Report-only exploratory QA (dealt). Method text only; preamble and `bin/` never run |
| qa | garrytan_gstack | MIT | 2, 11 | Read for `references/issue-taxonomy.md` and `templates/qa-report-template.md` only |
| e2e-testing | affaan-m_ecc | MIT | 2 | Playwright flows, page objects, flaky tests (dealt) |
| playwright-expert | Jeffallan_claude-skills | MIT | 2 | Playwright flows, a second tester (dealt) |
| click-path-audit | affaan-m_ecc | MIT | 2 | Each button traced through its state changes |
| accessibility | affaan-m_ecc | MIT | 2, 10 | WCAG 2.2 AA for web, iOS and Android |
| screen-reader-testing | wshobson_agents (accessibility-compliance) | MIT | 2, 10 | VoiceOver, TalkBack and NVDA steps |
| api-to-testcase-generator | LambdaTest_agent-skills (api-skill) | MIT | 3 | Test cases from OpenAPI, Postman or route lists. Its HyperExecute link is skipped |
| api-mocking | LambdaTest_agent-skills (api-skill) | MIT | 3, 6 | A local stub of each outside API, so errors and timeouts can be forced |
| contract-first | affaan-m_ecc | MIT | 3 | The API checked against one machine-readable contract |
| property-based-testing | trailofbits_skills | CC-BY-SA-4.0 | 3, 4 | Generated inputs for parsers, dates, maths. Never edit this copy |
| debugging-and-error-recovery | addyosmani_agent-skills | MIT | 3, 11 | Reproduce first; each bug with exact steps |
| pr-review-toolkit | anthropics_claude-plugins-official | Apache-2.0 | 3, 11 | `agents/silent-failure-hunter.md` (swallowed errors), `agents/pr-test-analyzer.md` (are the tests enough). Read as method text; its commands are never registered |
| database-optimizer | Jeffallan_claude-skills | MIT | 4 | Slow queries, query plans, indexes |
| database-migrations | affaan-m_ecc | MIT | 4 | Migrations up and down, expand-contract |
| production-audit | affaan-m_ecc | MIT | 5 | Readiness audit from local evidence |
| canary-watch | affaan-m_ecc | MIT | 5 | Health checks and endpoints, on local or an owned test host only |
| deploy-checklist | anthropics_knowledge-work-plugins (engineering) | Apache-2.0 | 5 | Config and secrets per environment |
| sre-engineer | Jeffallan_claude-skills | MIT | 5, 6 | Health checks, SLOs, error budgets |
| ecc-benchmark | affaan-m_ecc | MIT | 6 | API latency percentiles and Core Web Vitals baselines |
| gstack-benchmark | garrytan_gstack | MIT | 6 | Web performance regression method. Its browser binary is never run |
| performance-optimization | addyosmani_agent-skills | MIT | 6 | Measure first; where time goes |
| chaos-engineer | Jeffallan_claude-skills | MIT | 6 | One fault at a time, steady state, stop rule |
| error-handling | affaan-m_ecc | MIT | 3, 6 | Retries, backoff, circuit breakers, timeouts |
| i18n-sync | affaan-m_ecc | MIT | 7 | Locale files: missing keys, placeholders. Checking only; it never translates in a QA run |
| eval-harness | affaan-m_ecc | MIT | 8a, 8b | Evals first, pass and fail rules, code and model graders |
| ai-regression-testing | affaan-m_ecc | MIT | 8a | Evals in the test suite with a stub model |
| llm-evaluation | wshobson_agents (llm-application-dev) | MIT | 8a, 8b | Metrics, human review, benchmark use |
| promptfoo-evals | promptfoo_promptfoo | MIT | 8a, 8b | Eval suites and assertions that reject wrong answers. Needs promptfoo (`TOOLS.md`) |
| promptfoo-provider-setup | promptfoo_promptfoo | MIT | 8a | Points promptfoo at the local app or the local model |
| promptfoo-redteam-setup | promptfoo_promptfoo | MIT | 8a | Red-team config from the app's real inputs. Local generation only |
| promptfoo-redteam-run | promptfoo_promptfoo | MIT | 8a | Runs and triages the red-team scan |
| eval-plan | garrytan_gstack | MIT | 8b | Preregister bars, decoys and stop rules; dry run first. Its paid pilot step is skipped |
| agent-eval | affaan-m_ecc | MIT | 8b | Head-to-head runs: pass rate, time, consistency, across model versions |
| flutter-testing-skill | LambdaTest_agent-skills | MIT | 10 | Flutter widget, integration and golden tests |
| detox-skill | LambdaTest_agent-skills | MIT | 10 | React Native end-to-end tests |
| appium-skill | LambdaTest_agent-skills | MIT | 10 | Cross-platform mobile tests |
| espresso-skill | LambdaTest_agent-skills | MIT | 10 | Android Kotlin UI tests |
| xcuitest-skill | LambdaTest_agent-skills | MIT | 10 | iOS Swift UI tests |
| verification-loop | affaan-m_ecc | MIT | 11 | Build, types, lint, tests, secrets grep before the report |
| addy-test-driven-development | addyosmani_agent-skills | MIT | 11 | One failing test per bug for the regression set |

## Support folders (not skills)

| Folder | Source | Licence | Read by |
|---|---|---|---|
| addy-references | addyosmani_agent-skills `references/` | MIT | The Addy skills (`../../references/`): read `skills/addy-references/` instead. `accessibility-checklist.md`, `performance-checklist.md`, `testing-patterns.md` |

## Read from other Kinso skills (never copied)

| What | Where | Stage |
|---|---|---|
| Browser checks, capture, accessibility, links | `../kinso-frontend/references/07-check.md`, `../kinso-frontend/tools/capture.mjs` | 2, 7, 10 |
| Security skills (security-and-hardening, security-review, vibesec, insecure-defaults, fp-check, sharp-edges) | `../kinso-build/skills/`, as `../kinso-build/references/08-security.md` runs them | 9 |
| Language test skills (fastapi-expert, nestjs-expert, golang-pro, kotlin-specialist, swift-expert, flutter-expert, react-native-expert) | `../kinso-build/skills/`, by `build/STACK.md` | 2 to 10 |
| systematic-debugging, diagnosing-bugs | `../kinso-build/skills/` | 11, when a bug needs its cause before the report |

## Parts never used

- LambdaTest: every cloud section (HyperExecute, SmartUI, real-device upload, `hub.lambdatest.com`), `kanecli-skill`, `rook-skill`, `api-skill/installer/`.
- promptfoo: sharing, promptfoo Cloud, remote attack generation.
- gstack: preambles, `bin/`, telemetry, `~/.gstack/` writes, the eval-plan paid pilot.
- pr-review-toolkit: `commands/` are not registered; only the agent files are read.
- Any `scripts/` folder, unless a stage names the script; then only through the sandbox.
