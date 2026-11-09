# Stage 7 - Visuals

Read `../RULES-RESEARCH.md` and `BRAIN.md` first. Paths are from `kinso-promote/`. Same studio idea as kinso-frontend stage 3: the brain is the curator, the designers keep their own choices.

## Runs

Each skill is followed as its own `SKILL.md` says, read in place.

1. `skills/banner-design/SKILL.md` with `references/banner-sizes-and-styles.md`: art directions, HTML at exact size, then PNG.
2. The social-photos method: `skills/design/references/social-photos-design.md`. It calls `skills/brand/SKILL.md`, `skills/design-system/SKILL.md` and `skills/ui-ux-pro-max/SKILL.md` in that order.
3. `skills/canvas-design/SKILL.md`: second designer, poster-style image (fonts in `canvas-fonts/`).
4. `skills/diagram/SKILL.md`: one how-it-works picture, when the product has steps worth showing.

Off: banner-design's optional image generator; design's logo, icon and CIP generators (`scripts/logo`, `scripts/icon`, `scripts/cip`, paid APIs); every script in `skills/`; diagram's bun renderer and `skills/gstack-shared/bin/`. HTML and SVG become PNG only with `tools/render-png.mjs <in> <out.png> <width> <height>` (Playwright, exact size) through `../kinso-frontend/tools/sandbox/run.sh`. `../kinso-frontend/tools/capture.mjs` is for page screenshots only: it makes JPEGs at 1440x900 and 390x844, never an exact-size PNG.

How to render: visuals are made as HTML or SVG and rendered in Chrome (Playwright's Chromium). Default: `tools/render-png.mjs`. Optional, only when `tools/video/node_modules/@remotion/cli` already exists (never install it here): Remotion's still render (`npx remotion still <entry> <composition> <out.png>` from `tools/video/`, through the sandbox) for a design written as a React composition. Either way the PNG is the exact platform size, checked with `sips`.

## In

- `promote/MESSAGE.md`, `promote/FACTS.md`, `promote/MUST-NOT.md`, the post files from stage 5, real screenshots in `build/screens/`, your logo, colours and photos from `START.md`, client style limits.
- `promote/AUDIENCE.md` (stage 1): which image formats you chose (single image, carousel, cover, thumbnail) and for which platforms.

## Deal and pick

- **Deal 3 art directions from at least 2 designers.**
- **Seeded draw.** Seed `<job>-promote-07`. Menu: banner-design's 22 art direction styles, minus any style the client limits in `START.md` and `PROMOTE.md` rule out (for example no purple-blue gradients, no neon "hacker" look), minus styles that need a photo when no real photo was supplied, and minus styles that do not fit the subject (for example neon or glassmorphism for a home-cooking restaurant). Write each removed style and its reason before the draw. Draw 3 distinct styles. Give 2 to banner-design or social-photos and 1 to canvas-design (the seed picks which).
- Each designer makes its direction as its skill says. The brain does not move them toward one look.
- **Curate:** drop any direction that looks like the usual AI template (soft gradient, centred headline, stock icon row). Re-draw that slot from the menu.
- **What each direction makes** (why: the first runs scored 6 because all 3 covers carried the same line and the main visual was an empty "owner's photo" box):
  - **A set, not one cover:** the carousel cover plus one inside card (the hours card or the booking card), so you see how the look carries text.
  - **Its own words:** each direction takes a different cover line from the stage 5 posts (a different slide or caption first line). No two directions share a headline.
  - **Postable today:** each direction has a "today" version that works with no photo, built from type, colour, shape and pattern drawn from a described `FACTS.md` row (for example the shape of flames, wood grain, a tiled floor pattern). It is not a drawn dish, person or fake product screen.
  - **With photo:** a second version shows where the owner's photo goes, as a thin outline with a short label, covering the area the photo will fill. An empty box is never the largest or most central thing on the "today" version.
  - **Phone check:** view each PNG at 360 pixels wide. The headline must read at that size.
- **Contact sheet:** render one side-by-side PNG of every direction's frames (`promote/visuals/SHEET.png`, from an HTML page of `<img>` tags) for you and the judge.
- **Judge:** a fresh judge (a separate agent that made none of them) looks at the sheet and scores the rubric with style names hidden. The runner writes "pending fresh judge" if it cannot start one.
- **Rubric (0 to 3 per line):** fits the angle; uses the product's real screen or real photo where one exists; postable today without the photo; the 3 directions look and read different from each other; text on the image is real text from `FACTS.md`; reads at phone size; rival test.
- You pick. Save the others in `promote/ALTERNATIVES.md`. Write `<job>/picks/promote/07-PICK.md`.

## Guards

- Shared guards from `BRAIN.md` (never post; never main accounts; no MUST-NOT claim; no invented numbers, quotes, users or testimonials; platform rules; free only; local tools only from `TOOLS.md`, nothing installed without your OK).
- No made-up product screens. An empty slot says "owner's photo" or "real screenshot", never a stock picture or a drawn fake UI.
- No stock "hacker" or stock-people pictures unless you supplied them.
- No rival's look copied.
- Only the tools already here (Playwright, `sips`) run before your OK. ImageMagick, oxipng, exiftool and the rest wait for it.

## Checks after

- Exact pixel size per platform, from a dated platform page.
- Text contrast at least 4.5:1; text inside the safe zone.
- Every word on an image traces to `FACTS.md`; MUST-NOT scan on image text.
- Alt text for every image in `ALT-TEXT.md`.
- Photos: location and camera data removed (`exiftool`, once installed; until then, flagged "remove before posting").
- Checks never change the designer's layout, colour, type or motion choices.

## Override

As in `BRAIN.md`: reason once, your call, a row in `OVERRIDES.md`.

## Out

- `promote/visuals/` (PNG files with their HTML or SVG source: per direction a cover and one inside card, each in a "today" and a "with photo" version), `promote/visuals/SHEET.png`, `promote/visuals/ALT-TEXT.md`, `promote/ALTERNATIVES.md`, `<job>/picks/promote/07-PICK.md`.

## Stop point

Yes. You pick the visuals, and OK any tool install before it happens.
