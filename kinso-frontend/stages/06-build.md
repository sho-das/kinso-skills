# Stage 6 - Build

25 October 2026. Test set-up. Results go in `tests/stage6/RESULTS.md`.

**Job of this stage:** build the page in plain HTML and CSS, following `PLAN.md`, `DESIGN.md` and `tokens.json`, with every word from `COPY.md`. No JavaScript, no frameworks, no outside images.

**Input for every candidate:** the approved outputs of stages 1-5 for each case (frontend-design's `COPY.md` from stage 5).

## Candidates (9)

| # | Candidate | Method files (in `vendor/`) |
|---|---|---|
| 0 | Baseline | None |
| 1 | gstack | `design-html/SKILL.md` Steps 1 and 3 and Important Rules (no preamble, no Pretext library, no live-reload server) |
| 2 | Hallmark | `SKILL.md` The Floor and Flow build steps; `references/craft.md`, `layout.md`, `responsive.md`, `interaction-and-states.md`, `patterns.md`, `gates.md` |
| 3 | Impeccable | `reference/craft.md`, `craft-floor.md`, `typeset.md`, `layout.md`, `adapt.md`, `harden.md` |
| 4 | taste-skill | `SKILL.md` build steps; `references/type.md`, `layout.md`, `tells.md` |
| 5 | frontend-design | Anthropic `skills/frontend-design/SKILL.md` |
| 6 | UI UX Pro Max | `ui-ux-pro-max/SKILL.md` rules and pre-delivery checklist; `data/ux-guidelines.csv` read as a file (no script) |
| 7 | Addy Osmani | `skills/frontend-ui-engineering/SKILL.md` |
| 8 | ECC | `skills/frontend-a11y/SKILL.md`, `skills/accessibility/SKILL.md` |

No browser or script during the runs; browser checks are stage 7 and run afterwards for every build the same way.

## How it is scored

1. **Checks (scripts):** `tools/build-check.py` (no script, no outside files, `lang`, one `h1`, heading order, skip link, alt text, focus style, no em dash, copy matches `COPY.md`, no added text, no wrong product name or forbidden line); `capture.mjs` at 1440 and 390 (fonts loaded, sideways scroll, headline lines, main action above the fold, phone gutter, clipped text); `contrast.py` is not needed (tokens fixed in stage 3).
2. **Blind review (Sonnet 5.5, one per case):** names hidden. Sees the screenshots and the HTML. Scores 1-10 on fidelity to `DESIGN.md` and `PLAN.md`, visual craft, phone layout, accessibility, and code quality.
3. **You:** the top 3 per case.
