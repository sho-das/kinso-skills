# Stage 11 - Diagrams

Read `../RULES.md` and `../BRAIN.md` first. The old rewrite is in `rewrite/11-diagrams.md`. It was within noise of Hallmark (7.5 against 7.75); its trap rules come back below as checks.

A diagram explains how something works: a flow, a path with limits, a schedule. This stage runs inside stage 6.

## Runs

In order, each followed as its own file says:

1. `skills/hallmark/references/macrostructures/19-map-diagram.md` - one large diagram organises the section, with a legend; the page's action sits with the orientation line, never under the map; SVG drawn from the real system; every fact also in a text legend; a node-by-node reveal, at most 5 nodes, once; on a phone, scroll inside a wrapper or collapse to an ordered list; an opening line that names the path.
2. `skills/hallmark/references/data-viz.md` - form first, inline SVG written for the data, honesty.
3. The chosen designer's motion and type rules for the section, from its own files.

Skip, and why: gstack `/diagram` and `diagram-design` (not in `skills/`; gstack needs a browser binary); any install or update command.

## In

The diagram brief (what it must show, where it goes, who reads it), `PRODUCT.md`, `ANSWERS.md`, `design/DESIGN.md`, `tokens.json`. `RULES.md`.

## Deal and pick

- Deal 2 diagram forms when the facts allow (flow or lanes; schedule grid or list).
- A fresh picker scores 0 to 3 (CORE section 6) and writes `<job>/picks/frontend/11-PICK.md`:
  1. It shows a shape a list cannot (a branch, a loop, lanes, a limit, more than 3 steps). 3 steps or fewer in plain order is a list.
  2. It needs the fewest arrows the inputs do not give (zero is the target).
  3. It fits 390 with no box wider than the screen.
  4. Labels readable at 390.
  5. The section's action stays reachable on the first screen at both widths.

## Guards

Every arrow, lane and box from the inputs. Free only. Never deploy or post. No secrets. Scripts only in `tools/sandbox/run.sh`. No real-looking money example unless the client allows it.

## Checks after

Never style.
- Facts: every arrow, lane and box states a fact from an input line; no actor, return arrow or order the inputs do not give. Wording not in the inputs is under "Questions and assumptions", or marked draft.
- `source.mmd` is the master. Box and arrow counts in each SVG match it, and nothing else.
- Layout faults: `capture.mjs` at the job's widths; `wideBoxes` empty; labels readable at 390. A phone version has its own drawing; the desktop one is never only shrunk or only hidden. A week or table on a phone uses compact rows, not one card per item.
- Accessibility: `role="img"`, `aria-labelledby`, `<title>` and `<desc>` in the page language; real `<text>`, never paths; shapes with no fact are `aria-hidden`; a text version below; closed, later or optional never by colour alone; reduced motion keeps the finished drawing.
- Links: the section's action (book, install) stays a real link, or a link to its slot note, on the first screen at both widths. No made-up targets.

## Override

As in `RULES.md`.

## Out

`diagram/`: the section HTML with inline desktop and phone SVGs, `source.mmd`, and `diagram/NOTES.md` (facts with sources, type, choices, questions and assumptions, the file list, how to change it: edit `source.mmd`, redraw both SVGs, check again). `picks/frontend/11-PICK.md`.

## Stop point

None of its own. Stages 7 and 9 check its output.
