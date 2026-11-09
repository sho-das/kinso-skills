---
name: mom-test-memory
description: >
  Persistent customer-discovery memory for The Mom Test skills. Creates and maintains a
  discovery/ folder of plain markdown in the user's repo (assumptions, segments,
  decisions, interviews, practice scores) so prep, debrief, gate, and league compound
  across conversations. Use when the user says "init discovery", "set up discovery
  memory", "record this interview", "save this debrief", "discovery status", "what have
  we learned so far", "which assumptions are still open", or wants the sample data to see
  how the loop works. Subcommands: init [--example], status, record.
---

# Mom Test — Memory

Operates on `./discovery/` relative to the current working directory. No other location.
This skill's directory contains `templates/` (empty scaffold) and `seed/` (a complete
sample: a founder exploring no-show reduction for small specialty clinics).

Parse the first word of the user's arguments as the subcommand. No subcommand → `status`
if `discovery/` exists, else explain the three subcommands and offer `init`.

## Conventions (shared by every mom-test skill that touches `discovery/`)

- **IDs.** Assumptions are `A<n>`, `n` = highest existing + 1. Never renumbered. Row order
  in `assumptions.md` is priority order; rows may be reordered by the user, never by a
  skill. Skills may append rows, never delete them.
- **Evidence tags.** Facts live only in interview files, as
  `[A3+] rung 13 "quote"` (supports A3) or `[A3-] rung 8 "quote"` (contradicts A3).
  Index: `grep -rn '\[A3[+-]\]' discovery/interviews`. The `evidence` cell in
  `assumptions.md` lists the interview basenames (no extension) that carry a tag for that id.
- **Rungs.** 1–7 no evidence · 8–15 problem is real · 16–19 solution is wanted.
- **Status.** `UNTESTED · SUPPORTED · WEAKENED · KILLED`. Merge rule for a per-interview
  verdict into the global cell: `KILLED` is sticky; within one `record` call any
  `WEAKENED` beats any `SUPPORTED`; across calls the later call wins; `UNTOUCHED` never
  changes the cell. `updated` = date of last change.
- **Riskiest assumption** = first row whose status is `UNTESTED` or `WEAKENED`. If none,
  say the list is exhausted.
- **Segment link.** `assumptions.md` has a free-text `segment` cell matched against the
  `role` column of `segments.md`.
- **Write discipline.** Append-only: `interviews/`, `decisions.md`, `practice/scores.md`.
  In `assumptions.md`, edit in place only the `status`, `evidence`, `updated` cells. In
  `segments.md`, append or update rows. Never rewrite anything else.
- **Slugs** are role or company (`2026-09-04-derm-office-manager.md`), never a person's
  name. Names may appear only inside the file.
- **Roleplay is not evidence.** Practice writes only `practice/scores.md`.

## `init [--example]`

1. If `discovery/` exists, create only the files that are missing and list what you
   skipped. Never overwrite.
2. Copy: without `--example`, `cp -r <this skill dir>/templates/. ./discovery/`; with
   `--example`, `cp -r <this skill dir>/seed/. ./discovery/`. Resolve "this skill dir"
   from the path of this SKILL.md.
3. Ask one question: **"Keep `discovery/` tracked in git? It will contain real names and
   quotes. [Y/n]"** On `n`, append `discovery/` to `./.gitignore` (create if missing; skip
   if the line is present).
4. Offer: **"Add a routing hint so your coding agent checks `discovery/` before building
   features? [Y/n]"** On yes, write this agent-neutral hint to **`AGENTS.md`** (create if
   missing; skip if the marker line is present) — `AGENTS.md` is the cross-tool
   convention that Claude Code, Codex CLI, Cursor, and others read as repo instructions,
   so this works regardless of which agent the founder is using. Copy the block below
   verbatim, word for word — don't paraphrase it:

   ```
   <!-- mom-test -->
   `discovery/` holds customer-discovery evidence for this project (see discovery/README.md).
   Before building a feature, check `discovery/assumptions.md` for the evidence behind it:
   how many real conversations support it and at what evidence rung (8+ = problem is real,
   16+ = solution is wanted). If a mom-test-gate skill is available, use it; otherwise reason
   about it directly from `discovery/assumptions.md` and `discovery/interviews/`.
   ```

   Also append the same block to **`CLAUDE.md`**, but only if `CLAUDE.md` already exists
   in the project (its presence signals a Claude Code user; never create it from
   scratch — `AGENTS.md` is the one guaranteed to help everyone).
5. Print the folder tree and, if `--example`, three things to try:
   `/mom-test-memory status` · `/mom-test-gate build one-click deposit charging` ·
   `/mom-test-prep derm office manager, call Thursday`.

## `status`

Read `assumptions.md`, `segments.md`, `decisions.md`, every file in `interviews/`, and
`practice/scores.md` if present. Report:

```
DISCOVERY STATUS — <n> interviews, <n> assumptions, <n> decisions, <n> practice runs

Assumptions:  UNTESTED <n> · SUPPORTED <n> · WEAKENED <n> · KILLED <n>
Riskiest:     A<n> "<assumption>"   (or: list exhausted)

Segments:     <role>: <n> interviews, <n> name "<top problem>" unprompted → REAL / not yet
              (rule: 3+ same role, same unprompted top problem)

Evidence check (re-derived from [A<n>±] tags in interviews/):
  A<n>: cell says [<basenames>]; grep finds [<basenames>] → OK / MISMATCH
  (list only mismatches, or "all cells match")

Latest decision: <date> — <decision> (<verdict>)
Next: <one sentence: which assumption to test with whom>
```

## `record`

1. Use the most recent `mom-test-debrief` output in this conversation. If there isn't
   one, ask for the notes or transcript and run `mom-test-debrief` first (it reads
   `assumptions.md` and tags facts with existing ids).
2. For each conversation in the debrief (batch debriefs have several, in listed order):
   - Build the interview file from `interviews/_template.md`: header (`date`, `role`,
     `segment attrs`, `source: call | notes`), `## Facts` (tagged lines from the debrief's
     facts, plus untagged ones), `## Verdicts`, `## Surprises`, `## Follow-up`.
   - Basename `YYYY-MM-DD-<role-slug>`. If a file with the same date and role exists,
     ask: **"`<basename>` already covers this. Write anyway as `-2`? [y/N]"** Default N
     writes nothing for that conversation.
   - Append one row to `segments.md`: interview basename, role, attrs, top problem
     (unprompted), highest rung.
3. Update `assumptions.md`: for each `A<n>` verdict, apply the merge rule to `status`;
   add the basename to `evidence` if the file carries a tag for that id; set `updated`.
   Facts tagged with an id that doesn't exist: ask whether to append a new row
   (`A<max+1>`, `UNTESTED`, segment = this interview's role) or drop the tag.
4. Report exactly which files were created or changed, and the new riskiest assumption.

## Guardrails

- Never write outside `./discovery/`, `./.gitignore`, `./AGENTS.md`, and `./CLAUDE.md`.
- Never put a person's name in a filename.
- If the user pastes roleplay output and asks to record it, refuse: practice scores go to
  `practice/scores.md` via `mom-test-roleplay`; roleplay never becomes an interview.
