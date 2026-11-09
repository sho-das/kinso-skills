# Stage 0 - Existing project

26 October 2026. Test set-up. Results go in `tests/stage0/RESULTS.md`.

**Job of this stage:** map an existing project before any change (stack, pages, data, shared components, themes, tests, what must stay, risks), then make one small change the client asked for, inside the guardrails.

Cases: A a static site (add one FAQ answer); B an admin app and a client app that share `packages/ui` (a compact button in the client app only); C a shop app with data and tests (a "Promoção" filter).

## Candidates (5)

| # | Candidate | Method files |
|---|---|---|
| 0 | Baseline | None |
| 1 | ponytail | `vendor/DietrichGebert_ponytail@09c434a/skills/ponytail-audit/SKILL.md` (map) and `skills/ponytail/SKILL.md` (the change) |
| 2 | Impeccable | `vendor/pbakaus_impeccable@9368675/skill/reference/document.md` and `extract.md` |
| 3 | ECC | `vendor/affaan-m_ecc@90606c8/skills/codebase-onboarding/SKILL.md` |
| 4 | Our draft | `kinso-frontend/references/00-existing.md` |

## How it is scored

1. **Script (`tools/existing-check.py`):** secret values never copied, files changed against the expected list, admin untouched (B), tests pass (C), no comments added.
2. **Truth list:** map facts and risks found (`hidden/truth.md`, locked).
3. **Blind review (Sonnet 5.5):** names hidden; map accuracy 40%, the change 40%, the report 20%.
