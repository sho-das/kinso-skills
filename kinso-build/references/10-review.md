# Stage 10 - Review (fresh reviewer)

Read `BRAIN.md` first. Paths are from `kinso-build/`.

## Runs

1. Deal 2 blind reviewers. Each is a fresh session that did not build:
   - `skills/code-review/SKILL.md` (Pocock) - standards and spec axes;
   - one of `skills/requesting-code-review/SKILL.md` with `code-reviewer.md` (superpowers), or `skills/code-review-and-quality/SKILL.md` (Addy; checklists in `skills/addy-references/`), rotated by job.
2. `skills/spec-to-code-compliance/skills/spec-to-code-compliance/SKILL.md` (Trail of Bits) for spec coverage. Read only; CC-BY-SA-4.0.
3. kinso-frontend's stage 9 review covers the pages; its verdict is read here.

**Skip:** any step that posts a review, opens a PR or calls an outside reviewer. Its `workflows/` and `evals/`. Log each skip in `build/PROCESS.md`.

## In

- `<code>/`, `build/SPEC.md`, `build/PLAN.md`, `build/SECURITY.md`, `build/QA.md`, `build/PROGRESS.md`, `<job>/OVERRIDES.md`.
- Reviewers never get the brain's reasons or the other reviewer's notes.

## Deal and pick

- Who deals: the orchestrator (the session running the skill) starts each dealt option as its own fresh subagent, and the judge as one more fresh subagent with the option names hidden (CORE section 4). A runner never deals. Where no subagents exist (a plain API), run each option as a separate call with no shared history, and the judge as another. Name each agent id or call id in the pick.
- Seed `<job>-build-10`. Write the seed and the draw.
- The brain merges the findings. Each one is checked against the code before it counts.
- Rubric, 0 to 3 per line: finding has file and line; checked true; severity; spec line named.
- Write `<job>/picks/build/10-PICK.md`.

## Guards

- Never push, deploy, commit or merge without the founder's OK.
- Secrets never in files. Production data read-only. Free only. Never a `-contributor` model.
- Scripts only through the sandbox.

## Checks after

These block a "ship" verdict:

- (block) Any failing test. Run the full suite in the sandbox and save the log.
- (block) The app does not start from the README steps (or `<code>/RUN.md`, when stage 11 has not yet written the README).
- (block) A secret in the repo (grep).
- (block) The riskiest assumption's metric is not wired or shows no number.
- (block) A spec "must" not met.
- (block) A high security finding not fixed and not accepted by the founder.
- (block) A guard broken (commit, push, install, paid call, `-contributor` model, production data).
- (block) A screenshot in `build/screens/` is older than the code it shows (the "Screenshots are newer than the code" check in `BRAIN.md` prints a file). Stage 11 hands these screens to kinso-promote.
- (block) A claim from the "must not make" list in `<job>/handoff/PROMOTE.md` is in the product.

Verdict: **ship**, **fix** or **rebuild**.

## Override

The founder may ship on "fix". Every override is listed in the verdict, with what the verdict would be without it, and logged in `<job>/OVERRIDES.md`.

## Out

- `<job>/build/REVIEW.md` - verdict, merged findings, blocks, overrides.
- `<job>/build/options/review-A.md`, `review-B.md`, `<job>/picks/build/10-PICK.md`.

## Stop point

Yes. Show the verdict, the blocks and the findings. Wait for the founder's answer before stage 11.
