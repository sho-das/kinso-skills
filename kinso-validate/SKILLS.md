# kinso-validate - Skills index

27 October 2026. Every folder in `skills/` is an unchanged copy from the scanned and pinned repos in `vendor/` (see `vendor/LOCK.json`). Each holds its licence and a `SOURCE.md`. Nothing here is run, installed or loaded by this copy step. Stage numbers are from `SKILL.md` and `CONDUCTOR-PLAN.md`.

## Skills

| Skill | Source repo | Licence | Stages | What for |
|---|---|---|---|---|
| deep-research | affaan-m_ecc | MIT | 0, 3 | Topic split, source rules. Its Firecrawl and Exa search is paid: use the collector instead |
| last30days | mvanhorn_last30days-skill | MIT | 0, 3 | Keyword traps, recency, per-source outcomes. Ideas only: its engine needs paid keys |
| product-brainstorming | anthropics_knowledge-work-plugins | Apache-2.0 | 1, 2 | Stage 1 winner: modes, framework library, diverge and converge |
| idea-refine (new) | addyosmani_agent-skills | MIT | 1, 2 | 7 lenses, 2 to 3 directions, painkiller test, "Not Doing" list; stage 2 sharpening questions |
| office-hours (new) | garrytan_gstack | MIT | 1, 2, 8 | Six forcing questions by stage, minimal / ideal / lateral directions, landscape and EUREKA check |
| mom-test (new) | sreshtalluri_mom-test | MIT | 1, 3 | Question rules for `idea/QUESTIONS.md`; evidence ladder (cost to the customer sets the weight) |
| mom-test-check-questions (new) | sreshtalluri_mom-test | MIT | 1, 2 | Checks every founder question against 6 fail rules |
| mom-test-roleplay (new) | sreshtalluri_mom-test | MIT | 1, 9 | 5 persona packs; optional rehearsal of the first message (never counted as evidence) |
| mom-test-outreach (new) | sreshtalluri_mom-test | MIT | 9 | Framing for cold asks to the first users |
| mom-test-gate (new) | sreshtalluri_mom-test | MIT | 6 | Second opinion: counts qualifying evidence, "run N conversations first"; never blocks |
| mom-test-memory (new) | sreshtalluri_mom-test | MIT | 6 | Needed by mom-test-gate: the `discovery/` format and the evidence rungs |
| startup-design | ferdinandobons_startup-skill | MIT | 2, 3, 6, 8, 10, 11 | Intake, research waves, honesty protocol, sizing, and the **verification agent** (`references/verification-agent.md`) |
| startup-competitors | ferdinandobons_startup-skill | MIT | 7, 11 | Rival waves, battle cards, its own verification agent |
| competitive-platform-analysis | affaan-m_ecc | MIT | 4, 7 | Rival selection axes and tiers |
| claude-startup-validator (new) | nmsavaliya_claude-startup-validator | MIT (no named holder) | 0, 4, 5, 7 | `failure-patterns.md` (10 modes, pre-mortem) for stage 5; `competitor-analysis-framework.md` (DIY rivals, 6 advantage types) for 4 and 7; industry playbook for 0. Repo name of the skill: ai-startup-opportunity-generator |
| grilling | mattpocock_skills | MIT | 2, 5 | Stage 5 winner: decision tree, frontier rounds |
| plan-ceo-review (new) | garrytan_gstack | MIT | 5 | Step 0 only: premise challenge, reversibility, "not in scope" |
| validate-idea | emotixco_claude-skills-founder | MIT | 2, 6 | Five fatal questions, 3 cheap experiments, verdict |
| market-research | affaan-m_ecc | MIT | 8, 10 | Stage 8 winner; source rules, quality gate |
| go-to-market | emotixco_claude-skills-founder | MIT | 9 | Named communities, top 5 channels, budget |
| persona-gen | emotixco_claude-skills-founder | MIT | 9 | 3 clearly different personas, fit score |
| market-sizing-analysis | wshobson_agents | MIT | 10 | Top-down, bottom-up, value theory, triangulation |
| identify-assumptions-new (new) | phuryn_pm-skills | MIT | 2 | 8 risk categories for a new idea (adds Ethics, Go-to-Market, Strategy, Team); covers "adoption" (will they try it, keep using it), which our 5 risk kinds miss |
| strategy-red-team (new) | phuryn_pm-skills | MIT | 5 | Steelman then attack each load-bearing claim; rank by impact x likelihood x cheapness to test; cheapest test and kill criteria |
| pre-mortem (new) | phuryn_pm-skills | MIT | 5 | Tigers, Paper Tigers, Elephants; launch-blocking, fast-follow or track |
| beachhead-segment (new) | phuryn_pm-skills | MIT | 9 | First segment scored on burning pain, willingness to pay, winnable share, referrals |

Support folders (not skills):

| Folder | Source | Licence | Read by |
|---|---|---|---|
| shared | emotixco_claude-skills-founder `shared/conventions.md` | MIT | validate-idea, go-to-market, persona-gen. Copied earlier, with no `SOURCE.md` or `LICENSE`; left as found (it matches vendor) |
| gstack-shared (new) | garrytan_gstack: `bin/`, `ETHOS.md`, `docs/askuserquestion-*.md`, `scripts/jargon-list.json`, `scripts/question-registry.ts`, `review/TODOS-format.md`, `browse/bin/remote-slug`, plus `NOTICE.md` and `licenses/` | MIT, with Apache-derived parts | office-hours, plan-ceo-review. `bin/` holds preamble and telemetry scripts: never run |

**Lenny skills** (refoundai_lenny-skills): not copied. Read in place from `vendor/` when a stage needs one. The text belongs to Lenny Rachitsky and guests.

## Considered and not taken

| Skill | Reason |
|---|---|
| Addy `interview-me`, Pocock `grill-me` | Near-duplicates of `grilling` and office-hours for stage 1; not picked by the study |
| emotix `product-brief`, `user-interviews`, `competitor-matrix` | Covered by idea-refine, mom-test and competitive-platform-analysis; not picked by the study |
| knowledge-work `competitive-brief`, `synthesize-research`, `search-strategy`, sales `competitive-intelligence`, `customer-voice` | Plan candidates the study did not pick; competitive-intelligence needs a CRM connector |
| startup-skill `startup-positioning` | Plan candidate for 7 and 9; the study did not use it |
| ECC `competitive-report-structure` | Stage 11 stays our own review; no outside method won |
| mom-test `prep`, `debrief`, `next-question`, `league` | For running live interviews; the skill does not run interviews |
| mom-test `docs/` | Restates a copyrighted book (repo README) |
| Anthropic `deep-research` | Not in `vendor/` |
| gstack `office-hours` and `plan-ceo-review` Codex steps | Paid (OpenAI). Method text only |
