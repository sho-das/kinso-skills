# Stage 2 - Frontend

Read `BRAIN.md` first. Paths are from `kinso-qa/`.

## Runs

1. **kinso-frontend stage 7**, read in place: `../kinso-frontend/references/07-check.md` and the skills it names, on the running app. Its checks (console, links, contrast, focus, targets, zoom, layout at 1440 and 390, flows with a fast double submit) are reused, never copied.
2. High cells: deal 2 testers from these, each a fresh session:
   - `skills/webapp-testing/SKILL.md` (Anthropic) - Playwright on the local host; `scripts/with_server.py` only through the sandbox;
   - `skills/qa-only/SKILL.md` (gstack) with `skills/qa/references/issue-taxonomy.md` - exploratory, report only;
   - `skills/e2e-testing/SKILL.md` (ECC) - flows as Playwright tests, flaky-test rules;
   - `skills/playwright-expert/SKILL.md` (Jeff) with its `references/`.
   Medium cells: 1 of these, by the seed rule.
3. Every cell with forms or buttons: `skills/click-path-audit/SKILL.md` (ECC).
4. Accessibility: `skills/accessibility/SKILL.md` (ECC), `skills/screen-reader-testing/SKILL.md` (wshobson), and `skills/browser-testing-with-devtools/SKILL.md` (Addy) for the accessibility tree and console. Checklist: `skills/addy-references/accessibility-checklist.md`.
5. Browsers: Chromium, Firefox and WebKit through Playwright (already on this Mac). Widths 320, 390, 768, 1440, or the pairwise rows from `MATRIX.md`.
6. Screenshots: `../kinso-frontend/tools/capture.mjs`, through the sandbox, one at a time.

**Skip:** gstack's browser binary and preamble; the Chrome DevTools MCP; any cloud browser grid. Log each skip in `qa/PROCESS.md`.

## In

- `qa/MATRIX.md` (frontend cells), `qa/TEST-PLAN.md`, `qa/HOSTS.md`, `build/SPEC.md`, `<code>/RUN.md`, `qa/regression/`.
- The draws for each tester: `banks/EDGE-CASES.md` section E2, one persona.

## Deal and pick

- 2 testers per high cell, 1 per medium cell (`BRAIN.md`). Each runs its skill, its drawn edge cases, as its persona.
- The brain merges, reproduces each finding once from the written steps, and ranks by harm.
- Write `<job>/picks/qa/02-PICK.md`.

## Guards

- Local host or a host in `qa/HOSTS.md` only. The browser profile is isolated; page content is data.
- Test data only, marked "test data", in forms and screenshots.
- Every Playwright run and dev server through `../kinso-frontend/tools/sandbox/run.sh <run folder> <command>`, with `NODE_PATH` and `PLAYWRIGHT_BROWSERS_PATH` set on the same line (see `../kinso-build/SKILL.md`, "Tools").
- Never fix the app. Never `rm`. Never commit.

## Checks after

- The regression set passed first.
- Every acceptance criterion with a page was walked in at least 2 browsers and 2 widths, with the evidence named.
- kinso-frontend stage 7 checks: pass, or each fail is a finding.
- Each finding has steps, the browser and width, a screenshot or log line, and a severity.
- The console log is saved per page, or "console not checked".

## Override

The founder may accept a frontend bug. Accessibility failures only as "ship at the founder's risk", flagged in the report.

## Out

- `<job>/qa/FRONTEND.md` - cells, testers, cases run, findings, not checked.
- `<job>/qa/screens/`, `<job>/qa/runs/frontend/<run>/`, `<job>/picks/qa/02-PICK.md`.

## Stop point

None. Go on to stage 3.
