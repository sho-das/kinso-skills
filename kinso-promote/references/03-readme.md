# Stage 3 - README

Read `../RULES-RESEARCH.md` and `BRAIN.md` first. Paths are from `kinso-promote/`. Skip this stage when there is no repo (for example a restaurant).

## Runs

Each skill is followed as its own `SKILL.md` says, read in place.

1. `skills/readme-writer/SKILL.md` in Rewrite mode (or Incremental, if a README exists), with `references/visual.md`, `references/tagline-eval.md` and `references/readme-judge-checklist.md`. Its one review agent is `skills/readme-writer-shared/agents/readme-judge.md`, run as a fresh session. The skill is mostly Japanese; the README is written in the job's language.
2. `skills/document-generate/SKILL.md`: facts from the code (install, commands, config).
3. `skills/copywriting/SKILL.md` with `references/ai-tells.md`: the first two lines only.

Skip: readme-writer `scripts/` (one calls `gh api`, which sends the README to GitHub) and its About step; the gstack preamble, `skills/gstack-shared/bin/` and its learnings log. The brain does the evidence checks by reading, in place of the scripts. Log each skip in `promote/PROCESS.md`.

## In

- The product repo (read only), `promote/MESSAGE.md`, `promote/FACTS.md`, `promote/MUST-NOT.md`, `handoff/PROMOTE-BUILD.md` (how to try it, real screenshots, real limits).
- `promote/AUDIENCE.md` (stage 1): who reads the README first.

## Deal and pick

- **Deal 3 openings** (first two lines plus the first screen): A from readme-writer, B from document-generate, C from copywriting.
- No random draw: the 3 skills are the 3 options.
- **Rubric (0 to 3 per line):** in the first screen a first-time visitor knows what it does, for whom, and how to start; install steps are real and in order; nothing promised that the code does not do; the chosen angle shows; rival test.
- A fresh judge scores with skill names hidden. Keep 1 opening; the rest of the README follows readme-writer's method (visible text for people, detail folded in `<details>`).
- Save the other 2 openings in `promote/ALTERNATIVES.md`. Write `<job>/picks/promote/03-PICK.md`.

## Guards

- Shared guards from `BRAIN.md` (never post; never main accounts; no MUST-NOT claim; no invented numbers, quotes, users or testimonials; platform rules; free only; local tools only).
- Never edit the repo. The README is a draft in the job folder; you or kinso-build put it in.
- A link that does not exist yet (install link, docs site) is a marked slot `[LINK: not live yet]`, never `#` and never a made-up URL.
- No badges for numbers that are not real (coverage, downloads, stars).
- Screenshots only from `build/screens/`.
- Limits from `PROMOTE-BUILD.md` go into the README as they are. Never soften a known limit.

## Checks after

- Every command in the README exists in the repo (script name, file, flag), and the steps run in that order.
- Every claim traces to `FACTS.md` or to a file in the repo.
- MUST-NOT scan, including banned single words.
- Links: each one points to a real file or a marked slot.
- No secrets, private paths, emails or internal hostnames.
- Humanizer pass on the visible text; clear-English pass when readers are mixed. Code blocks are never touched. The voice stays.

## Override

You can pick another opening, or keep a line the checks flag. The brain shows the reason once, then follows you and adds a row to `OVERRIDES.md`. A MUST-NOT line stays flagged in `REVIEW.md`.

## Out

- `promote/README.md` (draft), `promote/ALTERNATIVES.md`, `<job>/picks/promote/03-PICK.md`.

## Stop point

Shown with stages 4 and 5 at the stop point after stage 5.
