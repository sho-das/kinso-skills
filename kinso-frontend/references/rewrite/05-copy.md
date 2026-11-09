# Stage 5 - Copy

Approved 2026-10-25 after testing (see `tests/stage5/RESULTS.md`: no single method won; scores 6.8 to 7.7. This layer combines the parts that helped. frontend-design was the only top-3 method with no invented facts).

Sources: Anthropic frontend-design writing section (Apache 2.0), ECC brand-voice (MIT, affaan-m), taste-skill copy (MIT, Leonxlnx), clear-english (your own skill), humanizer, Hallmark craft and gates (nutlope). Rewritten in our own words.
Added 2026-10-26 from the coverage check (`coverage/05-COVERAGE.md`).
Added 2026-10-26 from the real check against the original skills (`../tests/v3/RESULTS.md`).

Read `../RULES.md` first. This file adds only the rules for this stage.

## Input

- `plan/PLAN.md` (stage 4), `design/DESIGN.md` (stage 3), `research/PRODUCT.md` and `research/ANSWERS.md` (stage 2), `research/RESEARCH.md` (stage 1), and the project files.

## Rules

- Trace every line to an input file. A line found only in `PLAN.md` is not a source: leave it out and say so.
- Every line carries a fact of this product. No line a rival could use unchanged. Test each line: can the reader picture it, could it be proven false, could only this product say it?
- Say each fact once, where it does work. No fact in four or more sections. A section's last line does not restate its heading. End a section on a fact or the action, not on a hopeful line.
- A button says what happens. An action keeps the same name through the flow. Call the same thing by the same name everywhere; never swap in a synonym for variety.
- Errors say what went wrong and how to fix it, and never apologise. No "Oops" and no exclamation marks. Empty states invite the next action.
- No success text ("Sent", "You're on the list") for a form with no real endpoint. Write the endpoint as a slot, and write only the field text, the button and the error text.
- Short sentences and common words: about 12 words a sentence, split past 20. Active voice. Say what the visitor sees and does, not how the system is built.
- Explain a term only when this visitor may not know it. Never explain what the local visitor uses every day. Spell out an acronym on first use only under the same test.
- Prefer the specific noun and a real number, but only a number that is in the inputs. No judgement words in place of a fact ("reads as", "signals").
- Never invent link targets. Each button names its real target or a slot.
- Alt text for a missing photo is a clean slot, never a sentence about the slot.
- Keep approved nav and button labels exactly. Check that long labels fit at 390 wide.
- If the plan conflicts with the client's rules, follow the client's rules and note it.
- Stay near the word count the plan gives each section. Where the plan gives none: heads 7 words or fewer, paragraphs 2 short sentences, lists 4-5 items, about 450 visible words a page. Say in Assumptions that you used this default.
- For each slot, say one of two things: **show** (the slot text appears on the page until filled) or **leave out** (the line is not built until filled). Never both.
- When `PLAN.md` asks for a labelled sample (for example a code diff) and the inputs allow a generic one, write it in full and mark it Sample. Do not leave it as a slot.
- Keep every `PLAN.md` line unless an input forbids it. Never drop a closing-band line on purpose; hold it as a slot if it is in doubt.

## Headlines, buttons and nav

- Headline: pick the plainest true shape - the name; what it is; the claim a rival could not sign; the instruction (verb first); the place or the moment.
- About 32 characters (4-6 words) fits at 390 wide; up to about 42 with a smaller phone size. Section heads 2-5 words. If a headline is too long, cut words; never shrink it. A large intro statement is about 25 words at most.
- Refuse: "The AI-powered platform for modern teams"; "Fast. Simple. Secure."; "It's not just X, it's Y" and "not only X but Y"; "X, reimagined"; "Welcome to..."; "Meet..."; a question the visitor did not ask; a colon title ("Name: what it does"); one word styled differently.
- Sentence case on headings, buttons and nav, unless the approved wording differs.
- Supporting line: one sentence that says what it is and who it is for. It never repeats the headline.
- The first screen answers the visitor's first question in large type (an event: what, when, where; a product: what it is and what it costs or does; a person: who and what they do).
- Section heads name what the visitor gets, never a category label ("Features", "Our story", "Why us", "Field notes", "Our philosophy").
- No furniture text: "Est. 2024", coordinates, version stamps, "Scroll", "Step 1" labels, status dots, middle-dot strings.
- Buttons: 1-3 words, naming the action or the thing. One primary action per screen; the second action is a plain text link. No arrow on every link.
- Nav: the wordmark, up to five plain links as single nouns, one action. Approved labels win.

## Banned words and patterns

Check every string.

- Genre words: unlock, unleash, supercharge, elevate, empower, streamline, seamless, effortless, robust, powerful, cutting-edge, next-generation, world-class, all-in-one, blazing fast, game-changer, journey.
- AI words: additionally, crucial, delve, enduring, enhance, foster, garner, intricate, pivotal, showcase, tapestry, testament, underscore, vibrant, landscape (as an abstract noun).
- Filler and idioms: "in order to", "due to the fact that", "it is important to note", "at its core", under the hood, spin up, leverage.
- Patterns: emoji in any string; "-ing" tails that add fake depth ("highlighting", "ensuring"); "serves as" or "boasts" where "is" or "has" works; hedges that go nowhere; sentences with no fact ("the point is..."); bait questions; "not X, just Y"; "no fluff"; "Excited to share"; founder-journey filler.

## Steps

1. **Voice profile.** At most 10 lines, built only from the client's own words (project files and `ANSWERS.md`), with a "never" list. Read the samples for sentence length, how direct, use of numbers, capitalisation, questions, and how an ask ends. If the samples split by channel (public and private), name the split; do not average it. Add the source files used and a confidence line.
2. **Page copy.** Section by section, in plan order, in the page language.
3. **Interface text.** Page title, nav, accessible names (for example "KinBeat home"), skip link, form labels and hints, errors, empty and loading states, button states, table captions, language switch.
4. **Claims table.** Every factual claim and the input line it comes from.
5. **Final pass, two rounds.** Round 1: list in short bullets what still reads as machine-made (inflated words, same-length sentences, tidy triplets, vague claims, banned words). Round 2: fix those. Do not add opinions, "I" or invented feelings.

## Output: `copy/COPY.md`

1. Voice profile
2. Page copy (one block per plan section, every string labelled: Headline, Lede, Body, Button, Link, Caption, Alt text)
3. Interface text
4. Claims and sources
5. Slots (each marked show or leave out)
6. Assumptions
