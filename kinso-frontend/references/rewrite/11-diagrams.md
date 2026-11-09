# Stage 11 - Diagrams

Approved 2026-10-26 after testing (see `tests/stage11/RESULTS.md`: Hallmark map-diagram scored 7.7 of 10 and passed 23.5 of 24 traps; plain Claude 7.5; gstack 7.0; diagram-design 5.3).

Sources: Hallmark macrostructure "Map / Diagram" (MIT, nutlope), gstack `/diagram` authoring rules (MIT, Garry Tan), and plain Claude's phone version from the test. Rewritten in our own words.

Added 2026-10-26 from the coverage check (`coverage/11-COVERAGE.md`).
Added 2026-10-26 from the real check against the original skills (`../tests/v3/RESULTS.md`).

Read `../RULES.md` first. This file adds only the rules for this stage.

A diagram explains how something works: a flow, a path with limits, a schedule. It sits in a page section as inline SVG, with a text version.

## Input

- The diagram brief (what it must show, where it goes, who reads it), `research/PRODUCT.md`, `research/ANSWERS.md`, `design/DESIGN.md`, `design/tokens.json`.

## Rules

- Every arrow, lane and box states a fact. Draw only what the inputs say: no actor, return arrow or order they do not give.
- 5 to 15 boxes. If the facts need more, split them into several diagrams, one question each, and say why in `NOTES.md`.
- Box labels name the thing, short. Arrow labels state the action or the condition ("customer pays", "if over the limit"). Other detail goes in the text version.
- No made-up link targets: a link goes only to a real page or an anchor on the page. The page's main action stays outside the diagram, near the summary.
- No real-looking money example unless the client allows it.
- Closed, later or optional is never shown by colour alone: use a dashed line or words.
- Real `<text>` in the SVG, never text turned into paths. No script, no images.
- A shape that carries no fact (a background, a frame) gets `aria-hidden="true"`. Every fact is real `<text>` and is also in the text version.
- The SVG has `role="img"`, `aria-labelledby`, a `<title>` and a `<desc>`, in the page language.
- Colours, fonts and sizes from `tokens.json`.
- Every wording not in the inputs goes under "Questions and assumptions". On the page only if marked as a draft.
- When the section's job has an action (book, install), keep that action in the section as a real link, or a link to its slot note, on the first screen at both widths.
- On a phone, a week or table diagram uses compact rows (day | lunch | dinner) that fit about one screen. Not one card per item.

## Steps

1. **Facts.** List each fact the diagram must show, with its input line.
2. **Type.** First ask if it earns a picture: draw only when the facts have a shape a list cannot show (a branch, a loop, lanes, a limit, or more than 3 steps). 3 steps or fewer in a plain order is a list. Then pick the type: flow, path with limits, lanes, schedule or grid. Say why under "Type".
3. **Mermaid first.** Write it as Mermaid and save `source.mmd`. It is the master: to change the diagram, edit it first, then redraw both SVGs. Use `graph LR` for a flow or pipeline and `graph TD` for a hierarchy. A schedule written as a Gantt cannot be edited box by box; say so in `NOTES.md`. Check by hand that the source is valid Mermaid.
4. **Draw.** A desktop drawing, and a separate phone drawing with its own size, one column and text at 15px or more, when the job supports phones. Never shrink the desktop drawing to fit a phone, and never only hide it.
5. **Around it.** A one-sentence summary above, a legend when shapes or colours mean something, and a text version below, written as plain sentences or ranges.
6. **Check.** Capture at the job's widths. `wideBoxes` must be empty: no box wider than the screen. Labels readable at 390. Count the boxes and arrows in each SVG against `source.mmd`: the same, and nothing else. Compare every label with the fact list.

## Output: `diagram/`

- The section HTML with the inline SVG (desktop and phone versions), `source.mmd`, and `diagram/NOTES.md`: 1 Facts (each with its source), 2 Type, 3 Choices, 4 Questions and assumptions. It also lists the files (`source.mmd`, desktop SVG, phone SVG, section HTML), says the SVGs are hand-drawn from `source.mmd`, and says how to change the diagram: edit `source.mmd`, redraw both SVGs, run the check again.
