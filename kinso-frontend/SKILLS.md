# kinso-frontend - Skills index

27 October 2026. Every folder in `skills/` is an unchanged copy from the scanned and pinned repos in `vendor/` (see `vendor/LOCK.json`). Each holds its licence and a `SOURCE.md`. Nothing was run, installed or loaded. Stage numbers are from `SKILL.md` and `CONDUCTOR-PLAN.md`.

Two skills were added later the same day: humanizer and web-design-guidelines (marked new). Two more were added later still: styleseed and daangn-seed (marked new, scanned the same day; `SCAN-REPORT.md`, last section). Three support folders were added, because copied skills read files outside their own folder.

## Skills

| Skill | Source repo | Licence | Stages | What for |
|---|---|---|---|---|
| ponytail-audit | DietrichGebert_ponytail | MIT | 0 | Map, trace main flows, four-part findings |
| ponytail | DietrichGebert_ponytail | MIT | 0 | Smallest-change ladder and "never cut" list |
| impeccable | pbakaus_impeccable | Apache-2.0 | 0, 2, 3, 4, 5, 6, 7, 9, 10 | Its sub-skills are files in `reference/`: `document.md` and `extract.md` (0), `init.md`, `shape.md`, `new-work.md` (2, 3, 4), `clarify.md` (5), `craft-floor.md` (6), `audit.md`, `harden.md` (7), `critique.md` (9), `onboard.md`, `mode-operate.md` (10). Its launcher downloads a binary: never run |
| taste-skill | leonxlnx_taste-skill | MIT | 1, 3, 4, 5, 6, 7, 10 | Study method, draw, copy, build gate, critique, app screens |
| humanizer (new) | blader_humanizer | MIT | 5 | Removes signs of AI writing (from Wikipedia's "Signs of AI writing"). Its `scripts/` and `agents/` are never run |
| hallmark | nutlope_hallmark | MIT | 2, 3, 4, 5, 6, 7, 9, 10, 11 | Pre-flight, themes, gates. `references/review-hero.md` (6) and `references/review-finish.md` (9) are already here. Map-diagram for 11. Image generation needs a paid key: never run |
| frontend-design | anthropics_skills | Apache-2.0 (`LICENSE.txt`) | 3, 4 | Ambition prompt, two-pass plan |
| styleseed (new) | bitjaru_styleseed | MIT | 3 (deal source), 10 (reference) | Fixed design judgment: 8 output grammars, 8 semantic palettes, 9 brand recipes, 6 aesthetic profiles, 12 domain playbooks, all in `workflows/ss-resolve/references/catalog.json`. `tools/draw/draw.py` deals from it. One router skill with 22 workflows. Never run its `.mjs` scripts or the update preflight (network check to the author's site) |
| daangn-seed (new) | byunghun-ben_daangn-seed-ai | Apache-2.0, with `NOTICE.md` | 10 (reference), 9 (anti-pattern check) | Karrot's Seed design system as tokens, 40 component notes, decision matrices ("which button, input, overlay, tab") and an AI-slop anti-pattern list. Not a deal source: see below |
| design-consultation | garrytan_gstack | MIT | 3 | Dial space, slop list, SAFE and RISK |
| ui-ux-pro-max | nextlevelbuilder_ui-ux-pro-max-skill | MIT | 3, 4, 7, 10 | Data files as a pool, checklist, app rules |
| planning-and-task-breakdown | addyosmani_agent-skills | MIT | 4 | Vertical slices, task sizing |
| spec-driven-development | addyosmani_agent-skills | MIT | 4 | Gated phases; Always, Ask first, Never |
| browser-testing-with-devtools | addyosmani_agent-skills | MIT | 7 | Reproduce, fix, verify; clean console |
| web-design-guidelines (new) | ehmo_platform-design-skills | MIT | 7, 10 | WCAG 2.2 and web platform rules with a checklist, for the accessibility check. The repo's `Apple_HIG.pdf` is not copied |
| claude-seo | AgriciDaniel_claude-seo | MIT | 8 | Orchestrator. Google, DataForSEO, Moz and other paid parts are never used |
| claude-seo-seo-agentic, -audit, -content, -geo, -hreflang, -images, -local, -page, -plan, -schema, -sitemap, -sxo, -technical | AgriciDaniel_claude-seo | MIT | 8 | The 13 sub-skills the orchestrator spawns |
| code-review | mattpocock_skills | MIT | 9 | Two isolated reviewers, Standards and Spec |

Support folders (not skills):

| Folder | Source | Licence | Read by |
|---|---|---|---|
| impeccable-agents (new) | pbakaus_impeccable `.claude/agents/` (documenter, finish reviewer, asset producer, manual edit applier) | Apache-2.0, with `NOTICE.md` | impeccable: `reference/new-work.md` spawns the finish reviewer (9) and the documenter (0, 3) |
| addy-references (new) | addyosmani_agent-skills `references/definition-of-done.md` | MIT | planning-and-task-breakdown (reads it as `../../references/`) |
| gstack-shared (new) | garrytan_gstack: `bin/`, `ETHOS.md`, `docs/askuserquestion-*.md`, `scripts/jargon-list.json`, `scripts/question-registry.ts`, `NOTICE.md`, `licenses/` | MIT, with Apache-derived parts | design-consultation. `bin/` holds preamble and telemetry scripts: never run |

## Considered and not taken

| Skill | Reason |
|---|---|
| Impeccable sub-skills, Hallmark review-hero and review-finish | Already inside the `impeccable` and `hallmark` copies |
| gstack `design-review` | Stage 7 runs Addy browser testing. It also needs gstack's built `browse` binary, which is not in `vendor/` |
| gstack `diagram`, cathrynlavery `diagram-design` | Stage 11 runs Hallmark map-diagram. gstack diagram also needs the Aside browser and a 7.6 MB render bundle |
| gstack `design-shotgun`, `design-html`, `plan-design-review` | Mockups need the gstack design binary with an OpenAI key (paid) |
| ECC `brand-voice`, clear-english | Not in the stage 5 run list; clear-english is not in `vendor/` |
| UI UX Pro Max `design`, `brand`, `banner-design`, `slides`, `design-system`, `ui-styling` | Logo, icon and banner makers need Gemini or other paid services; the rest is not in any stage's run list |
| rampstackco SEO, aevans-eng seo-skill, thatrebeccarae aeo-geo-optimizer | Near-duplicates of claude-seo, which won stage 8 |
| ChromeDevTools skills, microsoft playwright-cli | Tools for stage 7; not in the run list (Addy browser testing won) |
| anthropics_skills `webapp-testing`, `theme-factory`, `canvas-design` | Not in any stage's run list |
| Addy `frontend-ui-engineering`, `performance-optimization`, `code-review-and-quality`, `shipping-and-launch` | Not in any stage's run list; near-duplicates of skills already here |
| ponytail `review`, `debt`, `gain`, `help` | Stage 0 runs ponytail-audit only |
| react-bits | MIT plus Commons Clause (no resale); not a skill |
| GSAP | No licence file in the repo |
| daangn-seed as a stage 3 deal source | Its own `SKILL.md` says not to load it for a brand unrelated to Karrot or for marketing and landing pages; it is built for product UI. Its colours and names belong to Danggeun Market (`NOTICE.md`). Dealing it as a client's look would copy one brand. Stage 10 may read its decision matrices, component states and `references/anti-patterns.md` as a reference; never its brand colours |
| daangn-seed-ai `reconcile`, `reconcile-apply` | Migrate an existing app to Seed and commit per stage; no stage migrates to Seed |
| StyleSeed `extensions/learning` (ss-learn) | Optional learning add-on with an MCP server; not part of the core skill and not needed |
