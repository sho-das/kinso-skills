# Stage 4 - Quick rival check

Read `../RULES-RESEARCH.md` and `BRAIN.md` first. Paths are from `kinso-validate/`. Old rewrite: `references/rewrite/04-rivals-quick.md`.

## Runs

1. `skills/startup-design/SKILL.md` pre-flight check first (about 3 calls): dominant solution, precedent failure, legal instant kill. "Context, not a verdict".
2. `skills/competitive-platform-analysis/SKILL.md` (ECC, the stage winner): positioning brief, selection axes, tiers (direct, adjacent, aspirational, substitutes), two sources per attribute, the "cautionary case" quadrant.
3. `skills/startup-design/references/research-wave-2-competitors.md` B2: status quo, adjacent products, platform risk, free and open-source options, switching cost.
4. `skills/claude-startup-validator/references/competitor-analysis-framework.md`: the 4 categories, including do-it-yourself.

Skip: ECC's agency sources (portfolios, awards, Dribbble). Deep teardown (stage 7).

## In

- `idea/IDEA.md`, `evidence/SIGNALS.md` (what people use today), `START.md`.
- Shared rules: facts only, dated sources, free only, never a `-contributor` model, collector at the 30-second pace with `--out <job>/raw.jsonl`, privacy, user override. 10 to 20 searches (the collector refuses search 21), lane D's 7 included; `hn`, `wayback`, `wayback-urls` and `fetch` do not count.
- **Never pipe the collector** into `sed`, `grep`, `jq` or anything else (`FIXES.md` row 7d: a broken pipe in `stage4/A-r5` lost 9 of 20 searches). Run it, then read `raw.jsonl` with `jq`. Run lane D before lane A, so a lost search costs lane A, not the graveyard.

## Deal and pick

- Deal 3 "what would the buyer hire instead" lanes: A a direct product (about 5 calls), B a big platform's built-in feature (about 4), C do-it-yourself or a person (about 4).
- Budget order (added 2026-10-27, `FIXES.md` row 2): spend lane B's first 2 calls before lane A, one per big platform named for the job and region (for event sponsors, for example Eventbrite and Luma; name them in the pick file). Never spend the whole budget on lane A. If a platform could not be checked, say "not checked" by name.
- **Lane D, graveyard (added 2026-10-27, `FIXES.md` rows 7, 7b, 7c and 7d): 7 searches, always run, inside the cap.** Companies that tried the same idea and died, or were sold. Plan the 7 before lane A; lane A may not take them.
  - **Every lane D search uses `--days 0`** (any date). Without it the collector sends "last month" to the engines, so old listings, launch stories and shutdown news never come back. This, not "engines ignore year words", is why runs A-r3 to A-r5 found no sale and no old press (row 7d). Do not put year words in queries.
  1. **Names from old HN, free, outside the search cap.**
     - First, the address search: `collect.sh <run> hn "<category stem>" --in url --from-year 2008 --to-year 2018 --limit 50`, for 2 stems of the category word (for event sponsors: "sponsor" and "sponsorship"). It finds Show HN launches whose web address holds the word. Keep only rows whose title says it is a product for the same job.
     - Then at least 4 plain wordings: `hn "<words>" --from-year 2008 --to-year 2018 --limit 30` - the job in plain words ("<category> marketplace", "find <sellers> for <buyers>", "connect <buyers> and <sellers>", "Show HN <category>").
     - Fetch the HN item page of each launch you keep and read the comments: "others in this space are X, Y" and "how is this different from X" lines name more rivals.
  2. **Names from old lists and launch sites, 3 searches, `--days 0`.** One `search "<category> startup" --site producthunt --days 0`. One trade-press search, worded as a launch or round-up: "<category> marketplace launches" or "startups that connect <buyers> and <sellers>". One "<today's top rival> alternatives OR competitors".
     - Trade-press sites seen in any result: `collect.sh <run> wayback-urls <site> <category stem>` (free) lists old article addresses on that site with the word in them. Fetch the archived copy of any round-up or "startups to watch" article and take the names from it.
  3. **Sold sites, 1 search.** `collect.sh <run> search "site:flippa.com <category> marketplace" --days 0` (for example "site:flippa.com sponsorship marketplace"). Listing pages have a number in the address (`flippa.com/12345678-...`); blog and category pages are not listings. `fetch` each listing for the same job: a listing is a sale ("Sold") or an attempted sale ("For Sale"). Note the name, the asking or sold price, the stated traffic and revenue, and the seller's stated reason, with the listing date. Add each listed company to the names for step 4.
  4. **Dead or alive, for every name found, free.** `collect.sh <run> wayback <domain>`. Mark the name:
     - **dead** when there is no "status 200" capture in the last 12 months, "dead around <last 200 date>";
     - **dead (parked)** when recent captures do return 200 but show a parked domain, a "for sale" page, a blank page or a different product. Check this whenever the last 200 is recent but the live fetch fails or is empty: `fetch` the archived page at the last 200 (`https://web.archive.org/web/<timestamp>/<domain>`) and one capture from the middle years. A domain that renews its parking page is not a live product;
     - **possibly sold** when it redirects to another company;
     - **alive** only with a dated product page from the last 12 months.
     Never leave a name "unclear" when Wayback can settle it. If the archived text is empty, fetch one other capture before saying "unknown".
  5. **Why it ended, 3 searches, `--days 0`.** One `search "\"<name>\" acquired OR shut down OR closed" --days 0` for each of the 2 top dead names (the name in quotes) - a press note of a purchase settles "sold". One search for the category reason, worded as a question: "can a <category> marketplace work" or "why <category> marketplaces fail" - look for the side of the market that did not come (for example "buyers did not come", "sponsors would not pay") and quote it with the date. A Flippa listing's "reason for selling" and the founder's own HN comments count as sources. Plus free HN searches `hn "<name>" --from-year 2008 --to-year 2020` for each top name (outside the cap): later comments often say how it ended.
  6. Write each one in `RIVALS-QUICK.md` section 3: name, what it did, years alive (Wayback dates), status (dead, dead (parked), sold, possibly sold, alive), how we know (link and date), and why it ended, quoted from its founders or a dated source, or "why unknown". A sale counts as an exit, not a failure. Below the table, one line "Why they failed, across names": the shared reason with sources, or "no stated reason found" with the searches tried.
  7. The gate (stage 6) reads this table. A death for a reason that still applies is a "drop" signal.
- Pick the top 5 with ECC's rule: near on payer, job, size and region at once. Keep one cautionary case if found.
- Rubric lines (0 to 3): dated live page; pricing page read; closeness on all four axes.
- Write `<job>/picks/validate/04-PICK.md`.

## Guards

- Public pages only; never create accounts or start trials.
- Ideas only from rivals; never copy text or design.
- Never get past a bot check.

## Checks after

- A free tool or built-in feature that already does the job is named, as the price floor.
- Big platforms checked by name for the region and the job.
- Prices from the rival's own pricing page in the same country, with unit, period and date; else "unchecked".
- "Alive" needs a dated page; else "possibly dormant".
- Dead attempts searched by name, or "none found" with the reason.
- Wrong-region rivals out; directories are supply, not rivals; same-name products flagged.
- Count: seen, listed, and why the rest were left out.
- Checks never rewrite the skill's voice.

## Override

As in `../RULES-RESEARCH.md` section 7. A user override on "does one already win?" is listed at the gate.

## Out

- `evidence/RIVALS-QUICK.md`: 1 Top 5 table, 2 Also seen, 3 Dead or failed attempts, 4 Does one already win?, 5 Gaps.
- `picks/validate/04-PICK.md`.
