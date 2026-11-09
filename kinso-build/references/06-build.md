# Stage 6 - Build in small steps

Read `BRAIN.md` first. Paths are from `kinso-build/`.

## Runs

1. Rotate one per job:
   - `skills/incremental-implementation/SKILL.md` (Addy);
   - `skills/executing-plans/SKILL.md` (superpowers; reads `skills/using-superpowers/references/`);
   - `skills/subagent-driven-development/SKILL.md` (superpowers; reads `skills/requesting-code-review/code-reviewer.md`). One fresh subagent per task.
2. `skills/source-driven-development/SKILL.md` for library facts. Docs only through `../tools/collect/`.
3. The language and platform skills that `build/STACK.md` names for stage 6, plus the stage 4 backend and database skills (for example `skills/fastapi-expert/`, `skills/backend-patterns/`, `skills/supabase/`, `skills/flutter-expert/`, `skills/swiftui-patterns/`).
4. **kinso-frontend** for every page and screen: `../kinso-frontend/SKILL.md`, way in "From kinso-build", with `build/SPEC.md`, `build/STACK.md`, `<job>/handoff/PRODUCT.md`, `<job>/handoff/TEST-PAGE.md`, `<job>/OVERRIDES.md` and `<job>/business/RISK.md` as inputs, and the platform target and pages path from `STACK.md`: web, Flutter, React Native, Android Kotlin or iOS Swift. It writes the pages into `<code>/<pages path>`. Its stage 10 for app screens. It runs its own brain and stop points.
   - More than one platform: one kinso-frontend call per platform, in the build order from `STACK.md`, and only for the platforms marked "now". Every app uses the same API from `build/API.md`. Build the API first, then the first platform.
   - The repo layout (monorepo or separate repos) follows `STACK.md`.
5. After each task, one check, rotated: `skills/verification-before-completion/SKILL.md` or `skills/verification-loop/SKILL.md`.

**Skip:** the helper scripts in `skills/subagent-driven-development/scripts/`; any worktree, branch, commit or push step; the supabase `.mcp.json` step without the founder's OK. Log each skip in `build/PROCESS.md`.

## In

- `build/PLAN.md`, `build/tasks/`, `build/SPEC.md`, `build/DATA-MODEL.md`, `build/API.md`, `<code>/tests/` (red).
- `build/STACK.md` - language, backend, platforms, platform targets, build order, repo layout.
- `build/GUARDS.md`, `build/DEPENDENCIES.md` (approved only).

## Deal and pick

- Rotate, do not deal (seed `<job>-build-06`). Write which skill ran.
- Rubric, logged per task in `build/PROGRESS.md`:
  - (must) each task ends green, with the run output saved;
  - small diffs;
  - no task outside the plan.
- Write `<job>/picks/build/06-PICK.md`.

## Guards

- Never push, deploy, commit or merge without the founder's OK. Local commits only if the founder said yes at stage 0.
- Secrets never in files. Production data read-only. Free only. Never a `-contributor` model.
- Every script, test runner and dev server through `../kinso-frontend/tools/sandbox/run.sh <run folder> <command>`.
- No new package beyond `DEPENDENCIES.md`. Ask first, one OK per install.
- No claim from the "must not make" list in `<job>/handoff/PROMOTE.md` appears in the product.

## Checks after (each task)

- The tests pass. The output is saved in `build/runs/NN.log`.
- The app starts in the sandbox and answers on the local host.
- No secrets in the repo: grep for keys, tokens and passwords; `.env` is in `.gitignore`.
- The riskiest assumption's metric is wired: the event or row is counted as the spec says, and the number shows where the spec says.
- kinso-frontend's own checks pass (no `href="#"`, labels, keyboard use, slot rules).

## Override

The founder may accept a task with a failing test. It stays a red flag in stage 10 and in `build/LIMITS.md`. Log in `<job>/OVERRIDES.md`.

## Out

- The code in `<code>/`, and `<code>/RUN.md`: the start command, port and seed step, so stages 9 and 10 can start the app before the stage 11 README exists.
- The pages and screens from kinso-frontend in `<code>/<pages path>` (from `STACK.md`), and its `review/REVIEW.md` verdict in the job folder.
- `<job>/build/PROGRESS.md` (task, test, result), `<job>/build/runs/`.
- `<job>/picks/build/06-PICK.md`.

## Stop point

None, except the general one: before any commit, install, push or deploy.
