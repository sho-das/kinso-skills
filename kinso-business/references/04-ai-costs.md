# Stage 4 - AI cost comparison

**AI track only.** On the regular track this stage is skipped and noted in `PROCESS.md`. Web: up to 12 collector calls. Paths are from the `kinso-business/` folder. How the brain works: `BRAIN.md`.

## Runs

Each skill is followed as its own `SKILL.md` says, read in place.

1. `skills/claude-api/SKILL.md` - only `shared/`: models, cost optimisation, prompt caching, token counting, live sources. Its rule "fetch the live price page before any dollar figure" applies.
2. `skills/cost-aware-llm-pipeline/SKILL.md` - routing by task size, budget cap, caching.
3. `skills/prompt-caching-strategy/SKILL.md` - the cost calculator with separate lines for uncached input, cache write, cache read, output.
4. `skills/eval-plan/SKILL.md` - method only: preregister bars, a zero-cost dry run (token counts by hand).

**Skip:** the gstack preamble and `skills/gstack-shared/bin/` (scripts, telemetry); the eval-plan paid pilot; any call to a model API; the language folders in `skills/claude-api/` (code, not pricing).

## In

- Job folder: `START.md` (model the founder must use, expected use), `business/PRICING.md`, `business/COSTS.md`, `OVERRIDES.md`. Stage 2 runs after this stage, so `UNIT-ECONOMICS.md` does not exist yet.
- Numbers ledger: read `business/NUMBERS.md` first. Use its rows as they stand, add each new key number, and log every change (old value, new value, reason). Rules: `BRAIN.md`, "Numbers ledger". Add the AI cost per user rows (pick and backup) with "Set by" 4.
- Shared rules (`../RULES-RESEARCH.md`): facts only; dated official sources; free only; never a `-contributor` model; collector with `--out <job>/raw.jsonl` and `--lang <search language from START.md>` on every search, at its 30-second pace; user override (CORE section 8).
- Numbers inside skill files are not sources (`STUDY.md` finding 2). The ECC price table and `claude-api/shared/models.md` already disagree.
- Prices: each provider's official pricing page, read with `fetch`, then checked against LiteLLM or models.dev.

## Deal and pick

Deal **3 model setups**, plus any model the founder must use as a 4th row (scored, never dropped):
- **Small** - the cheapest model that can do the job, with caching.
- **Ideal** - a mid model, or a router (cheap model plus a big one for hard cases).
- **Sideways** - seeded draw from: an open model on a free or cheap host, a non-AI path for part of the work, a model from another provider. Excludes the providers used above. Must include at least one non-Anthropic option across the 3.

Rubric, 0-3 per row, max 15: cost per user at 1,000 users (under 10% of the stage 1 price); tail cost (hardest tenth priced); quality fit (public eval or a free test, not a guess); data terms (official terms say no training on user data); price evidence (official page, dated, cross-checked).

Pick one and a backup. Write `<job>/picks/business/04-PICK.md`.

Also cost each build approach the founder is weighing (wrapper on a frontier API, open model self-hosted, fine-tuned model, hybrid router, train your own): one row each with cost at 1,000 users, data needed and time, from official sources or "not checked", so kinso-build stage 1 can recommend one.

## Guards

- Never a model whose terms allow training on what the user sends.
- Never a `-contributor` model.
- Never invent a token count or a price. Use counts are [Guess] with the reason until measured.
- No paid call, ever.

## Checks after

- Every price per million tokens has the official link and the date read.
- The brain re-computes cost per user and at 100, 1,000 and 10,000 users.
- Cache discounts never applied to output; hit rates marked "unmeasured".
- The **break point** is stated: the AI cost per user at which the margin breaks.
- Every number is tagged: [Source], [Stage], [Start], [Calc] or [Guess]. Flags section at the end.

## Override

As in `../RULES-RESEARCH.md` section 7. A founder's required model stays in the table, tagged "user override" if it lost, with a row in `OVERRIDES.md`.

## Out

`business/AI-COSTS.md`: one table (model, price per million in and out with date, cost per user, at 100 / 1,000 / 10,000 users, quality fit, data terms), the pick, the backup, the break point. Fixes in `PROCESS.md`.

## Stop point

None. Go on to stage 2.
