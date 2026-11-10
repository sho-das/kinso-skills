# kinso-mcp

A small local MCP server for Kinso Skills. It runs on your machine, talks over stdin/stdout, and has no dependencies.

It gives your AI tool three tools and a few files:

- `kinso_route` - picks the best skills for a request, like "make me a logo".
- `kinso_stage` - returns the text of one stage of a Kinso skill.
- `kinso_status` - shows `kinso/JOB.md` and `kinso/picks/` for a project.
- Resources - `BRAIN-CORE.md`, `SKILL-INDEX.md` and each `kinso-*/SKILL.md`, as `kinso://...`.

## Add to Claude Code

```
claude mcp add kinso -- npx -y kinso-mcp
```

## Other MCP clients

```json
{
  "mcpServers": {
    "kinso": {
      "command": "npx",
      "args": ["-y", "kinso-mcp"],
      "env": { "KINSO_ROOT": "/path/to/kinso-skills" }
    }
  }
}
```

## KINSO_ROOT

The folder that holds `SKILL-INDEX.md` and the `kinso-*` folders. Default: `~/.kinso/kinso-skills`.
If it is missing, the tools tell you to run `npx kinso-skills install`.
