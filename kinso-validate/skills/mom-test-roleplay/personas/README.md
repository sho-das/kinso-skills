# Persona packs

One markdown file per simulated customer, at `personas/<industry>/<slug>.md`. The
`mom-test-roleplay` skill loads them by `<industry>/<slug>` or by `random [industry] [difficulty]`.

## Schema

```yaml
---
name: Human-readable name of the persona (not a real person)
industry: healthcare | saas | local-business | developer-tools | creator | fintech | ...
role: what they do, in the words they'd use
difficulty: 1-5
---
```

Body sections, all required. This is the hidden fact sheet; the founder shouldn't see it
until the debrief. (It's readable on disk. Honor system.)

```
## Founder's likely assumption
## Real top problem            (unprompted; may differ from the assumption)
## Does this person have the assumed problem?   yes / tolerated / no, and why
## Incidents                   2–3, dated, with time and money costs
## Current solution            and what's wrong with it
## Past attempts               what they tried, why it failed
## Spending                    what they pay today, budget reality
## Decision path               who decides, how the last purchase went
## Constraint                  one hard blocker (IT, legal, owner, integration)
## Urgency trigger             or "none"
## Feature they'll volunteer   and the hidden motive
## Emotional nerve             what they'll vent about if asked well
```

## Difficulty table

| d | Behavior |
|---|---|
| 1 | Has the problem, answers directly, is the decision-maker |
| 2 | Has the problem, needs one anchor ("when did that last happen?") to get specific |
| 3 | Tolerated problem, one tangent per turn, real top problem is adjacent to the assumed one |
| 4 | Buried problem, flatters when pitched, not the decision-maker |
| 5 | No real problem, warm, non-decision-maker, volunteers a feature idea |

Whether the persona has the problem and whether they decide is implied by difficulty; don't add fields for it.

## Contributing

Copy the closest existing pack, change every fact, keep the schema, open a PR. One
persona per file. Keep it under 60 lines. Real-sounding, not real: never base it on an
identifiable person.
