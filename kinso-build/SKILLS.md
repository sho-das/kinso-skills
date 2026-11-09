# kinso-build - Skills index

27 October 2026. Every folder in `skills/` is an unchanged copy from the scanned and pinned repos in `vendor/` (see `../LOCK.json`), made with `cp -RL`. Each holds its licence and a `SOURCE.md` (repo, commit, path, licence, notes). Nothing here was run, installed or loaded by the copy step. Stage numbers are from `PLAN.md` and `SKILL.md`.

Two skills share the name `test-driven-development` in their repos. Here they are `addy-test-driven-development` and `sp-test-driven-development`.

## Skills

| Skill | Source repo | Licence | Stages | Why |
|---|---|---|---|---|
| constraint-driven-development | addyosmani_agent-skills | MIT | 0 | Writes the quality bar as `CONSTRAINTS.md`, so later stages cannot lower it |
| search-first | affaan-m_ecc | MIT | 0 | Adopt, extend or build, for each part, before any code |
| spec-driven-development | addyosmani_agent-skills | MIT | 2 | Spec before code: objective, acceptance criteria, boundaries |
| brainstorming | obra_superpowers | MIT | 2 | 2 to 3 approaches, design approved before code. Text only, no visual server |
| feature-forge | Jeffallan_claude-skills | MIT | 2 | EARS requirements and acceptance criteria |
| spec | garrytan_gstack | MIT | 2 | Vague intent to an executable spec in five phases. Method text only |
| planning-and-task-breakdown | addyosmani_agent-skills | MIT | 3 | Small, ordered, testable tasks |
| writing-plans | obra_superpowers | MIT | 3 | Bite-size tasks with exact files and a test per step |
| blueprint | affaan-m_ecc | MIT | 3 | One-PR-sized steps, dependency graph, review gate |
| plan-eng-review | garrytan_gstack | MIT | 3 | Fresh engineering check on the chosen plan. Method text only |
| doubt-driven-development | addyosmani_agent-skills | MIT | 3 | Fresh-context attack on each big decision (the other plan check) |
| domain-modeling | mattpocock_skills | MIT | 4 | Glossary and ADRs |
| api-and-interface-design | addyosmani_agent-skills | MIT | 4 | Contracts and error shapes |
| api-design | affaan-m_ecc | MIT | 4 | REST naming, status codes, errors |
| api-designer | Jeffallan_claude-skills | MIT | 4 | API design with ADRs |
| postgres-patterns | affaan-m_ecc | MIT | 4 | Per stack: Postgres schema and indexes |
| database-migrations | affaan-m_ecc | MIT | 4 | Per stack: reversible migrations |
| prisma-patterns | affaan-m_ecc | MIT | 4 | Per stack: Prisma |
| backend-patterns | affaan-m_ecc | MIT | 4, 6 | Per stack: Node, Express, Next.js routes and data access |
| supabase-postgres-best-practices | supabase_agent-skills | MIT | 4 | Per stack: Postgres rules from Supabase |
| supabase | supabase_agent-skills | MIT | 4, 6 | Per stack: Supabase auth, RLS, migrations. Its `.mcp.json` step needs the founder's OK first |
| tdd | mattpocock_skills | MIT | 5 | Red, green, refactor (rotated) |
| sp-test-driven-development | obra_superpowers | MIT | 5 | Strict TDD (rotated) |
| addy-test-driven-development | addyosmani_agent-skills | MIT | 5 | TDD with test levels (rotated) |
| property-based-testing | trailofbits_skills | CC-BY-SA-4.0 | 5 | Property tests for maths, dates and scoring |
| incremental-implementation | addyosmani_agent-skills | MIT | 6 | Thin vertical slices (rotated) |
| executing-plans | obra_superpowers | MIT | 6 | Task by task with checks (rotated) |
| subagent-driven-development | obra_superpowers | MIT | 6 | Fresh subagent per task (rotated) |
| source-driven-development | addyosmani_agent-skills | MIT | 6 | Library facts from official docs |
| verification-before-completion | obra_superpowers | MIT | 6 | No "done" without the command output that proves it |
| verification-loop | affaan-m_ecc | MIT | 6 | Build, types, lint, tests, secrets grep, diff review |
| eval-harness | affaan-m_ecc | MIT | 7 | Evals first, pass and fail rules |
| prompt-engineer | Jeffallan_claude-skills | MIT | 7 | Prompt templates, structured output, injection tests |
| cost-aware-llm-pipeline | affaan-m_ecc | MIT | 7 | Model routing and cost caps |
| prompt-caching-strategy | affaan-m_ecc | MIT | 7 | Caching to cut cost |
| llm-evaluation | wshobson_agents (llm-application-dev) | MIT | 7 | Eval metrics, human feedback, benchmarks |
| prompt-engineering-patterns | wshobson_agents (llm-application-dev) | MIT | 7 | Prompt templates, a second source. `scripts/` never run |
| ai-regression-testing | affaan-m_ecc | MIT | 7 | Evals in the test suite with the stub model |
| ai-first-engineering | affaan-m_ecc | MIT | 7 | Harness and build approach for AI features |
| agentic-engineering | affaan-m_ecc | MIT | 7 | Agent pattern: when and how to use an agent |
| agent-harness-construction | affaan-m_ecc | MIT | 7 | Agent pattern: loop, tools, step and cost caps |
| agent-security-hardening | affaan-m_ecc | MIT | 7, 8 | Agent pattern: tool allow-lists, injection, approvals |
| rag-architect | Jeffallan_claude-skills | MIT | 1, 7 | RAG pattern: chunking, retrieval, vector store choice |
| rag-implementation | wshobson_agents (llm-application-dev) | MIT | 7 | RAG pattern: build steps, citations |
| embedding-strategies | wshobson_agents (llm-application-dev) | MIT | 7 | RAG pattern: embedding model and chunking |
| hybrid-search-implementation | wshobson_agents (llm-application-dev) | MIT | 7 | RAG pattern: vector plus keyword search |
| similarity-search-patterns | wshobson_agents (llm-application-dev) | MIT | 7 | RAG at scale only |
| vector-index-tuning | wshobson_agents (llm-application-dev) | MIT | 7 | RAG at scale only |
| iterative-retrieval | affaan-m_ecc | MIT | 7 | RAG pattern: retrieval in rounds |
| langchain-architecture | wshobson_agents (llm-application-dev) | MIT | 7 | Only when the founder picks LangChain |
| websocket-engineer | Jeffallan_claude-skills | MIT | 7 | Only when updates go by WebSocket |
| mcp-developer | Jeffallan_claude-skills | MIT | 7 | Only when agent tools are exposed through MCP |
| mcp-builder | anthropics_skills | Apache-2.0 | 7 | Only when agent tools are exposed through MCP. `scripts/` never run |
| claude-api | anthropics_skills | Apache-2.0 | 7 | Read only, when Claude is the main or backup model. Never called without a key the founder set |
| fine-tuning-expert | Jeffallan_claude-skills | MIT | 7 | Only when the build approach is a fine-tuned model. No training run without the founder's OK |
| security-and-hardening | addyosmani_agent-skills | MIT | 8 | Input, auth, secrets, headers checklist (dealt) |
| security-review | affaan-m_ecc | MIT | 8 | Auth, input, secrets checklist (dealt) |
| vibesec | BehiSecc_VibeSec-Skill | Apache-2.0 | 8 | Secure coding for apps built with AI help (dealt) |
| insecure-defaults | trailofbits_skills | CC-BY-SA-4.0 | 8 | Fail-open settings, debug left on (dealt). No SKILL.md: method in `commands/audit.md` and `references/` |
| fp-check | trailofbits_skills | CC-BY-SA-4.0 | 8 | Proves or drops each finding |
| sharp-edges | trailofbits_skills | CC-BY-SA-4.0 | 8 | Only when the product exposes config or an API |
| static-analysis | trailofbits_skills | CC-BY-SA-4.0 | 8 | Only `skills/semgrep`, only if the founder approved Semgrep, with `--metrics=off` |
| systematic-debugging | obra_superpowers | MIT | 9 | Root cause first (rotated) |
| diagnosing-bugs | mattpocock_skills | MIT | 9 | Diagnosis loop (rotated) |
| webapp-testing | anthropics_skills | Apache-2.0 | 9 | Playwright on the local host, screenshots. Scripts only through the sandbox |
| code-review | mattpocock_skills | MIT | 10 | Standards and spec axes (dealt) |
| requesting-code-review | obra_superpowers | MIT | 6, 10 | Review with `code-reviewer.md` (dealt). Also read by subagent-driven-development |
| code-review-and-quality | addyosmani_agent-skills | MIT | 10 | Five-axis review (dealt) |
| spec-to-code-compliance | trailofbits_skills | CC-BY-SA-4.0 | 10 | Which spec lines hold, fail or are missing |
| shipping-and-launch | addyosmani_agent-skills | MIT | 11 | Launch checklist, rollback |
| observability-and-instrumentation | addyosmani_agent-skills | MIT | 11 | The brief's metric visible |
| ci-cd-and-automation | addyosmani_agent-skills | MIT | 11 | CI file (never pushed without OK) |
| deployment-patterns | affaan-m_ecc | MIT | 11 | Free hosting plan, health checks, rollback |

### Platform and stack skills (stage 1 picks them; `build/STACK.md` names which ones each later stage loads)

| Skill | Source repo | Licence | Stages | Why |
|---|---|---|---|---|
| flutter-expert | Jeffallan_claude-skills | MIT | 5, 6 | Per stack: Flutter 3 and Dart, state, navigation, platform code |
| dart-flutter-patterns | affaan-m_ecc | MIT | 5, 6 | Per stack: Dart and Flutter patterns (null safety, BLoC or Riverpod, GoRouter) |
| react-native-expert | Jeffallan_claude-skills | MIT | 5, 6 | Per stack: React Native and Expo apps, navigation, native modules |
| react-native-patterns | affaan-m_ecc | MIT | 5, 6 | Per stack: Expo Router, data fetching, lists |
| kotlin-specialist | Jeffallan_claude-skills | MIT | 4, 5, 6 | Per stack: Kotlin, coroutines, Compose, Ktor server |
| kotlin-patterns | affaan-m_ecc | MIT | 5, 6 | Per stack: idiomatic Kotlin |
| android-clean-architecture | affaan-m_ecc | MIT | 6 | Per stack: native Android module structure, use cases, repositories |
| compose-multiplatform-patterns | affaan-m_ecc | MIT | 6 | Per stack: Jetpack Compose and Compose Multiplatform screens |
| swift-expert | Jeffallan_claude-skills | MIT | 5, 6 | Per stack: native iOS in Swift, SwiftUI, async/await |
| swiftui-patterns | affaan-m_ecc | MIT | 6 | Per stack: SwiftUI state, navigation, view composition |
| fastapi-expert | Jeffallan_claude-skills | MIT | 4, 5, 6 | Per stack: Python API with FastAPI and Pydantic |
| django-expert | Jeffallan_claude-skills | MIT | 4, 5, 6 | Per stack: Django and Django REST Framework |
| nestjs-expert | Jeffallan_claude-skills | MIT | 4, 5, 6 | Per stack: NestJS (TypeScript) API |
| nextjs-developer | Jeffallan_claude-skills | MIT | 4, 5, 6 | Per stack: Next.js App Router and API routes |
| spring-boot-engineer | Jeffallan_claude-skills | MIT | 4, 5, 6 | Per stack: Spring Boot 3 (Java or Kotlin) API |
| golang-pro | Jeffallan_claude-skills | MIT | 4, 5, 6 | Per stack: Go API and services |
| postgres-pro | Jeffallan_claude-skills | MIT | 4 | Per stack: Postgres queries, JSONB, indexes |
| cloud-architect | Jeffallan_claude-skills | MIT | 1, 11 | Hosting and connection plan across clouds. Cost advice in it is not a source; prices come from `business/COSTS.md` |
| terraform-engineer | Jeffallan_claude-skills | MIT | 11 | Only when the founder picks infrastructure as code. Files written, never applied |

Trail of Bits folders are whole plugin folders (the skill is at `skills/<name>/skills/<name>/SKILL.md`, except `insecure-defaults`). They are CC-BY-SA-4.0: copied unchanged only. Never edit them. Any changed copy we share keeps that licence and credits Trail of Bits.

## Support folders (not skills)

| Folder | Source | Licence | Read by |
|---|---|---|---|
| addy-references | addyosmani_agent-skills `references/` (7 checklists) | MIT | The Addy skills, which read `../../references/`. Read them from `skills/addy-references/` instead |
| gstack-shared | garrytan_gstack: `ETHOS.md`, `docs/askuserquestion-*.md`, `scripts/jargon-list.json`, `scripts/question-registry.ts`, `review/TODOS-format.md`, `NOTICE.md`, `licenses/` | MIT (+ Apache notice) | spec, plan-eng-review (they read `~/.claude/skills/gstack/<path>`). `bin/` and `lib/` not copied: never run |
| using-superpowers | obra_superpowers `skills/using-superpowers/references/` only | MIT | executing-plans (`../using-superpowers/references/`). Its `SKILL.md` (hook-loaded) is not copied |

## Not taken

| Skill | Why not |
|---|---|
| gstack `ship`, `land-and-deploy`, `canary` | Commit, push and deploy by design |
| SP `finishing-a-development-branch` | Offers push and PR. Its "keep it local" idea is a guard in stage 11 |
| SP `using-superpowers` (SKILL.md) | Loaded by a SessionStart hook |
| ToB `second-opinion` | Calls a paid or outside service |
| ToB `supply-chain-risk-auditor`, `differential-review` | Scripts or diff-only review; stage 8 lists advisories by hand |
| Pocock `to-spec`, `to-tickets`, `git-guardrails-claude-code` | Issue tracker or hooks |
| gstack `cso`, `careful`, `guard`, `freeze`, `qa-only`, `investigate`, `review` | Need gstack binaries; other skills cover the stage |
| ECC `tdd-workflow`, `e2e-testing`; Jeff `test-master`, `playwright-expert`, `code-reviewer`, `secure-code-guardian` | Fit 2; the dealt skills cover the stage |
| Addy `debugging-and-error-recovery`, `documentation-and-adrs`, `context-engineering` | Not named by a stage in `PLAN.md` |
| wshobson `agent-orchestration` plugin | Has no skill folders, only `agents/context-manager.md` and two commands. Nothing to copy as a skill |
