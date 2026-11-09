# Stage 10 - App screens

26 October 2026. Test set-up. Results go in `tests/stage10/RESULTS.md`.

**Job of this stage:** build an app screen (a dashboard, a list, a settings form) with every state: main, empty, loading, error and the special ones. Real data comes from the given sample; nothing is invented.

**Input:** a screen brief (`SCREEN.md`), sample data (`sample-data.json`), and the approved direction (`DESIGN.md`, `tokens.json`), brief and answers of each client.

Cases: A KinBeat findings list for one repo (desktop first); B PaySetu app home (phone first, a chart); C Casa da Vó opening-hours settings (phone first, a form, Portuguese).

## Candidates (7)

| # | Candidate | Method files (in `vendor/`) |
|---|---|---|
| 0 | Baseline | None |
| 1 | taste-skill | `skills/taste-skill/references/app-screens.md` |
| 2 | UI UX Pro Max | `.claude/skills/ui-ux-pro-max/SKILL.md`; `data/app-interface.csv` and `data/charts.csv` read as files |
| 3 | Hallmark | `skills/hallmark/references/interaction-and-states.md`, `data-viz.md` |
| 4 | Impeccable | `skill/reference/mode-operate.md`, `visualize.md`, `harden.md` |
| 5 | Addy Osmani | `skills/frontend-ui-engineering/SKILL.md` |
| 6 | frontend-design | `skills/frontend-design/SKILL.md` (Anthropic) |

Runs build static HTML and CSS only (no JavaScript), and may use the capture tool, at most 3 captures per case. Runs go in batches of 4.

## How it is scored

1. **Checks (script, `tools/app-check.py`):** every state present, numbers match the sample data, no invented facts, labels on every field, tabular figures, no script, no comments.
2. **Capture:** sideways scroll and wide boxes at 390, touch targets.
3. **Traps:** a hidden list of places where a build goes wrong (`hidden/traps.md`, locked), 8 per case.
4. **Blind review (Sonnet 5.5):** names hidden; screenshots and code; design 40%, usability 30%, honesty with the data 20%, states 10%.
