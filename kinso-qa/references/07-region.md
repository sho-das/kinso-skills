# Stage 7 - Region

Read `BRAIN.md` first. Paths are from `kinso-qa/`.

## Runs

1. `skills/i18n-sync/SKILL.md` (ECC) - locale files: missing keys, unused keys, placeholders that differ between languages. **Checking only:** it never translates or edits locale files in a QA run.
2. Screens per locale: `../kinso-frontend/tools/capture.mjs` with the locale argument (for example `de-DE`, `ar-EG`, `hi-IN`, `ja-JP`), through the sandbox, plus Playwright with `timezoneId` and `locale` set.
3. Time zone and date maths: `skills/property-based-testing/skills/property-based-testing/SKILL.md` (Trail of Bits) on date code, across time zones and daylight-saving days. Read only.
4. Data-law limits: the rules come from `<job>/business/RISK.md` and `market/REGION.md` (kinso-business and kinso-validate), never from memory. Where they say nothing, the case is "not checked - no source".
5. High cells: i18n-sync with the captures, and property-based-testing on dates, as the 2 testers.

**Skip:** machine translation, paid locale services. Log each skip in `qa/PROCESS.md`.

## In

- `qa/MATRIX.md` (region cells), `qa/INTAKE.md` (regions), `<job>/START.md` (region), `business/RISK.md`, `market/REGION.md`, the locale files, `<code>/RUN.md`, `qa/HOSTS.md`.
- Draws: `banks/EDGE-CASES.md` section E7, one persona (often "the far-away user").

## Deal and pick

- As `BRAIN.md`. Write `<job>/picks/qa/07-PICK.md`.

## Guards

- Facts only from the inputs: a data-law rule without a source in `RISK.md` or `REGION.md` is never asserted. The report says "not checked - no source".
- Test data names and addresses are made up for each region and marked "test data".
- Through the sandbox. Never `rm`. Never commit.

## Checks after

- Each test language: no missing keys, no raw key names on screen, no clipped text at 390 and 1440.
- Right-to-left (when a test language needs it): the layout mirrors.
- Dates: "due today", "overdue" and similar states are right at 23:30 in at least 2 time zones and on a daylight-saving day.
- Currency and number formats follow the locale; no money maths in floating point (a finding if seen).
- Each data-law item from `RISK.md` has a check, or "not checked" with the reason.

## Override

The founder may drop a language or region. Data-law findings can only become "ship at the founder's risk" and stay flagged.

## Out

- `<job>/qa/REGION.md` - locales, time zones, currencies, data-law items, findings.
- `<job>/qa/screens/region/`, `<job>/qa/runs/region/<run>/`, `<job>/picks/qa/07-PICK.md`.

## Stop point

None. Go on to stage 8 (AI tracks) or 9.
