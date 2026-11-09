# Stage 8 - SEO and AEO

25 October 2026. Test set-up. Results go in `tests/stage8/RESULTS.md`.

**Job of this stage:** make the checked page easy to find in search and easy for answer engines and AI assistants to quote correctly: title, meta description, canonical, social tags, language links, JSON-LD structured data, `robots.txt`, `sitemap.xml`, `llms.txt`. Only true facts from the inputs. Visible copy is not changed; copy ideas go to the client as proposals.

**Input:** the stage 7 checked pages (Addy Osmani's runs) and the approved inputs of stages 1-5.

## Candidates

From our approved library (`vendor/`):

| # | Candidate | Method files |
|---|---|---|
| 0 | Baseline | None |
| 1 | ECC | `skills/seo/SKILL.md` (technical SEO, on-page, structured data, sitemap and robots) |
| 2 | Hallmark | `references/craft.md` "The document" rules and `gates.md` F21, F23 |

New sources, found by search on 25 October 2026 (not yet approved, not downloaded):

| # | Candidate | Repo | Licence | Stars | Last push | Why |
|---|---|---|---|---|---|---|
| 3 | claude-seo | `AgriciDaniel/claude-seo` | MIT | 20.4k | 2026-10-22 | 23 sub-skills incl. schema, technical, sitemap, GEO (AI search) |
| 4 | rampstack seo-aeo-geo | `rampstackco/claude-skills` | MIT | 994 | 2026-10-19 | llms.txt, content for AI extraction, audit |
| 5 | aeo-geo-optimizer | `thatrebeccarae/claude-marketing` | MIT | 181 | 2026-05-14 | AEO and GEO for Claude Code |
| 6 | seo-skill | `aevans-eng/seo-skill` | MIT | 14 | 2026-03-14 | One small file: meta, Open Graph, JSON-LD, robots, sitemap |

Not tested: OpenSEO (paid data API), `borghei/claude-skills` (licence not clear), Python audit scripts in any skill (no scripts in this stage).

## How it is scored

1. **Checks (script, `tools/seo-check.py`):** title and description length, one canonical on the slot domain, Open Graph, JSON-LD parses, no risky fields (ratings, reviews, prices, phone, address, founding date, logo, social links), JSON-LD values found in the inputs, `hreflang` for B, `robots.txt` with sitemap, `sitemap.xml` parses, `llms.txt`, visible text unchanged.
2. **Facts (Sonnet 5.5):** any value in the head, JSON-LD or `llms.txt` not in the inputs.
3. **Blind review (Sonnet 5.5, one per case):** correctness, honesty, completeness for search, quality for answer engines, and the client proposals.
