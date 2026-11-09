# Stage 0 - Read the job

Read `../RULES-RESEARCH.md` and `BRAIN.md` first. Paths are from `kinso-promote/`. Every later stage stands on the 3 files this stage writes.

## Runs

- No outside skill. This is the brain's own stage: it reads, it does not write copy.
- One fresh checker (a new session that did not write the files) reads `FACTS.md` against the source files at the end.

## In

- **Full chain:** `START.md`, `handoff/PROMOTE.md` (buyer, tiers, the one edge, claims we must not make), `handoff/PROMOTE-BUILD.md` (what was built, real screenshots under `build/screens/`, real limits), `handoff/PRODUCT.md`, `business/PRICING.md`, `business/RISK.md`, `business/DECISION.md`, `market/RIVALS.md`, `market/DISTRIBUTION.md`, `OVERRIDES.md`, the product repo or page.
- **Any launch:** the start answers in `START.md`, plus the repo, site or brief you give. No handoff files: say so in `GAPS.md`.
- **One piece:** the same as Any launch, but read only what that one piece needs.
- A file that is missing is a gap, never a guess.

## Deal and pick

- Nothing is dealt. Facts are not options.
- Still write `<job>/picks/promote/00-PICK.md`: the seed base `<job>-promote`; each stage adds `-NN` (CORE section 5). Also the way in, and the files read with their dates.

## Guards

- Shared guards from `BRAIN.md`: never post, like, message or schedule; never your main accounts; no claim from `MUST-NOT.md`; no invented numbers, quotes, users or testimonials; platform rules; free only; local tools only from `TOOLS.md`, nothing installed without your OK.
- A fact enters `FACTS.md` only with its file and line. "The product is fast" with no source line stays out.
- A line in `PROMOTE.md` "may say" and a line in `RISK.md` or `MUST-NOT` that disagree: the must-not wins, and the clash goes in `GAPS.md` as a question for you.
- A build fact counts only if `PROMOTE-BUILD.md` ties it to a test that passed. A feature with a failed or missing test goes in `GAPS.md`, not `FACTS.md`.
- Screenshots: only real ones from `build/screens/`. Test data stays marked as test data.
- Rival names may go in `FACTS.md` as context, never as a claim about the rival.
- Project facts are not public facts. A deadline, a hackathon or an internal plan is marked "internal" and kept out of public text.

## Checks after

- Every row in `FACTS.md` has a source file and line, and a date where the fact can age (price, rule, version).
- No row of `FACTS.md` matches a row of `MUST-NOT.md`, word for word or in meaning (the MUST-NOT scan in `BRAIN.md`).
- The banned word list in `MUST-NOT.md` holds only words that are a claim on their own (a name, a number, "premiado", "proves", "desde" followed by a year). Ordinary words that are part of the product name or of plain speech (for example "Vó" in "Casa da Vó", "casa", "caseiro", "tradicional" as a style of food) are not banned words; they go in a separate "check meaning" list, judged by a reader, never by grep alone.
- Every "not decided" item (price, launch date, logo, a person's story) is in `GAPS.md`, not `FACTS.md`.
- Approved wording is copied exactly, with the client's spelling (for example a product name's capitals).
- No humanizer or clear-English pass on `FACTS.md`: facts keep their source wording.

## Override

You can add a fact or move one out of `GAPS.md`. The brain shows the source (or that there is none) once, asks you to confirm, tags the row "user override", and adds a row to `OVERRIDES.md`. A must-not item moves only "at the founder's risk" and stays flagged in `REVIEW.md`.

## Out

- `promote/FACTS.md`: table of fact, exact wording, source file and line, date, public or internal.
- `promote/MUST-NOT.md`: every claim we must not make, from `PROMOTE.md`, `RISK.md`, `PROMOTE-BUILD.md` limits and `OVERRIDES.md`, with the banned words to scan for (for example "proves").
- `promote/GAPS.md`: what is not decided or not found, and who decides.
- `<job>/picks/promote/00-PICK.md`.

## Stop point

None of its own. On the Full chain and Any launch ways, the start-question stop (`SKILL.md`) comes first; show `GAPS.md` there if it holds a must-decide item.
