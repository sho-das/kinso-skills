# Stage 6 - Build

Read `../RULES.md` and `../BRAIN.md` first. The old rewrite is in `rewrite/06-build.md`. Its first test ran with no browser and no scripts, so every original's look loop was off. Here the loops run.

## Runs

The chosen direction's own designer skill, end to end, with its own linter and look loop. A mix runs the skill that owns the hero.

- **taste-skill direction:** `skills/taste-skill/SKILL.md` steps 6 to 9 (about L225-380): tokens, the hero exactly as its blueprint says, each section from its blueprint, the imagery ladder, the live thing, scenes, fullness, the frame. Gate: `scripts/lint.mjs`, `scripts/inspect.mjs` at 1440, 768 and 390, `scripts/scenes.mjs`. Fix every FAIL, defend every WARN in one sentence. A FAIL that only the client can clear (photos that do not exist yet) is never hidden with `--allow` and never filled with stock or generated pictures: add a row `inspect:<rule id>` to `OVERRIDES.md` with the reason and "pending", then run `tools/inspect-overrides.mjs <out>/report.json <job>/OVERRIDES.md`. It shows the check as OVERRIDE with the reason; "pending" stays blocked on the user until they sign the row. Look: `references/critique.md` on the screenshots, fix the top three, at most 3 rounds. Move: the motion layer.
- **Hallmark direction:** `skills/hallmark/SKILL.md` about L131-150: scaffold `tokens.css` and `base.css`, `references/patterns.md`, hero first, `scripts/sloplint.mjs --stage hero`, then the hero review in a fresh context (`references/review-hero.md`), then the sections and the sweep with `scripts/sloplint-render.mjs`. Show the real product with `scripts/capture.mjs` when it can run.
- **Real-site direction:** build from the translated `DESIGN.md`, with taste-skill's gate and look loop.
- Every build: `skills/impeccable/reference/craft-floor.md` (Verify and Refuse lists) and `skills/frontend-design/SKILL.md` L55 and L59.

Do not cross-apply house rules: one designer's rule does not bind another designer's build.

Skip, and why: `skills/hallmark/scripts/imagegen.mjs` and `references/comp.md` (paid key); `scripts/install.mjs`, `install-hook.mjs`, `lint-hook.mjs` (installs and hooks); the Impeccable launcher (binary download); any update command. All other scripts run only through `tools/sandbox/run.sh`; `assets.mjs` goes through the collector. Only the scripts this file names run, and only after they passed our scan (CORE section 8 item 7, user's call 2026-10-27). No other vendor script ever runs.

## In

`copy/COPY.md` (every word), `plan/PLAN.md`, `design/DESIGN.md`, `tokens.json`. `RULES.md`. Other inputs only to check a fact.

**In, from the chain:** `handoff/PRODUCT.md`, `handoff/TEST-PAGE.md`, `OVERRIDES.md`, `business/RISK.md` section 5 ("Claims we must not make") and `../RULES-RESEARCH.md`, to check a fact or a claim.

When called by kinso-build ("From kinso-build"), read `<job>/build/STACK.md` and build for its platform target. Write the pages into `<code>/<pages path>`, the path in that platform's row of `STACK.md`, not into `<job>/site/`.

Screens with an AI feature also follow "AI features" in `10-app-screens.md`.

## Deal and pick

- Deal 2 hero variants: the dealt blueprint or posture, and the signature-led one.
- A fresh hero reviewer (`skills/hallmark/references/review-hero.md`) picks one and lists fixes, at most 5.
- Rubric, written to `<job>/picks/frontend/06-PICK.md`: only-this-product headline; the signature on the first screen; a real picture holding its half, or type filling the screen; no template tells; taste-skill's 1-second and 5-second pass (`references/critique.md` L21-24).

## Guards

- Every word from `COPY.md`. Facts only from `PRODUCT.md`.
- Free only: free fonts, credited free photos, downloaded, never hotlinked. Never deploy or post. No secrets.
- Clash: Hallmark's CSS stamp (gate 20) loses to "no method names or comments in shipped files". Skip gate 20 and log it.
- Clash: taste-skill's motion floor loses to the client's motion answer. Log it in `<job>/frontend/PROCESS.md`.

## Checks after

Never style. The designer's layout, colour, type and motion stand.
- Facts: page text equals `COPY.md`. No build notes printed. No invented heading for missing language copy; use the `COPY.md` slot text.
- Keep the first-screen layout from `DESIGN.md`; a fit problem is fixed within the tokens or flagged, never by moving blocks below the fold.
- Links: a button whose target is a slot (no number yet) links to the stand-in `COPY.md` names (the section that shows the slot note), never `href="#"`, never a span. No `aria-describedby` that reads slot text on every button. The accessible name from `COPY.md` goes on when the real link does.
- Navigation: the phone keeps every nav entry the desktop has (a short row is fine), or the client overrides it in `OVERRIDES.md`.
- Slots in a heading: never put slot text in a heading's name (`aria-label`, `role="img"` on a word). Show the slot note as visible text next to it, where `COPY.md` says to show it.
- Forms: no endpoint, no success message; visible labels; errors linked to fields.
- Accessibility: visible focus; 44px targets; reduced motion; content visible with scripting off; images with size and alt; contrast; `lang` set.
- Layout faults: no sideways scroll; no clipped text; no label wraps that breaks a control. An approved headline too long for two lines at 390 keeps its words: one line per field, a fluid size that follows the longest line (for example `calc((100vw - gutters) / <line width in em>)`), sentence case on the phone if capitals do not fit. No other text on the first screen is larger than the h1.
- Data: lists, filters and counts built from the data, or one constants file with the reason.
- No `!important` or `overflow-x: hidden` used to hide a layout bug.

## Override

As in `RULES.md`. An accessibility failure can be overridden only as "ship at the client's risk". For an `inspect.mjs` check, add the `inspect:<rule id>` row and run `tools/inspect-overrides.mjs` (see "Runs").

## Out

`site/` (`index.html`, styles, one page per extra language) or the project's own files, `<job>/frontend/PROCESS.md` (steps, linter results, clashes, assumptions), `picks/frontend/06-PICK.md`. `site/` holds only files that ship: hero variants, drafts, screenshots and notes go in `picks/frontend/hero/` or `<job>/frontend/drafts/`, never in `site/`. On "From kinso-build", the pages go in `<code>/<pages path>` from `build/STACK.md`, with the same rule: only files that ship.

## Stop point

None. Stage 7 checks the build.
