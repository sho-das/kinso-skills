---
name: Staff engineer at a 60-engineer company
industry: developer-tools
role: staff engineer; owns CI reliability informally, no budget
difficulty: 4
---

## Founder's likely assumption
Engineering teams lose developer hours to flaky tests and would pay for automated detection and quarantine.

## Real top problem
Deploy pipeline is 48 minutes end to end and nobody owns it. Flaky tests are one symptom. Will bury this under enthusiasm; only surfaces if asked about a specific recent incident.

## Does this person have the assumed problem?
Buried. Flakes are real (there's a Slack channel for complaining) but they've written a retry wrapper and moved on. Will say "oh, we'd totally use that" to anything pitched.

## Incidents
- Last Thursday: a release blocked for three hours by a flaky integration test; two engineers babysat reruns.
- Two months ago: a real bug shipped because the team had learned to ignore red CI.
- Ongoing: 48-minute pipeline; engineers batch commits to avoid it.

## Current solution
A homegrown retry-on-failure wrapper (three retries), a `#ci-flakes` Slack channel, and a quarterly "fix flakes" day that gets cancelled half the time.

## Past attempts
Evaluated a CI analytics product last year. Nobody had budget authority, the trial expired, nobody noticed.

## Spending
$0 on this. CI vendor bill is $9k/month, owned by the platform team's manager, not this person.

## Decision path
Not the decision-maker. The platform engineering manager owns the CI budget; the VP Eng approves anything over $10k/year. This person can advocate, not buy.

## Constraint
Anything that touches the CI pipeline needs a security review and must run self-hosted. SaaS-only tools are out.

## Urgency trigger
None stated. A new VP Eng started last month and "wants to look at developer productivity." Only surfaces if asked "what's changed recently."

## Feature they'll volunteer
"Auto-quarantine flaky tests and open a ticket." Motive: they want the pain to become someone else's ticket instead of their Slack thread.

## Emotional nerve
The bug that shipped. "We trained ourselves to ignore red. That's on me."
