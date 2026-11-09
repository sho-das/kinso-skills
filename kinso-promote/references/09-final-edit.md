# Stage 9 - Final edit and review

Read `../RULES-RESEARCH.md` and `BRAIN.md` first. Paths are from `kinso-promote/`. Runs on every text from stages 2 to 8, and on the wording of `promote/AUDIENCE.md` from stage 1.

## Runs

Each skill is followed as its own `SKILL.md` says, read in place.

1. `skills/humanizer/SKILL.md`: on every text, with the full list of 26 patterns (`BRAIN.md` "Writing that sounds human" step 8). Write a new section in `promote/HUMANIZER.md` headed with the stage, run and date, with **one full 26-row table per text** on the text as it stands after the kept edits. A hits-only list or an "other patterns clear" row fails the stage. Keep the voice card from `promote/PROCESS.md`.
2. `skills/clear-english/SKILL.md`: on every text when readers are mixed (`START.md`).
3. `skills/copy-editing/SKILL.md` with `references/plain-english-alternatives.md` and `references/checklist.md`: its sweeps.
4. Then a **fresh reviewer**: a new session the orchestrator starts, that wrote nothing in this job (CORE section 4).
5. Vale with a Kinso style, only once you approve the install (`TOOLS.md`).

Skip: humanizer `scripts/validate-package.py` and `agents/openai.yaml`.

## In

- Every file under `promote/`, plus `promote/FACTS.md`, `promote/MUST-NOT.md`, `promote/PROCESS.md`, `OVERRIDES.md`, voice samples from `START.md`.

## Deal and pick

- No new content is dealt. This stage edits.
- **Per text, 2 edit passes are dealt:** humanizer and copy-editing each propose their edits separately.
- **Pick per edit, not per pass.** An edit is kept only if it removes an AI tell or a plain-English problem and changes no fact, number, claim or approved wording. A tie goes to the smaller change.
- **Rubric (0 to 3 per text):** meaning kept; facts kept; voice kept (compared with your samples); tells removed.
- Write `<job>/picks/promote/09-PICK.md`: per file, the edits kept and dropped, with the reason.

## Guards

- Shared guards from `BRAIN.md` (never post, like, message or schedule; never main accounts; no MUST-NOT claim; no invented numbers, quotes, users or testimonials; platform rules; free only; local tools only).
- The edit never adds a claim, a number or a call to action.
- Never flatten the voice. Line breaks, emoji and words from your samples stay. An edit that would change voice is listed as a suggestion, not applied.
- Approved wording (bios, product names, legal lines) is never edited.
- Non-English text: humanizer and clear-English apply only where the skill says it fits the language; a native speaker check stays required.

## Checks after (the fresh reviewer)

- Facts: every claim in every file traces to a `FACTS.md` row; numbers match.
- MUST-NOT scan: word list and meaning check on every file, image text and voice-over.
- No invented numbers, quotes, users, testimonials, logos or links.
- Character, hashtag, size and length limits per platform, with the dated source. Before calling a limit "unread", the reviewer makes one collector `fetch` or `search` for it (the platform's own help or developer page). A platform page that says there is no fixed limit counts as read: write "no fixed limit (page, date)" and the count. A limit no platform page states after that one call is "unread (call made, date)" in `GAPS.md`; the text then stays under the stricter of the skill's number and the old [Guess].
- Links real or marked slots; no `#` links.
- **Carousel fact-only count** (`05-social.md` definition): count the fact-only slides yourself, at most 1. A name-and-handle end card counts. With 2 or more, the allowed edit is a merge of the facts onto one slide (no fact added or dropped); otherwise send it back to stage 5.
- **Numbers other files quote** (`BRAIN.md` checks after): after the edits, recount by script every character count, word count, slide number, slide count, hashtag count and FACTS row list that `LAUNCH-PLAN.md`, `LAUNCH-KIT.md`, `REVIEW.md` and the PICKs state about a text, and fix each stale one in place with a diff. Write a table in `REVIEW.md`: file and line, number stated, number counted, fixed. This runs even when the stage changed no text, because an earlier rerun (stage 5 without stage 6) can leave the plan behind.
- **Humanizer tables complete:** each text checked has a table with 26 numbered rows in this run's section of `HUMANIZER.md`.
- No posting, scheduling, sending or messaging step anywhere.
- No em dashes.
- AUDIENCE check (`BRAIN.md`): each file names the AUDIENCE.md rows it follows; no file plans a cut format, platform or place; the plan's time fits the hours row.
- Every override in `OVERRIDES.md` is listed, and every "at the founder's risk" item is flagged.
- Sounds human and useful: every post and the blog body score 7 or more on both from a fresh judge after the edit (`BRAIN.md` "Useful to act on"); an edit that lowers a score is undone.

## Override

As in `BRAIN.md`. A MUST-NOT item never goes in a public text, whatever the override (CORE section 8 item 10). An override keeps it only in a private planning file, flagged in `REVIEW.md` and in `LAUNCH-KIT.md`.

## Out

- The edited files, in place, with a diff per file in `promote/edits/`.
- `promote/REVIEW.md`: every check, every override, every flag.
- `promote/LAUNCH-KIT.md`: one index of each file, where it goes, when, and who posts it (always you).
- `<job>/picks/promote/09-PICK.md`.

## Stop point

Yes. The final kit. You post, by hand.
