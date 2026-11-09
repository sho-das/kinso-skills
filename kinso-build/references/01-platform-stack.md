# Stage 1 - Platform and stack

Read `BRAIN.md` first. Paths are from `kinso-build/`. `<job>` is the job folder.

This stage asks the founder which platforms to build for and which stack to build with, as a form. Every option has a reason, the cost later and the skills it needs. One option is marked as recommended. The founder chooses. Every later stage reads the answer from `build/STACK.md`.

## Runs

No skill deal. The brain builds the options and the founder picks.

1. The brain builds the options from the job (see "Options are built from the job").
2. `skills/cloud-architect/SKILL.md` (Jeff) with its `references/` - read for the hosting and connection plan only. Its cost numbers are not sources; prices come from `business/COSTS.md`.
3. The platform and stack skills the founder picks are only named here (in `STACK.md`). They are read in later stages.

**Skip:** any CLI, sign-up, account, `terraform` or cloud console step in cloud-architect. Log each skip in `build/PROCESS.md`.

## In

- `<job>/START.md` - the founders' skills, hours, budget, region, model terms.
- `<job>/handoff/BRIEF.md` - first version, limits, and the platforms if kinso-business asked them.
- `<job>/business/COSTS.md` - running cost per platform and per host, free tier limits, if present. `business/AI-COSTS.md` on the AI track.
- `build/INTAKE.md`, `build/GUARDS.md` and the founder's stage 0 answers (where the code lives).
- Existing code way in: kinso-frontend's `existing/MAP.md`. The stack the code already uses is the recommended option for every question.

## The form

Ask the questions below as a form. Never as loose prose.

**When the AskUserQuestion tool is available (Claude Code):**

- Up to 4 questions per call. Use several calls in a row when there are more (for example questions 1 to 4, then 5 to 8).
- 2 to 4 options per question. The tool adds "Other" on its own; do not add it.
- The recommended option is first, with "(Recommended)" at the end of its label.
- Each option has one description line: the reason, the cost later, and the skills needed. Example: "Your team knows Python. Free on Fly.io for a small app. Needs: fastapi-expert."
- A short header per question (12 characters or fewer), for example "Platforms", "Mobile", "Language", "Backend", "Database", "Cloud", "Login", "Model host".
- `multiSelect: true` for question 1 (platforms). All others are single choice.
- Ask question 2 only when question 1 includes Android or iOS. Build the options of each later call from the answers so far (for example, after "Flutter", the language question leads with Dart for the app and asks only about the backend language).

**When the tool is not available:** show the same questions as a numbered form in one message. Each option has a letter (a, b, c, d) and the same one-line reason, cost and skills. Mark the recommended option "(Recommended)". End with one line: "Reply like: 1 a,b  2 a  3 b ... or 'all recommended'." Then wait.

**Recommendations that depend on an earlier answer (both ways).** The numbered form is answered in one go, so each later question must show how its recommendation changes with question 1. When any platform beyond web is possible, now or later, the backend question says: "If you pick Android or iOS, now or later: (Recommended) a backend with a JSON API that every app uses." A server that only renders HTML pages is never the recommended backend when a second platform is picked, even as "later". The cloud question says what a later phone app needs to reach the data (a host for the API and the database; a database file on one computer cannot be read by a phone).

**Skip** any question already answered in `START.md`, `handoff/BRIEF.md` or `business/COSTS.md`. Show it once as "Already chosen: <answer> (<file>)", so the founder can change it.

## Questions, in order

1. **Platforms** (multi-select): web, Android, iOS, desktop. Pre-fill from `START.md` (kinso-business start question 6) or `handoff/BRIEF.md`. When either holds the answer, show "Already chosen: <platforms> (<file>)" and do not ask. If more than one is picked, ask which comes first (see "More than one platform").
2. **Mobile approach** (only with Android or iOS): Flutter; React Native (Expo); native (Kotlin for Android, Swift for iOS); a PWA (the web app installed on the phone).
3. **Preferred language and stack:** Python; TypeScript or Node; Java or Kotlin; Go; Swift; other (the founder names it).
4. **Backend:** for example FastAPI, Django, NestJS, Next.js API routes, Spring Boot, Go (standard library or a small router), or a hosted backend such as Supabase or Firebase.
5. **Database:** Postgres, SQLite, MySQL, MongoDB, Firestore.
6. **Cloud and hosting:** free tiers first: Supabase, Cloudflare, Fly.io, Render, Vercel, Google Cloud. AWS and Azure are marked "free tier ends" (their free use is time-limited or narrow). The limits shown come from `business/COSTS.md`; if it has none, write "free tier limit: not checked" instead of a number.
7. **Login method:** for example email and password, magic link by email, Google or Apple sign-in, or no login in the first version.
8. **AI track only - the model host:** the free local model through `../tools/ollama/` for development, and the host for later from `business/AI-COSTS.md` (its pick is the recommended option). Then ask the "AI architecture" block below.

## AI architecture (AI track only)

Ask this block right after the stack questions, in its own form call (or its own numbered block). Same form rules as above: AskUserQuestion when available, recommended option first with "(Recommended)", one line per option with the reason, the cost later and the risk; otherwise a numbered form with letters. Short headers: "AI approach", "AI pattern", "Model", "Long jobs", "Updates", "RAG data".

**Plain words for a non-expert founder.** Each technical word gets a few plain words the first time, in the option line itself (for example "adapter (one file that talks to any model)", "structured output (a fixed answer shape the code checks)", "RAG (look up your own data first)", "SSE (the server sends text as it is written)"). An option a guard forbids (a paid key, a training run without an OK) is not offered; list it once under the form as "Not offered: <option> - <guard>". Every question that can be answered "none" has a letter for it. A cost line says "USD 0 now; later: not checked (<what could cost money>)", never a bare "not checked". Skill names go in `STACK.md`, not in the form.

**In:** `build/INTAKE.md`, `handoff/BRIEF.md` (the AI feature), `business/AI-COSTS.md`, `START.md` (model terms the founder forbids). The spec is not written yet, so read the AI feature's criteria from the brief; stage 2 checks the choice against the spec and flags a mismatch.

**Questions, in order:**

0. **How do you want to build the AI?** (single choice, asked first; header "AI approach"). Each option's line says when it fits, the cost, the data needed, the time, and the moat (what stops a copy):
   - **Wrapper on a frontier model's API** (Muse, Claude and others) - fits most first versions. Cost per call; no training data; days. Moat: the product, its data and workflow, not the model. Risk: depends on the provider's price and terms.
   - **Open model you host** (for example Llama or Qwen through Ollama or vLLM) - fits when privacy or control matter. Hardware or hosting cost; no training data; days to weeks. Moat: data never leaves; still copyable. Risk: you run and update it.
   - **Fine-tuned model** (an open model, or a provider's fine-tune service) - fits a special task or style a prompt cannot reach. Training plus hosting or per-call cost; needs good labelled example data; weeks. Moat: your example data. Risk: data quality and retraining.
   - **Hybrid router** - a small local model for easy calls, a frontier model for hard ones. Lower cost at scale; no training data; days plus routing evals. Moat: as the wrapper. Risk: two models to test.
   - **Push the frontier (train your own model)** - research-level cost and team; only with funding and a data advantage. Months to years. Moat: the model itself. Risk: highest by far.

   The tool shows at most 4 options: drop "Push the frontier" from the tool unless the founder has the funding and data for it (it stays in the numbered form, and "Other" covers it). **The brain recommends one** from the founder's data (`START.md`, `BRIEF.md`), budget, privacy needs and `business/AI-COSTS.md` (its "build approaches" rows, if present), and says plainly why each other approach does not fit yet (for example "No fine-tune: no labelled examples yet"). Without data for a fine-tune and without funding for training, the recommendation is a wrapper or a hybrid router, behind the adapter.

1. **Pattern** (single choice). The options, simplest first:
   - **One call with structured output** - one model call returns a fixed JSON shape, checked against a schema. Cheapest and easiest to test. Risk: no multi-step reasoning.
   - **Fixed workflow** - a few chained steps in code (for example extract, then classify, then write). Each step is testable. Risk: more calls, more cost per job.
   - **RAG** - retrieval from the product's own data, then one call that cites its sources. Needed when the answer depends on data too large for one prompt. Risk: retrieval quality becomes a second thing to test.
   - **Tool-using agent (ReAct loop)** - the model reasons, calls a tool, reads the result, and repeats, with a step cap and a cost cap. Needed only when the steps cannot be known in advance. Risk: cost and behaviour are harder to predict and test.
   - **Multi-agent** - several agents with their own roles. Only when one agent clearly cannot do the job. Risk: highest cost, hardest to debug.

   The tool shows at most 4 options: show the recommended one and the next three simplest; multi-agent goes in the numbered form or as "Other". **The brain recommends the simplest pattern that meets the AI feature's criteria**, and in the recommended option's line, or one line under the form, says why each simpler-or-heavier pattern is not needed yet (for example "No RAG: each summary uses one record that fits in one prompt").

2. **Model access.** Always one adapter layer in the code, OpenAI-compatible (or LiteLLM style): the model name and base URL come from config, so a Muse model, Claude, a local Ollama model or another host can be swapped without code changes. The question names the **main model** and the **backup model**, both from `business/AI-COSTS.md` (its pick is the recommended option). Without `AI-COSTS.md`: the free local model through `../tools/ollama/` is the recommended main, a second installed local model (or "none yet") is the backup, and the line says "no AI-COSTS.md in the pack". The stub model is for tests only, never offered as the backup. Never a `-contributor` model; never a model whose terms allow training on sent data when `START.md` forbids it.

3. **Long jobs.** Run in the request (recommended when one call is expected to take under about 10 seconds), or a background job with a queue (recommended when calls can take longer, or the pattern is a workflow, agent or multi-agent). Free and local first: a table in the app's own database as the queue, before Redis or a hosted queue.

4. **Updates to the screen** (ask only when the answer is streamed or a background job runs): Server-Sent Events (recommended: one way, plain HTTP, simple) or WebSocket (only when the client must also send while the job runs). "None" is fine for one short call.

5. **Data for RAG** (ask only when the pattern is RAG or an agent that searches): where the data lives (the app database, uploaded files, a folder) and the vector store, free and local first: pgvector in Postgres (when the stack has Postgres), SQLite with a vector extension (when the stack has SQLite), or none (keyword search only, when the data is small).

**Skills per answer** (name them in "Skills per stage", stage 7 row): RAG - rag-architect, rag-implementation, iterative-retrieval, embedding-strategies, hybrid-search-implementation (similarity-search-patterns and vector-index-tuning only at scale). Agent - agentic-engineering, agent-harness-construction, agent-security-hardening (mcp-developer or mcp-builder only when tools are exposed through MCP). Multi-agent - the agent skills plus subagent-driven-development for the method. WebSocket - websocket-engineer. Claude as main or backup - claude-api (read only; never called without a key the founder set). Fine-tuned model - fine-tuning-expert. Open model you host - no extra skill; the adapter points at the local or self-hosted base URL. Every pattern - eval-harness, prompt-engineer, llm-evaluation, ai-regression-testing, cost-aware-llm-pipeline.

Save the answers in `build/STACK.md`, section "AI architecture".

## Options are built from the job

- Build each option from: the founders' skills in `START.md`, the budget, the region, the first version in `BRIEF.md`, and `business/COSTS.md`. Never from a general "best stack" list.
- A stack the founders already know comes first, unless it fails a must line below.
- Every price, limit or free tier number is copied from `business/COSTS.md` with its date, or left out. Never from memory and never from a skill file.

**Deal 2 or 3 full stack combinations** before the form. Each is one row: platforms, mobile approach, language, backend, database, cloud, login. Name them by what they are good at, for example:

- **Fast and cheap** - the stack the team knows, one hosted backend, free tier only.
- **Best long term** - a plain backend and Postgres the team owns, easy to move between hosts.
- **Phone-first** - Flutter or React Native app first, shared backend, web later.

Score each combination 0 to 3 per line, and write the scores in `picks/build/01-PICK.md`:

| Line | Must |
|---|---|
| Free to start: every part has a free tier or runs locally | yes |
| Fits the team: the founders' skills in `START.md` cover it, or the gap is named | |
| Cost at 100 users and at 1,000 users (from `COSTS.md`, or "not checked") | |
| Time to first version within the founder's hours | |
| Free tier limits the first version will hit | |
| Lock-in: how hard it is to move off this host or backend | |

A failed must drops the combination. The highest total is marked "(Recommended)". The recommended combination sets the recommended option in each question of the form. Show the 2 or 3 combinations in short before the form, so the founder can also answer "take combination B".

## More than one platform

When the founder picks more than one platform (for example web, Android and iOS):

- **One shared backend API.** Login, data sync, push alerts and file storage are planned once, in the backend, and every app uses them. No platform gets its own backend.
- **A separate app plan per platform.** Each app has its own target (web, Flutter, React Native, Android Kotlin or iOS Swift), its own screens list, and connects to the same API. With Flutter or React Native, one app plan covers both Android and iOS; say so.
- **How they connect.** Draw it in `STACK.md` as a short text diagram: each app -> the API -> the database, plus the login provider, push service and file store.
- **Repo layout, as a form option:** one monorepo (`apps/web`, `apps/mobile`, `api/`, shared types) or separate repos (one per app and one for the API). Give the reason and cost for each.
- **The founder picks:** the build order (which platform first) and whether to build all now or one first. "One first" is the recommended option when the founder's hours in `START.md` are fewer than the total in the plan; the others wait in `STACK.md` as "later".

## Deal and pick

- Deal 2 or 3 stack combinations (above). The brain scores; the founder picks. The founder's pick wins over the score.
- Write `<job>/picks/build/01-PICK.md` with mode "deal stacks", the combinations, the scores, the recommendation, and the founder's choices.

## Guards

- Never push, deploy, commit or merge without the founder's OK. No account, project, app store entry or cloud resource is created.
- Secrets never in files. No key, token or project ID in `STACK.md`.
- Free only. A paid tier is never the recommended option. A host whose free tier ends is marked "free tier ends".
- Never a `-contributor` model, for the runner or as the model host.
- Nothing in `vendor/` or `skills/` is run or installed (the one exception, a named and scanned script through `run.sh`, is in CORE section 8 item 7; this stage names none). No SDK, CLI or emulator install in this stage.
- Facts only from the inputs. No price, free tier limit or store fee from memory.

## Checks after

- Every question has an answer from the founder, or "Already chosen" with its source file.
- Every option shown had a reason, a cost later and the skills needed.
- Exactly one option per question was marked recommended, and `STACK.md` says whether the founder took it.
- Every price and limit in `STACK.md` has its source in `business/COSTS.md`, or says "not checked".
- With more than one platform: one shared API, one app plan per platform, the connection diagram, the repo layout, the build order and "all now or one first" are in `STACK.md`.
- A platform marked "later" counts as a second platform: the backend is a JSON API from the first version, and `STACK.md` says where the API and database will be hosted when the later app needs them (free host, or "not checked").
- Every skill named in the "Skills per stage" table exists in `skills/` (or is kinso-frontend).
- AI track: `STACK.md` has the "AI architecture" section, with the build approach and why the others do not fit yet, the recommended pattern, a one-line reason why each other pattern is not needed yet, the main and backup model with their source in `AI-COSTS.md` (or "no AI-COSTS.md in the pack"), and the long-job and update choices.

## Override

The founder may pick any option, including one that fails a must line (for example a paid tier). Say once what it fails and what it costs, then follow, and log a row in `<job>/OVERRIDES.md`. The founder may come back and change the stack later; the brain then names the stages that must run again.

## Out

`<job>/build/STACK.md`:

```
# Stack

Date:
Way in: from the chain | existing code

## Choices
| Question | Choice | Recommended | Taken? | Why (one line) |
|---|---|---|---|---|
| Platforms | | | | |
| Mobile approach | | | | |
| Language | | | | |
| Backend | | | | |
| Database | | | | |
| Cloud and hosting | | | | |
| Login | | | | |
| Model host (AI track) | | | | |

## Combinations dealt
<A, B, C in one line each, scores, which was recommended>

## AI architecture (AI track only)
| Question | Choice | Recommended | Taken? | Why (one line) |
|---|---|---|---|---|
| Build approach | | | | |
| Pattern | | | | |
| Main model | | | | |
| Backup model | | | | |
| Long jobs | | | | |
| Updates to the screen | | | | |
| Data for RAG and vector store | | | | |
Adapter: one module, OpenAI-compatible, model name and base URL from config, no key in code.
Why not the other approaches: <one line each>
Why not the other patterns: <one line each>
Caps: <step cap and cost cap per job, per user per day; from AI-COSTS.md or "not checked">

## Platforms and build order
| Order | Platform | Platform target for kinso-frontend | Pages path in `<code>/` | Now or later |
|---|---|---|---|---|

## How they connect
<text diagram: each app -> API -> database; login, push, files>
Repo layout: monorepo | separate repos

## Costs and limits
<per host: free tier limit, cost at 100 and 1,000 users, source in business/COSTS.md or "not checked">

## Skills per stage
| Stage | Skills to load |
|---|---|
| 4 Data model and API | <database skill>, <backend skill> |
| 5 Tests first | <language skill> |
| 6 Build | <language and platform skills>; kinso-frontend with platform target <...> |
| 7 AI feature (AI track) | eval-harness, prompt-engineer, cost-aware-llm-pipeline; <the pattern's skills from "AI architecture"> |
| 11 Ship | deployment-patterns on <cloud>; cloud-architect; terraform-engineer only if chosen |
```

Skills per choice (use these names in the table):

| Choice | Skills |
|---|---|
| Flutter | flutter-expert, dart-flutter-patterns |
| React Native | react-native-expert, react-native-patterns |
| Android native (Kotlin) | kotlin-specialist, kotlin-patterns, android-clean-architecture, compose-multiplatform-patterns |
| iOS native (Swift) | swift-expert, swiftui-patterns |
| FastAPI / Django | fastapi-expert / django-expert |
| NestJS / Next.js API | nestjs-expert / nextjs-developer, backend-patterns |
| Spring Boot | spring-boot-engineer (with kotlin-specialist for Kotlin) |
| Go | golang-pro |
| Postgres | postgres-pro, postgres-patterns, database-migrations |
| Supabase | supabase, supabase-postgres-best-practices |
| Prisma (any TypeScript backend) | prisma-patterns |
| Any cloud | cloud-architect, deployment-patterns; terraform-engineer only if the founder wants infrastructure as code |
| SQLite, MySQL, MongoDB, Firestore | none of their own; database-migrations for schema changes |
| Python with no framework | none of its own; the stage 5 and 6 rows name the test tool (unittest) |
| TypeScript or Node with Next.js | nextjs-developer, backend-patterns; tests with `node --test` unless a test package is approved |
| No cloud yet (runs locally) | stage 11 row: deployment-patterns and cloud-architect for a plan only, host "not chosen" |

Also: `<job>/picks/build/01-PICK.md`, and the first stage 1 lines in `build/PROCESS.md`.

## Stop point

Yes. Show the combinations and the form. Wait for the founder's choices before stage 2.
