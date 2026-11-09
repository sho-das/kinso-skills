# Stage 7 - Check in browser

Approved 2026-10-25 after testing (see `tests/stage7/RESULTS.md`: Addy Osmani scored 6.8 of 10 and fixed the most known faults, 6 of 15; gstack 6.5; plain Claude 5.2).

Sources: Addy Osmani browser-testing-with-devtools (MIT), gstack design-review phases (MIT, Garry Tan), UI UX Pro Max pre-delivery checklist (MIT, nextlevelbuilder). Rewritten in our own words.
Added 2026-10-26 from the coverage check (`coverage/07-COVERAGE.md`).

Read `../RULES.md` first. This file adds only the rules for this stage.

## Input

- `site/` (stage 6), `copy/COPY.md`, `plan/PLAN.md`, `design/DESIGN.md`, `design/tokens.json`.

## Tools

- `capture.mjs`, in the sandbox: screenshots at 1440x900 and 390x844, and measures (fonts loaded, headline lines, main action above the fold, gutters, clipped text, sideways scroll, computed sizes).
- `build-check.py`: structure, accessibility basics, text against `COPY.md`, comments, added glyphs.
- Run captures one at a time.
- `capture.mjs` does not read the console, press keys, click or turn on reduced motion. Do those checks from the source where you can; list the rest under "Not checked".

## Rules

- A slot is not a fault. Never remove a slot the copy says to show.
- No made-up link targets. A slot button links to its slot note, with `aria-describedby`.
- Capture again after every layout change, and look at the phone first screen again.
- Write "fixed" only after re-reading the changed lines.
- Add no comments or stamps while fixing.
- Change only what a finding needs.
- A finding that needs new copy, client facts or a third-party change is "deferred - client", with the owner, whatever its impact. Never fix it by inventing words. A better button or link label is a proposal for the client, not an edit.
- Status words: fixed and verified (re-captured), fixed but not verified, undone, deferred. If a fix makes any measure worse, undo it and mark it undone.

## Existing project

- Capture the pages before the change and after it. Every page the change touches is checked, plus each other app that uses a changed shared component.

## Steps

1. **Capture** the page as it is. List every console error, warning and failed load at both widths; the goal is zero. If the tool cannot read the console, write "console not checked".
2. **Fixed checklist**, before any visual review:
   - Each computed size at 1440 and 390 against `DESIGN.md`: h1, h2, h3, lede, body, gutter.
   - Counts, reported as numbers: font families (3 or fewer), non-grey colours (12 or fewer), heading sizes with no clear step between them, spacing values not on the scale.
   - The viewport tag has no `user-scalable=no` and no `maximum-scale=1`.
   - Page text against `COPY.md`: no added glyphs, dots, words or slot text.
   - Each colour role against `DESIGN.md`: accent only on the main action, each role in its colour.
   - Every action block on the page, not only the first screen: each band has its button, each slot note sits next to its button.
   - No comments in the CSS or HTML.
3. **First impression**, as a first-time visitor: "The page says...", "My eye goes to 1, 2, 3", "In one word: ...". Compare those 3 with the 3 the plan intended. Name each area of the page and its purpose; list any area you cannot name in two seconds. Then a section-by-section visual audit at both widths, plus:
   - **Trunk test** on every page and language page: what site, what page, main sections, options here, where am I, how to search or contact. PASS (all 6), PARTIAL (4 or 5), FAIL (3 or fewer). A FAIL is a high finding.
   - **Choice audit:** every button and link label says what happens next. Flag any that makes the visitor think.
   - **Friction, no score:** hidden contact or price, valid input rejected (for example dashes in a phone number), a field the job does not need, a pop-up or tour in the way.
4. **Pre-delivery checklist:** touch targets at least 44px, visible focus, contrast, states, skip link, headings in order, plus:
   - **Keyboard:** Tab order matches reading order, every stop shows focus, no sticky bar or banner covers the focused control. Name any stop with no accessible name.
   - **Flows:** for each form, menu or tab set, write the steps, the expected result and what you saw. Include a fast double click or double submit.
   - No content hidden behind a fixed bar.
   - With reduced motion on, nothing important moves. Only if `tokens.json` has a dark theme: check contrast and borders in it on its own.
5. **Triage:** rank the findings, worst first.
6. **Fix loop:** fix, re-capture, check again. At most 3 rounds.
7. **Final audit:** run the fixed checklist again on the last capture.

## Output: `check/CHECK.md`

1. Findings (where, evidence, rule broken, fix, status)
2. After (the last capture's measures at both widths, and anything still wrong)
3. Not checked
