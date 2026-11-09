import argparse
import datetime as dt
import difflib
import html
import json
import os
import re
import sys
import time
import urllib.parse

import requests
from bs4 import BeautifulSoup

SEARXNG = "http://127.0.0.1:8888/search"
JOBSPY = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "vendor", "speedyapply_JobSpy@a606f9c"))
UA = "kinso-collector/1.0 (research; low volume)"
PAUSE = 1.5
SITES = {
    "web": None,
    "x": "x.com",
    "linkedin": "linkedin.com/posts",
    "reddit": "reddit.com",
    "hn": "news.ycombinator.com",
    "producthunt": "producthunt.com",
    "g2": "g2.com",
    "capterra": "capterra.com",
    "trustpilot": "trustpilot.com",
    "devpost": "devpost.com",
    "eventbrite": "eventbrite.com",
    "luma": "lu.ma",
    "youtube": "youtube.com",
    "quora": "quora.com",
}


def now():
    return dt.datetime.now(dt.timezone.utc)


def record(source, query, url, title="", quote="", date=None, status="ok", **extra):
    return {"source": source, "query": query, "url": url, "title": clean(title), "quote": clean(quote)[:400],
            "date": date, "fetched_at": now().isoformat(timespec="seconds"), "status": status,
            "author_role": extra.pop("author_role", None), "side": None, "ladder": None, **extra}


def clean(text):
    return re.sub(r"\s+", " ", html.unescape(text or "")).strip()


MONTHS = {m: i for i, m in enumerate(["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], 1)}


def snippet_date(text):
    t = clean(text)[:40].lower()
    m = re.match(r"(\d{1,2}) ([a-z]{3})[a-z]*\.? (\d{4})", t) or re.match(r"([a-z]{3})[a-z]*\.? (\d{1,2}),? (\d{4})", t)
    if m:
        a, b, y = m.groups()
        d, mon = (a, b) if a.isdigit() else (b, a)
        if mon[:3] in MONTHS:
            return dt.date(int(y), MONTHS[mon[:3]], int(d)).isoformat()
    m = re.match(r"(\d+) (hour|day|week)s? ago", t)
    if m:
        n, unit = int(m.group(1)), m.group(2)
        delta = {"hour": dt.timedelta(hours=n), "day": dt.timedelta(days=n), "week": dt.timedelta(weeks=n)}[unit]
        return (now() - delta).date().isoformat()
    return None


def time_range(days):
    # --days 0 means any date: no time filter at all (FIXES.md row 7d). Before this, every search
    # had at least a one-year filter, so old shutdown news, sale listings and launch stories never came back.
    if days <= 0:
        return None
    return "day" if days <= 1 else "week" if days <= 7 else "month" if days <= 31 else "year"


CACHE = "/private/tmp/kinso-collect-cache"
GAP = 30.0


def pace():
    import fcntl
    os.makedirs(CACHE, exist_ok=True)
    stamp = os.path.join(CACHE, "last-search")
    with open(stamp + ".lock", "w") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        if os.path.exists(stamp):
            wait = GAP - (time.time() - os.path.getmtime(stamp))
            if wait > 0:
                time.sleep(wait)
        open(stamp, "w").close()


def paced_get(params):
    import hashlib
    os.makedirs(CACHE, exist_ok=True)
    key = hashlib.sha1(json.dumps(params, sort_keys=True).encode()).hexdigest()
    path = os.path.join(CACHE, key + ".json")
    if os.path.exists(path) and time.time() - os.path.getmtime(path) < 86400:
        return json.load(open(path)), True
    pace()
    data = requests.get(SEARXNG, params=params, timeout=40).json()
    if data.get("results"):
        json.dump(data, open(path, "w"))
    return data, False


def search(query, site, days, lang, pages):
    q = f"{query} site:{SITES[site]}" if SITES.get(site) else query
    out = []
    for page in range(1, pages + 1):
        params = {"q": q, "format": "json", "pageno": page}
        if time_range(days):
            params["time_range"] = time_range(days)
        if lang:
            params["language"] = lang
        try:
            data, cached = paced_get(params)
        except Exception as e:
            return out + [record(f"searxng:{site}", q, None, status=f"error: {e}")]
        for x in data.get("results", []):
            out.append(record(f"searxng:{site}", q, x.get("url"), x.get("title"), x.get("content"),
                              x.get("publishedDate") or snippet_date(x.get("content")),
                              engine=",".join(x.get("engines") or [x.get("engine", "")])))
        dead = data.get("unresponsive_engines") or []
        if dead:
            out.append(record(f"searxng:{site}", q, None, status="engines unresponsive: " + "; ".join(f"{a} ({b})" for a, b in dead)))
        if not data.get("results"):
            out.append(record(f"searxng:{site}", q, None, status="no results"))
            break
    return out


def hackernews(query, days, limit, from_year=None, to_year=None, field="all"):
    since = int((now() - dt.timedelta(days=days)).timestamp())
    url = "https://hn.algolia.com/api/v1/search_by_date"
    window = f"created_at_i>{since}"
    if from_year or to_year:
        start = int(dt.datetime(from_year or 2007, 1, 1, tzinfo=dt.timezone.utc).timestamp())
        end = int(dt.datetime((to_year or now().year) + 1, 1, 1, tzinfo=dt.timezone.utc).timestamp())
        window = f"created_at_i>{start},created_at_i<{end}"
        url = "https://hn.algolia.com/api/v1/search"
    out = []
    # --in url: match the word inside the linked address only (for example "sponsor" finds
    # stories that link to sponsorxyz.com). Startup names often hold the category word.
    extra = {"restrictSearchableAttributes": "url"} if field == "url" else {}
    for tags in (("show_hn", "story") if field == "url" else ("story", "comment")):
        try:
            r = requests.get(url, params={"query": query, "tags": tags, "numericFilters": window, "hitsPerPage": limit, **extra},
                             headers={"User-Agent": UA}, timeout=30)
            hits = r.json().get("hits", [])
        except Exception as e:
            out.append(record("hn", query, None, status=f"error: {e}"))
            continue
        for h in hits:
            text = h.get("comment_text") or h.get("story_text") or ""
            out.append(record("hn", query, f"https://news.ycombinator.com/item?id={h['objectID']}", h.get("title") or h.get("story_title") or "",
                              BeautifulSoup(text, "html.parser").get_text(" "), h.get("created_at"), kind=tags,
                              link=h.get("url") or h.get("story_url")))
        time.sleep(PAUSE)
    return out


def wayback(domain):
    domain = re.sub(r"^https?://", "", domain).strip("/").split("/")[0]
    params = {"url": domain, "output": "json", "fl": "timestamp,statuscode", "collapse": "timestamp:6", "limit": "2000"}
    try:
        resp = requests.get("https://web.archive.org/cdx/search/cdx", params=params, timeout=40,
                            headers={"User-Agent": "kinso-collect/1.0 (research, low volume)"})
        rows = resp.json()[1:] if resp.status_code == 200 and resp.text.strip() else []
    except Exception as e:
        return [record("wayback", domain, f"https://web.archive.org/web/*/{domain}", status=f"error: {e}")]
    if not rows:
        return [record("wayback", domain, f"https://web.archive.org/web/*/{domain}", status="not archived")]
    live = [t for t, code in rows if code == "200"]
    first, last = rows[0][0], rows[-1][0]
    last_ok = live[-1] if live else None
    day = lambda t: f"{t[:4]}-{t[4:6]}-{t[6:8]}" if t else None
    quote = (f"first capture {day(first)}, last capture {day(last)}, last capture with status 200 {day(last_ok)}, "
             f"{len(rows)} monthly captures, last status {rows[-1][1]}")
    time.sleep(PAUSE)
    return [record("wayback", domain, f"https://web.archive.org/web/{last_ok or last}/{domain}", domain, quote, day(last_ok),
                   first_capture=day(first), last_capture=day(last), last_ok=day(last_ok), last_status=rows[-1][1])]


def wayback_urls(site, word, limit=60):
    # Archived addresses on one site whose path holds a word, any year (FIXES.md row 7d).
    # Finds old sale listings (flippa.com), old launch pages and trade-press articles that
    # web search no longer returns. One row per address with first and last capture.
    site = re.sub(r"^https?://", "", site).strip("/")
    params = {"url": site + "/", "matchType": "prefix", "output": "json", "fl": "timestamp,original,statuscode",
              "filter": f"original:(?i).*{re.escape(word)}.*", "collapse": "urlkey", "limit": str(limit)}
    try:
        resp = requests.get("https://web.archive.org/cdx/search/cdx", params=params, timeout=90,
                            headers={"User-Agent": "kinso-collect/1.0 (research, low volume)"})
        rows = resp.json()[1:] if resp.status_code == 200 and resp.text.strip() else []
        status = "ok" if resp.status_code == 200 else f"error: http {resp.status_code}"
    except Exception as e:
        return [record("wayback-urls", f"{site} {word}", None, status=f"error: {e}")]
    time.sleep(PAUSE)
    if not rows:
        return [record("wayback-urls", f"{site} {word}", None, status=status if status != "ok" else "no results")]
    day = lambda t: f"{t[:4]}-{t[4:6]}-{t[6:8]}"
    return [record("wayback-urls", f"{site} {word}", f"https://web.archive.org/web/{t}/{orig}", orig,
                   f"first capture {day(t)}, status {code}", day(t)) for t, orig, code in rows]


def bluesky(query, days, limit):
    since = (now() - dt.timedelta(days=days)).strftime("%Y-%m-%dT%H:%M:%SZ")
    out = []
    for host in ("https://api.bsky.app", "https://public.api.bsky.app"):
        try:
            r = requests.get(f"{host}/xrpc/app.bsky.feed.searchPosts", params={"q": query, "since": since, "limit": min(limit, 100), "sort": "latest"},
                             headers={"User-Agent": UA}, timeout=30)
        except Exception as e:
            out.append(record("bluesky", query, None, status=f"error {host}: {e}"))
            continue
        if r.status_code != 200:
            out.append(record("bluesky", query, None, status=f"http {r.status_code} from {host}"))
            continue
        for p in r.json().get("posts", []):
            rkey = p["uri"].rsplit("/", 1)[-1]
            handle = p.get("author", {}).get("handle", "")
            out.append(record("bluesky", query, f"https://bsky.app/profile/{handle}/post/{rkey}", "", p.get("record", {}).get("text", ""),
                              p.get("record", {}).get("createdAt")))
        return out
    return out


def jobs(query, days, location, sites, limit, country):
    sys.path.insert(0, JOBSPY)
    from jobspy import scrape_jobs
    try:
        df = scrape_jobs(site_name=sites, search_term=query, location=location or None, results_wanted=limit,
                         hours_old=days * 24, country_indeed=country or "worldwide", verbose=0)
    except Exception as e:
        return [record("jobs", query, None, status=f"error: {e}")]
    out = []
    for _, j in df.iterrows():
        desc = str(j.get("description") or "")
        out.append(record(f"jobs:{j.get('site')}", query, j.get("job_url"), f"{j.get('title')} - {j.get('company')}", desc[:400],
                          str(j.get("date_posted")) if j.get("date_posted") is not None else None, author_role="employer"))
    return out


def fetch_text(url):
    r = requests.get(url, headers={"User-Agent": UA}, timeout=30)
    soup = BeautifulSoup(r.text, "html.parser")
    meta = [m.get("content", "") for m in soup.find_all("meta") if (m.get("property") or m.get("name") or "").lower()
            in ("og:description", "og:title", "description", "twitter:description", "twitter:title")]
    for t in soup(["script", "style", "noscript"]):
        t.decompose()
    return r.status_code, clean(" ".join(meta) + " " + soup.get_text(" "))


BROWSER_HOSTS = ("reddit.com",)
AGE = re.compile(r"\b(\d+)\s?(mo|y|yr|d|h|w)\.? ago\b|\b(\d+) (month|year|day|hour|week)s? ago\b")


def browser_text(url):
    import subprocess
    here = os.path.dirname(os.path.abspath(__file__))
    out = subprocess.run(["node", os.path.join(here, "pagetext.mjs"), url, "40"], capture_output=True, text=True, timeout=60)
    d = json.loads(out.stdout.strip().splitlines()[-1])
    return d.get("status"), clean(d.get("text", ""))


def reddit(query, days, subreddit, kinds, exact=True):
    import subprocess
    here = os.path.dirname(os.path.abspath(__file__))
    since = now() - dt.timedelta(days=days)
    scope = f"r/{subreddit}/" if subreddit else ""
    out = []
    for i, kind in enumerate(kinds):
        pace()
        q = query if '"' in query or " " not in query.strip() or not exact else f'"{query}"'
        url = f"https://www.reddit.com/{scope}search/?" + urllib.parse.urlencode({"q": q, "sort": "new", "type": kind})
        try:
            raw = subprocess.run(["node", os.path.join(here, "pagetext.mjs"), url, "45", "items"], capture_output=True, text=True, timeout=70)
            d = json.loads(raw.stdout.strip().splitlines()[-1])
        except Exception as e:
            out.append(record("reddit", query, url, status=f"error: {e}"))
            continue
        items = d.get("items") or []
        if d.get("status") != 200 or not items:
            wall = "log in" in (d.get("text") or "").lower()[:600]
            out.append(record("reddit", query, url, status=f"no items (http {d.get('status')}{', login wall' if wall else ''})"))
            continue
        kept = 0
        for it in items:
            when = dt.datetime.fromisoformat(it["ts"].replace("+0000", "+00:00"))
            if when < since:
                continue
            kept += 1
            out.append(record("reddit", query, "https://www.reddit.com" + it["href"], "", it["text"], when.date().isoformat(), kind=kind[:-1]))
        if not kept:
            out.append(record("reddit", query, url, status=f"{len(items)} {kind} found, none in the last {days} days"))
    return out


def page_age_days(text):
    m = AGE.search(text[:3000])
    if not m:
        return None
    n = int(m.group(1) or m.group(3))
    unit = (m.group(2) or m.group(4))[0]
    return {"m": 30, "y": 365, "d": 1, "h": 0, "w": 7}[unit] * n


def quote_check(url, quote):
    use_browser = any(h in (url or "") for h in BROWSER_HOSTS)
    try:
        code, text = browser_text(url) if use_browser else fetch_text(url)
    except Exception as e:
        return {"url": url, "found": None, "status": f"error: {e}"}
    if code != 200:
        return {"url": url, "found": None, "status": f"http {code}"}
    age = page_age_days(text) if use_browser else None
    q, t = clean(quote).lower(), text.lower()
    if q and q in t:
        return {"url": url, "found": True, "score": 1.0, "status": "exact", "age_days": age}
    words = q.split()
    best = 0.0
    if words:
        n = len(words)
        tw = t.split()
        for i in range(0, max(1, len(tw) - n + 1), max(1, n // 3)):
            best = max(best, difflib.SequenceMatcher(None, q, " ".join(tw[i:i + n])).ratio())
            if best > 0.9:
                break
    return {"url": url, "found": best >= 0.8, "score": round(best, 2), "status": "fuzzy" if best >= 0.8 else "not found", "age_days": age}


def dedupe(rows):
    seen, out = set(), []
    for r in rows:
        key = (r.get("url") or "") + "|" + (r.get("quote") or "")[:80].lower()
        if r.get("url") and key in seen:
            continue
        seen.add(key)
        out.append(r)
    return out


def main():
    ap = argparse.ArgumentParser(description="Kinso collector: free, level 1 sources. Low volume. Writes JSON lines.")
    sub = ap.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("search")
    s.add_argument("query")
    s.add_argument("--site", default="web", choices=sorted(SITES))
    s.add_argument("--days", type=int, default=30)
    s.add_argument("--lang", default="")
    s.add_argument("--pages", type=int, default=1)
    h = sub.add_parser("hn")
    h.add_argument("query")
    h.add_argument("--days", type=int, default=30)
    h.add_argument("--limit", type=int, default=30)
    h.add_argument("--from-year", type=int, help="search an old window instead of --days, for example 2008")
    h.add_argument("--to-year", type=int)
    h.add_argument("--in", dest="field", default="all", choices=["all", "url"],
                   help="url: match the word inside the linked address only (stories)")
    b = sub.add_parser("bluesky")
    b.add_argument("query")
    b.add_argument("--days", type=int, default=30)
    b.add_argument("--limit", type=int, default=30)
    r = sub.add_parser("reddit")
    r.add_argument("query")
    r.add_argument("--days", type=int, default=30)
    r.add_argument("--sub", default="", help="one subreddit, without r/")
    r.add_argument("--kinds", default="posts,comments")
    r.add_argument("--any-words", action="store_true", help="match any word instead of the exact phrase")
    j = sub.add_parser("jobs")
    j.add_argument("query")
    j.add_argument("--days", type=int, default=30)
    j.add_argument("--location", default="")
    j.add_argument("--country", default="")
    j.add_argument("--sites", default="linkedin,indeed")
    j.add_argument("--limit", type=int, default=15)
    f = sub.add_parser("fetch")
    f.add_argument("url")
    f.add_argument("--chars", type=int, default=6000)
    w = sub.add_parser("wayback")
    w.add_argument("domain")
    wu = sub.add_parser("wayback-urls")
    wu.add_argument("site")
    wu.add_argument("word")
    wu.add_argument("--limit", type=int, default=60)
    q = sub.add_parser("quote-check")
    q.add_argument("url")
    q.add_argument("quote")
    for p in (s, h, b, r, j, f, w, wu):
        p.add_argument("--out", help="append JSON lines to this file")
    a = ap.parse_args()

    if a.cmd == "quote-check":
        print(json.dumps(quote_check(a.url, a.quote)))
        return
    if a.cmd == "fetch":
        use_browser = False
        try:
            use_browser = any(h in a.url for h in BROWSER_HOSTS)
            code, text = browser_text(a.url) if use_browser else fetch_text(a.url)
        except Exception as e:
            code, text = f"error: {e}", ""
        if not use_browser and (code != 200 or len(text) < 300):
            try:
                code, text = browser_text(a.url)
            except Exception as e:
                code = f"{code}; browser error: {e}"
        line = json.dumps({"url": a.url, "status": code, "fetched_at": now().isoformat(timespec="seconds"), "text": text[:a.chars]}, ensure_ascii=False)
        if a.out:
            with open(a.out, "a", encoding="utf-8") as f:
                f.write(line + "\n")
        print(line)
        return
    if a.cmd == "search":
        rows = search(a.query, a.site, a.days, a.lang, a.pages)
    elif a.cmd == "hn":
        rows = hackernews(a.query, a.days, a.limit, a.from_year, a.to_year, a.field)
    elif a.cmd == "reddit":
        rows = reddit(a.query, a.days, a.sub, a.kinds.split(","), not a.any_words)
    elif a.cmd == "bluesky":
        rows = bluesky(a.query, a.days, a.limit)
    elif a.cmd == "wayback":
        rows = wayback(a.domain)
    elif a.cmd == "wayback-urls":
        rows = wayback_urls(a.site, a.word, a.limit)
    else:
        rows = jobs(a.query, a.days, a.location, a.sites.split(","), a.limit, a.country)
    rows = dedupe(rows)
    text = "\n".join(json.dumps(r, ensure_ascii=False) for r in rows)
    if a.out:
        with open(a.out, "a", encoding="utf-8") as f:
            f.write(text + ("\n" if text else ""))
    print(text)
    ok = [r for r in rows if r["status"] == "ok"]
    print(f"{len(ok)} results, {len(rows) - len(ok)} notes", file=sys.stderr)


if __name__ == "__main__":
    main()
