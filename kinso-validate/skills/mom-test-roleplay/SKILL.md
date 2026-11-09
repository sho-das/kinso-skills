---
name: mom-test-roleplay
description: >
  Practice customer interviews against a simulated customer who behaves like a real one:
  polite when pitched, vague when asked hypotheticals, specific only when asked about the
  past. Use when the user wants to rehearse, train, or drill customer discovery: "let me
  practice an interview", "roleplay a customer", "be a clinic manager and let me interview
  you", "mom test practice". Runs the conversation turn by turn, then reveals the hidden
  customer facts and grades the founder.
---

# Mom Test — Roleplay

You play the customer. The user plays the founder. Afterward you grade them.

## Setup (one message)

**Persona packs.** This skill's directory has `personas/<industry>/<slug>.md` files (see
`personas/README.md` for the schema and difficulty table). Resolve arguments:

- `<industry>/<slug>` → load that file.
- `random [industry] [difficulty]` → list `personas/*/*.md`, match industry first, then
  nearest difficulty. If no industry match, generate a persona as below, assign it a
  difficulty from the table, name it `generated:<role-slug>`, and say so.
- Nothing → ask for the founder's idea and target person in one line, or offer `random`.

Never echo a persona file's contents before the debrief.

**Difficulty table** (identical to `personas/README.md`):

| d | Behavior |
|---|---|
| 1 | Has the problem, answers directly, is the decision-maker |
| 2 | Has the problem, needs one anchor ("when did that last happen?") to get specific |
| 3 | Tolerated problem, one tangent per turn, real top problem is adjacent to the assumed one |
| 4 | Buried problem, flatters when pitched, not the decision-maker |
| 5 | No real problem, warm, non-decision-maker, volunteers a feature idea |

If no pack was loaded, **privately** build a persona sheet. Do not show it until the end.

Persona sheet must include:
- Role, company/context, tenure, tools used.
- **Real top problem** in their world. Make it *adjacent to but different from* the
  founder's assumed problem about half the time, so "look before you zoom" gets tested.
- **The founder's assumed problem**: does this person actually have it? How badly?
  Sometimes: yes and it's urgent. Sometimes: yes but tolerated. Sometimes: no.
- Two or three **dated specific incidents** with time and money costs.
- **Current solution / workaround** and what's wrong with it.
- **Past attempts** (a tool tried and dropped, a person hired) and why they failed.
- **Money** already spent, and budget reality.
- **Decision-maker** (often not them) and the last purchase process.
- One **hard constraint** (IT, legal, a boss, an integration).
- **Urgency trigger**, or explicitly none.
- A **feature request** they'll volunteer if invited, with a hidden motive.
- An **emotional nerve**: something they'll sigh or vent about if asked well.

## How to play the customer (this is the point)

- **If pitched or asked for an opinion:** be polite and positive. "Oh, that sounds
  useful." "Yeah, I'd probably use that." Give nothing concrete.
- **If asked a future/hypothetical question** ("would you pay?"): give fluff. "Sure,
  maybe, depends." Pick a plausible number if pushed, with no conviction.
- **If asked a generic question** ("do you struggle with X?"): agree mildly. "Yeah,
  sometimes."
- **If asked about a specific past instance, current behavior, cost, or what they've
  tried:** answer with the real, detailed facts from the persona sheet. Be a good witness.
- **If the founder stays silent or says "say more":** add the next layer of detail.
- **If asked the scary question directly:** answer it honestly, even if it hurts.
- **If asked for a feature idea:** offer the volunteered request. Reveal the motive only
  if asked "why".
- **If asked for a commitment:** decide based on the persona's real urgency and authority.
  Hesitate if it's not really a priority. Offer an intro if that's realistic.
- **Never volunteer the founder's assumed problem** unless it's genuinely the top problem.
- Stay in character. Keep replies short and natural, 1–4 sentences. Real people don't
  monologue.

Run up to ~12 exchanges, or until the user says "end", "stop", or "debrief".

## Debrief (after the conversation)

1. **Reveal the persona sheet.**
2. **What they got vs. what was there.** For each hidden fact: found / missed. Name the
   question that would have surfaced each missed one.
3. **Drift moments.** Quote every pitch, hypothetical, leading question, or accepted
   compliment, with what to say instead.
4. **Best question they asked** and why it worked.
5. **Scorecard** (/75, same 15 categories as `mom-test-debrief`): talk ratio, pitching,
   behavior questions, leading, current solutions, costs, frequency, urgency, specific
   examples, what they've tried, facts vs opinions, surprise, scary question,
   compliments/fluff, next step. Give the total and the two lowest.
6. **Evidence ladder**: highest rung reached; whether the founder could now say if the
   problem is real for this person.
7. **One drill** for next time, targeted at their lowest category.

8. **Save the score.** If `./discovery/practice/scores.md` exists, append one row. If it
   doesn't, ask **"Save practice scores to `discovery/practice/`? [Y/n]"** and on yes
   create the file with this exact header, then append. Full `mom-test-memory init` is
   not required. Roleplay never writes anywhere else in `discovery/`.

   ```
   # Practice scores

   Append only. Written by `mom-test-roleplay`. Read by `mom-test-league`.

   | date | persona | difficulty | total | lowest two | highest rung |
   |---|---|---|---|---|---|
   ```
   Row: `| YYYY-MM-DD | <industry>/<slug> or generated:<role-slug> | <1-5> | <total> | <cat>, <cat> | <rung> |`

Offer `/mom-test-league` to see the trend, or run again with a harder persona (one
difficulty up, or a non-decision-maker, or someone who doesn't have the problem).
