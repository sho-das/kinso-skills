# kinso-business - The brain

27 October 2026. One page. Source: `../CONDUCTOR-PLAN.md` and `STUDY.md` section 0.

## How it works

The real skills in `skills/` do the work, each in its own way. Shared loop, judge, seed, scale, paths and override: `../BRAIN-CORE.md` (CORE). Below: what stays local. The brain does 5 things around them:

1. **Before** - passes the job folder (`business/NUMBERS.md` first, then `START.md`, `VERDICT.md`, `market/`, earlier `business/` files, `OVERRIDES.md`) and the shared rules in `../RULES-RESEARCH.md`: facts only, dated official sources, free only, never a `-contributor` model, the collector at its 30-second pace, user override (CORE section 8).
2. **Deal** - asks for 3 options with fixed roles: **Small**, **Ideal** and **Sideways**. Each option names the skill or framework it came from.
3. **Pick** - a fresh judge the orchestrator starts scores each option 0-3 per rubric row (CORE sections 4 and 6), keeps a winner and a backup, and writes `picks/business/NN-PICK.md`.
4. **Check after** - facts and sums only. Every number has a source, a stage file, a founder input or [Guess], and every key number matches its row in `business/NUMBERS.md`; the maths is re-done; model prices and region rules come from official pages with a date. The brain fixes a failure or sends it back to the skill, and logs it in `PROCESS.md`.
5. **Clash** - when a skill's rule breaks a shared rule (a paid tool, a made-up number), the shared rule wins and the clash is logged.

**The checks never flatten.** They do not rewrite a skill's wording, method, structure or length into one house voice. They check facts, sums, sources, guards and flags only.

**Never blend.** If the 3 options come back near the same (same model, price within 20%, same scope), the deal failed: re-deal the Sideways slot with the redraw seed `-r<n>` (CORE section 5). A named mix is allowed only if `PICK.md` says which part came from which option.

**Random only for Sideways.** The Sideways option is a seeded draw from the stage's pooled library, excluding what the first 2 used. Seed `<job>-business-NN`, drawn by CORE section 5; a re-run gives the same draw, a re-deal adds `-r<n>`. It must still win on the rubric.

**Exceptions.** Stage 6 deals nothing: 2 separate passes, and a rule found by either counts. Stage 8 deals Stop, Build and Change with no random draw.

**Numbers in skill files are not sources** (`STUDY.md` finding 2). Benchmarks, salaries and price tables inside skills are tagged "benchmark, unsourced, from <file>" and checked against a dated public page.

## Stage order

Run order: **1, 3, 4 (AI track only), 2, 5, 6, 7, 8.** The stage numbers are names, not the order. Stage 2 needs the stage 3 costs and the stage 4 AI cost to work out margin, payback and break-even. Never run a stage beside the stage it reads from. Fix logged in `FIXES.md` (2026-10-27, numbers drift).

## Numbers ledger - `business/NUMBERS.md`

One file holds every key number in the job. A key number is any number that another stage or a handoff uses: prices and tiers, fees (card, store, platform), fixed cost per month, variable cost per unit, hours, rates, budget, burn, runway, CAC, LTV, payback, margin, break-even, AI cost per user, raise size, and any fine or threshold that changes scope.

```
# NUMBERS - <job>

| ID | Name | Value | Unit | Tag | Source | Set by |
|---|---|---|---|---|---|---|
| card-fee | Card fee per payment | 2.9% + 0.30 | USD per payment | [Source] | https://... read 2026-10-27 | 3 |

## Changes
| Date | ID | Old value and tag | New value and tag | Reason | Stage |
|---|---|---|---|---|---|
```

1. **Read first.** Every stage reads `NUMBERS.md` before its own inputs.
2. **Use as it stands.** A number already in the ledger is used with the same value, unit and tag, with its ID after it, for example "USD 49 [Stage] (N:price-race)". Never re-derive it, never re-tag it.
3. **Write new numbers.** Each new key number gets a row before the stage file is finished.
4. **One owner.** Each number is set by one stage: price and tiers 1; costs, fees, burn, runway and cash left after the build 3; AI cost per user 4; CAC, LTV, margin, payback and break-even 2; raise 5; rule thresholds 6; the first test (organisers asked, pass and fail lines, test dates, test hours, pre-pay) 7. A stage that needs a number its owner has not set yet writes "[Pending stage N]" and does not work it out. When the owner's row already exists (a re-run), point to the row; never write "[Pending stage N]" for it. A row owned by a later stage in the run order is named by its ID only, never its value (for example "CAC: see N:cac-small, stage 2"), so a later change cannot leave the earlier file stale. Rows owned by the same or an earlier stage are quoted with value, tag and ID. A number worked out only from one stage's rows belongs to the earliest stage that works it out, and gets one row only: a later stage quotes that row and never adds its own row for the same sum (two owners for one number make one of them stale). A pointer into another stage's file follows "Pointers" below. A stage before 7 that suggests a test or a gate gives it no count and no date of its own; it writes "[Pending stage 7]". A [Guess] row from an earlier stage is replaced by its owner.
5. **Changes are logged.** A stage that changes a value or a tag updates the row and adds a Changes row: old value and tag, new value and tag, reason. It lists in `PROCESS.md` the earlier files that still show the old value. A stage that rewrites a file named as stale in a note under the Changes table updates that note in the same run. A clash with a row owned by a later stage is logged in `PROCESS.md` and in the note under the Changes table, never in the stage's business file or `PICK.md`: the later stage fixes it and clears the note, and the earlier file does not go stale. This holds for a closed clash too: no business file or `PICK.md` says a clash was found, is open or was closed, not even in a "Changed" or history line. The stage that closes a clash (a) deletes the clash's lines from the note, so the note lists only open clashes, and (b) greps every `business/` file and `PICK.md` for the clash words ("clash", "conflict", the clashing row ID); each hit that describes the clash is cut (wording only, no number changes), and each cut is logged in `PROCESS.md` with file and old text. Fix logged in `FIXES.md` (2026-10-27, closed clash text).
6. **Every break-even value has a row.** A break-even printed anywhere (a scenario, a ±30% case, a "50% worse" assumption, a buffer or one-off variant) is a named variant row in `NUMBERS.md` (for example `breakeven-price-m30`) and is quoted with its ID. A sensitivity line with no row is a fail. Fix logged in `FIXES.md` (2026-10-27, sensitivity break-evens).
7. **Tags.** [Source] needs a link and the date read. A third-party copy of an official number says so in Source. A page served for another country is not a source for this region.
8. **No ledger yet** (an older job folder): the first stage to run creates it and back-fills the key numbers from the existing `business/` files, with "Set by" = that file's stage.

## Pointers into another file

A pointer goes stale when the stage that owns the target file re-runs and moves or drops the text, and the pointing stage does not re-run. So every pointer carries its own proof, and every stage checks the pointers before it finishes.

1. **Prefer the row.** A number from another stage is named by its ledger ID (rule 4), not by a section pointer.
2. **Anchor.** A pointer into another file names the file, the section and a short quote (3 to 8 words) copied word for word from that section: `PRICING.md section 3 ("1 to 4 per club")`. Never a line number. A pointer with no anchor is a fail.
3. **Check after.** Before the stage file is finished, run `tools/check-pointers.py` through the sandbox on the job folder (`run.sh "<job>" python3 "<kinso-business>/tools/check-pointers.py" "<job>"`). Fix every MISSING, NO-SECT, NO-ANCHOR or LINE result in this stage's own files: re-point to where the fact is now, quote the fact itself, or drop the pointer. A bad pointer in another stage's file goes in `PROCESS.md` and the note under the Changes table, as rule 5 says. Paste the tool's last line ("Pointers: N. Not OK: M.") into `PROCESS.md`.
4. **Notes are claims too.** A note under the Changes table that says what another file holds ("names stage 5 rows by ID only") is re-checked against that file by grep in the same run, or cut to what this stage checked.

## Where a stage writes

A stage writes only inside the job folder (in a test: its run folder). Never the scratchpad, `/tmp`, the home folder or another run. Helper files (grep lists, pattern files) go in the job folder too. The shell's working folder is not the job folder: every path in a command is absolute and inside the job folder, and a shell redirect (`>`, `>>`, `tee`) is used only to such a path. A file written outside by mistake is logged in `PROCESS.md` with its path, never deleted. Fix logged in `FIXES.md` (2026-10-27, helper files outside).

## Region language on the web

Every collector search passes `--lang <search language>` from `START.md` (for example `--lang en-US`). No search language in `START.md` = the region's main language, noted in `PROCESS.md`. A fetched page that redirects to another country (another currency, or a path such as `/in/`) is not a source for this region: write "served for <country>", then try the region's own page, then a `--lang` search snippet from the official domain (tagged as a snippet), else [Guess].

## PICK.md template

```
# kinso-business stage NN - Pick

Date: YYYY-MM-DD. Track: AI or regular. Seed: <job>-business-NN[-r<n>]. Hash (8 hex): . mod: . Menu: <file, sha256 12 hex>.

## Options dealt
| Role | Option | From (skill or framework, path) | Fresh session (agent or call id) |
|---|---|---|---|
| Small | ... | ... | yes - <id> |
| Ideal | ... | ... | yes - <id> |
| Sideways | ... (drawn from: <list>; excluded: <list>) | ... | yes - <id> |
| Judge | - | - | yes - <id> |

## Scores (0-3)
| Row | Small | Ideal | Sideways |
|---|---|---|---|
| <rubric row> | n - reason | n - reason | n - reason |
| Total | | | |

## Pick
Winner: ... Backup: ...
Reason: the rows that decided it (a total never decides alone).
Mix, if any: which part from which option.

## Checks after
Failed and fixed: ... Sent back to the skill: ... Clashes: ...

## Overrides
Rows added to OVERRIDES.md this stage, or "none".
```

## The two tracks

| | AI track | Regular track |
|---|---|---|
| When | The product calls an AI model (a wrapper, an agent, an open model) | No AI inside the product |
| Stages (run order) | 1, 3, 4, 2, 5, 6, 7, 8 | 1, 3, 2, 5, 6, 7, 8 (stage 4 skipped, noted in `PROCESS.md`) |
| Extra | `business/AI-COSTS.md`: cost per user per model, break point; AI cost feeds stage 2 margin and stage 7 scope | AI rows left out of stages 2 and 3 |
| Extra guards | Model data terms (no training on user data); EU AI Act screen when EU users | - |

The track is set by start question 1 and confirmed at the first stop point.
