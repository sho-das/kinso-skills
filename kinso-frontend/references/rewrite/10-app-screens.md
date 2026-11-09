# Stage 10 - App screens

Approved 2026-10-26 after testing (see `tests/stage10/RESULTS.md`: UI UX Pro Max scored 7.5 of 10, passed 22 of 24 traps and invented nothing; taste-skill 7.5; plain Claude 6.7).

Sources: UI UX Pro Max app and chart rules (MIT, nextlevelbuilder), taste-skill app screens (MIT, leonxlnx), Impeccable harden (Apache 2.0, pbakaus), Anthropic frontend-design (Apache 2.0), Hallmark interaction and states (MIT, nutlope). Rewritten in our own words.
Added 2026-10-26 from the coverage check (`coverage/10-COVERAGE.md`).

Read `../RULES.md` first. This file adds only the rules for this stage.

An app screen is a dashboard, a list, a settings form or any screen a signed-in user works in. It can be a desktop web app, a web app that also works on phones, or a phone app.

## Input

- The screen brief (job, what it holds, states), the data or a sample of it, `design/DESIGN.md`, `design/tokens.json`, `PRODUCT.md`, `research/ANSWERS.md`.
- `ui-ux-pro-max/data/app-interface.csv` and `charts.csv`, read as files. No search script.

## Rules

- The platforms in `PRODUCT.md` decide the widths to build and check. Phone-first is not the default.
- Show the data exactly. Every number is from the data or a sum of it.
- Keep the data in one file. Totals and counts are computed from the rows, never typed. A fact shown twice (a total, a time window, a state) comes from one value. A total or change is computed from the figures as shown (sum the rounded amounts on screen). Counts follow the current filter.
- A relative figure names its baseline in the same phrase (for example "45 min earlier than last Sunday"). A real zero is printed; a missing value is a short grey dash.
- Failed and skipped never look like passed.
- An action that is not safe is blocked, with the reason next to it (for example Approve on a failed or skipped test). When a limit applies, show it (for example 200 lines, 5 files).
- A conflict in the data or the inputs is a question for the client. Never pick a side silently (for example a payment that saves Rs 0 when the minimum saving is Rs 1).
- Lists, filters, tabs, dropdowns and counts come from the data. When the data does not hold the items, keep a hand-written list in one constants file and say why.
- Each field's accessible name says its context (for example "Friday, dinner, closes"). An error sits next to its field and is linked to it.
- On a long form, Save stays in view at every width the job supports.
- Tabular figures for every number and time, right-aligned in tables. Format figures once: thousands separators, fixed decimals per metric, a sign on every change, units as a smaller grey suffix, numbers and dates in the page locale.
- A KPI is a label above a value: no icon in a circle, no sparkline, no tile of its own. A change names its window ("vs prior 30 days"), is never larger than its label, and uses colour for good or bad, not up or down. A zero or undefined change is grey; from zero write "+4 (new)".
- No logos, marks or icons the inputs do not have. No colour outside `tokens.json`; if a status colour is missing, ask stage 3 for it.
- Sample data is labelled once. Real data is never called a sample.

### Charts

- Form follows the question: change over time is a line (4 or more points; fewer is a stat), a size per period is columns, a ranking is a sorted bar list, a share is a 100% bar, a target is a progress bar with both ends labelled, one value is a stat, more than 15 categories is a table. No pie or gauge.
- Bars start at zero; an axis that does not is labelled "axis starts at ...". Never two y-axes. Straight line segments, no smoothing. A forecast is dashed, with its end value labelled.
- 3 to 5 faint grid lines, round ticks, the top tick above the maximum. One hue per chart, at most 3 series on a screen. A legend only for more than one series, and each swatch is the mark it explains.
- Meaning never by colour alone. Each chart has a visible table or sentence, and its tooltips work from the keyboard.
- Short or empty history is drawn as it is: a zero line, no padded range, no "No data" picture.

### Shell and first screen

- Product name and scope as text from `PRODUCT.md`. Nav items go to other screens, never to anchors on the same page. A sidebar only for more than about 7 destinations; fewer use a top bar or tabs. A count on a nav item only on a queue that needs action, and the label names what is counted.
- One `h1`, a noun and not a greeting, 18 to 32px; no figure at 48px or more. One primary action per screen. Filters, tabs and paging live in the URL. A modal is the last choice, after inline editing; use a native `<dialog>`.
- Name the one finding (the fact in the data that most needs attention) in the line under the title or beside the main figure. The largest block and figure answer the screen's question.
- At the job's widest width, every block the brief names shows its header and first rows. Cap long lists at 4 to 6 rows with "View all" and the total; page or cap any list over about 50 rows. The most frequent job has its control on the first screen, in the title row or on the row that needs it.

### States

- An error sits inside the block that failed: one sentence on what failed, when the data was last good, and Retry. Errors differ by cause: offline, timeout, signed out (401), no permission (403), not found (404), too many requests (429), server error (500).
- Loading keeps the final layout, with grey bars at real size and no layout shift. A refresh keeps the old values and updates a freshness stamp.
- Add a read-only and a no-results state where the screen has them. First run keeps the frame and puts the first action where the data will go.
- Every row and control has hover, selected, focus and disabled. A disabled control says why.

### Forms and settings

- Label above each field, never in the placeholder. Validate when the user leaves the field. Keep the input after an error. Right input type and `autocomplete`; paste allowed.
- One view per settings area, with one save model per view: each control saves itself, or one Save per panel, never both.
- Destructive actions go last, in their own section, with the result in words. A reversible action runs at once with Undo for 5 to 10 seconds; an irreversible one asks for confirmation naming the object.

### Phone and touch (when the job supports phones)

- The sidebar folds to a top bar with a menu, or a bottom bar of 4 or 5 labelled items. KPIs become a 2-column grid or a list. At most one row of controls above a chart.
- Below about 640px a table becomes two-line rows: identity and key figure on line 1, the other fields on line 2, none dropped. A table that must stay a table scrolls in its own frame with the first column fixed.
- Touch targets are 44px; a desktop-only tool may use 32 to 40px controls with a 44px hit area. Back keeps scroll and filter state. Anything done by drag has a button or key alternative.

### Text and motion

- A button names the action ("Save changes", not "Submit"), and the result uses the same word ("Saved"). Any wording not in the inputs is a draft, listed in Questions for the client.
- No entrance motion. Motion is feedback only (press, focus, a menu opening) and respects reduced motion.
- Icon-only controls have an accessible name, decorative icons are hidden, and a changed status is announced.
- Text boxes have no fixed widths. Flex and grid children that hold text get `min-width: 0`. One-line text truncates with an ellipsis and the full text stays available. Leave room for 30 to 40% longer translated text.

## Steps

1. **Data and jobs.** List every field in the data, and what the user must do on this screen.
2. **One question.** Name the one question the screen answers first (for example "Which fixes can I approve now?").
3. **Shell and layout.** Pick the layout for the platforms: table or list for many rows, cards only when rows differ a lot.
4. **Put in the data.** Charts: one question per chart, weekday or date labels, a text equivalent, a total row, a caption for a bar that adds more than one item.
5. **Every state.** Main, empty, loading (shaped like the final screen), error, and each special state in the brief. Each state says what the user can do next.
6. **Check.** Capture at the job's widths. Check traps by hand: unsafe actions, failed and skipped, totals against the data, labels, Save in view, tabular figures.
   - Edge data: names of 100+ characters, empty and one-character values, emoji and accents, very large numbers, 1,000+ rows, no data, ten rapid clicks on submit, an offline load. Also forced-colours mode and text at 200%.
   - Answer in writing: Does the biggest block answer the screen's question? Do blocks share the screen's edges, with no card stopping short, no blank band over 40px inside a card, and cards in a row ending on one line? Is colour only on data, status and the one primary action? Do all numbers add up? Does every swatch match its mark? On a phone, does the navigation fold and does every block still answer its question? Is any text under 11px?
   - Fix the worst three, at most three rounds. Say what produced the evidence and what stayed untested.

## Output: `app/`

- One page per screen and a states page, or the project's own component files on an existing project.
- `app/NOTES.md`: 1 Data (each value and its source), 2 States, 3 Choices, 4 Questions for the client.
