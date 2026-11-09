# Stage 4 - Quick rival check

Draft from the stage 4 test (`tests/stage4/RESULTS.md`). Approved 2026-10-26 (V7).

Sources: ECC `competitive-platform-analysis` (MIT, affaan-m) as the core. Rewritten in our own words.
Added 2026-10-26 from the coverage check (`coverage/04-COVERAGE.md`).

Read `../../RULES-RESEARCH.md` first. This file adds only the rules for this stage.

## Rules

- Quick, not deep: the top 5 rivals and one question, "does one already win?". Deep teardown is stage 7, after the gate.
- Web only through the collector; about 10 to 15 calls. Public pages only; never create accounts on rival sites.
- **Read the pricing page** with `fetch`; a price from a snippet or a blog is marked "unchecked".
- **Always check the big platforms by name** for the region and the job (for example Swiggy and Zomato for food in India; Zoom, Teams and Google Meet built-in notes for meetings; Strava and Meetup for clubs; Devpost for hackathons).
- **Name the free tier and built-in features as the price floor.**
- **Tag each rival** "direct", "adjacent" or "substitute". Direct = close to our idea on who pays, the job, size and region, all at once. Adjacent = close on some. A manual process or doing nothing is a substitute: name it, and say what would make people switch. Do not blur the tags into one flat list.
- **Write each price with its unit and period:** per seat, per use or flat; monthly or yearly; currency; date seen. Prices with different units are not compared directly.
- Dead or failed attempts are searched **by name** when a name is known; otherwise "none found" with the reason (engines blocked, no source).
- "Alive" needs a dated live page. Without proof, write "possibly dormant", not "dead".
- Reject rivals from the wrong region; a directory (Justdial, a listicle) is supply evidence, not a rival; vendor "best of" posts are not independent; flag same-name products.

## Steps

1. Pick axes from the frame (ECC): who pays, how specialised, size, engagement, market.
2. Search for direct rivals, adjacent tools, the big platforms by name, and do-it-yourself ways.
3. For the top 5: tag (direct, adjacent, substitute), what it does, who for, price with unit (from its page), alive (dated page), one size signal (team size or funding stage, with link and date, or "not found"), its own one-line claim from its home page (marked "claim": positioning, not proof), one thing users love and one they hate (quoted, checked) or "not found". For the strongest rival, add one line on what it does well for users, from a checked quote or its own page.
4. Search known dead attempts by name.
5. Count: how many rivals were seen in total, how many are listed, and why the others were left out (wrong region, directory, dormant, too far from the job).
6. Answer "does one already win?": yes, partly or no, with the reason.

## Output

`evidence/RIVALS-QUICK.md`: 1 Top 5 table, 2 Also seen (do-it-yourself, built-in features, price floor), 3 Dead or failed attempts, 4 Does one already win?, 5 Gaps.
