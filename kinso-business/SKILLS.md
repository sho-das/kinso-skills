# kinso-business - Skills index

27 October 2026. Every folder in `skills/` is an unchanged copy from the scanned and pinned repos in `vendor/` (see `vendor/LOCK.json`). Each holds its licence and a `SOURCE.md`. Nothing was run, installed or loaded. The list is the **test shortlist** in `CANDIDATES.md` (minus plain Claude and Lenny): each stage test runs these, and the winner stays. Stage numbers are from `PLAN.md`.

## Skills

| Skill | Source repo | Licence | Stages | What for |
|---|---|---|---|---|
| pricing-strategy | emotixco_claude-skills-founder | MIT | 1 | 6 pricing models, 3 tiers anchored on sourced rival prices |
| startup-competitors | ferdinandobons_startup-skill | MIT | 1 | Rival pricing wave: value metric, tiers, "Not found" for hidden prices |
| competitive-landscape | wshobson_agents (startup-business-analyst) | MIT | 1 | Five Forces, Blue Ocean, positioning map |
| monetization-strategy (new) | phuryn_pm-skills | MIT | 1 | 3 to 5 revenue models with audience fit, risks and a validation test each. (phuryn `pricing-strategy` not copied: the name is taken) |
| startup-metrics-framework | wshobson_agents | MIT | 2 | CAC, LTV, payback, margins by model |
| startup-design | ferdinandobons_startup-skill | MIT | 2, 8 | `industry-benchmarks.md` (stage 2); `verification-agent.md`, `honesty-protocol.md`, `output-specs.md` kill criteria (stage 8) |
| cash-flow-snapshot | anthropics_knowledge-work-plugins | Apache-2.0 | 2 | Cash forecast. Ledger connectors are paid: run on a CSV of projected numbers |
| startup-financial-modeling | wshobson_agents | MIT | 3 | Cost structure, burn, runway, scenarios |
| charlie-cfo (new) | EveryInc_charlie-cfo-skill | MIT | 2, 3, 5 | Bootstrapped CFO: runway, LTV:CAC, hiring ROI, burn. The bootstrap counter-weight to US venture bias. Its benchmarks are unsourced |
| team-composition-analysis | wshobson_agents | MIT | 3 | Hiring plan and team cost. Its salaries are US-only and unsourced |
| product-lens | affaan-m_ecc | MIT | 3 | Product diagnostic for the hard parts |
| vendor-review | anthropics_knowledge-work-plugins | Apache-2.0 | 3 | Paid tool vs free alternative, side by side |
| cost-aware-llm-pipeline | affaan-m_ecc | MIT | 4 | Route by task size, budget cap, caching. Its price table is undated |
| prompt-caching-strategy | affaan-m_ecc | MIT | 4 | Cache cost calculator; "read current docs before any rate" |
| claude-api | anthropics_skills | Apache-2.0 (`LICENSE.txt`) | 4 | Only `shared/` is used: models and prices, cost optimisation, caching, token counting, live sources |
| eval-plan | garrytan_gstack | MIT | 4 | Method only: preregistered bars, zero-cost dry run. Its paid pilot is never run |
| fundraise-prep | emotixco_claude-skills-founder | MIT | 5 | Ready to raise or not, round size. PitchBook and Crunchbase steps are paid: use free sources |
| market-research | affaan-m_ecc | MIT | 5 | Investor due diligence with sources |
| investor-materials | affaan-m_ecc | MIT | 5 | Investor view of the numbers |
| compliance-check | anthropics_knowledge-work-plugins | Apache-2.0 | 6 | Rules table, Met / Not met / Unknown, approvals |
| legal-risk-assessment | anthropics_knowledge-work-plugins | Apache-2.0 | 6 | Severity x likelihood, when to bring in a lawyer |
| grc-gdpr-compliance, grc-eu-ai-act, grc-ccpa, grc-lgpd, grc-dpdpa, grc-pci-compliance, grc-hipaa-compliance | sushegaad_claude-skills-governance-risk-and-compliance | MIT | 6 | Region pack, picked by region: dated rules, article per claim, EU AI Act prohibited-practice screen, PCI SAQ picker |
| before-you-build | wshobson_agents | MIT | 6, 7, 8 | Pre-build product risk review (the study says it fits 7 and 8 better than 6) |
| mvp-scope | emotixco_claude-skills-founder | MIT | 7 | Must / should / won't, critical flow, what not to build |
| office-hours | garrytan_gstack | MIT | 7 | `sections/phase-2a-startup-diagnostic.md`: narrowest wedge, pushback patterns |
| mom-test-gate | sreshtalluri_mom-test | MIT | 7 | Evidence by rung before building; never blocks |
| mom-test-memory | sreshtalluri_mom-test | MIT | 7 | Needed by mom-test-gate: the `discovery/` format and rungs |
| plan-ceo-review | garrytan_gstack | MIT | 8 | Step 0 only: premise challenge, cost of doing nothing, 4 modes |
| doubt-driven-development | addyosmani_agent-skills | MIT | 8 | Fresh-context adversarial review, 3 cycles at most |
| santa-method | affaan-m_ecc | MIT | 8 | Two independent reviewers, both must pass |

That is 34 skill folders (the GRC row is 7).

Support folders (not skills):

| Folder | Source | Licence | Read by |
|---|---|---|---|
| shared | emotixco_claude-skills-founder `shared/conventions.md` | MIT | pricing-strategy, fundraise-prep, mvp-scope |
| kw-shared | anthropics_knowledge-work-plugins: `small-business/shared/` (4 files), `operations/CONNECTORS.md`, `legal/CONNECTORS.md` | Apache-2.0 | cash-flow-snapshot, vendor-review, compliance-check (they read them as `../../`) |
| addy-references | addyosmani_agent-skills `references/orchestration-patterns.md` | MIT | doubt-driven-development (reads it as `../../references/`) |
| gstack-shared | garrytan_gstack: `bin/`, `ETHOS.md`, `docs/askuserquestion-*.md`, `scripts/jargon-list.json`, `scripts/question-registry.ts`, `review/TODOS-format.md`, `browse/bin/remote-slug`, `NOTICE.md`, `licenses/` | MIT, with Apache-derived parts | office-hours, plan-ceo-review, eval-plan. `bin/` holds preamble and telemetry scripts: never run |

**Lenny skills** (refoundai_lenny-skills): never copied. Read in place from `vendor/`: `pricing-strategy` (1), `marketplace-liquidity-take-rates` (2, marketplace cases), `fundraising` (5), `idea-validation` (7). Text belongs to Lenny Rachitsky and guests; name the source for each idea used.

## Considered and not taken

| Skill | Reason |
|---|---|
| Lenny skills (above) | Copyrighted text: read in place only |
| WS `market-sizing-analysis` | Taken out of the stage 1 shortlist; market size is kinso-validate stage 10 |
| ECC `council` | Close to santa-method and doubt-driven-development; not shortlisted |
| ECC `deep-research`, `lead-intelligence` | Paid keys (Firecrawl, Exa) |
| last30days | Paid API keys |
| ECC `ito-compute`, `ito-inference`, `council-multi-model`, `agent-eval`; gstack `benchmark-models` | Paid only (GPU booking, OpenAI, paid model calls) |
| gstack `scrape` | Needs the Aside browser with your sessions |
| KW `vendor-check`, sales `competitive-intelligence`, small-business `business-pulse` | Need paid business connectors |
| anthropics_skills `doc-coauthoring` | No licence file |
| emotix `metrics-dashboard`, `validate-idea`, `product-brief`; startup-skill `startup-pitch`; Addy `idea-refine` | In the plan's candidate column but not on the test shortlist |
| GRC enterprise frameworks (SOC 2, ISO 27001, NIST and others) | Rarely needed at idea stage; not shortlisted |
| SearXNG, crawl4ai, JobSpy | Tools, not skills; would need their own scan and an OK |
