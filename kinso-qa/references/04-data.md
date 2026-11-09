# Stage 4 - Database and queries

Read `BRAIN.md` first. Paths are from `kinso-qa/`.

## Runs

1. `skills/database-optimizer/SKILL.md` (Jeff) with its `references/` - slow queries, query plans (`EXPLAIN` or `EXPLAIN QUERY PLAN`), missing indexes, N+1.
2. `skills/database-migrations/SKILL.md` (ECC) - each migration up, down and up again on a copy with test data.
3. `skills/property-based-testing/skills/property-based-testing/SKILL.md` (Trail of Bits) - integrity under generated data (sums, counts, unique rules, dates). Read only.
4. The database skill named in `build/STACK.md` from `../kinso-build/skills/` (for example `postgres-pro`, `supabase-postgres-best-practices`).
5. High cells: the 2 testers are database-optimizer and property-based-testing, each a fresh session.

**Skip:** any step against a hosted database, any `--force` reset on a database that is not the test copy. Log each skip in `qa/PROCESS.md`.

## In

- `qa/MATRIX.md` (data cells), `build/DATA-MODEL.md`, the migrations folder, `<code>/`, `<code>/RUN.md` (the seed step), `qa/HOSTS.md`, `qa/regression/`.
- Draws: `banks/EDGE-CASES.md` section E4, one persona.

## Deal and pick

- As `BRAIN.md`. Write `<job>/picks/qa/04-PICK.md`.

## Guards

- **A test copy only.** Every test runs on a new database made in the run folder (`qa/runs/data/<run>/`) from the seed step, or a local test database. Never the app's own data file, never a hosted database, never production.
- Large data is generated test data (for example 10,000 rows marked "test data").
- Through the sandbox. Never `rm` (a new copy per run). Never commit.

## Checks after

- Each list page's query timed at 10,000 rows, with the plan saved.
- Migrations: up, down, up again; row counts and a checksum of the test data equal before and after.
- Every number the app shows (counts, sums, the metric) checked by hand against the rows once.
- Constraint rules from `DATA-MODEL.md` (unique, not null, foreign keys, delete rules) each have a test.

## Override

The founder may accept a slow query with a limit (for example "fine up to 1,000 rows"), written in the report.

## Out

- `<job>/qa/DATA.md` - queries and times, plans, migration results, integrity cases, findings.
- `<job>/qa/runs/data/<run>/`, `<job>/picks/qa/04-PICK.md`.

## Stop point

None. Go on to stage 5.
