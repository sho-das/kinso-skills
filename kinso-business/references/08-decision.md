# Stage 8 - Decision and handoff

Both tracks. No web. Paths are from the `kinso-business/` folder. How the brain works: `BRAIN.md`.

## Runs

Each skill is followed as its own `SKILL.md` says, read in place.

1. `skills/plan-ceo-review/SKILL.md` - Step 0 only: premise challenge, cost of doing nothing, dream state, alternatives. Its engineering review sections and its mode rule (counts code files) do not fit.
2. `skills/startup-design/references/verification-agent.md`, `honesty-protocol.md`, `output-specs.md` - 7 universal checks, cross-file number checks, verdict bands, kill criteria (5 to 7 stop lines).
3. `skills/doubt-driven-development/SKILL.md` (reads `skills/addy-references/`) - pass the decision and the files, never the brain's reasons; 3 cycles at most.
4. `skills/santa-method/SKILL.md` - 2 reviewers, same rubric, no shared context; both must pass.
5. `skills/investor-materials/SKILL.md` - the investor view, only if stage 5 picked a raise.

**Skip:** the gstack preamble, PostToolUse hook, Codex outside voice and `skills/gstack-shared/bin/`; Addy's cross-model CLIs (paid). Announce each skip in `PROCESS.md`, as Addy's skill asks.

## In

- Job folder: `START.md`, `VERDICT.md`, all of `business/` (stages 1 to 7), `business/NUMBERS.md`, `picks/business/`, `OVERRIDES.md`.
- Numbers ledger: read `business/NUMBERS.md` first. Use its rows as they stand, add each new key number, and log every change (old value, new value, reason). Rules: `BRAIN.md`, "Numbers ledger". Stage 8 sets no new numbers; it only checks them.
- Shared rules (`../RULES-RESEARCH.md`): facts only; free only; never a `-contributor` model; user override (CORE section 8).
- Numbers inside skill files are not sources (`STUDY.md` finding 2).

## Deal and pick

Deal **3 decisions**, each argued in full by a fresh voice that sees only the stage files:
- **Stop** - the small move.
- **Build** - as planned in stage 7.
- **Change** - the sideways move, with the change named (a region, a price, a scope or a buyer).

No random draw here: the roles are fixed. The brain writes its own position first, then reads the 3.

Rubric, 0-3 per row, max 18: numbers hold across stages 1 to 7 (each stage file agrees with `NUMBERS.md`); evidence (Data, not Guess); unit economics work in the region (stage 2 P50); guards (no open red item, a pause plan for orange); kill criteria (5 to 7 measurable stop lines set before launch); overrides (each listed, with how the decision changes without it).

Then 2 reviewers, each a fresh session the orchestrator starts, score the pick (santa-method; ids in the PICK, CORE section 4). Both must pass. Max 3 rounds, then the founder decides. Write `<job>/picks/business/08-PICK.md`.

## Guards

- Not financial or legal advice. The decision is the founder's.
- No outcome promises (income, health, growth).
- Every stage 6 red flag and every "proceed at founder's risk" item appears in `DECISION.md` and every handoff file.
- Never invent a price, salary, raise or result to make a case work.

## Checks after

- Every number is tagged: [Source], [Stage], [Start], [Calc] or [Guess], and matches its stage file.
- **Numbers ledger check.** Every key number (as defined in `BRAIN.md`) in `DECISION.md` and the 4 handoff files matches its row in `NUMBERS.md`: same value, unit and tag, with the row ID. A [Calc] number shows its sum from ledger rows. A key number with no ledger row is a fail: add the row with its source, or remove the number. Write the check as a table in `picks/business/08-PICK.md`: number, file and line, ledger ID, match yes or no. Stale items (an earlier file that shows an old value, an old "[Pending stage N]" placeholder, or a date or test line that differs from the ledger) also go in a table in `08-PICK.md`, with file, line, old text, ledger row. `DECISION.md` stays written for the founder: its flags get one line per stale file (file name, number of stale items, "details in 08-PICK.md"), and a stale item gets its own line in `DECISION.md` only when it changes what the founder does (for example a date that lets the build start before the test is read). The audit tables never go in `DECISION.md`.
- **Pointer check.** Run `tools/check-pointers.py` on the job folder (`BRAIN.md`, "Pointers into another file"). Every result that is not OK goes in the stale table in `08-PICK.md`.
- The brain re-computes the key sums (margin, payback, runway, AI cost per user).
- Model prices and region rules still carry their official link and date.
- The full list of claims we must not make (`RISK.md` section 5) is copied word for word into `DECISION.md`, `handoff/PROMOTE.md`, `handoff/PRODUCT.md` and `handoff/TEST-PAGE.md`. Never a pointer to another file, never a shorter list: kinso-frontend reads only its own handoff files.

## Override

As in `../RULES-RESEARCH.md` section 7. `DECISION.md` lists every row in `OVERRIDES.md` and says how the decision would differ without it.

## Out

- `business/DECISION.md` - build, change or stop; the numbers and assumptions; stop lines; overrides; flags. Written for the founder: the decision and the next 3 actions with dates come first; check tables live in `picks/business/08-PICK.md`.
- `handoff/BRIEF.md` (kinso-build) - first version, riskiest assumption, metric, limits (time, money, model), and the platforms from `START.md` (kinso-build stage 1 confirms them).
- `handoff/PRODUCT.md` (kinso-frontend stage 2) - product facts in its format.
- `handoff/TEST-PAGE.md` (kinso-frontend) - facts for a fake door page, when the next test is a page.
- `handoff/PROMOTE.md` (kinso-promote) - buyer, tiers and prices, the one edge, claims we must not make.

## Stop point

Yes. Show the decision, the 3 options, the score table and the reviewers' result. Wait for the founder's OK before the handoffs are used.
