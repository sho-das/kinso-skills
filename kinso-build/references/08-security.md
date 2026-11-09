# Stage 8 - Security

Read `BRAIN.md` first. Paths are from `kinso-build/`.

## Runs

1. Deal 2 independent reviews from these 4, each in a fresh session:
   - `skills/security-and-hardening/SKILL.md` (Addy; checklist in `skills/addy-references/security-checklist.md`);
   - `skills/security-review/SKILL.md` (ECC);
   - `skills/vibesec/SKILL.md` (VibeSec);
   - `skills/insecure-defaults/commands/audit.md` with `references/` (Trail of Bits; no SKILL.md).
2. `skills/fp-check/skills/fp-check/SKILL.md` (Trail of Bits) on each finding: prove it or drop it.
3. `skills/sharp-edges/skills/sharp-edges/SKILL.md` (Trail of Bits) only when the product exposes config or an API to others.
4. `skills/static-analysis/skills/semgrep/SKILL.md` (Trail of Bits) only if the founder approved installing Semgrep. Always `--metrics=off`, through the sandbox.

Trail of Bits folders are CC-BY-SA-4.0: read them, never edit them.

**Skip:** `skills/fp-check/hooks/`; the `workflows/`, `tests/` and `scripts/` in Trail of Bits folders; CodeQL. Log each skip in `build/PROCESS.md`.

## In

- `<code>/`, `build/SPEC.md`, `build/DATA-MODEL.md`, `build/API.md`, `build/DEPENDENCIES.md`, `<job>/business/RISK.md`.

## Deal and pick

- Who deals: the orchestrator (the session running the skill) starts each dealt option as its own fresh subagent, and the judge as one more fresh subagent with the option names hidden (CORE section 4). A runner never deals. Where no subagents exist (a plain API), run each option as a separate call with no shared history, and the judge as another. Name each agent id or call id in the pick.
- Seed `<job>-build-08`. Write the seed and the draw.
- Rubric, 0 to 3 per line: findings with file and line; proved or dropped (fp-check); severity; fix or accepted risk.
- Merge both reviews. A finding counts only after fp-check. Write `<job>/picks/build/08-PICK.md`.

## Guards

- Never push, deploy, commit or merge without the founder's OK.
- Secrets never in files. A found secret is removed from files and reported; its value is never copied into a report.
- Production data read-only. No attack is run against anything but the local host.
- Free only. Never a `-contributor` model. Semgrep only after its own scan and the founder's OK.
- Scripts only through the sandbox.

## Checks after

- The tests pass after each fix. The app starts.
- After any fix to headers, origin, host or form handling: one real browser run on the local host (Playwright through the sandbox) adds a property and a certificate and saves an edit. curl and unit tests alone do not prove a browser still works.
- No secrets in the repo or its history (grep; `git log -p` only if the repo has history). `.env` is ignored.
- Auth and input checks on every route. Input is escaped on every page (a `<script>` name shows as text). SQL uses parameters.
- Dependency licences and known advisories listed.
- Personal data handling matches `RISK.md`.
- The riskiest assumption's metric still counts after the fixes.

## Override

The founder may accept a risk "at the founder's risk". High-severity items stay red flags in stage 10 and in the handoff. Log in `<job>/OVERRIDES.md`.

## Out

- `<job>/build/SECURITY.md` - findings, proof, severity, fix or accepted risk.
- `<job>/build/options/security-A.md`, `security-B.md`, `<job>/picks/build/08-PICK.md`.

## Stop point

Yes, when a finding needs a decision (fix, accept or drop the feature). Otherwise go on to stage 9.
