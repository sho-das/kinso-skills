# Competitor Analysis Framework

Use this framework to map the competitive landscape for every opportunity. A good competitor analysis reveals not just who exists, but why there is still room to win.

## Competitor Categories

### 1. Direct Competitors
Same problem, same AI-powered approach.

**How to identify**: Search for "[problem] AI tool", "[industry] automation software", "[workflow] SaaS". Look at Product Hunt, G2, Capterra, and Crunchbase.

**Analyze each**:
- Name and URL
- Funding stage and amount (bootstrapped, seed, Series A+)
- Pricing model and range
- Target market (enterprise, mid-market, SMB)
- Core strengths (features, brand, integrations, data)
- Core weaknesses (UX, pricing, accuracy, speed, missing features)
- Differentiation gap — what they DON'T do that matters

### 2. Indirect Competitors
Same problem, different approach (manual services, non-AI software, agencies).

**How to identify**: Ask "how do people solve this today without AI?" Common answers: spreadsheets, consultants, BPO firms, manual processes, legacy software.

**Analyze each**:
- What approach they use
- Why it's chosen (trust, compliance, habit, cost)
- Why it's not good enough (speed, cost, scale, accuracy, consistency)
- What would make someone switch to an AI solution

### 3. Adjacent Players
Different problem today, but could expand into this space.

**How to identify**: Look at companies serving the same buyer persona with related products. CRM companies could add AI features. Analytics companies could add automation. Platform companies could add vertical tools.

**Assess**: How likely is expansion? How soon? What would trigger it?

### 4. DIY Alternatives
Informal solutions people cobble together.

**Common DIY patterns**:
- ChatGPT + copy-paste into spreadsheets
- Zapier/Make automations with basic triggers
- Hiring virtual assistants or interns
- Excel macros and templates
- Internal scripts written by "that one developer"

**Why DIY fails at scale**: No quality control, no audit trail, breaks when people leave, doesn't integrate with existing systems, time cost grows linearly.

## Competitive Positioning Matrix

For each opportunity, place it on this matrix:

```
                    AI-Native
                       │
                       │
    Vertical Focus ────┼──── Horizontal
                       │
                       │
                  Bolt-On / Legacy
```

**Best position for a startup**: AI-native + Vertical Focus (top-left quadrant). This means you built the product with AI at the core (not added as a feature) and you serve one specific industry or workflow deeply.

**Why this wins**:
- Vertical focus means better accuracy (trained on domain data)
- Vertical focus means easier sales (speak the buyer's language)
- AI-native means faster, cheaper, and more consistent than bolt-on
- Incumbents can't easily replicate vertical depth

## Market Saturation Assessment

| Signal | What It Means |
|--------|--------------|
| 0-2 funded competitors | **Underserved** — opportunity to define the category. Risk: market may not exist. |
| 3-5 funded competitors | **Validated** — proven demand, room for differentiation. Best position for new entrants. |
| 6-10 funded competitors | **Getting crowded** — need a clear wedge (vertical, pricing, UX, geography). |
| 10+ funded competitors | **Crowded** — avoid unless you have a truly unique angle (new tech, underserved niche, distribution advantage). |

## "Why This Could Still Win" Framework

Even in validated or crowded markets, a new entrant can win if it has one or more of these advantages:

### Timing Advantage
- New AI capabilities (multimodal, agents, real-time) that incumbents haven't adopted
- Recent regulatory changes creating new workflows
- Market shift (remote work, AI awareness, cost pressure) changing buyer behavior

### Vertical Advantage
- Deep expertise in one industry that horizontal players lack
- Pre-built templates, terminology, and integrations for the specific buyer
- Domain-specific accuracy that generic tools can't match

### UX Advantage
- Incumbent UX is terrible (common in B2B — "enterprise-grade" often means ugly and slow)
- Mobile-first when competitors are desktop-only
- Self-serve when competitors require demos and sales calls

### Pricing Advantage
- 10x cheaper due to AI automation of what competitors do manually
- Usage-based when competitors charge flat enterprise fees
- Free tier that creates adoption before competitors can react

### Distribution Advantage
- Built on top of a platform the buyer already uses (Shopify, HubSpot, Slack, etc.)
- Founder has existing audience, community, or network in the target market
- Can leverage marketplace discovery (Chrome Web Store, Shopify App Store, etc.)

### AI-Native Advantage
- Incumbents bolted on AI as a feature; your product was built with AI as the core
- Your product improves with usage (learning, personalization)
- Your product handles unstructured data that rules-based incumbents cannot

## Competitive Analysis Output Template

For each opportunity, produce this analysis:

```markdown
### Competitive Landscape

**Direct Competitors (N found)**:
| Competitor | Funding | Pricing | Strengths | Weaknesses |
|------------|---------|---------|-----------|------------|
| Name | $Xm | $Y/mo | ... | ... |

**Indirect Competitors**: [list with approach and limitation]

**Adjacent Threats**: [list with expansion likelihood]

**DIY Alternatives**: [list with why they fail at scale]

**Market Saturation**: [underserved / validated / getting crowded / crowded]

**Positioning**: AI-native, vertical-focused on [industry/workflow]

**Why This Wins**:
- [Primary advantage]
- [Secondary advantage]
- [Timing factor]
```
