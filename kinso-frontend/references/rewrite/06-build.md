# Stage 6 - Build

Approved 2026-10-25 after testing (see `tests/stage6/RESULTS.md`: no method beat plain Claude; Hallmark tied it at 7.2 of 10 and was the most even across the 3 cases). This layer is short on purpose.

Sources: Hallmark Floor, craft, layout, responsive, interaction and states rules (MIT, nutlope). Rules from the blind reviews. Rewritten in our own words.
Added 2026-10-26 from the coverage check (`coverage/06-COVERAGE.md`).
Added 2026-10-26 from the real check against the original skills (`../tests/v3/RESULTS.md`).

Read `../RULES.md` first. This file adds only the rules for this stage.

## Input

- `copy/COPY.md` (every word), `plan/PLAN.md`, `design/DESIGN.md` and `design/tokens.json`. Other inputs only to check a fact.

## Rules

- Every word comes from `COPY.md`. Add no text. Use only slot text from `COPY.md`; never write your own.
- Follow the approved inputs over any method's house rule. Log each clash in `PROCESS.md`.
- Every colour, size and space comes from `tokens.json`, as CSS variables. Responsive sizes switch once, in `:root`.
- Visible focus on every link and button. Links and buttons at least 44px tall. A reduced-motion block.
- No hacks: no `overflow-x: hidden` to hide a layout bug, no `!important`, no empty rules.
- No sideways scroll by design: `100%`, never `100vw`; `dvh` or `svh`, never `vh`. Grid tracks that hold images use `minmax(0, 1fr)`; flex or grid children that hold text get `min-width: 0`; headings get `overflow-wrap: break-word`.
- Layout frame: one centred container with a max width, so at wide screens the gutters grow and the grid gains no columns. The section owns its background and block padding; the inner container owns only `padding-inline`. No card inside a card.
- Responsive: breakpoints in `rem`. Hover styles sit in `@media (hover: hover)`, larger touch sizes in `(pointer: coarse)`; never detect a device by width. Use logical properties and leave room for 30 to 40% longer text in other languages.
- States: build every state `PLAN.md` lists for a control (default, hover, focus, active, disabled, loading, error). Hover only raises contrast, and every hover has a focus twin. Disabled uses the native attribute, `cursor: not-allowed` and lower opacity together.
- Motion: build the motion idea and the supporting motions in `DESIGN.md` section 8, no more. Animate only `transform`, `opacity` and `clip-path`; list the properties, never `transition: all`; easing and duration from tokens. Scroll-linked motion sits inside `@supports (animation-timeline: view())`, with the finished layout as the base. No fade-up on every section. Content is visible with scripting off (hide only under a `.js` class) and with reduced motion on. Nothing loops past 5 seconds without a visible pause control; loops pause off screen.
- Type: `font-display: swap`, a fallback of the same kind, `font-synthesis: none`, and `tabular-nums` on figures that are compared. Body measure 45 to 75ch; headings get a measure in `ch` on the element.
- Images: every `<img>` has `width`, `height`, a file that exists, and `alt` (`alt=""` when the subject is named beside it). `loading="lazy"` below the fold, never on the first-screen image. Decorative SVG gets `aria-hidden="true"`. No emoji as icons.
- A button or nav label never wraps at any width the job targets. Fix with `white-space: nowrap`, then move links behind a menu. A shorter label is only a proposal for the client in `PROCESS.md`; never change the approved wording.
- Fields: every input has a visible `<label>`, a `name`, the right `type` and `autocomplete`, and 16px text on phone. Every `<button>` has an explicit `type`. A placeholder shows a format, never the label. An error sits next to its field, linked by `aria-describedby`, with `aria-invalid="true"`. Submit is disabled only while a request runs.
- A form with no endpoint yet keeps an empty `data-endpoint` and never shows a success message. Its "not sent" line comes from `COPY.md`, or is a slot.
- A button whose target is a slot is still a real link: point it at the slot note and add `aria-describedby`. Never a span, never `href="#"`.
- Show slots as slots: a dashed box with muted text.
- A headline slot is the headline plus a flag line below it, never a long bracket inside the `h1`.
- A list, filter, tab, dropdown or count that shows data from a database or API is built from that data. Do not type its items by hand when the data has them. When the data does not hold the items (a fixed set of options, or no data source yet), keep a hand-written list in one constants file and say why in `PROCESS.md`. An option with no matching data is hidden or shows an empty state; note which.
- The interface notes in `COPY.md` (wordmark, language switch mechanism, slot numbers) are build notes. Never print them on the page.
- A page whose language copy is missing uses the `COPY.md` slot text. Never write a heading of your own, such as `[Hindi headline]`.
- Keep the first-screen layout from `DESIGN.md`. To fit the `h1` in 2 lines, change the size within the tokens or flag it. Do not move blocks below the fold.

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
- Nav: one line; on phone the links that do not fit go behind a menu button. The logo links home and has an `aria-label`.
- A dialog, only when `PLAN.md` has one: native `<dialog>` opened with `showModal()`, the page behind it `inert`, Escape and a visible control to close, first focus on its first interactive element.

## Output: `site/`

`index.html` and `styles.css` (plus one page per extra language), and `PROCESS.md` with steps, clashes and assumptions. Browser checks are stage 7.
