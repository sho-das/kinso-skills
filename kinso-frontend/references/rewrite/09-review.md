# Stage 9 - Review

Approved 2026-10-26 after testing (see `tests/stage9/RESULTS.md`: Matt Pocock code-review scored 9.0 of 10, found 20 of 21 known faults, 0 false findings; ECC 8.7; plain Claude 8.0).

Sources: Matt Pocock code-review (MIT), ECC production-audit (MIT), Addy Osmani code-review-and-quality (MIT), gstack review evidence rules and gate-integrity list (MIT, Garry Tan). Rewritten in our own words.
Added 2026-10-26 from the coverage check (`coverage/09-COVERAGE.md`).

Read `../RULES.md` first. This file adds only the rules for this stage.

## Input

- `site/` (after stage 8), `seo/SEO.md`, `check/CHECK.md`, `copy/COPY.md`, `plan/PLAN.md`, `design/DESIGN.md`, `design/tokens.json`.
- `PRODUCT.md`, `research/ANSWERS.md`, `research/RESEARCH.md`, the client's files.
- An input is missing: write "not checked: [input] not provided". Never infer requirements from the page.

## Who reviews

- A fresh reviewer with no memory of the build. It reports only and never changes the page.
- It does the review itself. It does not start other agents or run other stages.
- One review, one fix round, one confirming check. Do not run the review again and again until it is clean.

## Tools

- `capture.mjs`, in the sandbox, at most 2 captures. It records `wideBoxes` for any box wider than the screen.

## Rules

- Every finding quotes its evidence: the exact text, line or measure. Name the kind next to the quote: file line, measure, screenshot or live run. Never present a quote from a file as a live check. Two reads of the same source are one piece of evidence.
- A claim that something is safe or covered cites the line or test that shows it.
- Every finding names the input line or rule it breaks.
- Tag each finding Standards (built right) or Spec (the right thing). A page can pass one and fail the other.
- Sideways sweep: when you find a fault, search for the same pattern everywhere else (every language page, the JSON-LD, `llms.txt`, `sitemap.xml`, `robots.txt`, `PROCESS.md`, `CHECK.md`). List every place under that one finding. Rate it by the worst place.
- Cannot quote the exact line or measure: put the finding in "Unverified", not in the main list, and never mark it Critical.
- On the phone, look at the 390 screenshot. When it disagrees with a measure, the screenshot wins.
- Rank by harm to a visitor, not by how loud a fault looks.
- Zero findings is a valid result. Do not report a harmless style choice, or something the build or a tool already proves (say which tool).
- Never ask for a code comment or stamp. Never suggest filling a slot.

## Existing project

- Name what the change is measured from (the branch or commit). Confirm the change is not empty.
- Check the list of changed files against the job: no change outside it.
- Read the project's own written standards (`CONTRIBUTING.md`, `CODING_STANDARDS.md`, lint config) and review against them. The project's standard wins over any generic rule.
- Check the guardrails in `00-existing.md`: shared components not forked, theme differences only in tokens, tests pass, what must stay still works.
- Tests exist for the changed behaviour. A test run that ran zero tests is not a pass.
- Gate integrity: read the diff for a test removed or skipped, an assertion or limit loosened, a lint-disable added, a snapshot rewritten without its test, a placeholder left in, an empty catch, or a lockfile changed. Each blocks publish until the change explains it. Mark it Critical only when it hides a real failure.
- List code the change leaves unused (CSS rules, classes, components). Never delete it.
- State how to undo the change (the branch, the file list).

## Steps

1. **Fixed checks**, before the free review:
   - **Wrong name:** search the page for every product, company and place name. A name not in this job's inputs is a leak. Search the inputs to prove it.
   - **Unsupported claim:** every number, claim and structured-data value on the page traces to an input line. If not, it is Critical.
   - **Slots:** every slot `COPY.md` says to show is on the page with its flag. No slot is filled with a guess.
   - **Facts agree:** hours, prices and names agree across the page, the JSON-LD, `llms.txt` and `ANSWERS.md`.
   - **Index gate:** a page with visible slot text is not `index`. An unfinished language page is `noindex`, out of the sitemap, with no hreflang pair.
   - **Notes against the build:** each claim in `SEO.md` and `CHECK.md` matches the built file.
   - **Lists and data:** every list item, filter and count traces to a data field, or to the one constants file with a reason. A list with no cap or paging is a finding. A fallback that hides missing data or a failed call is a finding.
   - **Front-end safety:** no key, token or password in the built files or notes. No `innerHTML` with data or user text. Form fields are 16px on phone. Each region that shows data has its empty, loading and error states.
2. **Standards pass:** the page against `RULES.md` and the stage rules (structure, accessibility, focus, language, links, layout at 1440 and 390).
3. **Spec pass:** the page against every approved input, section by section.
4. **Triage:** mark each finding Critical, Required or Nit, and whether it blocks publish. Add a confidence note. A Nit never blocks publish.
5. **Verdict:** pick the mildest verdict the findings justify.
   - **Ship:** no open Critical or Required finding, and nothing marked "blocks publish" is open. Nits do not stop ship.
   - **Fix:** one or more Critical or Required findings that their owning stages can fix in one pass. Wrong facts, names, tags, links and CSS faults are fixes, however many there are.
   - **Rebuild:** only when the page fails the spec in structure (wrong page type, or sections or layout from `PLAN.md` missing or replaced), so editing cannot fix it.
   - Passing tests do not prove ship. The verdict rests on the checks above.

## Output: `review/REVIEW.md`

1. Verdict (one word and one line why)
2. Findings, worst first (where, evidence and its kind, input or rule broken, axis, Critical, Required or Nit, blocks publish, confidence, owning stage, who must act, fix). End with the worst finding on each axis. Do not name one winner overall.
3. Unverified (findings you could not quote)
4. What is right (each line names the check that shows it; "checked and found nothing" is a valid line)
5. Evidence checked (every file, capture and measure read)
6. Not checked (each with the exact reason: the error text or the missing input)
7. Next action (one concrete step)
