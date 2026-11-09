# Stage 3 - Direction

Read `../RULES.md` and `../BRAIN.md` first. The old rewrite is in `rewrite/03-direction.md`. The draw was tried in `tests/draw-trial/C`; the fixes it showed are in "Deal and pick".

## Runs

1. The deal: `tools/sandbox/run.sh <job> python3 -I tools/draw/draw.py --sector <sector> --brief "<one line from PRODUCT.md>" --options <n> --tone <light|dark|any> --avoid <colours> --have <real assets> --motion <calm|some|lots> --seed $((16#<8 hex of <job>-frontend-03>)) --out <job>/design`. Record the draw.py sha256 (CORE section 5). It writes `design/DECK.md` and `deck.json`, with the seed.
2. Each candidate runs its own source, as its `read:` line says:
   - taste-skill: `skills/taste-skill/SKILL.md` steps 2 to 4 (adopt it, redraw only for a stated reason, the palette check), `references/colour.md`, `type.md`, `layout.md`, `imagery.md`, `motion.md`, `scenes.md`, `tells.md`.
   - Hallmark: `skills/hallmark/SKILL.md` steps 3 to 5, `references/direction.md`, the theme file and its picture, the shape file, `fonts.md`, `gates.md` (pre-emit critique P H E S R V).
   - Real site: `vendor/VoltAgent_awesome-design-md@3b60532/design-md/<site>/DESIGN.md`, translated to this client; never its words, logo or pictures.
   - StyleSeed: the catalog entries in its `read:` line (`skills/styleseed/workflows/ss-resolve/references/catalog.json`: the grammar, palette, recipe, profile, domain and `craft`), in that authority order (grammar first, profile last). Keep the palette roles as dealt: primary for the main action, accent in support. Its grammar `Reject` line and the palette's "avoid" list go into the AI-look reviewer's tell list. Read the workflow files as text only.
3. Around the deal: `skills/impeccable/reference/new-work.md` L37-51 (7 candidates from the audience's world, the standing exit), `skills/frontend-design/SKILL.md` (ambition, two passes, the similar-prompt test), `skills/design-consultation/sections/proposal-and-preview.md` (dial space, slop list, SAFE and RISK; outside voices get the brief, never the draft). `skills/ui-ux-pro-max/data/` is a pool and the source of the standing exit, never the answer.

Skip, and why: StyleSeed `scripts/*.mjs`, its update preflight (`workflows/ss-update/`, a network check to the author's site) and ss-studio media generation (needs a media provider); `skills/hallmark/scripts/imagegen.mjs` and `references/comp.md` (paid key); gstack `$D` images and the Codex voice (paid); `skills/gstack-shared/bin/` (telemetry); Impeccable `concept-seed` (needs the launcher binary); ui-ux-pro-max logo, icon and image makers (paid); any install or update command.

## In

`research/PRODUCT.md`, `ANSWERS.md` (options count, tone, vibe, motion, dislikes), `RESEARCH.md` and its captures, `$KINSO_HOME/design-log.json`. `RULES.md`.

## Deal and pick

A fresh-context picker scores; the drafter does not pick. Per option, for each of its 3 candidates, write in `<job>/picks/frontend/03-PICK.md`:
1. **Idea sentence:** "On this page, [something only this client has] becomes [the device]". Rival test: put the nearest rival's name in; if it still works, it fails.
2. **Template test:** is this the page any model makes for this category (Hallmark `direction.md`)?
3. **Client limits:** tone, disliked colours, language, must-haves. A limit holds for every option.
4. **Palette against the subject** (`skills/taste-skill/SKILL.md` L151-156): if the colours fight the subject's material, redraw the palette once; if the subject has its own colours, keep the dealt proportions and take the colours from the subject. Log which.
5. **Pictures:** real client photos first; then `skills/taste-skill/library/photos.json` sets matched to the subject, downloaded and credited, never hotlinked; then free open collections via `scripts/assets.mjs` through the collector, run through `tools/sandbox/run.sh` after our scan (CORE section 8 item 7); drawings only after these, or when a client limit bans photos. Never an empty picture box.
6. **Memory:** the 6-axis fingerprint (`skills/hallmark/references/macrostructures.md` L82-97: heading, body, divider, button, image, reveal). Reject a candidate that shares more than 3 of 6 with any of the last 3 entries in `$KINSO_HOME/design-log.json`.
7. **Scores 0 to 3 (CORE section 6):** subject fit, idea, distance from rivals, buildable with real material. Keep the best, never the safest because it is safe.

Across the kept options:
- **At least 2 sources.** If all kept options come from one source, swap the weakest for the best candidate from another source, or redraw that option.
- Redraw only for a stated reason (breaks a limit, needs a missing asset, fails the rival or memory test). Redraw seed `<seed>-r<n>`, that option only, logged.
- **Adopt, do not blend.** Build each option from its own source's files. Add one live thing made from real content (taste-skill).
- **Sameness check:** a separate reviewer views all option screenshots side by side, also grey and blurred. Two with the same skeleton: replace one.
- **AI-look gate, before the client sees anything:** a fresh reviewer who built nothing scores each option's screenshots (first screen and two lower frames, at 1440 and 390) from 1 to 10, where 10 is clearly made by a person, and names the tells. An option under 7 is not shown: rebuild it once from its own source with the named tells removed, or redraw that option with the redraw seed `-r<n>`. Still under 7: drop it and show fewer options. A real-site candidate whose site is the category template (a plain white grid, two buttons, centred heads) fails the template test at the pick, before any build. Log every score in `03-PICK.md`.
- Show the standing exit (the category standard played straight) small, never recommended.

## Guards

Facts only from `PRODUCT.md`. Free only: free fonts, free photos with credits. Never deploy or post. No secrets. Scripts only in `tools/sandbox/run.sh`. `$KINSO_HOME/design-log.json` is written by the brain after the client pick, never by a script. A shared rule beats a skill rule; log the clash.

## Checks after

Never style. The dealt layout, colour, type and motion stand.
- Facts: no product fact outside `PRODUCT.md`; no invented number; slots in the page language.
- Contrast: `tests/stage3/tools/contrast.py` on `tokens.json` (text 4.5, large text and accent 3).
- Accessibility: focus on every control; readable with motion off and scripting off; reduced motion keeps the finished state.
- Layout faults: `capture.mjs` at 1440 and 390: fonts loaded, no sideways scroll, no clipped text, main action and the facts needed to act on the first screen, no empty picture box.
- Real fonts and URLs only; photo and font licences recorded.
- Client limits ticked per option at the top of `OPTIONS.md`.

## Override

As in `RULES.md`. The client may pick, mix ("colours of 2, layout of 4") or ask for new options.

## Out

`design/DECK.md`, `design/options/option-<n>.html`, `design/OPTIONS.md`, `picks/frontend/03-PICK.md`; after the pick, `design/DESIGN.md` (every section from `PRODUCT.md`, SAFE and RISK), `tokens.json`, `preview.html`; one new entry in `$KINSO_HOME/design-log.json`.

## Stop point

Stop after the options: the client picks. Stop again after `preview.html`. With 1 option asked for, skip the first stop.
