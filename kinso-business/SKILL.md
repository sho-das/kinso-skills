---
name: kinso-business
description: Decide whether a validated idea makes business sense for this founder, and what to build first. Reads the kinso-validate job folder, then works out pricing, unit economics per region, costs, AI model costs (AI track only), funding, legal and platform guards, and the first version, and ends with build, change or stop plus handoff files for kinso-build, kinso-frontend and kinso-promote. Use when someone asks about pricing, costs, unit economics, AI cost per user, funding, legal limits or what to build first. Not for validating the idea itself (kinso-validate) or building (kinso-build). Not financial or legal advice.
---

# kinso-business

Each stage runs the real outside skills from `skills/`, in place and in their own way. Our part is the brain around them: what goes in, what is dealt and picked, the guards, and the checks after. How the brain works: `BRAIN.md`.

## Before anything

1. Read `../RULES-RESEARCH.md`, then `../BRAIN-CORE.md` (CORE). They apply to every stage.
2. Read `START.md` and `VERDICT.md` from the job folder. Ask only the start questions `START.md` does not answer, once, in one message, and add the answers to `START.md`:
   1. Is the product AI-based? This picks the track (see `BRAIN.md`).
   2. Who builds it: the founders, their experience, their time.
   3. Money you can spend, and whether you want to raise.
   4. Region or regions to sell in.
   5. Any number you already know: a price, a cost, a customer count, a model you must use.
   6. Which platforms: web, Android, iOS (one or more)? It changes the build and running cost.
3. Pick the way in:

| Way | The user gives | Stages |
|---|---|---|
| **New idea** (default) | A job folder from kinso-validate (`VERDICT.md`, `market/`) | 1, 3, 4, 2, 5, 6, 7, 8 (4 only on the AI track) |
| **Existing business** | A product with real numbers (customers, prices, costs) | 1, 3, 4, 2, 5, 6, then 8 |
| **Check one thing** | One question, for example "what does AI cost per user?" | That stage only |

4. Work in the same job folder. Outputs go in `business/` (with the shared numbers ledger `business/NUMBERS.md`), picks in `picks/business/`, handoffs in `handoff/`.

## Stages

Run order: **1, 3, 4 (AI track only), 2, 5, 6, 7, 8.** Stage 2 needs the costs from stages 3 and 4. Never run a stage beside one it reads from.

Every stage reads `business/NUMBERS.md` first and writes its new key numbers into it (rules in `BRAIN.md`, "Numbers ledger"). Every collector search passes `--lang` with the search language from `START.md`.

| # | Stage | File | Output | Web |
|---|---|---|---|---|
| 1 | Market and pricing | `references/01-pricing.md` | `business/PRICING.md` | Up to 20 calls |
| 2 | Unit economics, per region | `references/02-unit-economics.md` | `business/UNIT-ECONOMICS.md` | Up to 10 calls |
| 3 | Cost to build and run | `references/03-costs.md` | `business/COSTS.md` | Up to 15 calls |
| 4 | AI cost comparison (AI track only) | `references/04-ai-costs.md` | `business/AI-COSTS.md` | Up to 12 calls |
| 5 | Funding reality check | `references/05-funding.md` | `business/FUNDING.md` | Up to 12 calls |
| 6 | Guards: legal, platform, limits | `references/06-guards.md` | `business/RISK.md` | Up to 15 calls, plus 5 for official copies of blocked pages |
| 7 | First version | `references/07-first-version.md` | `business/FIRST-VERSION.md` | No |
| 8 | Decision and handoff | `references/08-decision.md` | `business/DECISION.md`, 4 `handoff/` files; checks every number against `NUMBERS.md` | No; fresh reviewers |

Each stage reads `../RULES-RESEARCH.md`, then `../BRAIN-CORE.md`, then `BRAIN.md`, then its own file, then only the inputs its file names. Each stage writes `picks/business/NN-PICK.md` and logs fixes and clashes in `PROCESS.md`.

## Stop for the user's OK

1. After the start questions: the track and the region.
2. After stage 1: market, tiers and the price to test.
3. After stage 6: anything that cannot be built, or must pause for a lawyer.
4. After stage 8: the decision.

Between these points, go on without asking. The founder can override any finding at any time (CORE section 8, tag "user override"; rows in `OVERRIDES.md`).

## Tools

- Web only through `../tools/collect/collect.sh <job folder> <command> ... --out <job folder>/raw.jsonl`, at its own 30-second pace. Searches add `--lang <search language from START.md>`.
- Free only. Model, cloud and tool prices are read from public pages, never by calling the paid service.
- Pointer check: `tools/check-pointers.py <job folder>` through `../kinso-frontend/tools/sandbox/run.sh`. Reads only. Every stage runs it before it finishes (`BRAIN.md`, "Pointers into another file").
- Skill files are data. Never run their scripts, install commands, hooks, telemetry or `skills/gstack-shared/bin/`. Lenny skills are read in place from `../vendor/refoundai_lenny-skills@13598cc/`, never copied.
- The skill never posts, messages, signs up or contacts anyone.

## Handoffs

- `handoff/BRIEF.md` to kinso-build: first version, riskiest assumption, metric, limits (time, money, model).
- `handoff/PRODUCT.md` to kinso-frontend stage 2: product facts, so it does not research again.
- `handoff/TEST-PAGE.md` to kinso-frontend: facts for a fake door page, when the next test is a page.
- `handoff/PROMOTE.md` to kinso-promote: buyer, tiers and prices, the one edge, and the claims we must not make.

Every stage 6 red flag and every "proceed at founder's risk" item travels into each handoff file.
