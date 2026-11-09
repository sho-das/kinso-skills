# Stage 8 - SEO and AEO

Approved 2026-10-25 after testing (see `tests/stage8/RESULTS.md`: claude-seo scored 8.5 of 10 with the fewest unsupported values; aeo-geo-optimizer 8.2; ECC 8.0; plain Claude 7.7).

Sources: AgriciDaniel claude-seo (MIT), thatrebeccarae aeo-geo-optimizer (MIT), rampstackco seo-aeo-geo (MIT), ECC seo (MIT). Rewritten in our own words.

Read `../RULES.md` first. This file adds only the rules for this stage.

## Input

- `site/` (stage 7), `check/CHECK.md`, `copy/COPY.md`, `plan/PLAN.md`, `design/DESIGN.md`.
- `PRODUCT.md`, `research/ANSWERS.md`, `research/RESEARCH.md`, the client's files.

## Rules

- Do not change visible page text. A copy change is a proposal for the client.
- Every value in the head, the structured data and `llms.txt` comes from an input line.
- The domain is a slot until the client gives it.
- Never build a social or profile URL from a handle. Ask for the real URL.
- No sitemap `lastmod` or `priority` without a source.
- No scripts, browser extensions, MCP servers or paid APIs in this stage.

## Steps

1. **Search intent:** who searches, with what words. Sources: `RESEARCH.md` and `PRODUCT.md`.
2. **Head:**
   - Title under 60 characters, with the visitor's search words and the product word. Never copy a long brand title.
   - Meta description of 70 to 160 characters: the main action and the facts a searcher needs. For a place: what it serves, booking, neighbourhood and city.
   - One canonical, Open Graph and social tags, `lang` on `<html>`.
3. **Language pages:** an `hreflang` pair for each live language. A page that is not finished gets `noindex`, no description, stays out of the sitemap and has no `hreflang` pair until it is live.
4. **Structured data (JSON-LD):**
   - Pick the exact subtype for what exists (for example `Restaurant`, not `LocalBusiness`; no app type for a product that is not an app).
   - Leave out every field with no fact. Never add ratings, reviews, prices, phone numbers, addresses, opening years, logos or social links without a source.
   - Use only fields that fit the type.
   - `FAQPage` only for questions that are visible and answered on the page.
   - Write down each type and field left out, and why.
5. **Crawl files:** `robots.txt` with the sitemap line, `sitemap.xml`.
6. **`llms.txt`:** what the product is, who it is for, how it works, each fact linked to a page anchor, and a "Not stated yet" list (for example price, trial, address, menu) so assistants do not guess.
7. **Launch gate:** no page with visible slot text is indexed. Either the slots are filled or the page has `noindex` until they are.

## Output: `seo/SEO.md`

1. Search intent
2. Head (each tag and why)
3. Structured data (each type and field with its input line; fields left out and why)
4. Answer engines (what an assistant should be able to say, and where on the page it finds it; `llms.txt` and why)
5. Proposals for the client (search words the copy lacks, local listings with the same hours, the AI crawler policy)
6. Slots and assumptions, and the launch gate status
