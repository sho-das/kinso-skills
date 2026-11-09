# Stage 10 - App screens

Read `../RULES.md` and `../BRAIN.md` first. The old rewrite is in `rewrite/10-app-screens.md`. It won its blind test (8.5 against 6.5) on the traps: Approve blocked on failed tests, a true 0 axis. Those come back below as checks.

An app screen is a dashboard, a list, a settings form or any screen a signed-in user works in. This stage runs inside stage 6.

## Runs

In order, each followed as its own file says:

1. `skills/taste-skill/references/app-screens.md` - inventory the data and jobs; the dataset with assertions; data truth rules; one question, one finding; deal app styles of the kept theme (see "Deal and pick"; 2 for a dark theme); a face and a signature element per product; shell first with the grid arithmetic; `assets/charts.js`; `scripts/inspect.mjs --app`; the seven written questions on the screenshots.
2. `skills/ui-ux-pro-max/SKILL.md` with `data/app-interface.csv`, `data/charts.csv`, the status roles in `data/colors.csv`, the density dial, and `references/pro-rules.md`.
3. `skills/hallmark/references/flow.md` (app screens, about L49-66) and `skills/hallmark/references/data-viz.md` for charts.
4. `skills/impeccable/reference/mode-operate.md`, `harden.md`, `onboard.md`.
5. `skills/web-design-guidelines/rules/_sections.md` for forms, tables and keyboard rules.

Skip, and why: ui-ux-pro-max logo, icon and image makers (paid); its search scripts are not needed, the CSV files are read directly; any install or update command. taste-skill scripts run only through `tools/sandbox/run.sh`.

## In

The screen brief (job, what it holds, states), the data or a sample, `design/DESIGN.md`, `tokens.json`, `PRODUCT.md`, `ANSWERS.md`. `RULES.md`.

When called by kinso-build, read `<job>/build/STACK.md` and build for its platform target.

## Deal and pick

- **Theme first.** Read `colors.bg` and `colors.text` in `tokens.json`. If `bg` is darker than `text`, the theme is `dark`; if lighter, `light`. Write the theme and both values in `PROCESS.md`.
- **Seed.** Seed text `<job>-frontend-10[-<case>]` (CORE section 5). `printf %s <seed> | shasum -a 256 | cut -c1-8` gives the 8 hex; write them out in `--seed $((16#<8 hex>))` (the guard blocks `$( )`, so never set them through a variable). Record the seed, the 8 hex and the number in the PICK. App mode does not print the seed, so the PICK is the only record.
- **Deal app styles, as written, theme always passed:**
  `tools/sandbox/run.sh --no-net <job> node skills/taste-skill/scripts/draw.mjs --app --kind <kind> --brief "<one line>" --screens <screens> --theme <dark|light> --options 3 --keep palette,type --seed $((16#<8 hex>)) > <job>/frontend/deal.txt; echo "exit $?" > <job>/frontend/deal.log`
  `--kind` is required in app mode (`lib/app-draw.mjs`). `--theme` is never left out to get more styles.
- **Theme check, a must.** `grep -c '(light)' <job>/frontend/deal.txt` prints 0 for a dark theme (`'(dark)'` for a light one). Any other count fails the deal: stop and log it; never pass a style of the wrong ground to the picker. The same holds for a later `--style` or `--redraw style` sheet: its `theme` line must match (the tool falls back to all styles when its pool runs out).
- **Count.** The app library has 2 dark styles (`data-terminal`, `true-black-flat`; `draw.mjs --app --list styles`). So a dark deal returns 2 styles, not 3. That meets CORE section 3 (at least 2). Write "2 dealt, library has 2 dark styles" in the PICK.
- Add one ui-ux-pro-max design-system result with the density dial, for comparison only. It is scored but is not a dealt style. Its colours never replace `tokens.json`. Reference only, not a dealt style: `skills/daangn-seed/references/decision-matrices/` (which button, input, overlay, tab), the component state lists in `references/components/`, and `references/anti-patterns.md` as a check. `skills/styleseed/workflows/ss-resolve/references/catalog.json` `pages` and `domains` for screen types. Never use Karrot's colours or names; never run either skill's scripts.
- A fresh picker scores 0 to 3 (CORE section 6) and writes `<job>/picks/frontend/10-PICK.md`: how the product is used (session length, money or media, team or one person, day or night; taste-skill), the Nielsen heuristics that apply (`skills/impeccable/reference/critique.md` L110-133), and build risk.
- Then the face and signature element, from the product's own things.

## Guards

Facts and figures only from the data and `PRODUCT.md`. Sample data labelled once; real data never called a sample. Free only. Never deploy or post. No secrets. Scripts only in `tools/sandbox/run.sh`. No colour outside `tokens.json`; a missing status colour goes back to stage 3.

## Checks after

Never style: shell, density, KPI form and chart look belong to the designer.
- Data truth: every number from the data or a sum of it; totals computed from the rows as shown; a fact shown twice is one value; counts follow the filter; a relative figure names its baseline.
- Traps: an unsafe action is blocked with the reason beside it (Approve on a failed or skipped test); failed and skipped never look passed; a data conflict is a question for the client.
- Chart honesty: bars start at zero or the axis is labelled; never two y-axes; meaning never by colour alone; a text or table version of every chart; tooltips work by keyboard.
- Lists, filters, tabs and counts from the data, or one constants file with the reason.
- States: empty, loading (final layout, no shift), error by cause (offline, 401, 403, 404, 429, 500) with Retry; disabled controls say why.
- Accessibility: accessible names with context; errors linked to fields; 44px hit areas; tabular figures; drag has a button or key alternative; changed status announced; reduced motion.
- Layout faults: Save stays in view on long forms; no sideways scroll; no clipped text at the job's widths; edge data (100+ character names, 1,000+ rows, 200% text) does not break the screen.

## AI features

For any screen with an AI feature (kinso-build stage 7). These are checks, not style: the designer decides how each one looks.

- Streaming text with a visible "writing" state while the answer arrives. When `build/STACK.md` says "no stream" (one short call), the "writing" state shows while waiting and the answer appears whole; that is not a fail.
- A cancel button while it writes. Partial results are kept when the user cancels, marked as stopped. Cancel stops the work on the server too (the model call is aborted, or the job is cancelled); if it cannot, the screen says the answer will still arrive.
- A human action on an AI output ("ok to send", "approve", "use this") is disabled until a valid output exists, with the reason beside it. Writing a new output clears the earlier mark.
- An "AI can be wrong" note near the output, in the product's own words from `COPY.md` or `PRODUCT.md`.
- RAG answers show their source links, one per cited source.
- Thumbs up or down, plus an optional reason, saved so they can become eval cases.
- A clear state when the model is down, and another when the user's cost or rate cap is hit. Each says what the user can do next.
- A confirm step before any AI action that changes data or sends anything.
- No fake typing delay: text shows as it arrives, never slowed down for effect.
- Streamed text sits in a polite live region (`aria-live="polite"`), announced in sentences or on finish, not token by token. The writing, stopped and down states are announced too.

## Override

As in `RULES.md`. An unsafe action left live can be overridden only as "ship at the client's risk".

## Out

`app/`: one page per screen and a states page, or the project's own component files. `app/NOTES.md`: data and sources, states, choices, questions for the client. `picks/frontend/10-PICK.md`.

## Stop point

None of its own. Stages 7 and 9 check its output.
