# Stage 4 - Plan

Read `../RULES.md` and `../BRAIN.md` first. The old rewrite is in `rewrite/04-plan.md`. It won its blind test (8.75 against 7.75) on build order and fallbacks; those come back below as checks.

## Runs

1. `skills/frontend-design/SKILL.md` L47-53 - the compact design plan (palette, type, layout concept, ASCII wireframes), then the similar-prompt test.
2. The three section-order sources, for the deal below:
   - taste-skill: `skills/taste-skill/references/copy.md` L16-37 (the page as claims with proof, one per section) and `skills/taste-skill/scripts/draw.mjs --sections <roles>` (blueprints from `library/sections.json`; `--alternatives` and `--redraw section:<role>=<id>` when a section cannot hold the real content).
   - Hallmark: `skills/hallmark/scripts/theme.mjs draw` (shape, hero posture, nav, footer, action place, two compositions to leave out), `references/anatomy.md`, the section deck in `references/macrostructures.md` L33-68.
   - Impeccable: `skills/impeccable/reference/new-work.md` L37-41 - 5 to 7 structures from content, task and behaviour.
   - `skills/ui-ux-pro-max/data/landing.csv` as a pool of section orders.
3. `skills/planning-and-task-breakdown/SKILL.md` - vertical slices, task sizing, checkpoints. It reads `skills/addy-references/definition-of-done.md`.
4. `skills/spec-driven-development/SKILL.md` - gated phases; Always, Ask first, Never.

Skip, and why: `skills/gstack-shared/bin/`; the Impeccable launcher `skills/impeccable/scripts/impeccable` with any subcommand, `concept-seed` included (it downloads a binary): deal Impeccable's structures by hand from `new-work.md` with seed `<job>-frontend-04` (CORE section 5); any install or update command. `draw.mjs` and `theme.mjs` run only through `tools/sandbox/run.sh`, after our scan (CORE section 8 item 7).

## In

`research/RESEARCH.md`, `PRODUCT.md`, `ANSWERS.md`, `design/DESIGN.md`, `tokens.json`, the project files. `RULES.md`. A missing input is named at the top of the plan.

## Deal and pick

- Deal 3 section orders, each a short outline plus first-screen wireframes at 1440 and 390: (a) taste-skill's argument order with dealt blueprints, (b) Hallmark's draw and the job's anatomy, (c) one of Impeccable's derived structures, picked by seed. Cap each outline length; reviewers favour length.
- A fresh picker scores 0 to 3 (CORE section 6) and writes `<job>/picks/frontend/04-PICK.md`:
  1. Every section has a claim with proof that exists in the inputs. A section that would hold only missing facts loses.
  2. The job's anatomy is there: the action where real category sites put it, the category's own sections (Hallmark gate 85).
  3. Similar-prompt and mirror tests (frontend-design L53, Hallmark `SKILL.md` L80).
  4. It serves the stage 3 direction; the direction owns the hero.
  5. Fullness fits the material: 6 to 9 sections when material exists, fewer when thin.
  6. Build risk.
- Then Addy's build order and checkpoints on the winner.

## Guards

Facts only from `PRODUCT.md` and the other inputs. Free only. Never deploy or post. No secrets. Scripts only in `tools/sandbox/run.sh`. No final copy (stage 5), no code (stage 6). If `plan/PLAN.md` holds unfinished work for another job, stop and ask.

## Checks after

Never style. Layout choices from the skills stand.
- Facts: every claim traces to an input line; a claim no input supports is left out.
- Slots: a table with slot, used in, fallback, who fills it, blocks launch (yes or no).
- Data: every list, filter, tab, dropdown and count names its source, or one constants file with the reason.
- States per component: default, hover, focus, disabled, error, loading, empty, success; partial and no access for data parts. "Could not test" is not "does not apply".
- Accessibility: skip link; status never by colour alone; one `h1`, headings in order; 44px targets; nothing by hover alone.
- Forms: visible labels; errors linked with `aria-describedby`; no success message without a real endpoint.
- Links: the main action is real, not a jump to a lower section; language switch as real links.
- Conflicts between inputs named, with the side taken. Changes to `DESIGN.md` listed with reasons.
- Build order: each step leaves a page that opens; checkpoints include the first screen at 390 and 1440, and a search for forbidden facts.

## Override

As in `RULES.md`. The client may swap the picked order for a runner-up; log it.

## Out

`plan/PLAN.md`: goal, sections, first screen, components, left out, slots, conflicts, build order, success criteria, risks and boundaries (Always, Ask first, Never), open questions, assumptions. `picks/frontend/04-PICK.md`.

## Stop point

None. Go on to stage 5.
