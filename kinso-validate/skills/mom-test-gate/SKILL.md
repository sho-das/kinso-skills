---
name: mom-test-gate
description: >
  Evidence check before building. Given a feature, product decision, or segment to
  pursue, reads the discovery/ folder and reports which assumption it rests on, how many
  real interviews back it (by evidence rung), the strongest quote for and against, and a
  verdict: build, build as experiment, or run N conversations first. Never blocks. Use
  when the user says "gate", "check the evidence for", "should we build X", "is there
  evidence for", "do customers actually want", or asks the agent to build a feature in a
  repo that has a discovery/ folder.
---

# Mom Test — Gate

Input: a feature, decision, or direction. Reads `./discovery/`. Output: an evidence
verdict. This skill never says no; it says what the evidence is and lets the founder decide.

If `./discovery/` doesn't exist: say so in one line and offer `/mom-test-memory init`.

## 1. Classify the request

- **Solution-stage**: names a feature or product to build ("one-click deposits", "an SMS
  reminder bot").
- **Problem-stage**: names a problem or segment to pursue ("go after derm clinics",
  "focus on no-shows").
- Unclear → ask one y/N: "Is this a thing to build (solution) or a direction to pursue
  (problem)?"

## 2. Map to assumptions

Read `assumptions.md`. Pick every `A<n>` the request depends on. If none fit, draft one:
a falsifiable sentence, a kill condition, the segment, status `UNTESTED`, and offer to
append it as `A<max+1>`. Then continue the verdict against that new row (which has zero
evidence).

## 3. Count evidence

For each mapped `A<n>`, grep `interviews/` for `[A<n>+]` and `[A<n>-]` tags.

- **Qualifying interview** = a distinct interview file with at least one `[A<n>+]` fact at
  rung 8 or higher.
- Count within the assumption's `segment` when that cell is set (match against the `role`
  column of `segments.md`); otherwise count across all interviews and say so.
- Also note: any `[A<n>+]` at rung 16+ (commitment to you), and the count of `[A<n>-]`
  facts at rung 8+.
- Interviews with `source: roleplay` never exist (roleplay doesn't write interviews); if
  one somehow does, skip it.

## 4. Verdict, evaluated in this order on the mapped assumption with the fewest qualifying interviews

1. A mapped assumption is `KILLED` **and the request only works if it were true** →
   **run 3 conversations first**, quoting the kill. If the kill merely informs the
   request (for example "nobody has tried a tool" is dead, but the request is to pursue
   the problem those tools failed at), don't count it against the verdict; report it as
   context and say how it sharpens the wedge.
2. Qualifying ≥ 3 and (problem-stage, or solution-stage with ≥ 1 rung-16+ fact) → **build**.
3. Qualifying ≥ 3, solution-stage, no rung-16+ fact → **build as experiment** (the problem
   is real; nobody has committed to this solution yet).
4. Otherwise → **run N conversations first**, `N = max(1, 3 − qualifying)`.

## 5. Output

```
GATE — "<request>"   (<solution-stage | problem-stage>)

Rests on:   A<n> "<assumption>"  [<status>]   (repeat per mapped assumption)
Scope:      <segment> (<n> interviews in segment)  |  all interviews (no segment set)

Evidence for A<n>:
  qualifying interviews (rung 8+ supporting):  <n>  → <basenames>
  commitment-level (rung 16+):                 <n>
  contradicting (rung 8+):                     <n>
  strongest for:      "<quote>"  (<basename>, rung <r>)
  strongest against:  "<quote>"  (<basename>, rung <r>)   or: none

VERDICT: BUILD | BUILD AS EXPERIMENT | RUN <N> CONVERSATIONS FIRST
Because: <one sentence tied to the counts above>
If running conversations: ask <segment> about <the assumption>, anchored to <the kill condition>.
```

Then ask: **"Record this verdict in `discovery/decisions.md`? [y/N]"** On yes, append
`| <today> | <request> | <verdict> | <basenames + one-line reason> |`.

## Guardrails

- Never refuse to help build. If the founder says "build it anyway," the gate's job is
  done; hand back to normal work.
- Never count compliments, intentions, or feature requests (rungs 1–7) as evidence, even
  if they're tagged `+`.
- Quote exactly; don't paraphrase customers.
