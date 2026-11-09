# Startup Failure Patterns

Use this reference to stress-test every opportunity against the 10 most common AI/SaaS startup failure modes. For each opportunity, check which patterns apply, assess vulnerability level, and recommend mitigation strategies.

## The 10 Failure Modes

### 1. Solution Looking for a Problem
**What it looks like**: "We have this amazing AI model, now let's find someone to sell it to."
**Warning signs**: No specific buyer identified. Cannot describe the manual workflow being replaced. The "problem" is vague ("businesses need efficiency"). No customer has ever asked for this.
**Real pattern**: Founders build AI demos that impress other developers but confuse actual buyers. Product launches to crickets.
**How to de-risk**: Talk to 10 potential buyers before writing code. Ask "show me how you do this today" — if they can't show you a manual process, there's no problem.

### 2. Accuracy Dependency Trap
**What it looks like**: The product only works if AI achieves 95%+ accuracy, but current models hit 80-85%.
**Warning signs**: Financial calculations, legal documents, medical diagnoses, compliance reporting — any domain where errors have severe consequences. Users won't tolerate reviewing and correcting 15-20% of outputs.
**Real pattern**: Early AI document processing startups promised "full automation" but delivered "expensive proofreading" when accuracy fell short.
**How to de-risk**: Design for human-in-the-loop from day one. Position as "draft + review" not "fully automated." Start with the highest-accuracy use case in the domain and expand as models improve.

### 3. Enterprise Sales Cycle Death
**What it looks like**: The product works, buyers want it, but closing takes 6-12 months and requires security reviews, legal approval, and procurement committees.
**Warning signs**: Target buyer is VP+ at companies with 500+ employees. Product touches sensitive data. Industry is heavily regulated. No self-serve onboarding possible.
**Real pattern**: Bootstrapped AI startups burn through runway waiting for enterprise deals to close. By the time the first check arrives, they've run out of money.
**How to de-risk**: Start with SMB or mid-market where one person can buy and deploy. Offer a free tier or pilot program. Target departments, not enterprises (a team lead can approve $99/month, a CTO must approve $50k/year).

### 4. Integration Complexity Hell
**What it looks like**: The MVP requires connecting to 5+ systems (CRM, ERP, email, calendar, database) before delivering any value.
**Warning signs**: The workflow spans multiple tools and teams. No single API covers the data needed. Each customer uses different versions of the same software.
**Real pattern**: Integration-heavy products spend 70% of engineering time on connectors and 30% on the actual AI. Every new customer requires custom integration work.
**How to de-risk**: Start with ONE integration. Pick the most common tool in the target market (e.g., HubSpot for sales, QuickBooks for accounting). Deliver value through that single connection first. Add integrations based on demand.

### 5. Data Moat Delusion
**What it looks like**: "Once we have enough data from customers, our model will be unbeatable and no one can compete."
**Warning signs**: The plan depends on accumulating proprietary data over time, but there's no mechanism for users to contribute data naturally. The training data required is either publicly available or locked behind competitors' APIs.
**Real pattern**: Startup plans to build proprietary dataset but users won't share data without immediate value. Meanwhile, foundation models keep getting better and erode whatever data advantage existed.
**How to de-risk**: Build defensibility through workflow integration depth, not data accumulation. Use foundation models and fine-tune on customer-specific data (which stays with each customer). Compete on UX, speed, and domain fit rather than model quality alone.

### 6. Horizontal Trap
**What it looks like**: "Our AI tool works for any industry, any workflow, any company size."
**Warning signs**: Marketing says "AI for business" or "automation for everyone." No specific industry page on the website. Sales team cannot name 3 exact job titles of ideal buyers.
**Real pattern**: Horizontal AI tools compete with ChatGPT, Notion AI, Microsoft Copilot, and every other horizontal player. No wedge, no word-of-mouth, no community. Customer acquisition cost is astronomical.
**How to de-risk**: Pick ONE vertical. Become the "AI [tool] for [industry]." Own the community, the keywords, the integrations. Expand horizontally only after dominating one vertical.

### 7. Pricing Misalignment
**What it looks like**: The product costs $200/month to run (API costs, infrastructure) but the buyer won't pay more than $49/month.
**Warning signs**: High LLM API costs per transaction. Target market is price-sensitive (SMBs, solo practitioners, non-profits). Value delivered is incremental (saves 2 hours/week) not transformational (saves a full-time hire).
**Real pattern**: AI startups set pricing based on API costs + margin, but buyers compare against the manual alternative (which feels "free" because it's just employee time).
**How to de-risk**: Calculate the unit economics before building. Know the API cost per transaction. Price based on value delivered (hours saved × hourly rate, or errors prevented × error cost), not cost-plus. If the math doesn't work, find a higher-value use case.

### 8. Market Timing Failure
**What it looks like**: The idea is genuinely good but the market isn't ready — or it was ready 2 years ago and is now saturated.
**Warning signs (too early)**: Buyers don't understand what AI can do. No budget category exists for this. The required AI capability isn't reliable enough yet.
**Warning signs (too late)**: 10+ funded competitors exist. Market leader has already raised Series C. Buyers have "AI fatigue" for this category.
**Real pattern**: Chatbot companies launched in 2016-2018 (too early — NLP wasn't good enough). The same market exploded in 2023 with LLMs. Those who waited built better products.
**How to de-risk**: Check if buyers are actively searching for solutions (Google Trends, Reddit, industry forums). Verify that the AI capability actually works for this use case today. If the market is emerging, plan for a 12-18 month runway before revenue scales.

### 9. Regulatory Blindside
**What it looks like**: Product launches successfully, then a regulatory change makes it illegal, requires expensive compliance, or destroys the value proposition.
**Warning signs**: Healthcare (HIPAA), finance (SOC2, PCI), education (FERPA), EU (GDPR, AI Act), government (FedRAMP). Any AI that touches PII, medical data, financial records, or children's data.
**Real pattern**: AI startups in healthcare build products that work technically but can't be deployed because they aren't HIPAA-compliant. The compliance work costs more than the product development.
**How to de-risk**: Research regulatory requirements BEFORE building. Budget for compliance as a line item (HIPAA compliance = $10-50k, SOC2 = $20-100k). Consider starting in less-regulated markets and expanding to regulated ones after proving the product.

### 10. Team-Market Mismatch
**What it looks like**: Founders are brilliant engineers but have zero domain expertise in the industry they're targeting.
**Warning signs**: Founders have never worked in the target industry. No advisor or co-founder with domain experience. Product decisions are made from assumptions rather than industry knowledge. Sales conversations reveal gaps in understanding the buyer's world.
**Real pattern**: Tech founders build "AI for construction" without understanding how construction projects actually work. The product solves the wrong problem or uses the wrong terminology.
**How to de-risk**: Find a domain expert (advisor, co-founder, or first customer who partners closely). Spend 2-4 weeks shadowing real workflows before building. Join industry communities and listen before pitching.

## Pre-Mortem Checklist

Before recommending any opportunity, verify that it can survive these 10 questions:

| # | Question | Pass Criteria |
|---|----------|--------------|
| 1 | Can you name 3 specific companies that have this problem? | Yes, with named roles |
| 2 | What do they do manually today, step by step? | Described in detail |
| 3 | How much does the manual process cost them ($/time/risk)? | Quantified |
| 4 | Can current AI actually perform the core task? | Demonstrated, not assumed |
| 5 | Can the MVP work with 1-2 integrations maximum? | Yes |
| 6 | Can one person buy it without committee approval? | Yes, or short approval chain |
| 7 | Are the unit economics positive at the proposed price? | API cost < 30% of revenue |
| 8 | Is the market validated but not yet crowded? | 2-5 funded competitors |
| 9 | Does the idea avoid all 10 failure modes, or have mitigations for vulnerable ones? | Mitigations documented |
| 10 | Does the founder have access to the target market (domain knowledge, network, or distribution)? | At least one channel identified |

**Scoring**: 8-10 passes = High survival confidence. 5-7 = Medium. Below 5 = Low — recommend reconsidering or pivoting the approach.

## Failure Analysis Output Template

For each opportunity, produce:

```markdown
### Failure Risk Analysis

**Vulnerable Failure Modes**:
- [Mode name]: [Why this idea is vulnerable] → [Mitigation]
- [Mode name]: [Why this idea is vulnerable] → [Mitigation]

**Failed Predecessors**:
- [Name/description] ([year]): [What they tried] → [Why they failed]
- [Name/description] ([year]): [What they tried] → [Why they failed]

**Key Lessons**: [What this idea does differently]

**Critical Assumptions**:
1. [Assumption that must be true]
2. [Assumption that must be true]

**Pre-Mortem Score**: X/10 passes
**Survival Confidence**: [High / Medium / Low]
```
