# Stage 4 - Plan

25 October 2026. Test set-up. Results go in `tests/stage4/RESULTS.md`.

**Job of this stage:** turn `PRODUCT.md` and `DESIGN.md` into a page plan: the sections in order, each with its claim, its proof and its source; the first screen as a wireframe at 1440 and 390; the components and their states; what is left out; the slots. Output `PLAN.md`, so Copy and Build start without guessing.

**Input for every candidate:** the approved stage 1 research, stage 2 brief and stage 3 direction (Hallmark's `DESIGN.md` and `tokens.json`) for each case.

## Candidates (8)

| # | Candidate | Method files (in `vendor/`) |
|---|---|---|
| 0 | Baseline | None |
| 1 | gstack | `plan-design-review/SKILL.md`: Design Principles, Cognitive Patterns, UX Principles, Priority hierarchy, 0-10 Rating Method, Section self-check (no preamble, no mockup binary) |
| 2 | Hallmark | `references/anatomy.md`, `layout.md` sections 3-8, `macrostructures/<shape from DESIGN.md>.md`, `gates.md` |
| 3 | Impeccable | `reference/mode-persuade.md`, `layout.md`, `distill.md`, `clarify.md` |
| 4 | taste-skill | `references/layout.md`, `copy.md`, `critique.md` (every section is a claim with proof) |
| 5 | frontend-design | Anthropic `skills/frontend-design/SKILL.md` (layout concept, ASCII wireframes, self-check) |
| 6 | UI UX Pro Max | `ui-ux-pro-max/SKILL.md`; `scripts/search.py --domain landing` and `--domain ux` in the sandbox |
| 7 | Addy Osmani | `skills/spec-driven-development/SKILL.md`, `skills/planning-and-task-breakdown/SKILL.md` |

Not tested here: ECC (its `plan-canvas` is a review screen, not a planning method), Matt Pocock (`to-spec` needs an issue tracker; `prototype` writes code), awesome-design-md (brand files only).

## How it is scored

1. **Checks (script, `tools/plan-check.py`):** all 7 headings present; every section has Job, Claim, Proof, Source, Material, Action and Words; both wireframes present; the main action is in the first section.
2. **Facts (Sonnet 5.5):** any product fact, number, customer or feature not in the inputs? Is the tagline kept?
3. **Blind review (Sonnet 5.5, one per case):** names hidden. Scores 1-10 on fit to the brief and the visitor's job, whether every section earns its place, how clearly Copy and Build can follow it, and honesty about slots.
4. **You:** the top 3 per case.
