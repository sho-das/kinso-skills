---
name: kinso-promote
description: Write and make the launch content for a product from the job folder - first the audience and content plan (asks your preferred content, platforms, audience, goal and weekly time as a form, suggests 2 to 4 audiences from the market files, and sets format, length, posting times and a success measure per platform), then message and angle, README, launch blog post, LinkedIn, X and Instagram posts, visuals, a demo video script and a launch plan - then edit it all for AI tells and clear English. Each stage runs the original outside skills from skills/ as they are, deals 3 options, keeps the best, and checks every claim against the facts and the "must not claim" list. It never posts, schedules or messages; you post by hand. Use when someone wants launch content, social posts, a README, a launch post, a demo script or a launch plan for a product, from kinso-business and kinso-build or for any existing product. Not for pricing (kinso-business), building (kinso-build) or web pages (kinso-frontend).
---

# kinso-promote

Each stage runs the **real skills** in `skills/` as their own `SKILL.md` says, with our **brain** around them (`BRAIN.md`): in, deal and pick, guards, checks after. Which skill serves which stage: `SKILLS.md`. Plan and reasons: `PLAN.md`. Free tools: `TOOLS.md`. Test cases: `tests/cases.md`.

## Before anything

1. Read `../RULES-RESEARCH.md`, `../BRAIN-CORE.md` and `BRAIN.md`. They apply to every stage.
2. Pick the way in:

| Way | You give | Stages |
|---|---|---|
| **Full chain** | A job folder with `handoff/PROMOTE.md` (kinso-business) and `handoff/PROMOTE-BUILD.md` (kinso-build), and the product | 0 to 9 |
| **Any launch** | A product that exists: a repo, a site or a short brief. No job folder | Start questions, then 0 to 9 |
| **One piece** | One output, for example "a LinkedIn post for this release" or "fix this README" | 0, 1 (only the questions that piece needs), that one stage, then 9 |

Not sure which: ask once, "From the job folder, or for a product you already have?"

3. Ask the start questions once, as a form (`BRAIN.md`, "Asking you questions": the AskUserQuestion tool when available, otherwise one numbered form). Ask only what `START.md` and `handoff/PROMOTE.md` do not already hold. Save the answers in `START.md`.
   1. What is live now (product link, repo, test page), and what is not ready yet.
   2. Launch date, or the window.
   3. Platforms: LinkedIn, X, Instagram, and any others (Product Hunt, Hacker News, Reddit, a newsletter, a community). Stage 1 asks this again as a form, with options from the market files; skip it here when stage 1 will run.
   4. Who posts (you or a brand page), language or languages, region.
   5. Your voice: 3 to 5 texts you wrote yourself (optional). Without them, the voice is plain and marked "not from samples".
   6. Readers: native English speakers, or mixed. Mixed turns on clear-english for every text.
   7. What you can show: screenshots, real photos (with permission from the people in them), a logo, colours.
   8. Numbers and claims you approve for public use. Anything not approved stays out.
   9. Budget. Default $0: free tools only.
4. Make or use the job folder. Every output goes under `promote/`.

## Stages

| # | Stage | File | Runs (from `skills/`) | Output |
|---|---|---|---|---|
| 0 | Read the job | `references/00-read-job.md` | none (the brain) | `FACTS.md`, `MUST-NOT.md`, `GAPS.md` |
| 1 | Audience and content plan | `references/01-audience.md` | product-marketing, social, content-strategy, launch, go-to-market, community-marketing, content-engine, claude-seo-seo-content | `AUDIENCE.md` |
| 2 | Message and angle | `references/02-message.md` | product-marketing, content-engine, marketing-council | `MESSAGE.md`, `CONTEXT.md` |
| 3 | README | `references/03-readme.md` | readme-writer, document-generate, copywriting | `README.md` |
| 4 | Blog and launch article | `references/04-blog.md` | article-writing, draft-content, claude-seo-seo-content, content-strategy | `blog/LAUNCH-POST.md`, `blog/IDEAS.md` |
| 5 | Social posts | `references/05-social.md` | social, content-engine, crosspost (adapt rules) | `social/LINKEDIN.md`, `X.md`, `INSTAGRAM.md` |
| 6 | Launch plan | `references/06-launch-plan.md` | launch, go-to-market, directory-submissions, community-marketing, public-relations | `LAUNCH-PLAN.md`, `PRESS-PITCH.md` |
| 7 | Visuals | `references/07-visuals.md` | banner-design, social-photos method, canvas-design, diagram | `visuals/`, `visuals/ALT-TEXT.md` |
| 8 | Demo video script | `references/08-video.md` | social short-form video, content-engine, ui-demo, video-editing (ffmpeg) | `video/SCRIPT.md`, `video/SHOTS.md` |
| 9 | Final edit and review | `references/09-final-edit.md` | humanizer, clear-english, copy-editing; fresh reviewer | `REVIEW.md`, `LAUNCH-KIT.md` |

Each stage reads `../BRAIN-CORE.md`, then `BRAIN.md`, then its own file, then only the inputs its file names. Each writes `<job>/picks/promote/NN-PICK.md`. Stage 3 is skipped when there is no repo. Stages 4 and 8 are skipped or cut short when `AUDIENCE.md` holds no blog, newsletter or video.

## Stop for your OK

1. After the start questions: platforms, launch window, voice samples, approved claims (and any must-decide item in `GAPS.md`).
2. After stage 1: the audience and the per-platform plan (formats, lengths, posting times, success measure).
3. After stage 2: the angle.
4. After stage 5: the README, the blog and the posts, together.
5. After stage 6: the plan shape (a short stop).
6. After stage 7: the visuals, and before any tool install.
7. After stage 9: the final kit. You post.

Between these points, go on without asking.

## Tools and limits

- Never post, like, comment, follow, message or schedule. Never log in to any account.
- The skills in `skills/` are followed as they are. Never run their scripts (one exception, `../BRAIN-CORE.md` section 8 item 7: a script a stage file names, that passed our scan, run through `run.sh`), preambles, telemetry, install or update commands, or gstack `bin/`. Never a part that needs a paid key. A clash with a guard: the guard wins, logged in `promote/PROCESS.md`.
- Local tools only from `TOOLS.md`, through `../kinso-frontend/tools/sandbox/run.sh`. Nothing installed without your OK.
- Web only through `../tools/collect/collect.sh` (stage 1 at most 8 calls, stage 6 at most 15), with `--out <job>/raw.jsonl`.
- Lenny skills: ideas only, read in place in `../vendor/refoundai_lenny-skills@13598cc/`, never copied or quoted.
- Overrides go in `OVERRIDES.md` (`../BRAIN-CORE.md` section 8).
