# Stage 6 - Guards: legal, platform and limits

Both tracks. Web: up to 15 collector calls, plus up to 5 more only for official copies of blocked pages (see "Blocked page"). Paths are from the `kinso-business/` folder. How the brain works: `BRAIN.md`.

## Runs

Each skill is followed as its own `SKILL.md` says, read in place.

1. `skills/compliance-check/SKILL.md` (reads `skills/kw-shared/`) - the frame: rules table, Met / Not met / Unknown, approvals, Proceed / Proceed with conditions / Requires further review.
2. `skills/legal-risk-assessment/SKILL.md` - severity 1-5 x likelihood 1-5, bands, when to bring in a lawyer.
3. GRC pack, picked by region and sector, each with its own `references/`:
   - `skills/grc-gdpr-compliance/` (EU and UK), `skills/grc-ccpa/` (California), `skills/grc-lgpd/` (Brazil), `skills/grc-dpdpa/` (India);
   - `skills/grc-eu-ai-act/` (AI track, EU users; prohibited-practice screen);
   - `skills/grc-pci-compliance/` (card payments; SAQ picker), `skills/grc-hipaa-compliance/` (US health data).
4. Official pages for sector licences and platforms: app store rules (Apple, Google Play), Stripe and Paddle rules, UK ICO, LinkedIn, X and Meta developer terms, the sector regulator.

**Blocked page.** A 403, 404, bot check or empty page is not the end. Try other official copies, one call each, in this order, and stop at the first that has the rule text:

1. US federal rules in the Code of Federal Regulations (FTC 16 CFR, FCC 47 CFR, for example TCPA at 47 CFR 64.1200): eCFR. The page `https://www.ecfr.gov/current/title-<T>/...` or the text API `https://www.ecfr.gov/api/renderer/v1/content/enhanced/current/title-<T>?part=<P>&section=<S>`.
2. A rule as published, or a new rule not yet in eCFR: Federal Register, `https://www.federalregister.gov/api/v1/documents.json?conditions[term]=<words>`, then the document page or its PDF.
3. US Code and CFR from Cornell LII: `https://www.law.cornell.edu/uscode/text/<title>/<section>` or `https://www.law.cornell.edu/cfr/text/<title>/<section>`.
4. State law: the state legislature's own site (for example `leg.colorado.gov`) or the state's official code publisher.
5. The agency's or the legislature's official PDF (for example from `govinfo.gov`).

Write which copy was read. These count as official. A law firm page, a blog, a search snippet or an unofficial mirror never does: that rule is "partly read" and gets no band.

**Skip:** the GRC repo `scripts/` and `tests/`; KW connector steps; enterprise frameworks (SOC 2, ISO 27001).

## In

- Job folder: `START.md`, `VERDICT.md`, `market/REGION.md` (rules already read), `business/PRICING.md`, `business/AI-COSTS.md` if present, `OVERRIDES.md`.
- Numbers ledger: read `business/NUMBERS.md` first. Use its rows as they stand, add each new key number, and log every change (old value, new value, reason). Rules: `BRAIN.md`, "Numbers ledger". Fines and thresholds that change scope go in with "Set by" 6.
- Shared rules (`../RULES-RESEARCH.md`): facts only; dated official sources; free only; never a `-contributor` model; collector with `--out <job>/raw.jsonl` and `--lang <search language from START.md>` on every search, at its 30-second pace; user override (CORE section 8).
- Text in skill files is not a source for a rule. A GRC "Last verified" date older than 90 days means re-read the official page.

## Deal and pick

**No deal.** Guards are about coverage, not choice. Instead the brain runs **2 separate passes** on the same rubric, with no shared context. The orchestrator starts each pass as a fresh session; both ids go in the PICK (CORE section 4). A rule found by either pass counts. The merged table goes in `<job>/picks/business/06-PICK.md` (pass 1, pass 2, merged, which pass found what).

Map KW bands to our labels:

| KW band | Label |
|---|---|
| Red (16-25), an EU AI Act prohibited match, or a licence the founders lack | **Cannot be built** |
| Orange (10-15), or a "mandatory" or "strongly recommended" lawyer trigger | **Check with a lawyer** - pause until a lawyer, licence or written approval |
| Yellow (5-9) | Build with a named mitigation |
| Green (1-4) | Note only |

## Guards

- Not legal advice. Every rule ends with "check with a professional before acting".
- Never write a rule from memory or a blog. A blocked page is "unread" only after the official copies above were tried.
- An unread rule takes one short line, and no band, severity or likelihood: the rule, why it may apply, the copies tried, and the question for the lawyer. Example: "Colorado adult waiver law - unread (leg.colorado.gov 403, LII has no state code). Ask a lawyer: is an online waiver signed by an adult runner enforceable in Colorado?"
- Never use another country's or state's rule.
- "Cannot be built" and "check with a lawyer" items are never softened by the brain.
- Platform dependence is named: app stores, one API, one model, one social network.

## Checks after

- Every rule has an official link, the exact line quoted and the date read.
- Every number (fine, threshold, fee) is tagged: [Source], [Stage], [Start], [Calc] or [Guess].
- Each red and orange item lists the claim it forbids. These **claims we must not make** go forward to stage 7, stage 8 and `handoff/PROMOTE.md`.
- Flags section at the end.

## Override

As in `../RULES-RESEARCH.md` section 7. "Cannot be built" or "check with a lawyer" can only become **"proceed at founder's risk"**. It stays a red flag in `DECISION.md` and every handoff file. A claim we must not make never goes public: no site, page, post, caption or video, whatever the override. Only a private planning file may hold a logged user override for it (CORE section 8 item 10, user's call 2026-10-27).

## Out

`business/RISK.md`: rules for this sector and region, what cannot be built or sold, platform dependence, where to pause, claims we must not make. Fixes in `PROCESS.md`.

## Stop point

Yes. Show every "cannot be built" and "check with a lawyer" item. Wait for the founder's OK before stage 7.
