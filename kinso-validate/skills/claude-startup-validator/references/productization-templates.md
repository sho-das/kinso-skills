# Productization Templates

Use these templates to accelerate product design. Match each opportunity to the most fitting template. Most ideas will map to one primary template, sometimes combining elements from two.

## Template A: Repetitive Knowledge Work Automator

**Pattern**: "Teams currently do X manually across Y records per week. AI ingests the source material, extracts the needed information, produces a draft/result, and sends it for review."

**Best for**: Data entry, document processing, report generation, email drafting, form filling, content summarization.

**Architecture**:
- Input: Documents, emails, forms, spreadsheets, or API data
- Processing: LLM extraction + structured output
- Output: Drafted result in target format
- Review: Human approval queue

**Laravel Stack**:
- Queue workers for async AI processing
- Database for job tracking and results
- Simple Blade/Livewire dashboard for review queue
- Webhook receivers for input triggers
- OpenAI/Anthropic API client

**Pricing Model**: Per-document or per-record processing fee, or monthly subscription with volume tiers.

**Typical Timeline**: 3-5 weeks to MVP.

**Key Risk**: Accuracy requirements — if the domain demands 99%+ accuracy (financial, legal, medical), human-in-the-loop is mandatory, not optional.

---

## Template B: Review & QA System

**Pattern**: "Managers cannot review all interactions manually. AI samples, scores, flags, and summarizes the highest-risk cases."

**Best for**: Call center QA, code review, content moderation, compliance checking, support ticket quality, sales call scoring.

**Architecture**:
- Input: Transcripts, recordings, tickets, or code diffs
- Processing: LLM scoring against criteria/rubric
- Output: Scores, flags, summaries, and trend reports
- Review: Manager dashboard with drill-down

**Laravel Stack**:
- Cron jobs for periodic batch analysis
- Scoring engine with configurable rubrics
- Dashboard with charts (Chart.js / ApexCharts)
- Export to CSV/PDF for compliance
- Whisper API for voice transcription if needed

**Pricing Model**: Per-seat for managers, or per-review-volume.

**Typical Timeline**: 4-6 weeks to MVP.

**Key Risk**: Calibration — AI scores must align with what managers would score. Requires a calibration phase during onboarding.

---

## Template C: Routing & Triage Engine

**Pattern**: "Requests arrive through fragmented channels. AI classifies, prioritizes, routes, and drafts the next action."

**Best for**: Support ticket triage, lead routing, helpdesk automation, IT ticket classification, insurance claims intake, order issue handling.

**Architecture**:
- Input: Incoming tickets, emails, chat messages, forms
- Processing: LLM classification + priority scoring + routing rules
- Output: Classified and routed requests with draft responses
- Review: Agent queue with AI-suggested actions

**Laravel Stack**:
- Webhook receivers for incoming channels (email, chat, forms)
- Classification pipeline with LLM
- Rules engine for routing logic
- Agent dashboard with queue management
- Integration with existing helpdesk/CRM

**Pricing Model**: Per-ticket or monthly subscription based on volume.

**Typical Timeline**: 4-6 weeks to MVP.

**Key Risk**: Routing accuracy in edge cases. Misrouted high-priority tickets are worse than no routing. Start with suggestions, not autonomous routing.

---

## Template D: Sales & Lead Intelligence

**Pattern**: "Leads are manually reviewed and followed up inconsistently. AI scores, enriches, prioritizes, and drafts outreach."

**Best for**: Lead qualification, sales email drafting, prospect research, CRM enrichment, meeting prep, follow-up automation.

**Architecture**:
- Input: CRM data, website visits, form fills, social signals
- Processing: LLM enrichment + scoring model + email drafting
- Output: Scored leads with draft outreach and talking points
- Review: Sales rep approves/edits before sending

**Laravel Stack**:
- CRM API integration (HubSpot, Pipedrive, etc.)
- Enrichment pipeline with web scraping + LLM
- Email drafting with templates + personalization
- Dashboard showing pipeline with AI scores
- Scheduled jobs for daily lead scoring

**Pricing Model**: Per-seat for sales reps, or per-lead processed.

**Typical Timeline**: 3-5 weeks to MVP.

**Key Risk**: Integration depth — the product must live where salespeople already work (CRM, email). A separate dashboard they have to check is a non-starter.

---

## Template E: Document Operations Platform

**Pattern**: "Documents are read and processed by humans. AI extracts fields, checks completeness, compares versions, and flags missing items."

**Best for**: Invoice processing, contract review, permit applications, insurance claims, compliance documents, medical records intake, shipping documents.

**Architecture**:
- Input: PDFs, images, scanned documents, email attachments
- Processing: OCR + LLM extraction + validation rules
- Output: Structured data + completeness report + exception flags
- Review: Human reviews exceptions and approves extractions

**Laravel Stack**:
- File upload with OCR pipeline (Textract, Google Vision, or Tesseract)
- LLM extraction with structured output (JSON mode)
- Validation engine with configurable rules per document type
- Review dashboard with side-by-side (original doc + extracted data)
- Export to accounting/ERP systems via API

**Pricing Model**: Per-document or monthly subscription with volume tiers.

**Typical Timeline**: 4-6 weeks to MVP.

**Key Risk**: Document variety — every client's invoices look different. Start with one document type from one industry. Expand document types after proving accuracy.

---

## Template Selection Guide

| If the opportunity involves... | Use Template |
|-------------------------------|-------------|
| Processing many similar documents/records | A (Knowledge Work) |
| Scoring or evaluating quality of interactions | B (Review & QA) |
| Classifying and routing incoming requests | C (Routing & Triage) |
| Enriching or qualifying leads/prospects | D (Sales Intelligence) |
| Extracting data from unstructured documents | E (Document Ops) |

If an opportunity doesn't fit any template cleanly, combine elements from the two closest templates. State which elements come from which template.
