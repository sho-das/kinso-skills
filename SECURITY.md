# Security notes

Every bundled skill was scanned before it was added (our own scanner, pinned commit, file hashes) and again for this release with SkillSpector (NVIDIA, offline, `--no-llm`) on 2026-11-09.

## How Kinso keeps outside skills in check

- Outside skills are bundled **unchanged**. Kinso never runs their install scripts, update checks or telemetry.
- Scripts run only through `kinso-frontend/tools/sandbox/run.sh` (macOS `sandbox-exec`): writes only in the run folder, no reading of your home folder (so no browser cookies or keys), optional no-network mode.
- The guard hook (`tools/hooks/guard.py`, added per project with `npx kinso guard <project>`) blocks deleting files, running scripts outside the sandbox, web tools outside the collector, and git push or commit.

## Known items

- `last30days` (validate) can read browser cookies and suggests a `curl | bash` install for another tool. Kinso uses only its search method; inside the sandbox it cannot reach your cookies.
- `gstack-shared/lib/diagram-render/dist/diagram-render.html` (promote, business) contains a public web API key from its upstream build. It is upstream's, already public, and not used by Kinso.
- SkillSpector rates many skills HIGH or CRITICAL. In the cases checked by hand, the hits were words like "never" read as anti-refusal, scripts calling local programs, or docs describing attacks. Read a skill's findings before running its scripts outside Kinso.

## SkillSpector ratings (HIGH and CRITICAL only)

| Kinso skill | Skill | Score | Severity | Findings |
|---|---|---|---|---|
| validate | last30days | 100 | CRITICAL | 110 |
| validate | office-hours | 100 | CRITICAL | 10 |
| validate | plan-ceo-review | 100 | CRITICAL | 7 |
| validate | startup-design | 65 | HIGH | 16 |
| business | cash-flow-snapshot | 51 | HIGH | 4 |
| business | claude-api | 100 | CRITICAL | 83 |
| business | dpdpa | 56 | HIGH | 8 |
| business | lgpd | 51 | HIGH | 4 |
| business | office-hours | 100 | CRITICAL | 10 |
| business | plan-ceo-review | 100 | CRITICAL | 7 |
| business | startup-design | 65 | HIGH | 16 |
| build | api-designer | 100 | CRITICAL | 12 |
| build | brainstorming | 90 | CRITICAL | 6 |
| build | claude-api | 100 | CRITICAL | 83 |
| build | cloud-architect | 66 | HIGH | 6 |
| build | diagnosing-bugs | 65 | HIGH | 2 |
| build | django-expert | 63 | HIGH | 6 |
| build | fastapi-expert | 95 | CRITICAL | 10 |
| frontend | seo | 59 | HIGH | 19 |
| frontend | seo-agentic | 67 | HIGH | 9 |
| frontend | seo-geo | 51 | HIGH | 3 |
| frontend | daangn-seed | 61 | HIGH | 15 |
| frontend | design-consultation | 92 | CRITICAL | 6 |
| frontend | hallmark | 100 | CRITICAL | 34 |
| frontend | impeccable | 100 | CRITICAL | 54 |
| frontend | styleseed | 94 | CRITICAL | 31 |
| frontend | design-taste-frontend | 100 | CRITICAL | 31 |
| qa | api-to-testcase-generator | 66 | HIGH | 7 |
| qa | chaos-engineer | 100 | CRITICAL | 14 |
| qa | espresso-skill | 52 | HIGH | 5 |
| qa | performance-optimization | 54 | HIGH | 3 |
| qa | pict-test-designer | 70 | HIGH | 5 |
| qa | playwright-expert | 78 | HIGH | 8 |
| promote | brand | 71 | HIGH | 17 |
| promote | content-strategy | 55 | HIGH | 3 |
| promote | design | 100 | CRITICAL | 35 |
| promote | design-system | 72 | HIGH | 24 |
| promote | directory-submissions | 68 | HIGH | 5 |
| promote | public-relations | 63 | HIGH | 9 |
| promote | readme-writer | 100 | CRITICAL | 29 |
| promote | ui-ux-pro-max | 100 | CRITICAL | 24 |
| promote | video-editing | 54 | HIGH | 5 |

Full reports: run `skillspector scan <folder> -r --no-llm` on any skill folder. Put the files outside your home folder first if you run it inside the Kinso sandbox.
