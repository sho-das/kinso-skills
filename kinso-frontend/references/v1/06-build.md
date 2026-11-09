# Stage 6 - Build

Approved 2026-10-25 after testing (see `tests/stage6/RESULTS.md`: no method beat plain Claude; Hallmark tied it at 7.2 of 10 and was the most even across the 3 cases). This layer is short on purpose.

Sources: Hallmark Floor, craft, responsive and interaction rules (MIT, nutlope). Rules from the blind reviews. Rewritten in our own words.

Read `../RULES.md` first. This file adds only the rules for this stage.

## Input

- `copy/COPY.md` (every word), `plan/PLAN.md`, `design/DESIGN.md` and `design/tokens.json`. Other inputs only to check a fact.

## Rules

- Every word comes from `COPY.md`. Add no text. Use only slot text from `COPY.md`; never write your own.
- Follow the approved inputs over any method's house rule. Log each clash in `PROCESS.md`.
- Every colour, size and space comes from `tokens.json`, as CSS variables. Responsive sizes switch once, in `:root`.
- Visible focus on every link and button. Links and buttons at least 44px tall. A reduced-motion block.
- No hacks: no `overflow-x: hidden` to hide a layout bug, no `!important`, no empty rules.
- A button whose target is a slot is still a real link: point it at the slot note and add `aria-describedby`. Never a span, never `href="#"`.
- Show slots as slots: a dashed box with muted text.
- A headline slot is the headline plus a flag line below it, never a long bracket inside the `h1`.
- A list, filter, tab, dropdown or count that shows data from a database or API is built from that data. Do not type its items by hand when the data has them. When the data does not hold the items (a fixed set of options, or no data source yet), keep a hand-written list in one constants file and say why in `PROCESS.md`. An option with no matching data is hidden or shows an empty state; note which.

## Existing project

- Follow the guardrails in `00-existing.md`.
- Build in the project's own stack, files and components, not in a new `site/` folder.
- Run the project's tests before the first change and after the last.

## Patterns

- Title and value rows: `dl`, `dt`, `dd`, not headings.
- A sample object: `figure` with `figcaption`.
- A table on phone: a stacked list, with the label beside each value.
- Headings: `text-wrap: balance`. The `h1` is 2 lines or fewer at 1440 and 390.
- Language switch: two links to two pages, with `aria-current`, no script.

## Output: `site/`

`index.html` and `styles.css` (plus one page per extra language), and `PROCESS.md` with steps, clashes and assumptions. Browser checks are stage 7.
