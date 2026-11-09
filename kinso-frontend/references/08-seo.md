# Stage 8 - SEO and AEO

Read `../RULES.md` and `../BRAIN.md` first. The old rewrite is in `rewrite/08-seo.md`. It won its blind test (8.25 against 7.25) on the launch gate; that comes back below as a check.

## Runs

1. `skills/claude-seo/SKILL.md` - the orchestrator: detect the business type, spawn only the sub-skills it needs, in parallel, each in its own context; synthesis with a first principle, a dependency, "how would we know this failed?" and a leading indicator per recommendation; its quality gates. Reference data in `skills/claude-seo/references/` (quality gates, schema types, local schema types, E-E-A-T, CWV thresholds).
2. The sub-skills it spawns, from their own folders:
   - always: `skills/claude-seo-seo-page/`, `-seo-schema/`, `-seo-technical/`, `-seo-sitemap/`, `-seo-geo/`, `-seo-agentic/`, `-seo-content/`;
   - more than one language: `skills/claude-seo-seo-hreflang/`;
   - a place: `skills/claude-seo-seo-local/`;
   - images: `skills/claude-seo-seo-images/`; on request: `-seo-audit/`, `-seo-plan/`, `-seo-sxo/`.

Skip, and why: seo-google (Search Console, PageSpeed, CrUX, GA4), DataForSEO, Moz, Bing and Firecrawl (keys or paid); seo-image-gen (Gemini, paid); `google_report.py`; `/seo setup` (installs Python and Chromium); the "Community Footer" promotion; any update command.

## In

`site/`, `check/CHECK.md`, `copy/COPY.md`, `plan/PLAN.md`, `design/DESIGN.md`, `PRODUCT.md`, `ANSWERS.md`, `RESEARCH.md`. `RULES.md`.

## Deal and pick

- Deal 3 title and meta description pairs per page.
- A fresh picker writes `<job>/picks/frontend/08-PICK.md`, scoring: title under 60 characters; the visitor's search words from `RESEARCH.md`; the product word; the description (70 to 160 characters) does not repeat the title; facts only.
- The sub-skills' findings are merged by the brain without re-ranking across sub-skills.

## Guards

Facts only from `PRODUCT.md` and the inputs. Free only: no paid API, no keys. Never deploy, submit to a search console, or post. No secrets. Scripts only in `tools/sandbox/run.sh`. Visible page text is not changed here; a copy change is a proposal. Never promise ranking, traffic or citations.

## Checks after

SEO and facts only, never style.
- **Launch gate:** no indexed page with visible slot text. Slots filled, or `noindex` until they are. Check every `.html` file under `site/`, not only the pages in the plan; a draft or a note found there is a finding.
- Every head, JSON-LD and `llms.txt` value traces to an input line. The domain is a slot until given.
- JSON-LD: the exact subtype; fields with no fact left out (ratings, prices, phones, addresses, logos, social links); `FAQPage` only for visible answers; `areaServed` only for a business with no public street address, never in place of a known address.
- No social URL built from a handle. No sitemap `lastmod` or `priority` without a source.
- Unfinished language pages: `noindex`, out of the sitemap, no hreflang pair. Live pages list each other; codes are valid (`en-GB`, never `en-uk`).
- One preferred URL form across canonical, `og:url`, hreflang, sitemap, JSON-LD and links.
- `robots.txt` never blocks CSS, JS, images or the sitemap. The sitemap lists only canonical, indexable, live URLs.
- Head tags and JSON-LD sit in the served HTML, not added by script.
- Alt text names the subject; decorative images `alt=""`.
- `llms.txt` has a "Not stated yet" list.
- AI crawler rules only from the client's answer.

## Override

As in `RULES.md`. The client may choose to index a page with slots only as "ship at the client's risk", flagged in stage 9.

## Out

`seo/SEO.md`: search intent, head, structured data (with input lines, fields left out and why), answer engines, proposals, slots and the launch gate status. Head tags, JSON-LD, `robots.txt`, `sitemap.xml`, `llms.txt` in `site/`. `picks/frontend/08-PICK.md`.

## Stop point

None. Go on to stage 9.
