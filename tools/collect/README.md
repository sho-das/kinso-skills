# Collector (level 1: free, no accounts)

Run every call through `collect.sh`, which runs the collector inside the sandbox. The first argument is your run folder (the only place it may write). `search` and `reddit` also need `--skill <kinso-skill> --stage <NN>` before the run folder (or `KINSO_SKILL` and `KINSO_STAGE`); the cap is 20 per skill and stage (`--cap` or `KINSO_COLLECT_CAP` to change it). Rows in `raw.jsonl` get `skill` and `stage` fields.

```bash
tools/collect/collect.sh <run folder> search "<query>" --site <web|x|linkedin|reddit|producthunt|g2|capterra|trustpilot|devpost|eventbrite|luma|youtube|quora|hn> --days 30 [--lang en-IN] [--pages 1] --out <run folder>/raw.jsonl
tools/collect/collect.sh <run folder> hn "<query>" --days 30 --limit 20 --out <run folder>/raw.jsonl
tools/collect/collect.sh <run folder> bluesky "<query>" --days 30 --limit 30 --out <run folder>/raw.jsonl
tools/collect/collect.sh <run folder> jobs "<job title or skill>" --days 30 --sites linkedin,indeed --location "<city>" --country <usa|uk|india> --limit 10 --out <run folder>/raw.jsonl
tools/collect/collect.sh <run folder> quote-check "<url>" "<exact quote>"
tools/collect/collect.sh <run folder> reddit "<phrase>" [--sub <subreddit>] [--days 30] [--kinds posts,comments] [--any-words] --out <run folder>/raw.jsonl
tools/collect/collect.sh <run folder> fetch "<url>" [--chars 6000] [--out <run folder>/raw.jsonl]
```

More commands (added 2026-10-27, `kinso-validate/FIXES.md` row 7d):

```bash
tools/collect/collect.sh <run folder> search "<query>" --days 0            # any date: no time filter
tools/collect/collect.sh <run folder> hn "<word>" --in url --from-year 2008 --to-year 2018 --limit 50   # word inside the linked address; Show HN first
tools/collect/collect.sh <run folder> wayback <domain>                     # first, last and last-200 capture dates
tools/collect/collect.sh <run folder> wayback-urls <small site> <word>     # archived addresses on one site that hold the word, any year
```

- **`--days` is a real filter.** `--days 30` (the default) sends "last month" to every engine, and any number over 31 sends "last year". For old things (dead rivals, sale listings, launch stories, shutdown news) use `--days 0`. Stage 4 runs A-r3 to A-r5 missed every old page because of this, not because "engines ignore year words".
- **Output is always saved.** `collect.sh` adds `--out <run folder>/raw.jsonl` when you leave it out. Never pipe the collector into `sed`, `grep` or `jq`: run it, then read `raw.jsonl` (for example `jq -r 'select(.query=="...") | ...' raw.jsonl`). A broken pipe still counts the search.
- `wayback-urls` works on small sites (a trade blog, a launch site). Big sites (flippa.com, techcrunch.com) return "http 503"; use `search "site:<big site> <words>" --days 0` there. `hn`, `wayback`, `wayback-urls` and `fetch` do not count toward the 20-search cap.
- `search` goes through a local SearXNG (Google, Bing, Brave and others). `--site x` and `--site linkedin` find public X and LinkedIn posts.
- SearXNG is off when not in use. Before a stage that runs `search`, check it: `curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:8888/search?q=test"` prints 200 when it is on. To start it, ask the user to run, from `tools/collect/`: `../../kinso-frontend/tools/sandbox/run.sh run ./venv-searxng/bin/python searxng_run.py > run/searxng.log 2>&1` (it keeps running; stop it after the research stages).
- Each result is one JSON line: source, query, url, title, quote (snippet), date (when known), status.
- **Dates:** the search time filter is not reliable. A result without a date, or with an old date, is not "recent". Check the date on the page: `quote-check` reports `age_days` for Reddit.
- **Quote check:** before citing a signal, confirm the quote is on the page. LinkedIn, X, Hacker News, Bluesky and LinkedIn jobs usually verify; Indeed job pages need a login and cannot be checked.
- `reddit` searches reddit.com in a real browser, newest first, posts and comments. It searches the exact phrase unless you add `--any-words`. Dates are exact. Results outside `--days` are dropped. Posts give the title only; comments give the full text. One page every 30 seconds, shared with `search`; it stops on a login wall. Quote-check a comment on its own link (the `url` in raw.jsonl), not the thread link.
- Reddit routes tested on 26 October 2026 and not used: Reddit `.json` search (403), old.reddit.com (login required), Reddit RSS search (429), the `/svc/shreddit` search fragment (403 unless the request pretends to be a browser, which our rules forbid), PullPush (refuses agents), Arctic Shift (server errors).
- `fetch` returns a page's text. If a plain request is blocked or returns almost nothing, it retries in the real browser (for example a rival's pricing page). Pages behind a login or a block return an error; say so.
- Low volume: at most about 40 collector calls per run. Never solve a CAPTCHA; a blocked engine is reported as "unresponsive" and skipped.

## Which source for which job (step T, 26 October 2026)

| Job | Use first | Then |
|---|---|---|
| Real user pain and requests | `reddit` | `--site linkedin`, `--site quora` |
| People who pay a rival and are unhappy | `--site trustpilot` | `--site g2`, `--site producthunt` (snippets only; cannot be verified) |
| Business buyers and organisers | `--site linkedin` | `reddit` |
| Rivals, prices, facts | `--site web`, then `fetch` the pricing page | `--site producthunt`, `--site g2` |
| What users say about a rival | `reddit` for big rivals | `--site g2`, `--site capterra`, `--site trustpilot` for small rivals (stage 7 test: Reddit found opinions on only 2 of about 30 small rivals) |
| Developer and tech ideas | `hn`, `reddit` | `--site x`, `bluesky` |
| Paid staff doing the job today | `jobs` | |

Details: `kinso-validate/tests/stepT/RESULTS.md`.
