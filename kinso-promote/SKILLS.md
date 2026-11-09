# kinso-promote - Skills index

27 October 2026. Every folder in `skills/` is an unchanged copy from the scanned and pinned repos in `vendor/` (see `vendor/LOCK.json`), except `clear-english`, which is your own skill. Each folder holds a licence and a `SOURCE.md`. Nothing here was run, installed or loaded by the copy step. Stage numbers are from `PLAN.md` and `SKILL.md`.

Only skills that a stage in `PLAN.md` runs were copied. The stage tests in `PLAN.md` section 6 may still drop some.

Stages were renumbered on 27 October 2026: a new stage 1 (audience and content plan, `references/01-audience.md`) was added, and the old stages 1 to 8 became 2 to 9. Stage 1 reads only parts of 8 skills already here: social (goals and audience questions, `platforms.md`, `platform-limits.md`, `short-form-video.md`), content-strategy (content types, keywords by buyer stage, calendar split, `content-distribution.md`), launch (ORB channels), product-marketing (audience, personas, anti-personas, customer language), go-to-market (communities, channel ranking, launch metrics), community-marketing (platform selection, health metrics), content-engine (platform rules) and claude-seo-seo-content (keyword approach for blog and newsletter). No new skill was copied.

## Skills

| Skill | Source repo | Licence | Stages | Why |
|---|---|---|---|---|
| product-marketing | coreyhaines31_marketingskills | MIT | 1, 2 | Builds one product context file (audience, positioning, voice, proof). Angle A. Its `.agents/product-marketing.md` goes to `promote/CONTEXT.md` |
| content-engine | affaan-m_ecc | MIT | 1, 2, 5, 8 | Ranks 3 to 7 atomic claims by sharpness, novelty and proof (angle B); platform rules for X, LinkedIn and short video; hard bans on hype |
| marketing-council | coreyhaines31_marketingskills | MIT | 2 | A simulated panel that disagrees (angle C). Seats are a seeded draw. Its advisor views never go into public text |
| copywriting | coreyhaines31_marketingskills | MIT | 3 | The third README opening; its `references/ai-tells.md` |
| readme-writer | shimo4228_readme-writer | MIT | 3 | A short first screen for people, detail folded for AI readers. Mostly Japanese. Its scripts are not run (one calls `gh api`) |
| document-generate | garrytan_gstack | MIT | 3 | Docs written from the code itself. Preamble and `bin/` skipped |
| article-writing | affaan-m_ecc | MIT | 4 | Long-form launch post in a voice taken from samples |
| draft-content | anthropics_knowledge-work-plugins | Apache-2.0 | 4 | Blog post format by channel. Its connectors are not used |
| claude-seo-seo-content | AgriciDaniel_claude-seo | MIT | 1, 4 | SEO title, description and structure (same skill as kinso-frontend stage 8). Its `scripts/claude-seo` commands are not run |
| content-strategy | coreyhaines31_marketingskills | MIT | 1, 4 | 2 to 4 later post titles for `blog/IDEAS.md` |
| social | coreyhaines31_marketingskills | MIT | 1, 5, 8 | Hook families (curiosity, story, value, contrarian, social proof), platform notes, carousels, `references/short-form-video.md`. Its scheduling and listening parts are off |
| crosspost | affaan-m_ecc | MIT | 5 | Adapt rules only ("never identical copy across platforms"). Its posting order step is off |
| launch | coreyhaines31_marketingskills | MIT | 1, 6 | ORB channels, readiness gate, five launch phases, Product Hunt notes |
| go-to-market | emotixco_claude-skills-founder | MIT | 1, 6 | Named communities, channel ranking, low budget tactics |
| directory-submissions | coreyhaines31_marketingskills | MIT | 6 | Directory list by tier. You submit, we list |
| community-marketing | coreyhaines31_marketingskills | MIT | 1, 6 | Communities and their self-promotion norms |
| public-relations | coreyhaines31_marketingskills | MIT | 6 | Press pitch draft. Never sent by us |
| banner-design | nextlevelbuilder_ui-ux-pro-max-skill | MIT | 7 | 22 art directions, 3 options by default, HTML at exact size, then PNG. Its optional image generator is off |
| design | nextlevelbuilder_ui-ux-pro-max-skill | MIT | 7 | Only `references/social-photos-design.md` (the social-photos method). Its logo, icon and CIP generators (`scripts/logo`, `scripts/icon`, `scripts/cip`) are paid and stay off |
| brand, design-system, ui-ux-pro-max | nextlevelbuilder_ui-ux-pro-max-skill | MIT | 7 | The social-photos method calls these 3 in order (brand, tokens, layout and style search). Copied so the method is complete. Their scripts are not run |
| canvas-design | anthropics_skills | Apache-2.0 (own `LICENSE.txt`) | 7 | Second designer: poster-style image from a design idea. Fonts in `canvas-fonts/` (OFL) |
| diagram | garrytan_gstack | MIT | 7 | How-it-works diagram. Its renderer needs bun: not run. The brain renders with Playwright in the sandbox, after your OK |
| ui-demo | affaan-m_ecc | MIT | 8 | Discover, rehearse, record. Recording only through the sandbox, on our own page, after your OK |
| video-editing | affaan-m_ecc | MIT | 8 | The ffmpeg parts only. ElevenLabs, fal.ai, Descript and Remotion off. Its Fusion `.lua` installers are never run |
| humanizer | blader_humanizer | MIT | 9 (and every text stage) | Removes AI tells without changing what the text says |
| clear-english | your own skill | yours | 9 (and every text stage when readers are mixed) | Short sentences, common words |
| copy-editing | coreyhaines31_marketingskills | MIT | 9 | Sweeps and a 1 to 10 score; `references/plain-english-alternatives.md` |

## Support folders (not skills)

| Folder | Source | Read by | Note |
|---|---|---|---|
| `gstack-shared` | garrytan_gstack: LICENSE, NOTICE.md, licenses, bin, ETHOS.md, docs/askuserquestion-*.md, scripts/jargon-list.json, scripts/question-registry.ts, lib/diagram-render, lib/aside-render.ts | document-generate, diagram | They read these at `~/.claude/skills/gstack/<path>`. Same relative paths kept. Never run |
| `shared` | emotixco_claude-skills-founder `shared/conventions.md` | go-to-market | It reads `${CLAUDE_PLUGIN_ROOT}/shared/conventions.md` |
| `kw-shared` | anthropics_knowledge-work-plugins `marketing/CONNECTORS.md` | draft-content | Linked as `../../CONNECTORS.md`. No connector is used |
| `readme-writer-shared` | shimo4228_readme-writer `agents/readme-judge.md` | readme-writer | Its one review agent, read at `~/.claude/agents/readme-judge.md`. Its sibling skills (headline-craft, llms-txt-writer and others) are not in the repo |

## Not copied, on purpose

- **Lenny skills** (`refoundai_lenny-skills`): ideas only, read in place from `vendor/`, never copied, never quoted. Used for `defining-icp` (stage 1), `positioning` (stage 2), `launch-planning` and `pr-and-press` (stage 6).
- **AIDevGTM gtm-cofounder**: scanned and saved in `vendor/`, but no stage in `PLAN.md` runs it. Its `10-launch-it` and `09-first-50-users` could be a stage 6 test candidate. Add it to `CANDIDATES.md` first if you want it tested.
- **Corey `tools/`** (registry, integrations, CLIs): posting and paid-tool guides. kinso-promote never posts.
- **Never used** (from `CANDIDATES.md`): ECC `social-publisher`, `x-api`, `social-graph-ranker`, `fal-ai-media`, `videodb`; Corey `cold-email`, `prospecting`, `emails`, `sms`, `ads`, `ad-creative`, `image`, `video` (paid parts).

## Off in every skill

- Posting, scheduling, liking, messaging, or any API that does them.
- Paid generators and keys: ElevenLabs, fal.ai, Gemini, Atlas Cloud, MuAPI, HeyGen, Midjourney, Remotion company use.
- Preambles, telemetry, install, update and setup commands; gstack `bin/`; every script in `skills/`.
- Writes outside the job folder (for example `~/.gstack/`, `.agents/`).
