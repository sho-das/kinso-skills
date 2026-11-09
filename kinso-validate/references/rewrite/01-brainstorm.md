# Stage 1 - Brainstorm

Draft from the stage 1 test (`tests/stage1/RESULTS.md`). Approved 2026-10-26 (V7).

Sources: Anthropic knowledge-work-plugins `product-brainstorming` (Apache-2.0) as the core; Addy Osmani `idea-refine` (MIT); sreshtalluri `mom-test` (MIT); gstack `office-hours` (MIT). Rewritten in our own words.

Added 2026-10-26 from the coverage check (`coverage/01-COVERAGE.md`).

Read `../../RULES-RESEARCH.md` first. This file adds only the rules for this stage.

## Rules

- **Your words first.** Write down what the founder said, with short exact quotes and who said them ("co-founder, as reported"), before improving anything. Never replace their idea with ours.
- **One problem per line.** Split mixed problems; never merge them.
- **Problem before solution.** Who has it, what they do today, how often; then ideas.
- **No judging demand here.** Judging starts in stage 3, with evidence.
- **No invented numbers.** If the founder gave no count, write "no count given".
- **Suggestions are marked as suggestions.** The founder chooses.
- Legal, licence and safety points are "check with an official source"; never stated as fact, never asked of interviewees.
- "I would pay" and "everyone wants this" are wishes, not evidence.
- **Take a position.** When the idea is weak, vague or fixes a different problem, say so with the reason and say what would change your mind. Never write "interesting approach", "could work" or "many ways to think about this". Warm in tone, firm in content.
- **Name the trap in one line:** "solution before problem", "feature copy" ("they have X so we need X"), "technology first", "no named person" (when the founder says "everyone").
- **Dig for cause.** Keep asking "why" until the cause is structural, not a symptom. Ask "what happens if nobody solves this? Who suffers, how?" If the founder says "nothing exists, that is why it is big", flag it: it often means the pain is small.
- **Want or should-want.** If an answer sounds like a standard phrase ("scalable", "modern", "the usual way", "I should probably"), ask: "If you did not have to explain this to anyone, what would you actually want?" "Whatever you think" and "sounds good" are not confirmed; offer two clear options and ask again.
- **Know when to stop.** If the same question comes back and no one can answer it, stop and write it as "needs data: stage 3 / stage 4 / founder asks real people". Do not argue it out.
- **Vague words need a name, a number or a step** ("seamless", "everyone", "enterprises").

## Steps

1. **Listen.** Let the founder talk. If it is spoken, take the transcript as it is.
2. **What you said.** The key points, quoted, with who said them.
3. **The problems.** One per line: who has it, what they do today, how often, how sure we are (from what was said only). Mark core and side; put pure noise aside in one line.
4. **Check the founder's solution.** Say which problem it fixes, and say so clearly when it fixes a different problem than the core one. Ask once: "Can you name three real people who have this problem right now, and what each did about it last time?" If not, write "no named people" in the problems list.
5. **Questions for the founder.** At most 5, one at a time when live; each must change the picture. Without an answer, write the assumption made. Attach a short guess to each ("I think X, because Y. Right?") with one line on how sure we are and what is missing; some guesses may be ones the founder dislikes. A polite yes to a guess is not an answer. Ask these only if not already answered: why now (what changed), the one constraint that cannot move, what success looks like in the founder's own words, and the product stage (idea only, has users, has paying customers). The stage decides which questions matter.
6. **Problem statements.** 1 to 3, plain, one problem each. Use "How might we ..." where it helps; not too broad ("improve onboarding"), not a solution ("add a tooltip"). Where useful, write the job as "When ..., I want ..., so I can ...".
7. **Directions.** 3 to 5, each marked "suggestion": the founder's own idea as direction 1, at least one "what could work better", and always a no-build or manual option to test first (by hand, WhatsApp, a spreadsheet). Include one "do the opposite" direction and one "remove something" direction. One lens is enough to find them (remove a constraint, borrow from another field, invert the problem, change the audience). Where a test is suggested, prefer "watch one person do it" over a demo. Then a short "Not doing (and why)".
8. **If asked to pick.** One problem and direction, with the riskiest assumption and the cheapest test, marked as a suggestion.
9. **Interview questions** (`QUESTIONS.md`), for the founder to use later if the idea holds:
   - 8 to 12 questions about what people **did**: "Last time you ..., what happened? Show me."
   - Both sides of a marketplace.
   - One line on what each answer would tell us.
   - 3 to 5 questions **not** to ask, each with the question to ask instead.
   - **Bad-question test.** Run every question through this list before it goes in. It fails if it: is about the future ("would", "could", "might", "imagine"); asks for an opinion or rating ("do you think", "do you like", "how important", "on a scale of"); is about our idea and not their life; names the problem or gives an example answer ("do you struggle with ...?"); can be answered "yes" or "sure" and mean nothing; or asks for a habit ("always", "usually") instead of one real time.
   - **Order:** a broad opener that does not name our problem ("What is the hardest part of ...?"); the last time it happened; how many times last month; what it cost in time or money; how they handle it now; what they tried and why it did not last; whether they ever paid to fix it; who decided; why it matters now; where it ranks. Put the scariest question (the answer the founder least wants) first.
   - **Kill line.** For each belief the founder holds, write "this is false if ...". Take the top 3 as the goal of the interview and say what a confirmed and a rejected answer look like. "They liked it" is not success. Mark the 3 questions that matter most; 3 good ones beat 15.
   - **Reflexes for bad answers** (a note for the founder). Compliment: "Thanks. How do you handle it today?" Generic ("always"): "When did it last happen?" Future ("I would"): "What are you using now?" Feature idea: "Why? What would it let you do?" Vague ("it depends"): "On what?" Emotion (sigh, laugh): "Say more", then stay quiet. Objection: "What would it need to do?"
   - **Close and after.** Bring no pitch or deck. Show the solution only after the problem questions are answered, in one sentence in their words, then ask "what would make this not work?". End with "who else should I talk to?" and ask for a dated next step. After 5 to 8 talks, tally answers in a table and decide on repeated behaviour, not one loud voice. If answers scatter across people, narrow the segment, not the product.

## Output

- `idea/BRAINSTORM.md`: 1 What you said, 2 The problems, 3 Questions for you, 4 Problem statements, 5 Directions and Not doing, 6 If you asked me to pick.
- `idea/QUESTIONS.md`.

**Stop for the founder's OK:** they pick the problem and direction before stage 2.
