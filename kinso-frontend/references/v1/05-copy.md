# Stage 5 - Copy

Approved 2026-10-25 after testing (see `tests/stage5/RESULTS.md`: no single method won; scores 6.8 to 7.7. This layer combines the parts that helped. frontend-design was the only top-3 method with no invented facts).

Sources: Anthropic frontend-design writing section (Apache 2.0), ECC brand-voice (MIT, affaan-m), taste-skill copy (MIT, Leonxlnx), clear-english (your own skill), humanizer. Rewritten in our own words.

Read `../RULES.md` first. This file adds only the rules for this stage.

## Input

- `plan/PLAN.md` (stage 4), `design/DESIGN.md` (stage 3), `research/PRODUCT.md` and `research/ANSWERS.md` (stage 2), `research/RESEARCH.md` (stage 1), and the project files.

## Rules

- Trace every line to an input file. A line found only in `PLAN.md` is not a source: leave it out and say so.
- Every line carries a fact of this product. No line a rival could use unchanged.
- A button says what happens. An action keeps the same name through the flow.
- Errors say what went wrong and how to fix it, and never apologise. Empty states invite the next action.
- Short sentences and common words. Explain a term only when this visitor may not know it. Never explain what the local visitor uses every day.
- Never invent link targets. Each button names its real target or a slot.
- Alt text for a missing photo is a clean slot, never a sentence about the slot.
- Keep approved nav and button labels exactly. Check that long labels fit at 390 wide.
- If the plan conflicts with the client's rules, follow the client's rules and note it.
- Stay near the word count the plan gives each section.
- For each slot, say one of two things: **show** (the slot text appears on the page until filled) or **leave out** (the line is not built until filled). Never both.

## Steps

1. **Voice profile.** At most 10 lines, built only from the client's own words (project files and `ANSWERS.md`), with a "never" list.
2. **Page copy.** Section by section, in plan order, in the page language.
3. **Interface text.** Page title, nav, accessible names (for example "KinBeat home"), skip link, form labels and hints, errors, empty and loading states, button states, table captions, language switch.
4. **Claims table.** Every factual claim and the input line it comes from.
5. **Final pass.** Read every string for signs of AI writing (inflated words, empty triplets, vague claims) and fix them.

## Output: `copy/COPY.md`

1. Voice profile
2. Page copy (one block per plan section, every string labelled: Headline, Lede, Body, Button, Link, Caption, Alt text)
3. Interface text
4. Claims and sources
5. Slots (each marked show or leave out)
6. Assumptions
