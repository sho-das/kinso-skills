# Stage 9 - Review

Read `../RULES.md` and `../BRAIN.md` first. The old rewrite is in `rewrite/09-review.md`. It won its blind test (9.25 against 7.5) by finding the launch-gate fault; its fixed checks come back below.

## Runs

Isolated fresh-context reviewers, in parallel. None has seen the build. Each reports only and never edits the page.

1. `skills/code-review/SKILL.md` - pin the fixed point, confirm the change is not empty, then its two isolated sub-agents with its own prompts and 400-word cap:
   - **Spec:** the page against every approved input, section by section.
   - **Standards:** `RULES.md`, accessibility, front-end safety, and the smell baseline on an existing project. The project's own written standards win.
   Aggregate without merging or re-ranking. A page can pass one axis and fail the other.
2. **Design reviewer:** `skills/hallmark/references/review-finish.md` for a Hallmark build, `skills/taste-skill/references/critique.md` for a taste-skill build, or `skills/impeccable/reference/critique.md` with `skills/impeccable-agents/impeccable-finish-reviewer.md`. Impeccable's order holds: the design read finishes before any detector or linter output is seen. It judges the page against the direction's own idea, never our taste. Tell it the CSS stamp is not wanted.

Skip, and why: gstack's Codex outside voice (paid service); the Impeccable launcher; any install or update command.

## In

`site/`, `seo/SEO.md`, `check/CHECK.md`, `copy/COPY.md`, `plan/PLAN.md`, `design/DESIGN.md`, `tokens.json`, `PRODUCT.md`, `ANSWERS.md`, `RESEARCH.md`, `OVERRIDES.md`, `existing/before/`. A missing input: "not checked: [input] not provided".

**In, from the chain:** `handoff/PRODUCT.md`, `handoff/TEST-PAGE.md`, `OVERRIDES.md`, `business/RISK.md` section 5 ("Claims we must not make") and `../RULES-RESEARCH.md`. On "From kinso-build", the pages are in `<code>/<pages path>` from `build/STACK.md`.

## Deal and pick

- Deal 2 isolated reviewers for the verdict (Spec and Standards), plus the design reviewer.
- Deal 2 of Impeccable's 5 personas (`critique.md` about L642-800), matched to the visitor, to the Standards reviewer.
- The brain does not pick between findings. It writes `<job>/picks/frontend/09-PICK.md`: the reviewers dealt, the personas, each reviewer's findings untouched, and the verdict rule applied.
- One review, one fix round, one confirming check.

## Guards

Facts only from the inputs. Free only. Never deploy, post, commit, push or merge. No secrets. Scripts only in `tools/sandbox/run.sh`, at most 2 captures.

## Checks after

The brain's fixed checks, never style:
- **Wrong name:** every product, company and place name on the page is in this job's inputs.
- **Unsupported claim:** every number, claim and JSON-LD value traces to an input line, or it is Critical.
- **Must-not scan:** take each quoted phrase from "Claims we must not make" in `handoff/PRODUCT.md`, `handoff/TEST-PAGE.md` and `business/RISK.md` section 5. Search every built file for it, one phrase at a time, ignoring case: `grep -rniF -- "<phrase>" <pages folder>` (HTML, CSS content, scripts, JSON-LD, `llms.txt`, `sitemap.xml`, app screens and diagrams). Then read the page copy for the same claim in other words. Each hit is Critical and blocks publish. No override lifts it: a "must not make" claim never goes public (CORE section 8 item 10, user's call 2026-10-27). Write the phrase list, the command and the hit count per phrase in `09-PICK.md`. No list found in a chain job: "not checked: must-not list not provided", and the verdict cannot be ship.
- **Slots:** every slot `COPY.md` says to show is there with its flag; none filled with a guess.
- **Facts agree** across the page, JSON-LD, `llms.txt` and `ANSWERS.md`.
- **Launch gate:** no page with visible slot text is `index`; unfinished language pages `noindex` and out of the sitemap.
- **Notes against the build:** each claim in `SEO.md` and `CHECK.md` matches the built file.
- **Lists and data:** every list traces to data or the one constants file; uncapped lists and fallbacks that hide failures are findings.
- **Front-end safety:** no key or token in the files; no `innerHTML` with data or user text.
- Accessibility and links as in stage 7, re-checked on the final build.
- Every finding quotes its evidence and names the rule it breaks; a finding with no quote goes to "Unverified". On the phone, the 390 screenshot beats a measure.
- Existing project: gate integrity (no test removed or loosened, no lint-disable), changed files match the job, tests ran and passed.

Verdict: **ship** (nothing Critical, Required or blocking open), **fix** (fixable in one pass), **rebuild** (structure fails the spec). Design findings are advice unless the design reviewer says rebuild.

## Override

As in `RULES.md`. The review lists every row of `OVERRIDES.md`. Accessibility and legal overrides stay flagged as "ship at the client's risk".

## Out

`review/REVIEW.md`: verdict, findings worst first (axis, severity, blocks publish, owner, fix), unverified, what is right, evidence checked, not checked, next action, open slots, changed files. `picks/frontend/09-PICK.md`.

## Stop point

Stop. Show the verdict and findings. Nothing is published, committed or merged without the client.
