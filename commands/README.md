# commands (Kinso slash commands)

Installed 28 October 2026 at user level: the 8 `kinso*.md` files are copied to `~/.claude/commands/`, so they work in any folder. Paths inside are absolute. Edit here, then copy again with `cp -p kinso*.md ~/.claude/commands/`. The project copies in `.claude/commands/` were moved to `~/.Trash/kinso-project-commands-20261028/` to avoid two commands with one name.

## What each file is

| File | What it is |
|---|---|
| `kinso.md` | `/kinso`, the front door. Asks what you want, makes the job folder and `JOB.md` once, shows the task table and where the job stands, then calls one skill command. |
| `kinso-validate.md` | `/kinso-validate`. Ways in, reads, stop points, guards. Follows `kinso-validate/SKILL.md` and `BRAIN.md`. |
| `kinso-business.md` | `/kinso-business`. Same shape. |
| `kinso-build.md` | `/kinso-build`. Same shape. Calls `/kinso-frontend` and `/kinso-qa`. |
| `kinso-frontend.md` | `/kinso-frontend`. Same shape. |
| `kinso-qa.md` | `/kinso-qa`. Same shape. |
| `kinso-promote.md` | `/kinso-promote`. Same shape. |
| `kinso-record.md` | `/kinso-record`. The record task command. |
| `RECORD-TASK.md` | The record task: steps, tools, limits, open points. |
| `TASK-TABLES.md` | One stage table per skill: what it does, In, Out, stop point, minutes, tokens. |

## How the commands work

- Format: Claude Code custom slash commands (Claude Code 2.1.214 on this Mac). One Markdown file per command. The file name is the command name.
- Front matter used:
  - `description`: shown in the `/` menu.
  - `argument-hint`: shown after the command name.
  - `disable-model-invocation: true`: Claude never runs these on its own. Only you type them.
- No `allowed-tools` line. So no command gets new permissions. The project hook (`tools/hooks/guard.py`) still applies.
- Arguments: typed as `key=value` after the command, for example `/kinso-validate way=brainstorm job="jobs/sponsor-my-event"`. The file reads them from `$ARGUMENTS`. Named keys are used, not `$1` and `$2`, because job paths can hold spaces.
- The skill files stay the source of truth. Each command says: if it disagrees with `SKILL.md` or `BRAIN.md`, those win.

## How to install later (only after your OK)

1. Make the folder `Kinso Skills/.claude/commands/`. This is the project scope: the commands work only when Claude Code runs in `Kinso Skills`.
2. Copy the 8 command files there: `kinso.md` and the 7 `kinso-*.md` files.
3. Copy `TASK-TABLES.md` and `RECORD-TASK.md` to the root, or to `Kinso Skills/commands/`. Then point the command files at their new place: they name `TASK-TABLES.md`, `RECORD-TASK.md` and `commands-draft/`.
4. Restart Claude Code, or type `/` to see the new commands.

- No settings file changes. `.claude/settings.json` stays as it is.
- Nothing goes into `~/.claude/` (user scope), so other projects do not see these commands.
- Undo: move the 8 files out of `.claude/commands/`.

Other way, not proposed: turn each Kinso skill into a real skill under `.claude/skills/kinso-*/SKILL.md`. That would let Claude start a skill on its own when a request matches. The commands above keep you in control instead.

## Not done in this draft

- The In column in `TASK-TABLES.md` was taken from `SKILL.md` and `KINSO-CHAIN.md`, not from each `references/NN-*.md` file. Check it against those.
- No command was run. No test of `/kinso` or `/kinso-record` yet.

## Skill index

`SKILL-INDEX.md` at the Kinso root lists every bundled outside skill. The `kinso` auto-start skill (`~/.claude/skills/kinso/SKILL.md`) searches it. To rebuild the rows after adding or removing a skill, run this from the Kinso root, then paste the rows under the table header in `SKILL-INDEX.md`:

```bash
find kinso-*/skills -maxdepth 3 -name SKILL.md | sort | while read -r f; do k=${f%%/*}; s=$(basename "$(dirname "$f")"); d=$(awk 'NR==1&&/^---/{fm=1;next} fm&&/^---/{exit} fm&&/^description:/{sub(/^description:[ ]*/,""); if($0~/^[>|][-+]?$/||$0==""){getline; sub(/^[ ]+/,"")} gsub(/^["'"'"']|["'"'"']$/,""); print; exit}' "$f" | tr '|' '/' | cut -c1-220); st=$(grep -l "skills/$s/" "$k"/references/*.md 2>/dev/null | sed 's#.*/##; s#-.*##' | sort -u | tr '\n' ' ' | sed 's/ $//'); printf '| %s | %s | %s | %s |\n' "${k#kinso-}" "$s" "${st:--}" "${d:-no description}"; done
```
