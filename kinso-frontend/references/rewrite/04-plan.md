# Stage 4 - Plan

Approved 2026-10-25 after testing (see `tests/stage4/RESULTS.md`: frontend-design scored 8.8 of 10 blind, first in A and B, tied first in C; plain Claude scored 7.5).

Sources: Anthropic frontend-design (Apache 2.0), Addy Osmani spec-driven-development and planning-and-task-breakdown (MIT), UI UX Pro Max SKILL rules and quick-reference (MIT, nextlevelbuilder), Impeccable mode-persuade (Apache 2.0, pbakaus), Hallmark anatomy and gates (stage 3 source), ECC frontend-design-direction (stage 1 source). Rewritten in our own words.
Added 2026-10-26 from the coverage check (`coverage/04-COVERAGE.md`).

Read `../RULES.md` first. This file adds only the rules for this stage.

## Input

- `research/RESEARCH.md` (stage 1), `research/PRODUCT.md` and `research/ANSWERS.md` (stage 2), `design/DESIGN.md` and `design/tokens.json` (stage 3), and the project files.
- If an input file is missing, say so at the top of the plan.
- If `plan/PLAN.md` already exists with unfinished work for a different job, stop and ask. Do not overwrite it.

## Rules

- Do not write final copy (stage 5) or code (stage 6).
- Trace every claim to a line in an input file. A claim no input supports (for example "No data is collected on this site") is left out.
- Follow `DESIGN.md`. Every change to it goes in a named list, each with its reason.
- Name each conflict between the inputs, and say which side the plan took.
- A sample object (for example a PR panel) uses only facts from the brief. A test or status row never reads as a measured result.
- Each section head must match what the section holds.
- Name the data source of every list, filter, tab, dropdown and count: a database or API field, or, when the data does not hold the items, one constants file with the reason.
- When needs clash, accessibility and touch size win over style.
- If stage 6 changes a decision, update `plan/PLAN.md` first, then build.

## Steps

1. **Design plan.** The layout concept in one sentence, 3-5 principles, and the alignment. If the job covers more than one page or app, start with a map: each one, what it depends on, and the build order. Then plan each one.
2. **Sections.** In page order, from the first screen to the footer. For each: job, claim, proof, source, material (real / built sample / slot), action, words.
   - Read `job:` in `PRODUCT.md` and plan the sections that kind of job owns (for "book": the food or room, the menu, hours and address, the booking again beside the menu).
   - End on the hero's action again, the practical details, or more of the catalogue. No email sign-up at the end unless the job is subscribe, join, attend, listen or visit.
   - A row that would hold only a missing fact goes under "Left out", for the client to decide. No more than 5 empty picture slots on a page, and never 4 in one row.
   - Number items (01, 02, 03) only when the content is a real sequence, and then use an ordered list.
3. **First screen.** ASCII wireframes at 1440x900 and 390x844. Show the headline, the main action, the secondary action, the hero object and the fold. The main action works in its real form (a search, open slots, add to cart); a link to a lower section is not the action. At 390, say what moves, what folds and what stays in the first screen. Add a 768 note (what reflows) when the job's platforms include tablets.
4. **Uniqueness check.** Would a similar request land on the same page? If yes, change it and say what changed. The plan also fails if it is one of these:
   - a split hero (copy on one side, product on the other, a row of badges below);
   - a centred headline over a row of cards;
   - the stock run: hero, three features, call to action, footer;
   - the theme reduced to one accent colour on a neutral layout;
   - a screen painted as one picture with no working parts.
   The nav stays real links, copy stays real text, and the action looks clickable.
5. **Components.** Each one with its states: default, hover, focus, disabled, error, loading, empty (what is missing and the next action), success (confirm and what comes next), and for parts that load data, partial (show what loaded, mark what did not) and no access (explain, give a safe way back). If a state does not apply, say why. "Could not test it" is not "does not apply".
   - A skip link. Status never shown by colour alone.
   - Forms: a visible label on every field, never a placeholder only. Error text under its field, linked with `aria-describedby`, saying what is wrong and how to fix it. After a failed submit, an error summary at the top with links to each field. Helper text where a rule is not obvious. Required fields marked. The right input type. Confirm before anything destructive. No success message without a real request behind it; an unknown endpoint is a slot.
   - Navigation: the current page is marked. Nav sits in the same place on every page. Every key view has its own URL. Nav items have words, not icons only. One `h1`, and heading levels in order. Sticky bars never hide the focused control. Touch targets 44px or more, 8px apart. Nothing works by hover alone.
   - Motion: the motion idea from `DESIGN.md` (which section, what moves, on load or scroll), and which interactions animate (hover, focus, open, confirm). No fade-and-slide on every section.
6. **Language.** For more than one page language, the switch is real links to separate pages, with no script.
7. **Build order.** Steps by section: each step finishes one full section (markup, style, content, states), so every step leaves a page that opens. Each step names what it delivers, how to check it, the files it touches (about 5 at most) and what it depends on. Split a step with "and" in its name. Put the riskiest step early (the live part, a custom control, a data hookup). A checkpoint every 2 or 3 steps, including these 2:
   - The first screen at 390 and 1440 (headline, main action, hero object).
   - A search of the page for forbidden facts: anything the brief says not to state, and any price, number or award not in the inputs.

## Output: `plan/PLAN.md`

1. Goal: visitor, job, primary action, secondary action
2. Sections (the step 2 fields, one block each)
3. First screen (both wireframes, the 390 notes, and the 768 note when it applies)
4. Components (with states, forms, navigation and motion)
5. Left out (and why)
6. Slots: a table with slot, used in, until it is filled (the fallback), who fills it, blocks launch (yes / no)
7. Conflicts and changes to `DESIGN.md`
8. Build order (with the checkpoints)
9. Success criteria: testable lines, for example "headline 2 lines or fewer at 390", "main action visible at 390x844 without scrolling", "no sideways scroll", "every form error has text"
10. Risks and boundaries: a short table (risk, impact, what we do) and three lists: Always, Ask first, Never. For an existing project, add the real dev, build and test commands from `existing/MAP.md`, and where new files go.
11. Open questions: things only the client can answer
12. Assumptions
