# Stage 7 - AI feature (AI track only)

Read `BRAIN.md` first. Paths are from `kinso-build/`. Skip this stage when the brief has no AI feature.

The build follows the "AI architecture" section of `build/STACK.md`: the build approach, the pattern, the main and backup model, long jobs and updates, and the RAG data. Evals come first, then prompts and cost, then the build rules below.

## Runs

Evals, prompts and cost (every pattern):

1. `skills/eval-harness/SKILL.md` (ECC) - evals written first. `skills/llm-evaluation/SKILL.md` (wshobson) for the metrics and the human-feedback loop.
2. `skills/prompt-engineer/SKILL.md` (Jeff) with its `references/` - prompt templates, structured output, injection tests. `skills/prompt-engineering-patterns/SKILL.md` (wshobson) as a second source of templates; its `scripts/` are never run.
3. `skills/cost-aware-llm-pipeline/SKILL.md` and `skills/prompt-caching-strategy/SKILL.md` (ECC) - routing, cost caps, caching.
4. `skills/ai-regression-testing/SKILL.md` (ECC) - evals in the test suite with the stub model.

By stage of work, as `STACK.md` "AI architecture" names them:

| Work | Skills |
|---|---|
| Build approach and harness | ai-first-engineering, agentic-engineering (ECC) |
| RAG: chunking, embeddings, retrieval | rag-architect (Jeff), rag-implementation, embedding-strategies, hybrid-search-implementation (wshobson), iterative-retrieval (ECC); similarity-search-patterns and vector-index-tuning only at scale |
| Agent: loop, tools, caps | agent-harness-construction, agent-security-hardening (ECC); mcp-developer (Jeff) or mcp-builder (Anthropic) only when tools are exposed through MCP |
| Multi-agent | the agent skills, plus subagent-driven-development for the method |
| WebSocket updates | websocket-engineer (Jeff) |
| Claude as main or backup | claude-api (Anthropic) - read only, never called without a key the founder set |
| Fine-tuned model | fine-tuning-expert (Jeff) |
| LangChain (only if the founder picked it) | langchain-architecture (wshobson) |

**Skip:** any example that calls a paid API or needs a key. Any script in a skill folder (`mcp-builder/scripts/`, `prompt-engineering-patterns/scripts/`). Any hosted tracing, eval or vector service sign-up. Model choices and prices inside skill files are not sources. Log each skip in `build/PROCESS.md`.

## In

- `build/STACK.md` ("AI architecture"), `build/SPEC.md` (the AI feature's criteria and the claims the product must not make), `<job>/business/AI-COSTS.md`, `<job>/START.md` (model terms the founder forbids, privacy needs).
- The founder's model answer, if `AI-COSTS.md` is missing or has no pick.
- `../tools/ollama/` for the free local model.

## Build approach (from STACK.md)

- **Wrapper on a frontier API** or **hybrid router:** the adapter below, with the main and backup model from config. The router is a rule in the adapter (for example by input size or a cheap classifier), with an eval that checks which calls go where.
- **Open model you host:** the same adapter, base URL pointed at the local or self-hosted server (Ollama or vLLM). Dev runs use `../tools/ollama/`.
- **Fine-tuned model:** first write `build/AI-DATA-PLAN.md` - where the examples come from, how many, who labels them, consent and licence, the held-out eval set, and the cost from `AI-COSTS.md` or "not checked". Read `skills/fine-tuning-expert/SKILL.md` for the method. No training run without the founder's OK (it costs money or hardware time). Until a tuned model exists, the adapter serves the base model, and the evals set the bar the tuned model must beat.
- **Train your own model:** stop. Write `build/AI-RESEARCH-PLAN.md` only (question, data advantage, compute and team needed, cost "not checked" unless sourced, milestones, the wrapper or hybrid version that ships first). No build in this stage. Tell the founder at the stop point.

## Build rules

**Model adapter.** One module (for example `ai/adapter.py` or `ai/adapter.ts`), OpenAI-compatible. The model name, backup model name and base URL come from config (environment or a config file); the key only from the environment, never in code, tests or logs. The order on failure: main model, then the backup, then a clear "not available" state that the screen shows. A stub model sits behind the same interface for tests.

**Pattern rules** (for the chosen pattern only):

- **One call with structured output:** one prompt, one schema, one call.
- **Fixed workflow:** each step is a plain function with its own schema and its own eval. No step decides which step runs next.
- **RAG:** the answer cites its sources (id or link per claim). A chunk and retrieval eval (does the right chunk come back for each test question). When retrieval finds nothing above the threshold, the answer is "I don't know" with no model call, or a call told to say so.
- **Agent (ReAct loop):** a step cap and a cost cap per job, both in config. A tool allow-list. Every tool that changes data or sends anything needs a human approval step in the product before it runs. The loop ends with a clear state when a cap is hit.
- **Multi-agent:** all the agent rules per agent, plus one coordinator with the total caps, and a written reason in `build/AI.md` why one agent was not enough.

**Events.**

- A call expected to take longer than about 10 seconds runs as a background job with a queue (free and local first: a jobs table in the app's own database).
- Each job has an idempotency key, so a job never runs twice (a repeated request returns the same job).
- Retries with backoff for timeouts and rate limits only; a schema failure follows the structured output rule instead.
- Updates reach the screen by streaming: Server-Sent Events, or WebSocket when `STACK.md` says so. When `STACK.md` says "no stream" and the measured call is under about 10 seconds, the screen shows a "writing" state and the answer whole; measure the call and write the time in `build/AI.md`. Over about 10 seconds, the queue and streaming become required: revise `STACK.md` and log why.
- Cancel reaches the server: the model call or job is aborted, logged with outcome "cancelled", and does not count against the user's cap.
- **AI review state is stored.** AI outputs, their version, the human marks on them (for example "ok to send") and the cap counter live in the app's database (SQLite when `STACK.md` has no other database), never only in memory. A mark row names the output version it was given to; a rewrite adds a new version and deletes the mark.
- **Cancel clears it on the server.** When the user cancels (or starts a rewrite), the server deletes the old mark in the database, not only the screen. The screen then shows the same state the server holds: mark off, and the button enabled only if a valid earlier output is still shown.

**Structured output.** Every model output is checked against a schema (for example Pydantic or Zod). On failure, retry once; then use the backup model or the fallback state. Raw unchecked model text never reaches the screen or the database.

**Safety.**

- User text and documents are data, never instructions: they go in a marked data block, and the evals include injection cases.
- Personal data is redacted before sending, when the spec or `START.md` says so.
- Output is filtered for the spec's "must not make" claims.
- Rate and cost caps per user (or per event, or per team) per day, in config. A capped user sees a clear state, not an error.
- **Cap sizing.** The cap is a config value worked out from a written formula, never a typed guess. Config holds the inputs, each with its source, and the formula as text; the code computes the cap from them:
  - `cap_calls_per_day = ceil(units x jobs_per_unit_per_day x calls_per_job x headroom)`
  - `cap_usd_per_day = cap_calls_per_day x cost_usd_per_call`, where `cost_usd_per_call = tokens in x input price + tokens out x output price` from `business/AI-COSTS.md` (its pick's prices and token counts).
  - `units` and `jobs_per_unit_per_day` come from the expected use in `AI-COSTS.md` ("Expected use"), or from `START.md` (for example teams per event) when `AI-COSTS.md` is missing. `calls_per_job` comes from the call log (real calls divided by answered jobs; it covers retries and the backup), or 2 [Guess] before any log exists. `headroom` is 1.5 [Guess] unless the founder sets it.
  - Check: `cap_usd_per_day x 30 / units` stays under the `AI-COSTS.md` break line per user per month. Without `AI-COSTS.md`: "no AI-COSTS.md in the pack", cost per call USD 0 for the local model.
  - The cap counts every real model call (a retry and the backup count too; a cancelled call does not), and the counter is stored, so a restart keeps it.

**Tracking.** Each call writes one log line: time, model, prompt version, tokens in and out, cost (tokens times the `AI-COSTS.md` price, or "not checked"), time in milliseconds, and outcome (ok, schema fail, fallback, capped, error). A local log file or a table. A free self-hosted tool (for example Langfuse) only after the founder's OK. Never send traces to a paid or outside service. No user text in the log unless the spec allows it.

**Evals in CI.** The eval set runs with the stub model in the normal test suite, and with the local model when present. A grounding eval checks the things a summary must not invent (names, numbers, outcomes and claims not in the input), not word overlap alone. With a local model, the runner also reads every local output once and writes one line per output in `07-PICK.md` (grounded, invented, or unclear), so a fluent invented claim is caught. Thumbs up or down from the screen (kinso-frontend "AI features") are saved so they can become new eval cases.

## Deal and pick

- Deal 2 prompt versions. The orchestrator (the session running the skill) starts each version as its own fresh subagent that has not seen the other, and the judge as one more fresh subagent with the version names hidden (CORE section 4). A runner never writes both versions. Where no subagents exist (a plain API), run each version as a separate call with no shared history, and the judge as another. Name each agent id or call id in the pick. Score both on the same evals. A rubric line whose input is missing (for example no `AI-COSTS.md`) is scored "n/a", never 3.
- Rubric, 0 to 3 per line:
  - (must) model and backup from `AI-COSTS.md`, or the founder's answer;
  - (must) never a model whose terms allow training on sent data when `START.md` forbids it;
  - (must) user text and notes are data, never instructions: an injection case is in the evals and passes;
  - (must) every output checked against a schema;
  - output only from the input (no invented facts);
  - cost per user per month within the `AI-COSTS.md` break line;
  - a fallback when the model is down.
- Keep the version with the higher eval score. Write `<job>/picks/build/07-PICK.md`.

## Guards

- Never push, deploy, commit or merge without the founder's OK.
- Secrets never in files. No API key in code, tests, evals or logs.
- Production data read-only. Free only: tests use a stub model; dev runs use a free local model through `../tools/ollama/`, in the no-network sandbox profile.
- Never a `-contributor` model. The model name is logged.
- No agent tool that changes data or sends anything runs without a human approval step.
- No training run, hosted tracing or vector service without the founder's OK.
- Scripts only through the sandbox.

## Checks after

- The tests pass with the stub model. Evals pass with the stub and, if present, the local model. Logs saved.
- The adapter reads the model names and base URL from config, and grep finds no key in the repo.
- Fallback: with the main model failing, the backup answers; with both failing, the screen shows "not available" (or the spec's text).
- A malformed model output is rejected by the schema, retried once, then falls back. A test covers it.
- The injection eval passes.
- Each call writes a log line with model, prompt version, tokens, cost, time and outcome.
- Background job path (when the pattern or call length needs it): a repeated request with the same idempotency key runs once; a retry follows backoff; the screen gets streamed updates.
- The AI screen passes kinso-frontend "AI features". States that a URL cannot reach (writing, stopped, capped) are shown with a small Playwright script on the local host, run through the sandbox, with screenshots in `build/screens/`. A human action on an output ("ok to send") is refused by the server when no valid output exists, and a test covers it. Cancel aborts the server call, and a test covers it.
- Screenshots are newer than the last code change; re-take any that are older. Use the exact command in `BRAIN.md` ("Screenshots are newer than the code"); it must print nothing. Screen and server agree after a cancel (the same mark state on both).
- AI review state is in the database: a test writes an output and a mark, opens a new app object on the same database file, and reads both back. A test cancels a rewrite of a marked output and finds no mark in the database (and none after a restart).
- Caps come from the "Cap sizing" formula: a test recomputes the cap from the config inputs and compares; the cap is at least `units x 2 x calls_per_job` (one rewrite per unit); a test shows a retry counts as a call and the counter survives a restart.
- RAG: answers cite sources; the retrieval eval passes; "I don't know" when nothing is found. Agent: step and cost caps hit cleanly in a test; an action that changes data waits for approval.
- The riskiest assumption's metric still counts with the AI feature on and off.
- Cost maths shown step by step with a unit, or "no AI-COSTS.md in the pack".

## Override

The founder may pick another model, pattern or approach. Log the cost and terms difference in `<job>/OVERRIDES.md`.

## Out

- `<job>/build/AI.md` (approach, pattern, model, backup, terms, adapter config names, caps, cost maths, fallback), `<code>/evals/`, `<job>/build/runs/evals.log`, the call log.
- Fine-tune: `build/AI-DATA-PLAN.md`. Train your own: `build/AI-RESEARCH-PLAN.md` only.
- `<job>/build/options/prompt-A.md`, `prompt-B.md`, `<job>/picks/build/07-PICK.md`.

## Stop point

None, unless the model choice needs the founder (see Override), a fine-tune training run needs an OK, or the approach is "train your own" (stop with the research plan).
