# Stage 3 - Direction

Approved 2026-10-25 after testing (see `tests/stage3/RESULTS.md`: Hallmark scored 8.2 of 10 blind, first in all 3 cases; plain Claude scored 6.5).

Sources: Hallmark flow steps 2-5, shape library, themes, Floor and gates (MIT, nutlope), Impeccable new-work and colorize (Apache 2.0, pbakaus), gstack design-consultation spec format (MIT, Garry Tan). Rewritten in our own words.

Read `../RULES.md` first. This file adds only the rules for this stage.

Library files (read only, never run their scripts), under `vendor/nutlope_hallmark@7ec8682/skills/hallmark/references/`:
- Shapes: `macrostructures.md` and `macrostructures/`
- Themes: `themes/README.md`, `themes/index.json`, `themes/<name>.md` and its picture
- Genres: `genres/`
- Fonts: `fonts.md` (banned and saturated lists)
- Gates: `gates.md`

## Input

- `research/PRODUCT.md` and `research/ANSWERS.md` (stage 2) and `research/RESEARCH.md` (stage 1), with the rival captures if they exist.
- Nothing else.

## Rules

- Add no product fact that is not in `PRODUCT.md`.
- No random deal scripts. No palettes taken from a catalogue or a brand file.
- Do not ask about style before the research is shown. Show the research first, then ask.

## Steps

1. **Shape.** Pick one shape from the library for this kind of product, for example Workbench for a developer tool. Name the 2 shapes you rejected, and why.
2. **Theme.** Look at 3 themes, pick 1 as the starting system, and say why. Check its background and accent against the rivals' first screens. If it looks like a rival, change it.
3. **Concept.** One idea from the product's own world, true of this client and no other (for example a bank passbook, the front of a family house). Put the nearest rival's name on it. If it still works, find another.
4. **Signature.** The memorable thing from `PRODUCT.md`, shown as the hero object. For a product, show the product working, for example the pull request waiting for one person's Approve.
5. **Material.** For each picture slot: **real** (the client's own), **built sample** (made in the page, labelled as a sample) or **absent**. Never leave an empty picture box in the hero.
6. **Type and colour.** Two font families at most, free faces, none from the banned list. One accent colour, used for the main action only. Status colours only for status. When the job has app screens, also set the status colours (error, warning, success, each with its contrast), a dense type step for tables and lists, and the form field style (border, focus, error).
7. **Picks block and DESIGN.md.** Write the Picks block (shape, theme, chrome, hero, signature, sections, material), then the spec.
8. **Floor check.** Before handing over, check by hand:
   - No gradient filler, no eyebrow labels, no tracked capitals, no middle-dot strings.
   - Focus state on every link and button.
   - No invented number anywhere.
   - No stock second action beside the main one.

## Existing project

- Skip this stage unless the client wants a new look. Use the `DESIGN.md` and `tokens.json` from stage 0.
- A new look is a change to the tokens, checked in every app that uses them.

## Layout rules

- Headline: 2 lines or fewer, on desktop and on phone.
- The main action is visible on the first screen at 1440x900 and at 390x844.
- Phone side gutter of at least 16px. The wordmark and the headline never clip.
- Slots and placeholder notes are in the page language.

## Must-haves check

Before hand-over, check the direction against the brief's must-haves:
- Where the main action goes (its real target, not a section on the page).
- Languages: if the brief puts two languages on equal terms, neither goes in a lower band.
- Material that does not exist yet (a photo, a menu, a phone number): the direction must still work without it.

## Output

Three files in `design/`:

1. `DESIGN.md`, in gstack's spec format, with these sections:
   1. Direction in one line
   2. Why this fits (each point names its line in `PRODUCT.md` or `RESEARCH.md`)
   3. How it differs from rivals
   4. Type
   5. Colour (hex, role, contrast)
   6. Layout (first screen at the widths the job's platforms need, for example 1440 and 390; sections in order)
   7. Imagery
   8. Motion
   9. Components
   10. Avoid
   11. Assumptions
2. `tokens.json`:
   - `fonts.display` and `fonts.body`: `family`, `source` (google or system), `weights`
   - `type_px`: `h1_desktop`, `h1_phone`, `body`, `small`, and `dense` when the job has app screens
   - `colors`: `bg`, `surface`, `text`, `muted`, `accent`, `on_accent`, `border`, and `error`, `warning`, `success` when the job has app screens
   - `radius_px`, `space_base_px`, `max_width_px`, optional `extra`
   - Every font and size named in `DESIGN.md` is also in `tokens.json`, and the other way round.
3. `preview.html`: inline CSS, no JavaScript, Google Fonts only, no outside images, labelled slots, in the page language.

## Checks before hand-over

- `contrast.py` on `tokens.json`: text, muted and on-accent pairs at 4.5 or more; accent on background at 3 or more.
- `capture.mjs` on `preview.html` at 1440 and 390: fonts loaded, no sideways scroll, headline lines, main action above the fold, phone gutter, clipped text.
