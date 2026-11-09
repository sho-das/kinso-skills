# Stage 8 - SEO and AEO

Approved 2026-10-25 after testing (see `tests/stage8/RESULTS.md`: claude-seo scored 8.5 of 10 with the fewest unsupported values; aeo-geo-optimizer 8.2; ECC 8.0; plain Claude 7.7).

Sources: AgriciDaniel claude-seo (MIT), thatrebeccarae aeo-geo-optimizer (MIT), rampstackco seo-aeo-geo, seo-onpage and seo-technical (MIT), ECC seo and seo-specialist (MIT). Rewritten in our own words.
Added 2026-10-26 from the coverage check (`coverage/08-COVERAGE.md`).

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
- Never promise ranking, traffic or citation gains, in `SEO.md` or to the client. Say what was set up, why, and what cannot be measured here.
- Head tags and JSON-LD sit in the served HTML. Never add them by script.

## Steps

1. **Search intent:** who searches, with what words. Sources: `RESEARCH.md` and `PRODUCT.md`.
2. **Head:**
   - Title under 60 characters, with the visitor's search words and the product word. Never copy a long brand title.
   - Meta description of 70 to 160 characters: the main action and the facts a searcher needs. For a place: what it serves, booking, neighbourhood and city. It never repeats the title and never ends on a stock call to action.
   - No two pages, and no two language versions, share a title or a description.
   - One canonical, Open Graph and social tags, `lang` on `<html>`. `og:image` points to a real file, or stays a slot.
   - One preferred URL form (host, `https`, trailing slash or not) in the canonical, `og:url`, hreflang, sitemap, JSON-LD `url` and page links. Paths are short, lowercase and hyphenated, with the same shape in each language.
3. **Language pages:** an `hreflang` pair for each live language. A page that is not finished gets `noindex`, no description, stays out of the sitemap and has no `hreflang` pair until it is live.
   - Live means: the same sections as the main page, a translated title, description and JSON-LD text, and a human review of the translation. An unreviewed machine translation is not finished.
   - Each live page lists itself and every other live language, so each page links back. Add `x-default` only if a language selector or fallback page exists.
   - Codes: language, then optional region (`fr`, `en-GB`). Never `en-uk` or `eng`.
   - Hreflang sits on the canonical URL, and its address matches the canonical exactly (slash and protocol).
4. **Structured data (JSON-LD):**
   - Pick the exact subtype for what exists (for example `Restaurant`, not `LocalBusiness`; no app type for a product that is not an app).
   - Leave out every field with no fact. Never add ratings, reviews, prices, phone numbers, addresses, opening years, logos or social links without a source.
   - Use only fields that fit the type.
   - `FAQPage` only for questions that are visible and answered on the page.
   - A business with no public street address uses `areaServed` and no street.
   - Before handing over: every block has `@context` and `@type`; dates use the ISO form; no placeholder text; URLs are absolute once the domain is known (until then, the domain slot).
   - Write down each type and field left out, and why.
5. **Crawl files:** `robots.txt` with the sitemap line, `sitemap.xml`.
   - `robots.txt` never blocks CSS, JS, images or the sitemap.
   - The sitemap lists only canonical, indexable, live `https` addresses: one per live page and language, nothing redirected or `noindex`.
   - Every `#anchor` a link points to exists in the built page.
   - No base64 images, and keep inline CSS small, so the JSON-LD stays well inside the first 2 MB of HTML.
6. **`llms.txt`:** what the product is, who it is for, how it works, each fact linked to a page anchor, and a "Not stated yet" list (for example price, trial, address, menu) so assistants do not guess.
7. **Answer check:** hours, prices, menu, address and dates must be real text on the page; if they are only in an image, PDF or iframe, it is a proposal. Read only the H1 and the first sentence under each H2: the page should still answer the questions in "Answer engines".
8. **Images:** each meaningful image has alt text that names its subject; a decorative image has `alt=""`.
9. **Launch gate:** no page with visible slot text is indexed. Either the slots are filled or the page has `noindex` until they are.

## Output: `seo/SEO.md`

1. Search intent
2. Head (each tag and why)
3. Structured data (each type and field with its input line; fields left out and why)
4. Answer engines (what an assistant should be able to say, and where on the page it finds it; `llms.txt` and why)
5. Proposals for the client (search words the copy lacks, local listings with the same hours, the AI crawler policy). Each proposal names the file or page, the problem, the exact change, what it unblocks, and how the client can tell it worked.
   - AI crawler policy: list each crawler and what it controls (GPTBot trains OpenAI models; OAI-SearchBot decides ChatGPT Search; ClaudeBot trains Anthropic models; Claude-SearchBot decides Claude search; Google-Extended trains Gemini and does not affect Google Search; Applebot-Extended is Apple's training opt-out). The client chooses allow or block for each; write no rule without their answer. Private content needs a login, because some fetchers ignore `robots.txt`.
   - Handoff: run the Schema.org Validator and the Google Rich Results Test once the domain is live.
6. Slots and assumptions, and the launch gate status
