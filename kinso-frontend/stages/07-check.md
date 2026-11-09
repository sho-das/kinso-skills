# Stage 7 - Check in browser

25 October 2026. Test set-up. Results go in `tests/stage7/RESULTS.md`.

**Job of this stage:** open the built page in a real browser at 1440 and 390, check it against the approved inputs and the build rules, find the faults, fix them, and check again.

**Input:** one stage 6 build per case that has known faults (UI UX Pro Max A, ECC B, UI UX Pro Max C). The faults found by the stage 6 review are in `tests/stage7/hidden/faults.md` (locked; runs never see it).

## Candidates (7)

| # | Candidate | Method files (in `vendor/`) |
|---|---|---|
| 0 | Baseline | None (the capture tool only) |
| 1 | taste-skill | `SKILL.md` "The run" check steps, `references/critique.md` (fix top 3 per round, at most 3 rounds) |
| 2 | Hallmark | `references/review-hero.md`, `review-finish.md`, `responsive.md`, `gates.md` (sweep by hand) |
| 3 | Impeccable | `reference/audit.md`, `critique.md`, `polish.md` |
| 4 | gstack | `design-review/SKILL.md` Phases 1, 3, 4, 6 to 9, Design Critique Format, Important Rules (no browse binary) |
| 5 | UI UX Pro Max | `ui-ux-pro-max/SKILL.md` pre-delivery checklist; `data/ux-guidelines.csv` read as a file |
| 6 | Addy Osmani | `skills/browser-testing-with-devtools/SKILL.md` (manual path; no DevTools MCP) |

Every candidate uses the same browser: `capture.mjs` in the sandbox, at most 3 captures per case. Runs go in batches of 3 or 4 so the Mac stays cool.

Not tested here: frontend-design (no check step), ECC (`loop-design-check` is about agent loops), Microsoft playwright-cli (needs an install).

## How it is scored

1. **Found:** how many hidden faults `CHECK.md` names (of 16).
2. **Fixed:** checked by the after capture, `build-check.py`, and a Sonnet reviewer who compares before and after against the hidden list.
3. **New faults:** anything the fix broke, and any added text.
4. **False findings:** findings that are not real.
5. **Blind review (Sonnet 5.5):** names hidden; scores the after page and the report.
