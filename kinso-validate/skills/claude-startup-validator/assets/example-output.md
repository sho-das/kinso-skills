# Example Output: Detailed Mode

This example shows a complete 28-field output for one opportunity. Use this as a quality benchmark — every generated opportunity should match this level of specificity and grounding.

---

## AI-Powered Construction RFI Tracker

**Industry**: Construction / Project Management
**Target Buyer**: Project Manager at general contractors (50-500 employees)
**End User**: Project engineers, site superintendents, subcontractor coordinators

### The Problem

**Current Manual Workflow**: On a typical commercial construction project, 200-800 RFIs (Requests for Information) are generated. Each RFI is created by a subcontractor or engineer, emailed or entered into project management software, assigned to the appropriate party, tracked for response deadline, reviewed for completeness, and the answer routed back. Project engineers spend 8-12 hours per week managing RFIs — reading each one, determining who should answer, chasing overdue responses, and logging status updates. Most teams use a combination of email, spreadsheets, and Procore/PlanGrid with manual data entry.

**Core Problem**: RFI management is a high-volume, time-sensitive coordination task that consumes skilled staff time and creates project delays when responses are late or incomplete.

**Why This Problem Matters**: Late RFI responses delay construction schedules by an average of 3-5 days per incident. On a $10M project, each day of delay costs $5,000-15,000. A project with 50 late RFIs could see $250k-750k in delay costs. Project managers who manage RFIs faster win more bids because they deliver on time.

### The Solution

**AI-Powered Solution**: AI reads incoming RFIs, classifies them by trade/discipline (structural, mechanical, electrical, architectural), identifies the responsible party based on project directory and contract scope, drafts a routing recommendation, flags incomplete RFIs that need more information, tracks response deadlines, and generates daily summaries of overdue items with escalation recommendations.

**Key Features**:
- Automatic RFI classification by trade, urgency, and complexity
- Smart routing suggestions based on contract scope and project directory
- Incomplete RFI detection — flags missing drawings, specs, or context before routing
- Deadline tracking with automated escalation alerts
- Daily digest email with overdue RFIs, pending responses, and trend analysis
- Response draft suggestions for common/recurring RFI types
- Integration with Procore, PlanGrid, or email-based workflows

### MVP Plan

**Recommended MVP**: Email-based RFI tracker for one general contractor. Ingests RFIs via email forwarding, classifies and routes using LLM, tracks deadlines in a simple dashboard, sends daily summary emails. Single integration: email (IMAP/SMTP). No Procore integration in v1.

- **Data Required**: RFI emails, project directory (CSV), contract scope documents (PDF)
- **Integrations**: Email (IMAP/SMTP) only in v1. Procore API in v2.
- **AI Capability Match**: LLM classification, document extraction, structured output, email drafting
- **Complexity**: Medium
- **Time to MVP**: 5 weeks

### Business Model

- **Model**: Monthly SaaS subscription per project
- **Pricing**: $199-499/month per active project (or $49/month per user seat)
- **Defensibility**: Workflow integration depth — once a PM uses this for 3+ projects, switching cost is high. Historical RFI data improves routing accuracy over time.
- **Go-to-Market**: Target construction project management communities (LinkedIn groups, AGC chapters, ENR conferences). Offer free 30-day pilot on one project. Testimonials from PMs who saved time sell the next PM.

### Competitive Landscape

**Direct Competitors**:
| Competitor | Funding | Pricing | Strengths | Weaknesses |
|------------|---------|---------|-----------|------------|
| Procore RFI module | Public ($6B+) | Part of $500+/mo platform | Market leader, full project suite | Not AI-powered, generic routing, expensive |
| PlanGrid (Autodesk) | Acquired $875M | Part of Autodesk suite | Strong mobile app, drawing integration | RFI management is basic, no AI classification |

**Indirect Competitors**: Email + spreadsheet tracking (free but unscalable), dedicated coordinators ($60-80k/year salary)

**Adjacent Threats**: Procore could add AI features, but enterprise product cycles are slow (12-18 months)

**DIY Alternatives**: ChatGPT + copy-paste for classification (no tracking, no integration, no audit trail)

**Market Saturation**: Validated but not AI-crowded. RFI management exists in platforms but no AI-native standalone tool.

**Why This Wins**: Existing tools treat RFIs as a simple log. This product uses AI to actively classify, route, and draft — reducing the 8-12 hours/week to 2-3 hours. Procore charges $500+/month for the full suite when PMs only need RFI tracking for $199/month.

### Failure Risk Analysis

**Vulnerable Failure Modes**:
- Integration Complexity (Mode 4): Risk of needing Procore/PlanGrid APIs for adoption → **Mitigated**: v1 is email-only, no platform dependency
- Accuracy Dependency (Mode 2): Mis-routing an RFI could cause delays → **Mitigated**: AI suggests routing, human confirms. Draft + review model.
- Enterprise Sales (Mode 3): Large GCs have long procurement cycles → **Mitigated**: Target mid-size GCs (50-200 employees) where PM can buy directly

**Failed Predecessors**:
- Several construction AI startups (2018-2020) tried to automate full project management → failed because the scope was too broad and accuracy wasn't good enough for site-critical decisions. Lesson: narrow to one workflow (RFIs), not the entire project.
- Generic AI email assistants (2022-2023) tried to handle construction emails → failed because they lacked construction-specific classification. Lesson: vertical-specific training matters.

**Key Lessons**: Go narrow (RFIs only), stay vertical (construction only), keep human-in-the-loop (suggest, don't auto-route).

**Market Timing Signal**: LLMs now handle document classification and extraction reliably. Construction industry is in a digital transformation wave (Procore IPO validated the market). COVID-era labor shortages made efficiency tools more desirable. GCs are willing to adopt AI tools as of 2024-2025.

**Critical Assumptions**:
1. PMs will forward RFI emails to the system (behavior change required)
2. LLM classification accuracy exceeds 85% for trade/discipline routing
3. Mid-size GCs will pay $199-499/month for a standalone RFI tool

**Pre-Mortem Score**: 8/10 passes
**Survival Confidence**: High

### Scores

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| Pain Severity | 8/10 | Daily pain, costly delays, skilled staff time consumed |
| Budget Availability | 7/10 | GCs already pay for Procore ($500+/mo), dedicated coordinators ($60k+/yr) |
| Automation Fit | 8/10 | Classification, routing, tracking — all well-suited to LLM |
| MVP Simplicity | 7/10 | Email-based MVP is focused. No complex integrations in v1. |
| Distribution Ease | 6/10 | Construction community is tight-knit. Word of mouth works but initial reach requires effort. |
| Differentiation | 7/10 | Vertical focus + AI-native vs bolt-on features in legacy tools |
| **Composite** | **7.35/10** | **Strong** |

### Verdict

AI-Powered Construction RFI Tracker is a strong opportunity targeting a well-defined pain point in a validated market. The email-first MVP is buildable in 5 weeks with minimal integration risk. The biggest challenge is initial distribution — construction PMs don't browse Product Hunt — but the tight-knit industry means one satisfied PM at a large GC becomes a distribution channel through subcontractor word-of-mouth. Start with 3 pilot projects, prove the time savings, and expand from there.
