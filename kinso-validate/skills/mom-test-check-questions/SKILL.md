---
name: mom-test-check-questions
description: >
  Audit and rewrite customer interview questions using The Mom Test. Use when the user
  shares a question, a list of questions, a survey, or an interview script and wants to
  know if they're good: "are these good interview questions", "check my discovery script",
  "rewrite this survey", "is it ok to ask would you pay". Flags leading, hypothetical, and
  opinion questions and gives a past-tense, behavior-based reframe for each.
---

# Mom Test — Check Questions

Take every question the user gave you and run it through the test below. Output a table,
then a corrected list.

## The test (a question fails if any is true)

1. **Future or hypothetical:** contains *would, could, might, will, if, imagine, ideal*.
2. **Opinion or rating:** contains *think, feel, like, good idea, interested, scale of, how important*.
3. **Product as subject:** the question is about the founder's idea, not the customer's life.
4. **Leading:** names the problem or supplies an example answer ("do you struggle with X?",
   "like, daily?").
5. **Politely yes-able:** could be answered "yes" or "sure" and mean nothing.
6. **Generic:** invites "always / often / sometimes" instead of an instance.

## How to reframe

Every reframe must be about **them**, about **the past or present**, and answerable with
a **fact or a story**. Prefer these shapes:

- "When did that last happen? Walk me through it."
- "How do you handle that today?"
- "What have you tried? Why didn't it stick?"
- "What did that cost you, in hours or dollars?"
- "How many times last month?"
- "Have you ever paid for anything to fix this?"
- "Who decided on the last purchase like this?"
- "What's making this matter now?"
- "Where does it rank against everything else?"

Commitment questions ("would you buy?") become **asks**: "Can I book 30 minutes Tuesday to
set it up on a real task?"

## Output format

```
| # | Original | Verdict | Why it fails | Reframe |
|---|----------|---------|--------------|---------|
| 1 | …        | FAIL    | future + product subject | "…" |
| 2 | …        | PASS    | —            | (keep) |
```

Then:

**Corrected script** — the passing questions plus reframes, reordered into the Mom Test
path: broad opener → anchor to last instance → cost → frequency → current solution →
what they've tried → spending → decision-maker → urgency → priority → (solution-stage
flip and commitment ask, only if the user is past discovery) → "who else?".

**Trim** — if the corrected list has more than ~8 questions, mark the three that matter
most and note that three good questions beat fifteen.

**One-line pattern** — tell the user the single most common failure in their list
(e.g., "seven of ten were future-tense") so they can self-correct next time.
