# kinso-promote - The brain

27 October 2026. Draft for your review. Context: `../CONDUCTOR-PLAN.md`, `PLAN.md`, `SKILLS.md`. Paths are from `kinso-promote/`.

## What the brain is

- Each stage runs the **real skills** in `skills/`, as their own `SKILL.md` says. Shared loop, judge, seed, scale, paths and override: `../BRAIN-CORE.md` (CORE). Below: what stays local. The brain does five things around them: **pass in**, **deal**, **pick**, **guard**, **check after**.
- It never rewrites a skill's method, voice or ideas. Checks cover facts, the MUST-NOT list, platform limits, links, accessibility and privacy. **No house style**: the allowed gates, including every rule below on humanizer, rhythm and scenes, are listed in CORE section 9.

## The loop at every stage

1. **In.** The files the stage names, plus `../RULES-RESEARCH.md`, `promote/FACTS.md` and `promote/MUST-NOT.md`.
2. **Deal 3**, from different skills or different families. Where a skill offers a menu (hook families, council seats, art styles), use a **seeded random draw**: draw by CORE section 5, seed `<job>-promote-NN[-<post id>]`.
3. **Run** each option as its own pass through its skill, in a fresh session the orchestrator starts (CORE section 4). Never blend options into one voice.
4. **Pick.** A fresh judge scores, as CORE section 3 step 4. Reasons decide, not the total (`../RULES-RESEARCH.md` section 5). Keep 1; the others go to `promote/ALTERNATIVES.md`.
5. **Rival test.** Put the nearest rival's name in a kept line. If it still fits, redo or cut the line.
6. **Check after.** Fix a failed check, or send it back to the skill. One line per fix in `promote/PROCESS.md`.
7. **Clash.** A skill rule against a guard (for example "schedule it" or "use your API key"): the guard wins, logged in `PROCESS.md`.

## Audience first, then text

- No stage writes copy before stage 1 (`references/01-audience.md`) is done and you OK `promote/AUDIENCE.md`: the content you prefer, where you post, the target audience, your goal and your hours per week.
- Later stages write only for the audience, platforms and formats in `AUDIENCE.md`. A platform or format you did not choose is not written.
- Posting times in any file come from a dated source, or are tagged [Guess].
- **AUDIENCE check (every stage after stage 1).** Each output file opens with a line "Follows AUDIENCE.md:" naming the rows it follows (for example "section 3, Instagram row; Q5 time"). A stage never plans, drafts or schedules a format, platform or place that `AUDIENCE.md` cut or did not choose (for example a Reel, a blog, a press pitch, a group). For a cut item the stage writes only one line, "cut by AUDIENCE.md (<row>)", plus at most one line on what it would need if you add time later. The plan's total time fits the hours row. Stage 9 fails any file that breaks this. Old drafts kept in `promote/` (for example `*-v1.md`) and files written before this rule also carry the line, marked "Old draft" where it applies; when it is missing, add only the header line (keep a `.before` and a diff in `promote/edits/`), never change the body. Stage 0 records (`FACTS.md`, `MUST-NOT.md`, `GAPS.md`, `CONTEXT.md`, `PROCESS.md`, `HUMANIZER.md`, `AUDIENCE.md`) and style notes are records and need no line.

## Asking you questions (every stage)

- **Ask like a form.** When the AskUserQuestion tool is available, use it: at most 4 questions per call; 2 to 4 options each; the recommended option first, its label ending in "(Recommended)"; one reason line per option; `multiSelect` where more than one answer fits. The tool adds "Other" for a free answer.
- Without the tool: one message, a numbered form, lettered options, the recommended one first and marked, one reason line each, "pick one" or "pick any".
- Ask only what the job files do not already hold. Save every answer, with the date, in `START.md`.

## Guards (every stage)

- Never post, like, comment, follow, message or schedule. Outputs are files. You post by hand.
- Never log in, and never use your main accounts, in any tool or recording.
- No claim from `promote/MUST-NOT.md` in any public text: site, page, post, caption, video or any file meant for the public. No override lifts this (CORE section 8 item 10, user's call 2026-10-27).
- No invented numbers, quotes, users, reviews, testimonials, logos, awards, dates or links. Every claim traces to `FACTS.md`.
- Platform rules: limits and community rules from the platform's own page, dated, or marked "unread". Numbers inside skill files are not sources.
- Free only. No paid key, API or generator.
- One local AI model at a time (mflux, FastVideo, Ollama): `../RULES-RESEARCH.md` section 4.
- Local tools only from `TOOLS.md`, through `../kinso-frontend/tools/sandbox/run.sh`. Nothing installed without your OK. Web only through `../tools/collect/collect.sh`.

## Checks after (every text)

- **Facts:** each claim and number points to a `FACTS.md` row and matches it.
- **MUST-NOT scan:** the word list (exact and word forms, for example "prove", "proves", "proven") and a meaning check by a reader who did not write the text.
- **Humanizer pass** (`skills/humanizer/`) and, for mixed readers, **clear-English pass** (`skills/clear-english/`). They remove tells only. Never flatten the voice: your samples' words, rhythm, line breaks and emoji stay.
- **Character limits per platform**, counted and written next to each post.
- **Numbers other files quote stay current.** When a stage changes a text, every count or position another file states about it (characters, words, slide number, slide count, hashtag count, FACTS rows used) is recounted by script from the current text, and each stale one is fixed in place with a diff in `promote/edits/`. This covers `LAUNCH-PLAN.md`, `LAUNCH-KIT.md`, `REVIEW.md` and every PICK. A stage 5 rerun that does not rerun stage 6 leaves this to stage 9 (r4: `LAUNCH-PLAN.md:53` kept WA-2 at 121 characters after the v3 text had 193; `:44` kept the stove photo on slide 3 after it moved to slide 2).
- No em dashes. Links real or marked slots.
- **Claim or description.** The facts check covers claims: numbers, dates, names, people, prices, awards, ratings, dish names, offers, rivals, "best" or "only". Plain description of a `FACTS.md` row is not a new claim and is allowed: what the visitor can see or do there (the fire in the wood stove, the pots on it, sitting down for lunch, sending a WhatsApp to book). A description that adds a fact (a dish, a taste, a health point, a person, an age) is a claim and needs its own row.
- **Few facts is not a reason for a notice board.** When `FACTS.md` is short, each piece still leads with one moment or one scene, not the schedule. The approved line (bio) appears at most once per piece. The full schedule appears in at most one line per piece. No two pieces open the same way.
- **Tone not decided** means: write like a person from that place talks to a neighbour (greeting, "você", a short invitation), in the job's language. It never means flat, list-only text. See "Writing that sounds human" below for the voice card.
- **Sounds human:** after the humanizer pass, every post and the blog body get a "sounds human" score from 1 to 10 by a **fresh judge**: a separate agent (Sonnet) that wrote nothing in this job and sees only the final texts, `FACTS.md` and the voice card. The writer never gives the final score. A runner that cannot start an agent writes "sounds human: pending fresh judge" and the orchestrator runs the judge. Under 7 goes back to the skill that wrote it, once, with the judge's reasons.

## Writing that sounds human (every text, before and after drafting)

Why texts failed before (tests/new, 27 October 2026, blog 5.5, Instagram 6.5): the writer had few facts and only one scene (the stove), so every piece repeated it; all sentences had the same short length; the blog was an info page with headings like "Hours" and "How to book"; the text talked about itself ("here we tell you how it is"); the greeting was a formula ("Oi, gente!"). The fixes below come from the skills' own methods. They add no new facts.

1. **Build a writer first** (`skills/copywriting/references/ai-tells.md`, "Build a Writer"). Write 3 lines in `promote/PROCESS.md`: who is writing (a role, for example "the person who answers the bookings", never a name the MUST-NOT list blocks), what they know cold (gets the most words), what they find dull (gets one line or is cut).
2. **Voice card.** If `START.md` holds voice samples of 50 words or more, list their habits: sentence length, openings, punctuation, emoji, words. If not, write a **neighbour voice card** for the job's language and place: 5 to 8 everyday words or turns people there use with a neighbour (for Brazilian Portuguese, for example "a gente", "pra", "dá pra", "chega mais cedo"), how a message starts and ends, and what that person would never say (sales words, "experiência", "venha conhecer"). The card is a style note, never a fact. Write it in `PROCESS.md` and pass it to the judge.
3. **Scene bank.** Before any draft, list at least 6 concrete scenes in `PROCESS.md`, each tied to a `FACTS.md` row:
   - **Place scenes:** what a visitor can see or do there (description of a row, as in "Claim or description").
   - **Reader scenes:** a moment in the reader's own week that the facts make real, for example choosing a day because Monday is closed, sending the booking message on a Sunday morning, a Friday dinner after work. A reader scene adds no fact about the business, so it needs no new row; it must not imply a dish, a taste, a person or a promise.
   - Each piece **leads with one scene no other piece in the set uses.** One image or line (for example the stove) appears in at most 2 pieces of the whole set.
4. **One real story, or ask for it.** A piece is stronger with one true moment from the owner. If `FACTS.md` has none that may be told, use a reader scene and add one line to `GAPS.md`: "[NEED: one real moment the owner is happy to share]". Never invent one (article-writing core rule 5; ai-tells "Never invent experience").
5. **Rhythm from the thought** (humanizer "How to work" step 4; ai-tells "Sentence length from the thought"). In any piece over 60 words: at least one sentence of 15 words or more and one of 5 words or fewer; never 3 sentences in a row with the same opening word; at most one fragment and one list of three per piece.
6. **No text about the text** (humanizer section 25). Never "here we tell you", "in this post", "we write it like this on Instagram".
7. **Blog is not an info page.** The body follows one scene or one point from start to end (article-writing "Writing Process" 2 and 3). Practical facts (hours, booking) go in one short block near the end, not as headings like "Hours" or "How to book". Sections are uneven in length (ai-tells "Lopsided structure").
8. **Humanizer pass with the full list.** Run `skills/humanizer/SKILL.md` "How to work" steps 1 to 4 and check all 26 numbered patterns, plus the self-check in `skills/copywriting/references/ai-tells.md`. Write one table per text in `promote/HUMANIZER.md`: pattern number, hit or clear, the line, the fix. A pass that writes no table did not run. **Every table has 26 rows, numbered 1 to 26, one per pattern, each with its own result.** A row such as "other numbered patterns: clear", or a list of hits only, is not a table and the pass did not run (r4 stage 9, `tests/new/r4/stage9-final-edit/C/promote/HUMANIZER.md` lines 210-224). Every rerun or later edit of a text writes a new full table for that text, dated, under its own heading; it never appends a hits-only delta. Check: `grep -c "^| [0-9]" ` per table heading gives 26.

## Useful to act on (every text, with "sounds human")

Why texts failed (r3, 27 October 2026, case C, usefulness: blog 6, Instagram 6, WA-2 5): the rules above fixed the voice but asked nothing about use. So the pieces led with a reader scene that ended on the reader's problem ("Terça passou voando e o almoço ficou pra depois?"), the Instagram cover led with what is missing ("Segunda a casa fecha"), WA-2 asked the reader to "combinar" with no day and no booking word, and "sem pagamento online" closed three pieces as a notice line. Judge notes: `tests/new/r3/stage9-final-edit/C/JUDGE-FINAL.md` ("weak reason to stop scrolling", "combinar is vague", "nobody writes sem pagamento online to a neighbour"). These rules are about content, not style; they add no fact.

1. **A reason to come.** Each piece names what the reader gets, from a `FACTS.md` row or a describable (for example comida mineira from the wood stove, lunch in the neighbourhood). The lead scene leads to it in the same or the next sentence. A scene that ends on the reader's problem with no payoff is not a lead.
2. **Lead with what is there, not what is missing.** A closed day, a "no" or a limit is never the hook, the cover or the first line. It goes in the practical line, once.
3. **A complete ask.** The one ask names the action (book, reserve), the channel (WhatsApp, with the link slot where the platform allows a link) and the day or meal it is for. "Manda uma mensagem pra gente combinar" alone fails.
4. **The four answers.** After reading one piece alone, a reader knows what it is, when it is open (days and hours in one spoken line), and how to book. Where it is appears at least once per platform.
5. **Only what helps the reader act.** A fact the reader does not need in order to act (for example "no online payment") appears in at most one piece of the set, as a spoken answer to a worry, never as the last line or a notice line.
6. **Useful score.** The fresh judge who gives "sounds human" also gives "useful" from 1 to 10: would a reader in `AUDIENCE.md` act on this piece? Under 7 goes back to the writing skill once, with the reasons, like "sounds human".

## Override

You can overrule any pick or finding. The brain shows its reason once, plus the strongest case for you, then follows you, tags it "user override" (CORE section 8) and adds a row to `OVERRIDES.md`. A MUST-NOT claim never goes in a post, caption, video, blog or any public text, whatever the override. Only a private planning file, never published, may keep it, "at the user's risk", logged in `OVERRIDES.md` and flagged in `promote/REVIEW.md`.

## PICK.md template

Each stage writes `<job>/picks/promote/NN-PICK.md` (CORE section 2). Header: CORE section 7.

```
# kinso-promote stage NN - Pick

Date:
Seed: <job>-promote-NN[-<post id>]   Hash (8 hex):   mod:
Draw: <menu> -> <cards drawn>   (or "fixed options, no draw")   Draw rule: BRAIN-CORE section 5   Menu: <file, sha256 12 hex>

## Dealt
| # | Option | Skill and path | Family or angle | FACTS.md rows used | Fresh session (agent or call id) |
|---|---|---|---|---|---|
| A | | | | | yes - <id> |
| B | | | | | yes - <id> |
| C | | | | | yes - <id> |
| Judge | - | - | - | - | yes - <id> |

## Scores (0 to 3, judge did not see option names)
| Line | A | B | C |
|---|---|---|---|
| True to FACTS.md | | | |
| <stage rubric lines> | | | |
| Rival test | | | |
| Total (pick only) | | | |

## Kept
- Kept:
- Why (reasons, not the total):
- Dropped, and why (saved in ALTERNATIVES.md):

## Checks after
| Check | Pass or fail | Fix (also in PROCESS.md) |
|---|---|---|
| Facts traced | | |
| MUST-NOT scan | | |
| Humanizer / clear-English | | |
| Platform limits (source, date) | | |

## Overrides this stage
<none, or a link to the OVERRIDES.md row>
```
