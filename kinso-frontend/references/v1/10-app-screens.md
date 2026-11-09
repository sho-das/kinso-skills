# Stage 10 - App screens

Approved 2026-10-26 after testing (see `tests/stage10/RESULTS.md`: UI UX Pro Max scored 7.5 of 10, passed 22 of 24 traps and invented nothing; taste-skill 7.5; plain Claude 6.7).

Sources: UI UX Pro Max app and chart rules (MIT, nextlevelbuilder), taste-skill app screens (MIT, leonxlnx), Impeccable harden (Apache 2.0, pbakaus), Anthropic frontend-design (Apache 2.0), Hallmark interaction and states (MIT, nutlope). Rewritten in our own words.

Read `../RULES.md` first. This file adds only the rules for this stage.

An app screen is a dashboard, a list, a settings form or any screen a signed-in user works in. It can be a desktop web app, a web app that also works on phones, or a phone app.

## Input

- The screen brief (job, what it holds, states), the data or a sample of it, `design/DESIGN.md`, `design/tokens.json`, `PRODUCT.md`, `research/ANSWERS.md`.
- `ui-ux-pro-max/data/app-interface.csv` and `charts.csv`, read as files. No search script.

## Rules

- The platforms in `PRODUCT.md` decide the widths to build and check. Phone-first is not the default.
- Show the data exactly. Every number is from the data or a sum of it.
- Failed and skipped never look like passed.
- An action that is not safe is blocked, with the reason next to it (for example Approve on a failed or skipped test). When a limit applies, show it (for example 200 lines, 5 files).
- A conflict in the data or the inputs is a question for the client. Never pick a side silently (for example a payment that saves Rs 0 when the minimum saving is Rs 1).
- Lists, filters, tabs, dropdowns and counts come from the data. When the data does not hold the items, keep a hand-written list in one constants file and say why.
- Each field's accessible name says its context (for example "Friday, dinner, closes"). An error sits next to its field and is linked to it.
- On a long form, Save stays in view at every width the job supports.
- Tabular figures for every number and time.
- No logos, marks or icons the inputs do not have. No colour outside `tokens.json`; if a status colour is missing, ask stage 3 for it.
- Sample data is labelled once. Real data is never called a sample.

## Steps

1. **Data and jobs.** List every field in the data, and what the user must do on this screen.
2. **One question.** Name the one question the screen answers first (for example "Which fixes can I approve now?").
3. **Shell and layout.** Pick the layout for the platforms: table or list for many rows, cards only when rows differ a lot.
4. **Put in the data.** Charts: one question per chart, weekday or date labels, a text equivalent, a total row, a caption for a bar that adds more than one item.
5. **Every state.** Main, empty, loading (shaped like the final screen), error, and each special state in the brief. Each state says what the user can do next.
6. **Check.** Capture at the job's widths. Check traps by hand: unsafe actions, failed and skipped, totals against the data, labels, Save in view, tabular figures.

## Output: `app/`

- One page per screen and a states page, or the project's own component files on an existing project.
- `app/NOTES.md`: 1 Data (each value and its source), 2 States, 3 Choices, 4 Questions for the client.
