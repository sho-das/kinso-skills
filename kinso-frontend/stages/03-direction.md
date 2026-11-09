# Stage 3 - Direction

25 October 2026. Test set-up. Results go in `tests/stage3/RESULTS.md`.

**Job of this stage:** turn `PRODUCT.md` and `RESEARCH.md` into one visual direction: type, colour, layout, imagery, motion, components, and what to avoid. Output `DESIGN.md` plus tokens, so Plan and Build start from a fixed system.

## Candidates (9)

| # | Candidate | Method files (in `vendor/`) |
|---|---|---|
| 0 | Baseline | None |
| 1 | gstack | `design-consultation/SKILL.md` (design steps only; no preamble bash) |
| 2 | Impeccable | `SKILL.md`, `reference/new-work.md`, `mode-persuade.md`, `typeset.md`, `colorize.md`, `layout.md`, `craft-floor.md`, `document.md` |
| 3 | Hallmark | `SKILL.md` steps 3-5, `references/direction.md`, `design-md.md`, `fonts.md`, `genres/`, `themes/`, `macrostructures.md` |
| 4 | taste-skill | `SKILL.md` steps 2-4, `references/type.md`, `colour.md`, `layout.md`, `imagery.md`, `tells.md`; `scripts/draw.mjs` in the sandbox |
| 5 | frontend-design | Anthropic `skills/frontend-design/SKILL.md` |
| 6 | UI UX Pro Max | `ui-ux-pro-max/SKILL.md`, `design-system/SKILL.md`; `scripts/search.py` in the sandbox |
| 7 | awesome-design-md | `README.md` and the 1-2 nearest brand files in `design-md/` as templates |
| 8 | ECC | `skills/frontend-design-direction/SKILL.md`, `skills/design-system/SKILL.md` |

Not tested here: Matt Pocock and Addy Osmani (no direction skill).

## How it is scored

1. **Checks (scripts):** contrast of colour pairs from `tokens.json` (WCAG AA); `preview.html` captured at 1440 and 390: fonts loaded, sideways scroll on phone, words on first screen.
2. **Facts:** does the preview or DESIGN.md add any product fact not in PRODUCT.md?
3. **Blind review (Sonnet 5.5, one per case):** names hidden. Sees each DESIGN.md and the preview screenshots next to the rival captures. Scores 1-10 on fit to the brief, difference from rivals, craft, and how clearly Build can follow it.
