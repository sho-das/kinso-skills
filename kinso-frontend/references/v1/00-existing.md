# Stage 0 - Existing project

Approved 2026-10-26 after testing (see `tests/stage0/RESULTS.md`: this method tied plain Claude at 8.3 of 10 and was best on the map and the report; the test's fixes are in).

Sources: ponytail-audit "map first" (MIT, DietrichGebert), Impeccable `document` and `extract` (Apache 2.0, pbakaus). Rewritten in our own words.

Read `../RULES.md` first. This file adds only the rules for this stage.

## Rules

- Read before you write. No edit to the project in this stage.
- What the repo shows is a fact about the code, not the client's approval to keep it.
- Never open or copy secrets: `.env` files, key files, credentials. Note that they exist, and nothing more.
- List files by name only (`ls -a`, `find -type f`). Never print files in a loop or with a wildcard (`cat *`), so a secret file is never shown by accident. Leave secret files out of any copy.
- Production data is read-only. Never run a command that writes to a database or a live service.
- Run only the project's own read-only commands, through the sandbox: listing files, reading the config, the test command if the client allows it.

## Steps

1. **Map.** Read the README, the build config, the dependency list and the entry points (pages, routes, layouts). Write down:
   - The stack: framework, language, styling (plain CSS, Tailwind, CSS modules), build tool.
   - The pages and their addresses.
   - Where data comes from: API calls, database queries, static files, and their types.
   - The tests: the command, and whether they pass now.
   - What you did not read, on a big repo.
2. **Shared components.** Find the component folder or shared package (for example `packages/ui`). List each component, its variants and where it is used. When there are several apps (for example admin and client), list which components they share and how: one package, a versioned package, or copies.
3. **Themes.** Find the design tokens or CSS variables. When apps share components, write one token set per app.
4. **Capture the design.** Write `design/DESIGN.md` and `design/tokens.json` from the current styles, in the stage 3 format. Mark every value **found** (with the file and line) or **missing**.
5. **What must stay.** List what a change must not break: page addresses, the login flow, data shapes, shared component props, anything the client named.
6. **Risks.** List what is fragile, and say when a risk is the cause of the job's problem:
   - no tests on a page;
   - a component copied or overridden in one app (a fork);
   - a style with hard-coded values instead of tokens;
   - a hand-typed list (filters, tabs, options) that does not match the data, for example a filter with no items behind it.

## Output

- `existing/MAP.md`: 1 Stack, 2 Pages, 3 Data sources, 4 Shared components and themes, 5 Tests, 6 What must stay, 7 Risks, 8 Not read.
- `design/DESIGN.md` and `design/tokens.json` (found values only; missing ones listed as missing).

## Guardrails for every later stage on an existing project

- Change only what the job names. No change "while I am here".
- Use the existing shared components first. A new component only when none fits; say why.
- A style difference between apps goes in that app's tokens. Never edit a shared component for one app, and never copy it into one app to change it.
- A new look the tokens cannot give is a new variant in the shared library, checked in every app that uses it. A change to a shared library that other teams use needs the owner's OK; ask before you make it.
- A new size, colour or space is a token in the app's theme, never a hard-coded value.
- Touch targets stay at least 44px. A smaller control needs the client's OK, and the trade-off is written down.
- A new label or option value goes in the constants file, not typed inline.
- Lists and options come from the project's own data calls and types. A hand-written list only when the data does not hold the items, in one constants file, with the reason.
- Keep page addresses, the login flow and data shapes, unless the client says to change them.
- The project's tests pass before and after. A test that passed before must still pass.
- Write less code: reuse before adding (ponytail). Shortcuts go in `existing/NOTES.md`, not in code comments.
- Work on a new branch. Never commit, push or merge without the client.
- End with the list of every changed file.
