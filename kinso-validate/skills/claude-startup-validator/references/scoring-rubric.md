# Opportunity Scoring Rubric

Use this rubric to score every opportunity on 6 dimensions. Each dimension uses a 1-10 scale with anchored definitions. The composite Opportunity Score is a weighted average.

## Dimension Weights

| Dimension | Weight | Why |
|-----------|--------|-----|
| Pain Severity | 25% | No pain = no sale. This is the most important signal. |
| Budget Availability | 20% | The buyer must already spend money solving this problem. |
| Automation Fit | 20% | AI must actually perform the core task well — not just adjacently. |
| MVP Simplicity | 15% | A complex MVP means slow iteration and high burn. |
| Distribution Ease | 10% | Can you reach buyers without a sales team? |
| Differentiation Potential | 10% | Can the product develop a moat over time? |

## Anchored Scales

### Pain Severity (25%)
| Score | Anchor |
|-------|--------|
| 1-2 | Minor annoyance. People tolerate it. No urgency. |
| 3-4 | Noticeable friction. Occasional complaints. Workarounds exist. |
| 5-6 | Significant time drain. People actively look for solutions. Costs real money. |
| 7-8 | Major operational bottleneck. Causes errors, delays, or compliance risk. Budget exists. |
| 9-10 | Hair-on-fire problem. Daily pain. Costly errors. People would pay today for a solution. |

### Budget Availability (20%)
| Score | Anchor |
|-------|--------|
| 1-2 | No existing spend. Buyer has never paid for this category. |
| 3-4 | Small budget. Buyer uses free tools or lowest-tier subscriptions. |
| 5-6 | Moderate budget. Buyer pays for related SaaS or employs part-time staff for this. |
| 7-8 | Significant budget. Buyer has dedicated headcount or $10k+/year in tools. |
| 9-10 | Large budget. Buyer employs full teams or pays $50k+/year. Replacing even 20% is valuable. |

### Automation Fit (20%)
| Score | Anchor |
|-------|--------|
| 1-2 | Task requires deep human judgment, creativity, or physical presence. AI adds minimal value. |
| 3-4 | AI can assist but needs heavy human oversight. Accuracy requirements may be too high. |
| 5-6 | AI handles 50-70% of the task. Human reviews output. Clear input/output structure. |
| 7-8 | AI handles 70-90%. Structured data, clear patterns, well-defined rules. Human approves exceptions. |
| 9-10 | AI handles 90%+. Task is pattern-heavy, data-rich, and well-suited to current LLM/ML capabilities. |

### MVP Simplicity (15%)
| Score | Anchor |
|-------|--------|
| 1-2 | Requires complex infrastructure, multiple integrations, regulatory approval, or frontier models. |
| 3-4 | Needs 3+ integrations, custom model training, or significant domain-specific data collection. |
| 5-6 | Buildable in 6-8 weeks. Needs 1-2 integrations and standard AI APIs. |
| 7-8 | Buildable in 3-4 weeks. Single integration, standard LLM APIs, simple UI. |
| 9-10 | Buildable in 1-2 weeks. API wrapper + simple frontend. Minimal integrations. |

### Distribution Ease (10%)
| Score | Anchor |
|-------|--------|
| 1-2 | Requires enterprise sales team, long procurement cycles, or regulatory approval. |
| 3-4 | Needs outbound sales, demos, and relationship building. 3-6 month sales cycle. |
| 5-6 | Can reach buyers through content marketing, communities, or partnerships. 1-3 month cycle. |
| 7-8 | Buyers actively search for solutions. SEO, marketplaces, or platform integrations work. |
| 9-10 | Viral or product-led growth possible. Freemium works. Users become champions. |

### Differentiation Potential (10%)
| Score | Anchor |
|-------|--------|
| 1-2 | Easily replicated. No data moat, no network effects, no domain expertise required. |
| 3-4 | Slight differentiation through UX or niche focus. Competitors could copy in weeks. |
| 5-6 | Domain expertise or vertical data creates moderate barrier. Takes months to replicate. |
| 7-8 | Proprietary data, workflow integration depth, or network effects create real moat. |
| 9-10 | Strong compounding advantage — gets better with more users/data. Hard to displace once adopted. |

## Composite Score Calculation

```
Opportunity Score = (Pain × 0.25) + (Budget × 0.20) + (Automation × 0.20) + (MVP × 0.15) + (Distribution × 0.10) + (Differentiation × 0.10)
```

## Score Interpretation

| Score Range | Rating | Action |
|-------------|--------|--------|
| 8.0 - 10.0 | Exceptional | Pursue immediately. Strong on all fronts. |
| 6.5 - 7.9 | Strong | Worth building. Address weak dimensions in planning. |
| 5.0 - 6.4 | Viable | Could work with the right founder/market fit. Explain trade-offs. |
| Below 5.0 | Weak | Include only if specifically relevant to the user's constraints. Explain why it scores low. |
