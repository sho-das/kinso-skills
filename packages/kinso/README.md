# kinso

Installer for Kinso Skills. It has no dependencies and uses only built-in Node modules.

```
npx kinso install     # download Kinso Skills and set up Claude Code
npx kinso doctor      # check what is installed (installs nothing)
npx kinso guard <project folder>   # add the safety hook to a project
npx kinso uninstall   # move everything to the Trash
```

Options for `install`: `--dir <path>`, `--ref <git tag or branch>`, `--from <local folder>`.

Needs Node 20+ and git. macOS is fully supported. Linux runs in limited mode. On Windows, use WSL2.

For what Kinso Skills does and how to use it, see the main README: https://github.com/sho-das/kinso-skills
