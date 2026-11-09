# Stage 3 - Direction

Approved 2026-10-25 after testing (see `tests/stage3/RESULTS.md`: Hallmark scored 8.2 of 10 blind, first in all 3 cases; plain Claude scored 6.5).

Sources: Hallmark flow steps 2-5, shape library, themes, fonts, direction notes, Floor and gates (MIT, nutlope), Impeccable new-work and colorize (Apache 2.0, pbakaus), gstack design-consultation spec format and preview rules (MIT, Garry Tan). Rewritten in our own words.
Added 2026-10-26 from the coverage check (`coverage/03-COVERAGE.md`).

Read `../RULES.md` first. This file adds only the rules for this stage.

Library files (read only, never run their scripts), under `vendor/nutlope_hallmark@7ec8682/skills/hallmark/references/`:
- Shapes: `macrostructures.md` and `macrostructures/`
- Themes: `themes/README.md`, `themes/index.json`, `themes/<name>.md` and its picture
- Genres: `genres/`
- Fonts: `fonts.md` (banned and saturated lists)
- Gates: `gates.md`
- Sizes, rhythm and copy: `layout.md` and `craft.md`
- Motion: `scroll-choreography.md`, `microinteractions.md`; pictures and surface: `imagery.md`, `texture.md`

More library files, read only (added 2026-10-27):
- Real sites: `vendor/VoltAgent_awesome-design-md@3b60532/design-md/<site>/DESIGN.md`, the design systems of about 80 real sites (for example Stripe, Linear, Apple, Nike, Spotify, The Verge, Al Jazeera, Ferrari, Nintendo 2001, Dell 1996). MIT, VoltAgent.
- Motion and scenes from a study of 99 award-winning sites: `vendor/leonxlnx_taste-skill@12af471/skills/taste-skill/references/motion.md` (sections 2, 5 to 10: what strong pages do, recipes, signature moves, what gives generated motion away) and `scenes.md` (scroll scenes and the catalogue). MIT, Leonxlnx. Never run its draw script; we choose, not a random draw.

## Input

- `research/PRODUCT.md` and `research/ANSWERS.md` (stage 2) and `research/RESEARCH.md` (stage 1), with the rival captures if they exist.
- Nothing else.

## Rules

- Add no product fact that is not in `PRODUCT.md`.
- No random deal scripts. No palettes taken from a catalogue or a brand file.
- Do not ask about style before the research is shown. Show the research first, then ask.
- Keep direction notes out of `preview.html` and every shipped file: no HTML comments, data attributes or metadata.
- **It must not look AI-made.** These are the default AI landing page. Never use them unless the client picks one by name:
  - headline and text on the left, a box or card on the right, at about half and half;
  - a centred headline with two buttons under it and a screenshot below;
  - three feature cards in a row after the first screen;
  - a pale background, one grotesk face at 600, one accent colour, short grey lines of text;
  - an empty picture box, or a fake product card standing in for the product;
  - every section the same width, the same padding and the same left edge.
  A reviewer who could say "an AI made this from the category name" means the direction fails.

Added 2026-10-27 after the client review of the options test (`../tests/v3c/`): all 8 options shared one layout and read as AI-made.

## Draw and pick (added 2026-10-27, replaces steps 0 to 3 below while it is tested)

The look comes from the designer skills' own libraries, dealt at random. The brain picks the best. It never designs from its own habits.

1. **Deal.** Run `tools/sandbox/run.sh <job> python3 -I tools/draw/draw.py --sector <sector> --brief "<one line from PRODUCT.md>" --options <n from ANSWERS.md, 5 if not sure> --tone <light|dark|any from the client> --avoid <colours the client dislikes> --have <real assets> --motion <calm|some|lots> --out <job>/design`. Each option gets 3 candidates from different sources: taste-skill, Hallmark, and a real site's design system. No two candidates in the deck share a layout, palette, type or motion. The seed is in `design/DECK.md`.
2. **Read each candidate's own files** (the `read:` line): its direction, hero blueprint, theme file and picture, shape file, or the real site's `DESIGN.md`. Read them as that skill's method.
3. **Rotate and pick, per option.** For each of the 3 candidates write, in `design/PICK.md`:
   - the idea sentence: "On this page, [something only this client has] becomes [the device this candidate calls for]" (taste-skill step 4);
   - the rival test: put the nearest rival's name in the sentence. If it still works, the idea fails;
   - the template test: is this the page any model would make for this category (Hallmark `direction.md`, "Set aside the page you would make anyway")?
   - the client limits: tone, disliked colours, language, must-haves;
   - a score from 1 to 5 on subject fit, idea, distance from rivals, and buildable with the real material.
   Keep the best candidate. Never keep the safest one only because it is safe.
4. **Redraw only for a stated reason:** the candidate breaks a client limit, needs an asset that does not exist, or fails the rival test. Run the draw again with a new seed for that option only, and log the reason in `PICK.md`.
5. **Adopt, do not blend.** Build each kept option from its own source's files: its blueprint, palette, type and motion as dealt. Do not pull it back toward a familiar page. Add the originals' musts: one live thing the visitor can try, made from real content (taste-skill), and a full page of 6 to 9 sections in the final direction (Hallmark).
6. Then step 3b below (options, sameness check, client pick), and steps 4 to 11 for the chosen option.

Our checks after this stage cover facts, contrast, accessibility, layout faults and client limits. They never change the dealt style.

## Steps

0. **Real references.** Before any sketch, pick 6 to 10 real sites made by people, with a clear design idea. Start from the library: the real-site design files (awesome-design-md) and the studied award sites and scenes (taste-skill). At least half come from outside the product's category (a magazine, a museum, a record label, a shop, a studio, a print archive). Add live sites only from free public pages, through the collector and `capture.mjs`; free galleries of human-made sites are fine to browse. Save the first screen of each in `research/refs/` and, for each, one line: what the layout does, what moves, and what we could learn from it (never copy its words, logo, pictures or code). Each direction in step 3 names the reference it learns from, and no two directions use the same one.

1. **Shape.** Pick one shape from the library for this kind of product, for example Workbench for a developer tool. Name the 2 shapes you rejected, and why.
2. **Theme.** Look at 3 themes, pick 1 as the starting system, and say why. Take only its material: paper, ink, faces, radius, surfaces. Never take its layout, section order, nav or footer. Check its background and accent against the rivals' first screens. If it looks like a rival, change it.
3. **Concept.** One idea from the product's own world, true of this client and no other (for example a bank passbook, the front of a family house).
   - Write the page this category always ships, and its obvious opposite. Drop both.
   - List 5-7 candidates from the audience's own world (printed things, places, rituals, graphic traditions), from at least 3 material families. Ask what the product looks like as an object, and what its world looked like before the web.
   - Sketch the directions, two lines each, far apart. How many comes from `ANSWERS.md`: the number the client asked for, or **5 when the client is not sure** (or did not answer). If the client named a theme, template or brand, every direction starts from it and varies the rest (layout, type, colour use, imagery, motion); otherwise the directions differ in concept, shape, theme and motion.
   - **Each direction takes a different first-screen layout** from this list (no two the same):
     - **type as the picture:** one huge word or line fills the screen, the rest is small;
     - **full-bleed picture:** a photo, illustration or made image edge to edge, text set into it;
     - **broken grid:** blocks of different sizes overlap or step out of line;
     - **scroll story:** the first screen is one scene; scrolling moves through the product step by step (sticky parts, pinned object);
     - **object first:** one big object (the product, a menu, a ticket, a tool) in the middle, text around its edges;
     - **index or list:** the page opens as a list, table or contents, each line a link;
     - **horizontal strip:** content moves sideways, or a long strip (a timeline, a menu board) runs across;
     - **columns:** a magazine or newspaper page, several columns of different widths.
     The banned AI layouts in Rules are never on this list.
   - **Each direction has its own motion idea**, from the product's world, never a generic fade. Start from the taste-skill signature moves and scenes, picked by subject (for example a slow photo crossfade for a restaurant, a shutter opening on a product's hero object, an index with a picture on hover for a portfolio), and follow its motion rules (first frame painted at once, no preloader, no scroll hijacking, no custom cursor, no bounce, reduced motion keeps the finished state). Examples: the run log types itself line by line; the menu card flips; the headline letters settle like type set by hand; the page scrolls like a strip of film; a stamp lands on the Approve button. Say what moves, when (load, scroll, hover or click), and how long. No two directions use the same motion idea.
   - **Range of volume:** across the options, at least one is quiet (calm colour, little motion) and at least one is loud (strong colour, bold type, more motion), so the client sees the full range.
   - Put the nearest rival's name on it. If it still works, find another.
3b. **Options for the client.** For each direction, build a small preview in `design/options/option-<n>.html`: the first screen at 1440 and 390, the palette, the two faces, one signature element, **its motion idea working** (CSS animation, or a short inline script), and a few lines of what the page does as you scroll, using the real copy known so far (slots where it is not). The page must still read with motion off and with scripting off.
   - **Sameness check, on the screenshots.** A separate reviewer looks at all the option screenshots side by side, also in grey and blurred (so colour and font cannot hide the layout). If any two have the same layout skeleton, or any one matches an AI layout in Rules, replace it and check again. Write the result in `OPTIONS.md`. The difference table alone is never enough. Under each, three lines: the concept, why it fits (a line in `PRODUCT.md`), and what it risks. Each option passes the Floor check below and the refused looks in step 7. **The options must look clearly different from each other.** Any two options differ in at least 3 of these 5: concept, layout shape, type pairing, colour (light or dark, and accent hue), imagery. No two share a theme, and no two share both faces. A client looking at thumbnails side by side should tell them apart at once. If two are too close, replace one. Write `design/OPTIONS.md` listing them side by side, with a difference table (each option against the 5 axes). **Stop for the client:** they pick one, ask to mix (for example "the colours of 2 with the layout of 4"), or ask for new options. Record the choice in `ANSWERS.md`. With 1 direction asked for, skip the stop and go on. Steps 4 to 11 then run only for the chosen (or mixed) direction.
4. **Signature.** The memorable thing from `PRODUCT.md`, shown as the hero object. For a product, show the product working, for example the pull request waiting for one person's Approve.
5. **Material.** For each picture slot: **real** (the client's own), **free photo** (Unsplash or Pexels, with the credit line, chosen to fit the concept, marked "to replace with the client's own"), **made** (an SVG illustration, a typographic picture or a pattern made for this concept, never generic shapes), **built sample** (made in the page, labelled as a sample) or **absent**. Never leave an empty picture box anywhere, in the options or the preview.
   - If the client has a real screenshot of the product, use it; build a sample only when none exists.
   - Photos fill at most a third of the page below the first screen. Never two photo sections in a row.
   - Delete test: take a picture away. If the page loses no fact, the picture goes.
6. **Type.** Two font families at most, free faces, none from the banned list. The wordmark may take a third face, for the wordmark only.
   - A face on the saturated list needs a written reason no other face could give, for example Playfair, Cormorant, Fraunces, Instrument Serif, Space Grotesk, Geist, Syne, Outfit, IBM Plex, Newsreader, Crimson, Lora, DM Serif. "Books want a serif" is not a reason.
   - Check each face and its weights on Google Fonts. Never invent a face or a URL. If you cannot check, mark it "pending".
7. **Colour.** Write one sentence about the real scene: who uses it, where, under what light. It decides light or dark. One accent colour, used for the main action only (the restrained plan), or a bolder plan when the chosen option is a loud one (step 3) or the client asks. Status colours only for status. Tint the greys; no pure black or pure white outside the token block.
   - Refuse these looks unless the client's own words pin them: cream paper with a high-contrast serif and a terracotta or clay accent; near-black with one neon accent; broadsheet hairlines with italic serif and tiny mono labels; flat saturated ink with hard offset shadows; a framework's default palette (Tailwind indigo, violet, slate); a hue picked for the category (blue for software, green for health).
   - A warm, bookish or child-facing subject is not a reason for cream and serif. If someone could guess the look from the category alone, rework it.
   - When the job has app screens, also set the status colours (error, warning, success, each with its contrast), a dense type step for tables and lists, the form field style (border, focus, error), a type scale ratio of 1.125 to 1.2, no display face on labels, buttons or data, and a second neutral for side panels.
   - When the job has a dark mode, give it its own token set and its own contrast check.
8. **Picks block and DESIGN.md.** Write the Picks block (shape, theme, chrome, hero, signature, sections, material), then the spec.
9. **Safe and risk.** For the client's OK, show 2-3 safe choices (what visitors expect) and at least 2 deliberate risks. For each risk: what it is, why it works, what we gain, what it costs. If the client wants the familiar look, ask for 2-3 products to sit beside and match their craft.
10. **Floor check.** Before handing over, check by hand:
    - No gradient filler, no eyebrow labels, no tracked capitals, no middle-dot strings.
    - No single accented word in a headline (colour, italic, bold, underline).
    - No card inside a card, no emoji as an icon, no drawn browser or phone frame.
    - No glow, halo, aurora or blob. No arrows glued to link text. No status dots.
    - No scroll cue, version badge, "beta" pill or locale strip. No 01 / 02 / 03 numbers unless the content is a real sequence.
    - `preview.html` declares every colour and font once in `:root`.
    - Focus state on every link and button.
    - No invented number anywhere.
    - No stock second action beside the main one.
    - No generated-motion tells: the same fade-up on every block, many staggered entrances in the hero, hover lift on every card, loops that mean nothing (pulsing dots, floating shapes), a reveal that leaves a blank band, text typed or scrambled before it can be read.
11. **Score.** Score the direction 1-5 on Philosophy (an argument someone could disagree with), Hierarchy (survives a squint), Execution, Specificity (could belong to no other product) and Restraint. Fix anything under 3. Name the weakest axis and the fix.

## Existing project

- Skip this stage unless the client wants a new look. Use the `DESIGN.md` and `tokens.json` from stage 0.
- A new look is a change to the tokens, checked in every app that uses them.
- Keep the client's confirmed brand and status colours when the tokens change.

## Layout rules

- Headline: 2 lines or fewer, on desktop and on phone.
- First screen: headline of 7 words or fewer (about 50 characters), one sentence of 12 words or fewer, one or two actions, about 80 words in all. An approved tagline is never changed to fit.
- Body text 16px or more. Running text 45 to 75 characters a line.
- On wide screens the container stays capped and the gutters grow.
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
   1. Direction in one line, with the visitor mode (persuade, operate, read or experience); it sets how loud colour and type may be
   2. Why this fits (each point names its line in `PRODUCT.md` or `RESEARCH.md`)
   3. How it differs from rivals
   4. Type
   5. Colour (hex, role, contrast)
   6. Layout (first screen at the widths the job's platforms need, for example 1440 and 390; sections in order)
   7. Imagery
   8. Motion: the motion idea from step 3 (what moves, when, how long), easing for enter, exit and move, a duration scale, the supporting motions (hover, scroll, open, confirm), and what shows with reduced motion on
   9. Components: one primary button style, one container width, one column gap, one radius per nesting level; shadows only on things that float; nested radius equals outer radius minus the gap; section gaps 120px or more and section heads 40px or more on desktop
   10. Avoid, including these model habits: ghost cards, drawn illustrations as filler, grain washes, repeated stripe backgrounds, emoji bullets, a tight grotesk at 600 on near-white with one blue accent, a strong first screen that turns into a card grid
   11. Assumptions, with a decisions log (date, decision, reason)
2. `tokens.json`:
   - `fonts.display` and `fonts.body`: `family`, `source` (google or system), `weights`
   - `type_px`: `h1_desktop`, `h1_phone`, `body`, `small`, and `dense` when the job has app screens
   - `colors`: `bg`, `surface`, `text`, `muted`, `accent`, `on_accent`, `border`, and `error`, `warning`, `success` when the job has app screens
   - `radius_px`, `space_base_px`, `max_width_px`, optional `extra` (for example `focus`, `info`, and chart colours when the job has charts)
   - Every font and size named in `DESIGN.md` is also in `tokens.json`, and the other way round.
3. `preview.html`: inline CSS, the motion idea working (CSS, or a short inline script; the page reads without it), Google Fonts only, images only from the client or the free photo sources in step 5 (with credits), labelled slots, in the page language.

## Checks before hand-over

- `contrast.py` on `tokens.json`: text, muted and on-accent pairs at 4.5 or more; accent on background at 3 or more.
- `capture.mjs` on `preview.html` at 1440 and 390: fonts loaded, no sideways scroll, headline lines, main action above the fold, phone gutter, clipped text.
