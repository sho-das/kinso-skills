# Stage 9 - First 100 users

Draft from the stage 9 test (`tests/stage9/RESULTS.md`). Approved 2026-10-26 (V7). Part B: runs only after a "go" at the gate and your OK.

Sources: emotix `go-to-market` and `persona-gen` (MIT, emotixco) as the core. Rewritten in our own words.
Added 2026-10-26 from the coverage check (`coverage/09-COVERAGE.md`).

Read `../../RULES-RESEARCH.md` first. This file adds only the rules for this stage.

## Rules

- Web only through the collector; about 12 calls. `reddit --sub <place>` for local communities.
- **Who feels it most comes from the evidence**, never a made-up persona. Each trait points to a signal row or quote. No signal: write "pain not shown".
- Put one line at the top of `DISTRIBUTION.md`: "Built from evidence, not interviews. Every trait is a hypothesis until a real conversation confirms it."
- A channel needs evidence that the users are there (a link). No evidence: list it under gaps, not as a channel.
- Name the channel and the place (for example "the r/<sub> weekly thread", not "social media").
- Every channel must fit the money and time in `START.md`. Mark each channel free or paid. A paid channel gets its cost per click or lead from a dated source, else [Guess].
- Ignore buyer signals from outside the target region. For a marketplace, treat each side (buyers, cooks, judges, sponsors) as its own channel; test the harder side first.
- Free tools and free tiers are the price limit. Never claim "no competitors".
- Never publish unchecked legal or safety content as a test.
- Never contact anyone on the user's behalf. The skill plans the test; the user runs it.

## Steps

1. **Who feels it most** and **where they already gather** (named communities, sites, events, lists), with links. Posts asking in the wrong place count as evidence of where they are.
   - Add their workaround today and what it costs them (time or money), from a signal row.
   - Add where they look for tools today, with a link.
   - Add who decides and who pays, if different.
   - If the evidence shows none of these, write "not shown".
   - Anti-persona: who appears in the signals but will not pay (builders, vendors, students, people outside the region), and why.
   - If the evidence shows more than one buyer group, rank the groups in words by urgency, ability to pay and ease of reach, and pick one to test first.
2. **Channels:** 3 to 6, each with rough effort (hours) or cost, free or paid, and evidence. Prefer a counted list of real targets (for example "135 clubs in the city directory").
   - For a community channel, read its posting or self-promotion rule with `fetch` and quote the line. No rule found: "unread". Plan the test post to fit the rule.
   - Show one post dated within the last 90 days, so "active" is checked.
3. **Partners** who already reach them, and why they might help. For each, say what the partner gains and the first small ask the user could make.
4. **First channel to test:** one, cheap and fast. Contact a fixed number from the list. Fix the price before the test, and test payment or a pre-commitment, not only interest. Set pass, fail and fallback in advance. Say what the test does not prove.
   - Write the test message in the buyer's own words, taken from checked quotes.
   - Name the one thing buyers objected to most in the evidence, and say how the test answers it. If a trigger to pay is shown in the evidence, name it.
   - Add the time to first answer, the length of the buying chain (to say if the test can finish in the time), and one concrete first action for this week.
5. **Channels not used:** the channels considered and left out, one line each with the reason.
6. **Gaps.**

## Output

`market/DISTRIBUTION.md`: 1 Who feels it most, 2 Channels, 3 Partners, 4 First channel to test, 5 Channels not used, 6 Gaps.
