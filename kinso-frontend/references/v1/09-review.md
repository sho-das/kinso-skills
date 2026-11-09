# Stage 9 - Review

Approved 2026-10-26 after testing (see `tests/stage9/RESULTS.md`: Matt Pocock code-review scored 9.0 of 10, found 20 of 21 known faults, 0 false findings; ECC 8.7; plain Claude 8.0).

Sources: Matt Pocock code-review (MIT), ECC production-audit (MIT), Addy Osmani code-review-and-quality (MIT), gstack review evidence rules (MIT, Garry Tan). Rewritten in our own words.

Read `../RULES.md` first. This file adds only the rules for this stage.

## Input

- `site/` (after stage 8), `seo/SEO.md`, `check/CHECK.md`, `copy/COPY.md`, `plan/PLAN.md`, `design/DESIGN.md`, `design/tokens.json`.
- `PRODUCT.md`, `research/ANSWERS.md`, `research/RESEARCH.md`, the client's files.

## Who reviews

- A fresh reviewer with no memory of the build. It reports only and never changes the page.

## Tools

- `capture.mjs`, in the sandbox, at most 2 captures. It records `wideBoxes` for any box wider than the screen.

## Rules

- Every finding quotes its evidence: the exact text, line or measure.
- Every finding names the input line or rule it breaks.
- On the phone, look at the 390 screenshot. When it disagrees with a measure, the screenshot wins.
- Rank by harm to a visitor, not by how loud a fault looks.
- Never ask for a code comment or stamp. Never suggest filling a slot.

## Existing project

- Check the list of changed files against the job: no change outside it.
- Check the guardrails in `00-existing.md`: shared components not forked, theme differences only in tokens, tests pass, what must stay still works.

## Steps

1. **Fixed checks**, before the free review:
   - **Wrong name:** search the page for every product, company and place name. A name not in this job's inputs is a leak. Search the inputs to prove it.
   - **Unsupported claim:** every number, claim and structured-data value on the page traces to an input line. If not, it is Critical.
   - **Slots:** every slot `COPY.md` says to show is on the page with its flag. No slot is filled with a guess.
   - **Facts agree:** hours, prices and names agree across the page, the JSON-LD, `llms.txt` and `ANSWERS.md`.
   - **Index gate:** a page with visible slot text is not `index`. An unfinished language page is `noindex`, out of the sitemap, with no hreflang pair.
   - **Notes against the build:** each claim in `SEO.md` and `CHECK.md` matches the built file.
   - **Lists and data:** every list item, filter and count traces to a data field, or to the one constants file with a reason.
2. **Standards pass:** the page against `RULES.md` and the stage rules (structure, accessibility, focus, language, links, layout at 1440 and 390).
3. **Spec pass:** the page against every approved input, section by section.
4. **Triage:** mark each finding Critical, Required or Nit, and whether it blocks publish. Add a confidence note.
5. **Verdict:** ship, fix or rebuild.

## Output: `review/REVIEW.md`

1. Verdict (one word and one line why)
2. Findings, worst first (where, evidence, input or rule broken, Critical, Required or Nit, blocks publish, confidence, owning stage, who must act, fix)
3. What is right
4. Not checked
