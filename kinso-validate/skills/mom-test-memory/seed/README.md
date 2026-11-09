# discovery/

Your customer-discovery evidence base. Plain markdown, tracked in git by default, read and written by the `mom-test-*` skills.

| File | What it holds | Who writes it |
|---|---|---|
| `assumptions.md` | Falsifiable beliefs about your customer, in priority order | `mom-test-memory init/record`, `mom-test-gate` (append only; status/evidence/updated cells edited in place) |
| `segments.md` | One row per interview: who they were and their unprompted top problem | `mom-test-memory record` |
| `decisions.md` | Product decisions and the interviews that justify them | `mom-test-gate` when you accept a verdict |
| `interviews/` | One file per real conversation | `mom-test-memory record` (append only; never rewritten) |
| `practice/scores.md` | Roleplay scores | `mom-test-roleplay` (append only) |

## Conventions

- **IDs.** Assumptions are `A<n>`, `n` = highest existing + 1. Never renumbered. Row order is priority; reorder rows freely, IDs stay.
- **Evidence tags.** Facts live only in interview files, tagged `[A3+] rung 13 "quote"` (supports A3) or `[A3-] rung 8 "quote"` (contradicts A3). The index is `grep -rn '\[A3[+-]\]' discovery/interviews`.
- **Rungs** are the evidence ladder: 1–7 no evidence, 8–15 problem is real, 16–19 solution is wanted.
- **Status.** `UNTESTED · SUPPORTED · WEAKENED · KILLED`. `KILLED` is sticky.
- **Riskiest assumption** = first row whose status is `UNTESTED` or `WEAKENED`.
- **Slugs** are role or company, never a person's name. Names appear only inside the file.
- **Roleplay is not evidence.** Practice writes only `practice/scores.md`.

## Tracked or ignored?

Tracked (default): teammates see the evidence, decisions are diffable, `mom-test-gate` works for everyone. Ignored: real names and quotes stay off the remote. Pick at `init`; change later by editing `.gitignore`.
