# Stage 4 - Plan

Approved 2026-10-25 after testing (see `tests/stage4/RESULTS.md`: frontend-design scored 8.8 of 10 blind, first in A and B, tied first in C; plain Claude scored 7.5).

Sources: Anthropic frontend-design (Apache 2.0), Addy Osmani spec-driven-development and planning-and-task-breakdown (MIT), UI UX Pro Max SKILL rules (MIT, nextlevelbuilder), Impeccable mode-persuade (Apache 2.0, pbakaus). Rewritten in our own words.

Read `../RULES.md` first. This file adds only the rules for this stage.

## Input

- `research/RESEARCH.md` (stage 1), `research/PRODUCT.md` and `research/ANSWERS.md` (stage 2), `design/DESIGN.md` and `design/tokens.json` (stage 3), and the project files.
- If an input file is missing, say so at the top of the plan.

## Rules

- Do not write final copy (stage 5) or code (stage 6).
- Trace every claim to a line in an input file. A claim no input supports (for example "No data is collected on this site") is left out.
- Follow `DESIGN.md`. Every change to it goes in a named list, each with its reason.
- Name each conflict between the inputs, and say which side the plan took.
- A sample object (for example a PR panel) uses only facts from the brief. A test or status row never reads as a measured result.
- Each section head must match what the section holds.
- Name the data source of every list, filter, tab, dropdown and count: a database or API field, or, when the data does not hold the items, one constants file with the reason.

## Steps

1. **Design plan.** The layout concept in one sentence, 3-5 principles, and the alignment.
2. **Sections.** In page order, from the first screen to the footer. For each: job, claim, proof, source, material (real / built sample / slot), action, words.
3. **First screen.** ASCII wireframes at 1440x900 and 390x844. Show the headline, the main action, the secondary action, the hero object and the fold.
4. **Uniqueness check.** Would a similar request land on the same page? If yes, change it and say what changed.
5. **Components.** Each one with its states: default, hover, focus, disabled, error, loading where they apply. A skip link. Status never shown by colour alone.
6. **Language.** For more than one page language, the switch is real links to separate pages, with no script.
7. **Build order.** Steps with their dependencies, and 2 checkpoints:
   - The first screen at 390 and 1440 (headline, main action, hero object).
   - A search of the page for forbidden facts: anything the brief says not to state, and any price, number or award not in the inputs.

## Output: `plan/PLAN.md`

1. Goal: visitor, job, primary action, secondary action
2. Sections (the step 2 fields, one block each)
3. First screen (both wireframes)
4. Components (with states)
5. Left out (and why)
6. Slots: a table with slot, used in, until it is filled (the fallback), who fills it, blocks launch (yes / no)
7. Conflicts and changes to `DESIGN.md`
8. Build order (with the 2 checkpoints)
9. Assumptions
