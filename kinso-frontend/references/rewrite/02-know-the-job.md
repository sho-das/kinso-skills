# Stage 2 - Know the job

Approved 2026-10-25 after testing (see `tests/stage2/RESULTS.md`: Hallmark scored 8.8 of 10 blind and found the most client facts, 25 of 35).

Sources: Hallmark pre-flight, anatomy and brand-truth (MIT, nutlope), Anthropic frontend-design (Apache 2.0), Impeccable `init` (Apache 2.0, pbakaus). Rewritten in our own words.
Added 2026-10-26 from the coverage check (`coverage/02-COVERAGE.md`).
Added 2026-10-26 from the real check against the original skills (`../tests/v3/RESULTS.md`).

Read `../RULES.md` first. This file adds only the rules for this stage.

## Rules

- Mark every fact **given** (brief, project, research), **asked** (client answer) or **inferred** (ours).
- Repository evidence is a hypothesis, not the client's approval.
- No tech stack questions at this stage on a new page.
- `PRODUCT.md` holds product truth only. A colour, font or page idea appears only as a binding constraint the client gave, in their words.
- Brand colours and fonts come from the client, never from memory. Write each with its source (a file, or the client's own live site). To read a live site, fetch only its home page and its own CSS over https, never a private or local address. If you cannot, ask the client for the primary colour and fonts, or "no brand lock".
- Logos come from the client. Never redraw or recall one.
- Second run: if `research/PRODUCT.md` exists, update it. Do not re-ask confirmed facts. Ask only what is stale or missing.
- Client cannot be reached (batch run): mark every inference "inferred" and say so in the first line of `PRODUCT.md` and in the reply. Facts still stay slots.
- Keep the round to about 8 to 10 questions. Ask first what would change the page; leave out questions whose answer is likely "not decided" (logo, team story).
- Record dated facts (deadlines, launch dates) as product facts, even when the context around them is not page copy.
- Write the target widths (1440 and 390) and the `h1` line limit into Constraints.

## Existing project

- Read `existing/MAP.md` first. The stack is read from the repo, not asked.
- Add 2 questions to the one message: which pages, components and flows must stay as they are, and what the client wants changed.

## Steps

1. **Pre-flight.** Read the project files and `research/RESEARCH.md` before asking anything. List what is known, with file names. End with two lists, "Kept as they are" and "Added by this job", each with file names. Add the product's URL or run command, if any, for real screenshots later.
2. **Visitor and job.** Name the visitor and their one job on this page, in one word: subscribe, book, visit, attend, buy, try, sign up, hire, join or listen. Name the primary action, and a secondary one if any. Record the scope: whole page, one component, or an app screen (a screen people work in).
3. **Material inventory.** What real material exists (photos, logos, numbers, quotes, screenshots), and what is absent.
4. **Conflicts.** Flag any two sources that disagree, for example a "fictional name" in the brief against a real person in the project files. Say which side you keep, and ask the client to confirm.
5. **Ask once.** One message to the client. Ask only what changes the design, and cover this checklist where it is still unknown:
   - Who is behind it (team or founder), and what story the page may tell
   - How it works, step by step
   - Price, terms and limits (lock-in, fees, minimums, trials)
   - Platforms now, and what is coming later
   - Which material they have and may show: product screenshots or a recording, own photos, real numbers, a quote with the speaker's name, logos. Anything not given is absent
   - What a visitor needs to act (hours, address, dates, tickets, phone, booking link). Slot the two most needed first
   - The one thing a visitor should remember after a first visit
   - What the client dislikes or wants to avoid, and what would make a finished page feel wrong even if it looked good
   - **Design options:** how many design directions they want to see (1 to 5), and any theme, style, template, brand or site they want to start from or avoid. If they are not sure, write "not sure": stage 3 then shows 5
   - **Motion:** how much movement they want (calm, some, a lot), and any site they like for how it moves. If not sure, stage 3 shows the range from quiet to loud
   - For places: menu and signature items, dietary needs, families and access
6. **Write the brief.**

## Output: `research/PRODUCT.md`

1. Product truth (each fact marked given / asked / inferred)
2. Visitor and their one job (`job:` one word)
3. Primary action (and secondary)
4. Constraints (language, devices, network, legal, scope, brand do's and don'ts with sources)
5. Positioning: what this product can truthfully claim that a neighbour could not
6. Unknowns (slots for the design)
7. Memorable thing (the client's words if given, else one line marked as inference)
8. Inputs for Direction (5-8 concrete points)
9. Material on hand and absent (each item with a path; each absence a later stage must not fill)
10. Accessibility needs (a required standard or known user needs; "none stated" if none)

Also save the questions and the client's answers, word for word, as `research/ANSWERS.md`. Later stages read it.
