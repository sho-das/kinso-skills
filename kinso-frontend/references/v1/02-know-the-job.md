# Stage 2 - Know the job

Approved 2026-10-25 after testing (see `tests/stage2/RESULTS.md`: Hallmark scored 8.8 of 10 blind and found the most client facts, 25 of 35).

Sources: Hallmark pre-flight, anatomy and brand-truth (MIT, nutlope), Anthropic frontend-design (Apache 2.0), Impeccable `init` (Apache 2.0, pbakaus). Rewritten in our own words.

Read `../RULES.md` first. This file adds only the rules for this stage.

## Rules

- Mark every fact **given** (brief, project, research), **asked** (client answer) or **inferred** (ours).
- Repository evidence is a hypothesis, not the client's approval.
- No tech stack questions at this stage on a new page.

## Existing project

- Read `existing/MAP.md` first. The stack is read from the repo, not asked.
- Add 2 questions to the one message: which pages, components and flows must stay as they are, and what the client wants changed.

## Steps

1. **Pre-flight.** Read the project files and `research/RESEARCH.md` before asking anything. List what is known, with file names.
2. **Visitor and job.** Name the visitor and their one job on this page. Name the primary action, and a secondary one if any.
3. **Material inventory.** What real material exists (photos, logos, numbers, quotes, screenshots), and what is absent.
4. **Conflicts.** Flag any two sources that disagree, for example a "fictional name" in the brief against a real person in the project files.
5. **Ask once.** One message to the client. Ask only what changes the design, and cover this checklist where it is still unknown:
   - Who is behind it (team or founder), and what story the page may tell
   - How it works, step by step
   - Price, terms and limits (lock-in, fees, minimums, trials)
   - Platforms now, and what is coming later
   - What the client dislikes or wants to avoid
   - For places: menu and signature items, dietary needs, families and access
6. **Write the brief.**

## Output: `research/PRODUCT.md`

1. Product truth (each fact marked given / asked / inferred)
2. Visitor and their one job
3. Primary action (and secondary)
4. Constraints (language, devices, network, legal, brand do's and don'ts)
5. Positioning: what this product can truthfully claim that a neighbour could not
6. Unknowns (slots for the design)
7. Memorable thing (one line, marked as inference)
8. Inputs for Direction (5-8 concrete points)

Also save the questions and the client's answers, word for word, as `research/ANSWERS.md`. Later stages read it.
