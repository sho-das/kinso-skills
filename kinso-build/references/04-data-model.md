# Stage 4 - Data model and backend design

Read `BRAIN.md` first. Paths are from `kinso-build/`.

## Runs

1. `skills/domain-modeling/SKILL.md` (Pocock) - glossary and ADRs.
2. Deal 2 of these 3, each in a fresh session:
   - `skills/api-and-interface-design/SKILL.md` (Addy);
   - `skills/api-design/SKILL.md` (ECC);
   - `skills/api-designer/SKILL.md` (Jeff) with its `references/`.
3. The database and backend skills that `build/STACK.md` names for stage 4 ("Skills per stage"). Read them for the chosen database and backend only:
   - Postgres: `skills/postgres-pro/`, `skills/postgres-patterns/`, `skills/database-migrations/`, `skills/supabase-postgres-best-practices/`;
   - Supabase: `skills/supabase/SKILL.md` and its `references/`;
   - Prisma: `skills/prisma-patterns/`;
   - FastAPI: `skills/fastapi-expert/`; Django: `skills/django-expert/`;
   - NestJS: `skills/nestjs-expert/`; Next.js API, Node, Express: `skills/nextjs-developer/`, `skills/backend-patterns/`;
   - Spring Boot: `skills/spring-boot-engineer/` (with `skills/kotlin-specialist/` for Kotlin); Go: `skills/golang-pro/`;
   - Other choices (for example SQLite, MySQL, MongoDB, Firestore): none; the dealt API skill and domain-modeling cover it.
4. With more than one platform: one API for all apps. Login, data sync, push alerts and file storage are designed once here, as `STACK.md` "How they connect" says. `API.md` names which app uses each endpoint.

**Skip:** the supabase skill's `.mcp.json` step (section "Supabase MCP Server") until the founder OKs it. Its changelog and docs fetches go only through `../tools/collect/`. Any CLI login, link or `db push` step. Log each skip in `build/PROCESS.md`.

## In

- `build/SPEC.md`, `build/PLAN.md`, `build/GUARDS.md`.
- `build/STACK.md` - the chosen database, backend, login method and the connection plan.
- `<job>/business/RISK.md` for personal data rules.

## Deal and pick

- Who deals: the orchestrator (the session running the skill) starts each dealt option as its own fresh subagent, and the judge as one more fresh subagent with the option names hidden (CORE section 4). A runner never deals. Where no subagents exist (a plain API), run each option as a separate call with no shared history, and the judge as another. Name each agent id or call id in the pick.
- Seed `<job>-build-04`. Write the seed and the draw.
- Rubric, 0 to 3 per line:
  - (must) each table and field traces to a spec line;
  - (must) personal data kept to what the spec needs (`RISK.md`);
  - migrations reversible;
  - clear error shapes;
  - the metric can be read from the data.
- Write `<job>/picks/build/04-PICK.md`.

## Guards

- Never push, deploy, commit or merge without the founder's OK. No remote database is created or linked.
- Secrets never in files. Connection strings go in `.env` (ignored); `.env.example` has the names only.
- Production data is read-only. Never delete or change it. No migration runs against it.
- Free only. Never a `-contributor` model. Scripts only through the sandbox.
- The supabase `.mcp.json` step needs the founder's OK first, for that action.

## Checks after

- Every table and field has a spec line. Any personal field has a reason in `DATA-MODEL.md`.
- The riskiest assumption's metric has a field, event or query that counts it, named in `DATA-MODEL.md`.
- Seed data is made up and labelled "test data".
- No production data was read or touched.

## Override

The founder may keep a field the brain would drop. Log the privacy risk in `<job>/OVERRIDES.md`.

## Out

- `<job>/build/DATA-MODEL.md`, `<job>/build/API.md`, `<job>/build/GLOSSARY.md`, `<code>/docs/adr/`.
- `<job>/build/options/api-A.md`, `api-B.md`, `<job>/picks/build/04-PICK.md`.

## Stop point

Yes, with stage 3: the plan, the data model and the new dependencies. Wait for the founder's OK. One OK per install.
