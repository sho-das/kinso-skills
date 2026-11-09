# Stage 5 - Copy

25 October 2026. Test set-up. Results go in `tests/stage5/RESULTS.md`.

**Job of this stage:** write every word on the page, following `PLAN.md`: headlines, body, buttons, captions, alt text, and interface text (nav, forms, errors, empty and loading states, language switch). Output `COPY.md`, so Build pastes text in and writes none.

**Input for every candidate:** the approved outputs of stages 1-4 for each case (frontend-design's `PLAN.md` from stage 4), plus `ANSWERS.md`.

## Candidates (8)

| # | Candidate | Method files |
|---|---|---|
| 0 | Baseline | None |
| 1 | clear-english | `{{KINSO_ROOT}}/kinso-promote/skills/clear-english/SKILL.md` (your own skill) |
| 2 | humanizer | Anthropic humanizer `SKILL.md` (signs of AI writing) |
| 3 | taste-skill | `references/copy.md` |
| 4 | Hallmark | `references/craft.md` sections 6 and 8, `references/direction.md` "Words" |
| 5 | Impeccable | `reference/clarify.md`, `reference/mode-persuade.md` |
| 6 | frontend-design | Anthropic `skills/frontend-design/SKILL.md` writing section |
| 7 | ECC | `skills/brand-voice/SKILL.md` and its `references/` (voice from the client's own files) |

Not tested here: Matt Pocock's writing skills (for articles, and marked in progress), ECC `content-engine` and `article-writing` (social posts and articles), gstack (no copy skill), ECC `seo` (stage 8).

## How it is scored

1. **Checks (script, `tools/copy-check.py`):** no em dashes; no banned phrase; sections match the plan; headlines of 12 words or fewer; average sentence of 15 words or fewer and none over 30; each section within 50-150% of the plan's word count; all headings present. Also reported: AI-sounding words, slots.
2. **Facts (Sonnet 5.5):** any claim not in the inputs? Tagline and names kept?
3. **Blind review (Sonnet 5.5, one per case):** names hidden. Scores 1-10 on clarity for the visitor, fit to the brand and visitor, specificity (could a rival use this line?), honesty, and whether Build can use it as is.
4. **You:** the top 3 per case.
