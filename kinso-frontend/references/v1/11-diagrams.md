# Stage 11 - Diagrams

Approved 2026-10-26 after testing (see `tests/stage11/RESULTS.md`: Hallmark map-diagram scored 7.7 of 10 and passed 23.5 of 24 traps; plain Claude 7.5; gstack 7.0; diagram-design 5.3).

Sources: Hallmark macrostructure "Map / Diagram" (MIT, nutlope), gstack `/diagram` authoring rules (MIT, Garry Tan), and plain Claude's phone version from the test. Rewritten in our own words.

Read `../RULES.md` first. This file adds only the rules for this stage.

A diagram explains how something works: a flow, a path with limits, a schedule. It sits in a page section as inline SVG, with a text version.

## Input

- The diagram brief (what it must show, where it goes, who reads it), `research/PRODUCT.md`, `research/ANSWERS.md`, `design/DESIGN.md`, `design/tokens.json`.

## Rules

- Every arrow, lane and box states a fact. Draw only what the inputs say: no actor, return arrow or order they do not give.
- 5 to 15 boxes. Short labels; detail goes in the text version.
- No real-looking money example unless the client allows it.
- Closed, later or optional is never shown by colour alone: use a dashed line or words.
- Real `<text>` in the SVG, never text turned into paths. No script, no images.
- The SVG has `role="img"`, `aria-labelledby`, a `<title>` and a `<desc>`, in the page language.
- Colours, fonts and sizes from `tokens.json`.
- Every wording not in the inputs goes under "Questions and assumptions". On the page only if marked as a draft.

## Steps

1. **Facts.** List each fact the diagram must show, with its input line.
2. **Type.** Pick the type: flow, path with limits, lanes, schedule or grid. Say why.
3. **Mermaid first.** Write it as Mermaid and save `source.mmd`, so it can be edited later.
4. **Draw.** A desktop drawing, and a separate phone drawing with its own size, one column and text at 15px or more, when the job supports phones. Never shrink the desktop drawing to fit a phone, and never only hide it.
5. **Around it.** A one-sentence summary above, a legend when shapes or colours mean something, and a text version below, written as plain sentences or ranges.
6. **Check.** Capture at the job's widths. `wideBoxes` must be empty: no box wider than the screen. Labels readable at 390.

## Output: `diagram/`

- The section HTML with the inline SVG (desktop and phone versions), `source.mmd`, and `diagram/NOTES.md`: 1 Facts (each with its source), 2 Type, 3 Choices, 4 Questions and assumptions.
