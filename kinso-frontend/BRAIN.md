# kinso-frontend - The brain

27 October 2026. The brain is the part we own. The skills in `skills/` do the work, unchanged. The brain decides what goes in, deals and picks, guards the rules and checks the result. Plan: `../CONDUCTOR-PLAN.md`. Evidence: `STUDY.md`.

## How it works, at every stage

1. **In.** Pass the job folder, the earlier stage files, `RULES.md` and `../BRAIN-CORE.md` (CORE). When the job folder holds chain files, also pass `handoff/PRODUCT.md`, `handoff/TEST-PAGE.md`, `OVERRIDES.md`, `business/RISK.md` section 5 ("Claims we must not make") and `../RULES-RESEARCH.md`. A claim on that must-not list never goes on a page, whatever a skill, a candidate or an override says (CORE section 8 item 10).
2. **Run.** Point the model at each skill's `SKILL.md` and reference files, in place, in the order the stage file gives. It follows them as written: critique loops, linters, inspect and capture steps, slop lists, fresh-context reviewers. Skip only what the stage file names (paid makers, telemetry, installs, updates, gstack `bin/`, `Apple_HIG.pdf`). StyleSeed (added 2026-10-27, user's call): never run its update check (it fetches `styleseed-demo.vercel.app/version.json`; we update only by a new pinned download and scan); never ask the user for a GitHub star and never star anything; never use its studio media step or any paid image or video provider. Free only, no exceptions.
3. **Deal.** Where a stage has a creative choice, draw N short candidates from different sources, with a seed by CORE section 5 (`<job>-frontend-NN`). Never three near-twins. Stage 3 deals from 4 sources through `tools/draw/draw.py`: taste-skill, Hallmark, a real site (awesome-design-md) and StyleSeed (grammar, semantic palette, brand recipe, profile from `skills/styleseed/workflows/ss-resolve/references/catalog.json`). daangn-seed is a stage 10 reference, never a deal source (one brand's look).
4. **Guard.** Before spending tokens, drop or redraw a candidate that breaks a client limit, needs material that does not exist, or fights the subject. Log the reason.
5. **Pick.** A fresh picker the orchestrator starts scores the candidates 0 to 3 on the stage's rubric (CORE sections 4 and 6). The drafter does not pick. Never keep the safest only because it is safe.
6. **Checks after.** Facts, contrast, accessibility, layout faults, broken links, SEO and the launch gate. Fix, or send back to the skill. **No house style** (CORE section 9 lists the allowed gates). The designer's layout, colour, type, motion and length stand.
7. **Clash.** A shared rule beats a skill rule. Log it in `PROCESS.md`.
8. **Log.** Write `picks/frontend/NN-PICK.md`. After stage 3, add the direction to `$KINSO_HOME/design-log.json` (CORE section 11).

Why: the originals vary more because they deal from big libraries, rotate against their own history and judge with isolated reviewers. Our rewrites averaged them into one voice and banned the draw. The tests ran the originals crippled (`STUDY.md`, finding 1).

## Memory across jobs

`$KINSO_HOME/design-log.json` is a list, newest first. One entry per job:

```json
{"date": "2026-10-27", "job": "casa-da-vo", "sector": "hospitality", "source": "taste-skill", "direction": "name-as-monument", "palette": "cool-white-slate", "type": "Erode", "fingerprint": {"heading": "Centred display", "body": "Single column", "divider": "Negative space", "button": "Unstyled link", "image": "Inline", "reveal": "Type-unmask"}}
```

Stage 3 rejects a candidate that shares more than 3 of the 6 fingerprint axes with any of the last 3 entries (Hallmark `references/macrostructures.md` L82-97). A None that the material forces is not a shared choice.

## PICK.md template (`<job>/picks/frontend/NN-PICK.md`; header: CORE section 7)

A "brain merge" with no picker id fails "Ran".

```
# kinso-frontend stage NN - Pick
Seed: <job>-frontend-NN or "no deal"   Hash (8 hex):   mod:   Draw tool: tools/draw/draw.py sha256 <12 hex>   Menu: <catalog files, sha256 12 hex>. Picker: yes - <agent or call id>.
Client limits: <each limit from ANSWERS.md>
Rubric: <criteria and scale, from the stage file>

## Candidates
### <n>.<k> <source>: <name>
- Idea or summary: <one line>
- Tests: rival <pass/fail>, template <pass/fail>, limits <pass/fail>, memory <shared axes of 6>
- Scores: <criterion> <0-3>, ... = <total>
- Reason: <one line>

## Kept
<which, and why it beat the others>

## Redraws and clashes
<reason, redraw seed <seed>-r<n>> / <skill rule, shared rule, what was done>
```

## Style rules removed (from `references/rewrite/` and the old `RULES.md`)

The old `RULES.md` held no style rules; these came from the old stage files. Each skill keeps its own version of any of them.

- 03: "No random deal scripts"; "no palettes taken from a catalogue".
- 03: one accent colour, for the main action only.
- 03: headline 2 lines or fewer; first screen 7 words or fewer, a 12-word sentence, about 80 words in all.
- 03: two font families at most; a saturated face needs a written reason.
- 03: the refused looks (cream and serif with terracotta, near-black with neon, broadsheet hairlines) and the banned AI layout list.
- 03: the fixed list of 8 first-screen layouts and "range of volume".
- 03: photos at most a third of the page; never two photo sections in a row.
- 03: the Floor list: no eyebrow labels, tracked capitals, middle dots, accented headline word, glow, status dots, 01/02/03 numbers.
- 03: section gaps 120px, section heads 40px; body text 16px and 45 to 75 characters.
- 04: the refused layouts (split hero, centred head over cards, the stock run); no email sign-up at the end; at most 5 empty picture slots.
- 05: word budgets (heads 7 words, 2-sentence paragraphs, 450 words a page); headline about 32 characters; about 12 words a sentence.
- 05: the banned word and pattern lists; refused headline shapes; sentence case; buttons 1 to 3 words; nav up to 5 links; no furniture text; section-head naming.
- 06: one centred container; hover only raises contrast; no fade-up on every section; `h1` 2 lines; slots as dashed boxes.
- 07: font family count (3 or fewer), non-grey colour count (12 or fewer), accent only on the main action, size steps. Now report-only.
- 10: KPI with no icon or sparkline; sidebar only past 7 items; no entrance motion; `h1` 18 to 32px; no pie or gauge; one hue per chart; 3 to 5 grid lines.
- 11: 5 to 15 boxes a diagram; phone text 15px.
