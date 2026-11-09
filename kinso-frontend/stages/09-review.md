# Stage 9 - Review

25 October 2026. Test set-up. Results go in `tests/stage9/RESULTS.md`.

**Job of this stage:** a fresh reviewer, with no memory of the build, checks the finished page (after stage 8) against every approved input and gives one verdict: ship, fix or rebuild. It lists ranked findings with evidence and names the stage that owns each fix. It does not change the page.

**Input:** claude-seo's stage 8 page per case, with known faults planted, and the approved inputs of stages 1-8. The faults are in `tests/stage9/hidden/faults.md` (locked; runs never see it): 15 planted and 6 that were already there, 21 in all.

Planted fault kinds, one or more per case: a wrong product name, a claim no input supports, a slot filled with a made-up value or its flag removed, a wrong fact, made-up structured data, an accessibility fault, a phone layout fault.

## Candidates (8)

| # | Candidate | Method files (in `vendor/`) |
|---|---|---|
| 0 | Baseline | None (the capture tool only) |
| 1 | Hallmark | `skills/hallmark/references/review-hero.md`, `review-finish.md`, `gates.md` (verdict ship, fix, rebuild or recapture; at most 8 findings) |
| 2 | taste-skill | `skills/taste-skill/references/critique.md` (weighted score, Floor caps, do not round up) |
| 3 | Impeccable | `skill/reference/critique.md`, `skill/agents/impeccable-finish-reviewer.md` |
| 4 | gstack | `review/design-checklist.md`, and `review/SKILL.md` sections "Claims Need Evidence", "Confidence Calibration" and "Pre-emit verification gate" (no setup, no telemetry) |
| 5 | Addy Osmani | `skills/code-review-and-quality/SKILL.md` |
| 6 | ECC | `skills/production-audit/SKILL.md` (local evidence only) |
| 7 | Matt Pocock | `skills/engineering/code-review/SKILL.md` |

Every candidate may use the capture tool in the sandbox, at most 2 captures per case. No check scripts: they are for scoring. Runs go in batches of 4 so the Mac stays cool.

## How it is scored

1. **Found:** how many hidden faults `REVIEW.md` names (of 21).
2. **False findings:** findings a Sonnet verifier marks as not real.
3. **Verdict:** "fix" is right for all 3; "ship" is a fail.
4. **Owner and fix:** each finding names the right stage and a fix that follows the inputs.
5. **Blind review (Sonnet 5.5):** names hidden; scores how useful the report is to the person who must act on it.
