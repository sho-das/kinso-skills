# Stage 3 - Demand and willingness to pay

Read `../RULES-RESEARCH.md` and `BRAIN.md` first. Paths are from `kinso-validate/`. Old rewrite: `references/rewrite/03-demand.md`.

## Runs

1. `skills/startup-design/references/research-wave-3-customers.md` (the stage winner): agents C1 customer voice, C2 demand, C3 audience, as 3 lanes. Each lane follows `references/research-principles.md` (rounds that drill deeper, source tiers, 3 wordings before a gap).
2. `skills/startup-design/references/research-synthesis.md`: pain categories with frequency and intensity, Jobs to be Done, unmet needs, language map.
3. `skills/last30days/references/research-runbook.md`: keyword traps, per-source outcomes, "nothing solid" floor. Method only.
4. `skills/mom-test/SKILL.md`: evidence ladder; cost to the customer sets the weight.
5. Verification: `skills/startup-design/references/verification-agent.md`, run by a fresh agent.

Skip: C2 price recommendation (pricing is kinso-business). Google Trends and search-volume steps (no free tool; mark as a gap). last30days engine and keys. Full wave size.

## In

- `idea/IDEA.md` (search words), `idea/ASSUMPTIONS.md`, `START.md`.
- Shared rules: facts only, dated sources, free only, never a `-contributor` model, collector at the 30-second pace with `--out <job>/raw.jsonl`, privacy, user override. At most 20 search calls: the collector refuses number 21 (exit code 3). Plan the 20 before round 1; when the cap is hit, use what you have and note the gap.

## Deal and pick

- Deal 3 lanes that share the budget: A voice (C1, about 9), B money (C2 rounds 3 and 4, about 8), C against ("is free", "stopped using", about 6).
- **Dead attempts, inside lane C (2 to 3 of its calls, always run).** Earlier products that tried this job and died are the strongest "against" evidence. Search with wordings such as "<category> marketplace shut down", "<category> startup acquired OR closed OR pivoted", "why <category> marketplace failed", "post-mortem <category>". The time window does not apply here: a death from any year counts, marked "old" if over 18 months. For each dead attempt write the name, what it did, when it ended (dated source), and why it died in the founders' or a dated source's words; "why unknown" if no source says. Any rival seen with no page dated in the last 18 months is marked "possibly dead", never "active".
  - **How to find them (added 2026-10-27, `REGRESSION-RUN.md`: `stage3/A-r3` missed SponsorHub and SponsorPark; stage 4 found them only with the row 7d tools).** The cause in A-r3: its dead-attempt searches ran with the default `--days 30`, which sends "last month" to every engine, so no 2009 to 2016 page could come back; and it used no free old-web tool. So:
    1. **Every dead-attempt `search` uses `--days 0`** (any date). No year words in the query. Use the 2 or 3 lane C searches for: "<category> marketplace shut down" and "startups that connect <buyers> and <sellers>" (for event sponsors: "startups that connect events and sponsors").
    2. **Free HN calls (outside the 20 cap), always run:** `hn "<stem>" --in url --from-year 2008 --to-year 2018 --limit 50` for 2 stems of the category word (for event sponsors: "sponsor" and "sponsorship"); this finds old Show HN launches whose address holds the word. Then `hn "connect <buyers> and <sellers>" --from-year 2008 --to-year 2018` and `hn "<category> marketplace" --from-year 2008 --to-year 2018`. Read the names in titles and comments (a comment often lists several rivals).
    3. **Round-up articles:** a trade-press round-up ("N services that connect ...") linked from an HN row or a search row is fetched, through its archived copy `https://web.archive.org/web/<year>/<url>` if the live page is gone. Take every name it lists. `wayback-urls <small trade site> <stem>` lists more old articles (free).
    4. **Dead or alive, free:** `wayback <domain>` for every name found. No 200 capture in the last 12 months = "dead around <last 200 date>". A recent 200 with a parked, blank, for-sale or different-product page = "dead (parked)" or "pivoted": fetch the archived page to check.
    5. Stage 4 lane D (`04-rivals-quick.md`) goes deeper (Flippa, Product Hunt, why it ended). Stage 3 needs the names and dated status, not the full graveyard.
- Round 1 in each lane is broad; round 2 drills into what round 1 found.
- Seeded draw (CORE section 5) of the wording families per lane; after round 1, drop the weakest by yield.
- Rubric lines (0 to 3): checked rows at ladder 4 to 6; independent sources; one strong "against" row, or "none found" with 3 wordings.
- Write `<job>/picks/validate/03-PICK.md`.

## Guards

- No price design. No call over budget.
- Never get past a bot check; report the block.
- Keep only a short quote, link and role; never name private people.

## Checks after

- Every quote checked against `raw.jsonl` with `quote-check`; a failed check drops the quote.
- Vendor pages never level 5; builders are not buyers.
- Region: non-region posts not counted.
- Window rule; data older than 18 months marked "old".
- "Strong" needs two kinds of source and 2+ separate threads.
- Recount: every number in `SIGNALS.md` matches `signals.csv`.
- **Fresh verification agent** (no part in the research) runs the startup-design universal checks. Critical issues are fixed before the stage ends; log in `PROCESS.md`.
- Checks never rewrite the skill's voice or findings beyond the facts.

## Override

As in `../RULES-RESEARCH.md` section 7.

## Out

- `evidence/signals.csv`.
- `evidence/SIGNALS.md`: 1 Demand strength, 2 Counts, 3 Best evidence, 4 Evidence against (with a "Dead attempts" table: name, what it did, ended when, why, source; or "none found" with the 3 wordings tried), 5 What people use today, 6 Words users use, 7 Gaps, Method line.
- `picks/validate/03-PICK.md`.
