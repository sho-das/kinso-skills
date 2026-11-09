# Stage 7 - Check in browser

Approved 2026-10-25 after testing (see `tests/stage7/RESULTS.md`: Addy Osmani scored 6.8 of 10 and fixed the most known faults, 6 of 15; gstack 6.5; plain Claude 5.2).

Sources: Addy Osmani browser-testing-with-devtools (MIT), gstack design-review phases (MIT, Garry Tan), UI UX Pro Max pre-delivery checklist (MIT, nextlevelbuilder). Rewritten in our own words.

Read `../RULES.md` first. This file adds only the rules for this stage.

## Input

- `site/` (stage 6), `copy/COPY.md`, `plan/PLAN.md`, `design/DESIGN.md`, `design/tokens.json`.

## Tools

- `capture.mjs`, in the sandbox: screenshots at 1440x900 and 390x844, and measures (fonts loaded, headline lines, main action above the fold, gutters, clipped text, sideways scroll, computed sizes).
- `build-check.py`: structure, accessibility basics, text against `COPY.md`, comments, added glyphs.
- Run captures one at a time.

## Rules

- A slot is not a fault. Never remove a slot the copy says to show.
- No made-up link targets. A slot button links to its slot note, with `aria-describedby`.
- Capture again after every layout change, and look at the phone first screen again.
- Write "fixed" only after re-reading the changed lines.
- Add no comments or stamps while fixing.
- Change only what a finding needs.

## Existing project

- Capture the pages before the change and after it. Every page the change touches is checked, plus each other app that uses a changed shared component.

## Steps

1. **Capture** the page as it is.
2. **Fixed checklist**, before any visual review:
   - Each computed size at 1440 and 390 against `DESIGN.md`: h1, h2, h3, lede, body, gutter.
   - Page text against `COPY.md`: no added glyphs, dots, words or slot text.
   - Each colour role against `DESIGN.md`: accent only on the main action, each role in its colour.
   - Every action block on the page, not only the first screen: each band has its button, each slot note sits next to its button.
   - No comments in the CSS or HTML.
3. **First impression**, then a section-by-section visual audit at both widths.
4. **Pre-delivery checklist:** touch targets at least 44px, visible focus, contrast, states, skip link, headings in order.
5. **Triage:** rank the findings, worst first.
6. **Fix loop:** fix, re-capture, check again. At most 3 rounds.
7. **Final audit:** run the fixed checklist again on the last capture.

## Output: `check/CHECK.md`

1. Findings (where, evidence, rule broken, fix, status)
2. After (the last capture's measures at both widths, and anything still wrong)
3. Not checked
