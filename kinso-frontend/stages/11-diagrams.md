# Stage 11 - Diagrams

26 October 2026. Test set-up. Results go in `tests/stage11/RESULTS.md`.

**Job of this stage:** draw a diagram that explains how something works, as inline SVG on the page, with a text equivalent. Only facts from the inputs.

Cases: A KinBeat: how a fix reaches your repo (a flow with limits and a trust line); B PaySetu: how a round-up works (a short flow for a phone); C Casa da Vó: the week's hours and how to book (a schedule, in Portuguese).

## Candidates (4)

| # | Candidate | Method files (in `vendor/`) |
|---|---|---|
| 0 | Baseline | None |
| 1 | diagram-design | `skills/diagram-design/SKILL.md`, `references/style-guide.md`, `layout-budget.md`, `primitives-core.md`, `semantic-patterns.md`, and the `type-*.md` file for the type it picks (no scripts; the style is set from `DESIGN.md`) |
| 2 | gstack | `diagram/SKILL.md` "Step 1 - Author the diagram" and "Rules" (Mermaid first, then drawn by hand as SVG; no render bundle, no server) |
| 3 | Hallmark | `skills/hallmark/references/macrostructures/19-map-diagram.md`, and the drawn-illustration rule in `imagery.md` |

Other sources have no diagram method: taste-skill, Impeccable, UI UX Pro Max, Addy Osmani, ECC.

## How it is scored

1. **Checks (script, `tools/diagram-check.py`):** inline SVG with an accessible name, real text, a text equivalent, no script or images, no comments, colours from `tokens.json`, forbidden words.
2. **Capture:** readable at 390, no sideways scroll.
3. **Traps:** 8 per case (`hidden/traps.md`, locked).
4. **Blind review (Sonnet 5.5):** names hidden; clarity 40%, honesty 30%, fit with the page 20%, accessibility 10%.
