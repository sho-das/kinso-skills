# Output Schema & Formats

## 28-Field Schema

Every opportunity must include all 28 fields. Fields 25-28 are the market intelligence fields added for competitive and failure analysis.

### Field Definitions

| # | Field | Type | Description |
|---|-------|------|-------------|
| 1 | idea_name | string | Practical product name — avoid gimmicky names |
| 2 | industry | string | Industry or vertical (e.g., "Construction / Project Management") |
| 3 | target_buyer | string | Who signs the check (e.g., "Operations Manager at mid-size construction firms") |
| 4 | end_user | string | Who uses the product daily (may differ from buyer) |
| 5 | current_manual_workflow | string | What humans do today — be specific about steps |
| 6 | core_problem | string | One-sentence problem statement |
| 7 | business_impact | string | Why it matters — in dollars, hours, or risk |
| 8 | ai_solution | string | What AI does specifically (not "uses AI to improve things") |
| 9 | key_features | array | 5-7 specific features |
| 10 | recommended_mvp | string | Narrow MVP scope — one persona, one workflow, one outcome |
| 11 | required_data | array | Data inputs needed (documents, APIs, integrations) |
| 12 | integrations_needed | array | Systems to connect with |
| 13 | ai_capability_match | string | Which AI capabilities apply (LLM, OCR, RAG, etc.) |
| 14 | business_model | string | How it makes money (SaaS, usage-based, per-seat, etc.) |
| 15 | pricing_range | string | Estimated price point (e.g., "$49-149/mo per seat") |
| 16 | complexity | enum | "low" / "medium" / "high" |
| 17 | time_to_mvp | string | Estimated weeks to working MVP |
| 18 | defensibility | string | What creates a moat over time |
| 19 | risks | array | Top 3-5 risks or failure modes |
| 20 | go_to_market | string | First distribution channel and wedge strategy |
| 21 | existing_alternatives | array | Current competitors and substitutes |
| 22 | why_this_wins | string | Why this product can win despite alternatives |
| 23 | scores | object | All 6 dimension scores + composite (see below) |
| 24 | final_verdict | string | 2-3 sentence summary assessment |
| 25 | competitor_map | object | Structured competitive landscape (see below) |
| 26 | failed_predecessors | array | Startups/products that tried and failed, with reasons |
| 27 | failure_lessons | string | What to learn from failures, how this idea avoids them |
| 28 | market_timing_signal | string | Why NOW — AI maturity, cost drops, regulatory shifts, buyer readiness |

### Scores Object Structure

```json
{
  "pain_severity": 8,
  "budget_availability": 7,
  "automation_fit": 9,
  "mvp_simplicity": 7,
  "distribution_ease": 6,
  "differentiation_potential": 7,
  "opportunity_score": 7.6
}
```

### Competitor Map Object Structure

```json
{
  "direct": [
    {
      "name": "CompetitorX",
      "funding": "$5M Series A",
      "pricing": "$99/mo",
      "strengths": "Strong brand, enterprise clients",
      "weaknesses": "Slow, not AI-native, poor UX",
      "differentiation_gap": "No LLM-powered extraction, manual setup"
    }
  ],
  "indirect": [
    {
      "name": "Generic Tool Y",
      "approach": "Manual templates + rules-based automation",
      "why_not_enough": "Cannot handle unstructured data or edge cases"
    }
  ],
  "adjacent": ["Company Z could expand here but currently focused on X"],
  "diy_alternatives": ["Spreadsheets + ChatGPT copy-paste", "Hiring a VA"],
  "market_saturation": "validated_not_crowded",
  "why_still_winnable": "Existing players are not AI-native; vertical focus creates wedge"
}
```

### Failed Predecessors Array Structure

```json
[
  {
    "name": "FailedStartup Inc.",
    "year": "2021",
    "what_they_tried": "AI-powered invoice processing for SMBs",
    "why_failed": "Tried to go horizontal across all industries. Accuracy was 85% — not enough for financial documents. Burned through funding on enterprise sales.",
    "lesson": "Go vertical-first. Start with one document type in one industry. Human-in-the-loop for accuracy-sensitive workflows."
  }
]
```

## Output Format Templates

### Short Mode (Markdown Table)

Use for 5+ ideas or when user asks for a quick overview.

```markdown
| # | Idea | Industry | Buyer | AI Wedge | MVP | Score | Survival |
|---|------|----------|-------|----------|-----|-------|----------|
| 1 | Name | Sector | Role | What AI does | Timeline | 7.6 | High |
```

Follow with:
- **Best Overall**: [name + 1-line reason]
- **Fastest to Build**: [name + 1-line reason]
- **Highest Revenue Potential**: [name + 1-line reason]
- **Best for Solo Founder**: [name + 1-line reason]
- **Easiest to Build First**: [name + 1-line reason]

### Detailed Mode (Full Cards)

Use for 1-3 ideas or deep analysis.

```markdown
## [Idea Name]

**Industry**: [value]
**Target Buyer**: [value]
**End User**: [value]

### The Problem
[Current manual workflow description]
[Core problem statement]
[Business impact — dollars/hours/risk]

### The Solution
[AI-powered solution description]

**Key Features:**
- [feature 1]
- [feature 2]
...

### MVP Plan
[Recommended MVP scope]
- **Data Required**: [list]
- **Integrations**: [list]
- **Complexity**: [low/medium/high]
- **Time to MVP**: [weeks]

### Business Model
- **Model**: [type]
- **Pricing**: [range]
- **Defensibility**: [description]
- **Go-to-Market**: [wedge strategy]

### Competitive Landscape
**Direct Competitors**: [list with strengths/weaknesses]
**Indirect Competitors**: [list]
**DIY Alternatives**: [list]
**Market Saturation**: [assessment]
**Why This Wins**: [differentiation argument]

### Failure Risk Analysis
**Failed Predecessors**: [list with reasons]
**Key Lessons**: [what to learn]
**Market Timing**: [why now]
**Survival Confidence**: [High/Medium/Low]

### Scores
| Dimension | Score |
|-----------|-------|
| Pain Severity | X/10 |
| Budget Availability | X/10 |
| Automation Fit | X/10 |
| MVP Simplicity | X/10 |
| Distribution Ease | X/10 |
| Differentiation | X/10 |
| **Composite** | **X.X/10** |

### Verdict
[2-3 sentence final assessment]
```

### JSON Export Mode

Use when user explicitly requests JSON output.

```json
{
  "request_type": "broad_discovery | industry_specific | workflow_specific | persona_specific | constrained",
  "generated_at": "ISO-8601 timestamp",
  "constraints": {},
  "ideas": [
    {
      "idea_name": "",
      "industry": "",
      "target_buyer": "",
      "end_user": "",
      "current_manual_workflow": "",
      "core_problem": "",
      "business_impact": "",
      "ai_solution": "",
      "key_features": [],
      "recommended_mvp": "",
      "required_data": [],
      "integrations_needed": [],
      "ai_capability_match": "",
      "business_model": "",
      "pricing_range": "",
      "complexity": "low | medium | high",
      "time_to_mvp": "",
      "defensibility": "",
      "risks": [],
      "go_to_market": "",
      "existing_alternatives": [],
      "why_this_wins": "",
      "scores": {
        "pain_severity": 0,
        "budget_availability": 0,
        "automation_fit": 0,
        "mvp_simplicity": 0,
        "distribution_ease": 0,
        "differentiation_potential": 0,
        "opportunity_score": 0.0
      },
      "final_verdict": "",
      "competitor_map": {
        "direct": [],
        "indirect": [],
        "adjacent": [],
        "diy_alternatives": [],
        "market_saturation": "",
        "why_still_winnable": ""
      },
      "failed_predecessors": [],
      "failure_lessons": "",
      "market_timing_signal": ""
    }
  ],
  "summary": {
    "best_overall": "",
    "fastest_to_build": "",
    "highest_revenue_potential": "",
    "best_for_solo_founder": "",
    "easiest_to_build_first": ""
  }
}
```
