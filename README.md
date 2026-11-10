# Kinso Skills

Kinso is a studio for founders, inside Claude Code. It bundles 252 expert skills written by other people. Kinso adds a "brain" that decides which skills to use for each job.

## Quick start - no technical knowledge needed

Kinso helps you check a business idea, plan it, build it and launch it. You type what you want in plain words. Kinso asks a few questions, makes 2 or 3 versions, shows you the best one first, and you choose.

### What you need

- A Mac (macOS 13 or newer). Linux and Windows are coming later.
- A paid Claude plan (Pro or Max) and the **Claude** desktop app with **Claude Code**. Get it at [claude.ai/download](https://claude.ai/download). Kinso itself is free; your Claude plan covers the AI work.
- **Node.js**, a free program Kinso's installer needs. Get the "LTS" Mac installer at [nodejs.org](https://nodejs.org) and double-click it.

### Install (about 2 minutes, once)

1. Open the **Terminal** app: press `Cmd + Space`, type `Terminal`, press Enter.
2. Copy this line, paste it into Terminal, and press Enter:

   ```bash
   npx kinso-skills install
   ```

   If it asks "Ok to proceed?", type `y` and press Enter.
3. When it says **Done**, quit the Claude app fully (`Cmd + Q`) and open it again.

### Use it

1. In the Claude app, open **Code** and start a new session in a folder for your project. Any empty folder works, for example a new folder called `my-idea`.
2. Type `/kinso` and press Enter. Or just say what you want, for example:
   - "I have an idea for an app that helps families share chores. Is it worth building?"
   - "Make me a landing page for my bakery in Lisbon."
   - "Help me price my online course."
   - "Make me a logo for my coffee brand."
3. Kinso sums up what it understood, suggests where to start, and asks before it begins.
4. Answer its questions. It shows you the options it made, with the best one first. Pick one, ask to mix parts ("the top of option 2 with the colours of option 1"), or ask for a redo.

Everything Kinso makes is saved in a `kinso` folder inside your project folder. Nothing is posted, published or paid for without you.

### Good to know

- **Cost:** a full run uses a lot of your Claude plan's allowance. Kinso tells you what it will run and asks first.
- **Optional extras:** web search, screenshots, video and voice need extra tools. Kinso still works without them; it tells you which steps it skipped. See [Optional tools](#optional-tools).
- **Check your setup:** run `npx kinso-skills doctor` in Terminal. It lists what is installed and what is missing. It changes nothing.
- **Remove Kinso:** run `npx kinso-skills uninstall`. It moves Kinso's files to your Trash.
- **Use Kinso in other apps (optional):** after installing, run `claude mcp add kinso -- npx -y kinso-mcp` to connect it to Claude Code as a tool server. See [Use it as an MCP server](#use-it-as-an-mcp-server).

The rest of this page is the detailed guide.

## What Kinso is

- It is an aggregator. The 252 outside skills are copied unchanged. Each keeps its own licence.
- Kinso adds a brain. For each stage it deals 2 or 3 skills that fit the job.
- Each skill runs as a fresh helper that builds the real thing, in parallel. Pages, logos, plans, code.
- A blind judge scores the results. It does not know which skill made which.
- You decide. You pick one, merge parts, or ask for a redraw.

There are 6 Kinso skills: `validate`, `business`, `build`, `frontend`, `qa`, `promote`.

## How a run works

1. **Deal.** Kinso picks 2 or 3 skills with different methods for the stage.
2. **Build in parallel.** Each skill builds its own full version. They never see each other.
3. **Blind judge.** A fresh judge scores every version 0 to 3 for each rule. The skill names are hidden.
4. **You choose.** Take the winner, take another one, merge parts ("the hero from 2"), or redraw with one reason. Your choice always wins. It is saved, so Kinso learns your taste.
5. **Polish.** The chosen version is fixed against its failed checks before the next stage.

## Platform status

| Platform | Status | Notes |
|---|---|---|
| macOS | Supported now | Needs macOS 13 or newer. Full mode. |
| Linux | Coming next | The sandbox will use `bubblewrap`. |
| Windows | After Linux | Through WSL2 only. |

### Windows and WSL2

- WSL2 is Windows Subsystem for Linux. It runs a real Linux inside Windows.
- It is built into Windows 10 version 2004 and newer, and into Windows 11.
- Turn it on: open a terminal as admin, run `wsl --install`, then restart.
- It works on Windows Home.
- Some company laptops block it. Ask your IT team.
- Virtualization must be on in the BIOS (the firmware setup screen).
- Without WSL2 you get limited mode. Planning, writing, judging and picking work. Script steps are skipped: screenshots, tests, searches and builds. Kinso tells you which steps it skipped.

Linux and Windows support are not released yet. Until then, Linux runs in limited mode as well.

## Install on a Mac

You need:

- macOS 13 or newer
- `git`
- Node 20 or newer
- Python 3.12 or 3.13 (3.14 does not work with the voice tool)
- Claude Code

Steps:

1. Run `npx kinso-skills install`.
   - It clones this repo to `~/.kinso/kinso-skills`.
   - It fills the `{{KINSO_ROOT}}` placeholder in the files with that path.
   - It copies the 8 commands to `~/.claude/commands`.
   - It copies the auto-start skill to `~/.claude/skills/kinso`.
2. Run `npx kinso-skills doctor`. It checks what is installed. It installs nothing.
3. Run `npx kinso-skills guard <project folder>`. It adds the safety hook to that project's `.claude/settings.local.json`. It asks first.
4. To remove Kinso, run `npx kinso-skills uninstall`. It moves the files to the Trash.

Install options: `--dir <path>`, `--ref <git tag or branch>`, `--from <local folder>`.

### Manual install, without npx

```bash
git clone https://github.com/sho-das/kinso-skills ~/.kinso/kinso-skills
cd ~/.kinso/kinso-skills
# Replace the {{KINSO_ROOT}} placeholder with the real path in the command and skill files
grep -rl '{{KINSO_ROOT}}' commands user-skill | xargs sed -i '' "s#{{KINSO_ROOT}}#$HOME/.kinso/kinso-skills#g"
mkdir -p ~/.claude/commands ~/.claude/skills/kinso
cp commands/kinso*.md ~/.claude/commands/
cp user-skill/kinso/SKILL.md ~/.claude/skills/kinso/
```

Then restart Claude Code. For the guard hook, add `tools/hooks/guard.py` as a `PreToolUse` hook in your project's `.claude/settings.local.json`.

Core download: about 68 MB.

## Optional tools

Kinso works without these. Each one switches on more script steps. The sizes are the download plus the install. Versions are the ones Kinso was tested with.

All paths below are inside `~/.kinso/kinso-skills`.

### Search tools (about 255 MB)

Needed by the `search` and `jobs` steps of `validate`, `business` and `promote`. Both are downloaded, not bundled.

**SearXNG** is a local search engine that asks Google, Bing and others for you. Licence AGPL-3.0. Tested commit `54ca1d9`.

```bash
mkdir -p vendor && git clone https://github.com/searxng/searxng vendor/searxng_searxng@54ca1d9
git -C vendor/searxng_searxng@54ca1d9 checkout 54ca1d9
python3.13 -m venv tools/collect/venv-searxng
tools/collect/venv-searxng/bin/pip install -r vendor/searxng_searxng@54ca1d9/requirements.txt
```

Start it from `tools/collect/`:

```bash
../../kinso-frontend/tools/sandbox/run.sh run ./venv-searxng/bin/python searxng_run.py > run/searxng.log 2>&1
```

Check it: `curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:8888/search?q=test"` prints 200 when it is on. Stop it when the research stages are done.

**JobSpy** reads public job listings. Tested commit `a606f9c`.

```bash
git clone https://github.com/speedyapply/JobSpy vendor/speedyapply_JobSpy@a606f9c
git -C vendor/speedyapply_JobSpy@a606f9c checkout a606f9c
python3.13 -m venv tools/collect/venv-jobspy
tools/collect/venv-jobspy/bin/pip install python-jobspy
```

### Playwright and Chromium (about 550 MB)

Needed by `reddit`, `fetch` and `quote-check`, by screenshots, and by the demo recording.

```bash
npx playwright install chromium
```

### ffmpeg (part of the video tools)

Needed for video and audio work in `promote`. Tested version 9.0.2.

```bash
brew install ffmpeg
```

### Remotion, video from code (about 1.1 GB)

Needed to render videos in `promote` and `/kinso-record`. Tested version 4.0.539.

```bash
cd kinso-promote/tools/video && npm ci --ignore-scripts
```

Licence note: Remotion is free only for individuals and groups of 3 or fewer people. Bigger companies need a paid Remotion licence. Check before you use it.

### whisper.cpp, captions (about 465 MB)

Needed to make captions from speech. Tested version 1.9.5, model `ggml-small.bin`.

```bash
brew install whisper-cpp
```

Then download `ggml-small.bin` from the `ggerganov/whisper.cpp` page on Hugging Face into `kinso-promote/tools/models/whisper/`.

### Kokoro voice (about 470 MB)

Needed for voice-over. Tested kokoro-onnx 0.6.1. Voices: `af_heart`, `am_michael`, `pf_dora`, `pm_alex`.

```bash
python3.13 -m venv kinso-promote/tools/voice/.venv
kinso-promote/tools/voice/.venv/bin/pip install --require-hashes --only-binary=:all: --no-deps \
  -r kinso-promote/locks/tts-requirements-py313-kokoro.txt
```

Download the model and voice files from the `onnx-community/Kokoro-82M-v1.0-ONNX` page on Hugging Face (commit `1939ad2`) into `kinso-promote/tools/voice/models/`.

### Ollama, local text model (about 10 GB)

Needed for the AI-feature tests in `qa` and `build`, so they run with no paid API. Tested version v0.40.2, with `llama3.2` and `gemma3`. Kinso runs it under `tools/ollama/no-net.sb`, which blocks outside network calls.

```bash
brew install ollama
ollama pull llama3.2
ollama pull gemma3
```

### Image and video models (large, off by default)

- Local image model: 15 GB.
- Local video model: 18 GB.
- Kinso never downloads these by itself. Skip them unless you want to make images or clips on your own machine.

## Use it

Inside Claude Code, in the folder of your project:

| Command | What it does | Example |
|---|---|---|
| `/kinso` | Front door. Asks what you want, sets up the job folder, shows where the job stands. | `/kinso make a landing page` |
| `/kinso-validate` | Brainstorm, check and gate an idea, then research the market. | `/kinso-validate way=brainstorm` |
| `/kinso-business` | Pricing, costs, funding, legal checks, first version. | `/kinso-business way=new-idea` |
| `/kinso-build` | Spec, plan, data model, tests first, code, security, ship-ready handoff. | `/kinso-build way=chain` |
| `/kinso-frontend` | A page, site, app screen or diagram, from research to a reviewed page. | `/kinso-frontend way=new target=web` |
| `/kinso-qa` | Test map, scenario tests, bugs, regression set, go or no-go. | `/kinso-qa way=full code=./app` |
| `/kinso-promote` | Audience plan, message, posts, launch plan, visuals, video script. | `/kinso-promote way=chain` |
| `/kinso-record` | Record a demo video of the app you built locally. | `/kinso-record voice=af_heart size=portrait` |

- Arguments use `key=value`. Quote values with spaces: `job="my folder/kinso"`.
- **Auto-start skill.** If you ask for something a founder studio would do, Claude can offer a Kinso run on its own. It always asks once before it starts. Say no and it answers normally.
- **Where files go.** Everything is saved in `<project>/kinso/`. That folder holds `JOB.md` (where the job stands), `CONTEXT.md` (what the chat settled), and `picks/` (your choices).
- `/kinso status` shows where each skill stopped.

## Use it as an MCP server

MCP (Model Context Protocol) is the standard way to plug tools into AI apps. `kinso-mcp` is a small local server. It runs on your machine and has no dependencies.

```bash
npx kinso-mcp
```

Add to Claude Code:

```bash
claude mcp add kinso -- npx -y kinso-mcp
```

Other MCP clients:

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

Tools:

- `kinso_route` - picks the best skills for a request, like "make me a logo".
- `kinso_stage` - returns the text of one stage of a Kinso skill.
- `kinso_status` - shows `kinso/JOB.md` and `kinso/picks/` for a project.

It also shares `BRAIN-CORE.md`, `SKILL-INDEX.md` and each `kinso-*/SKILL.md` as `kinso://...` resources.

`KINSO_ROOT` is the folder that holds `SKILL-INDEX.md` and the `kinso-*` folders. The default is `~/.kinso/kinso-skills`. If it is missing, the tools tell you to run `npx kinso-skills install`. The heavy work (pages, code, tests) stays in your own assistant, on your own computer.

## Models and cost

| Role | Model | Used for |
|---|---|---|
| Plain work | Haiku | Searches, copying inputs, counting, format checks. |
| Making things | Sonnet | The dealt options, drafts, designs, code, tests. |
| Deciding | Opus | The judge, the go or drop gate, merging, the final verdict. |

- You pay for your own Claude usage. Kinso has no fee and no server.
- One full skill run uses about 1 to 1.5 million tokens.
- Before each run Kinso says what it will run and the rough cost, and asks first.

## Safety

- **Sandbox.** Script steps run through `kinso-frontend/tools/sandbox/run.sh`. It lets a script write only in the run folder. It blocks reads of your home folder. An optional profile also blocks the network.
- **Guard hook.** `tools/hooks/guard.py` stops Claude from deleting files with `rm`, running scripts outside the sandbox, or using the web outside Kinso's search tool. It also blocks commit and push.
- **No posting, no deploying.** Kinso never posts for you and never deploys. It writes the drafts and you publish them.
- **Outside skills are scanned.** Every outside skill was scanned for hidden characters, unsafe paths and risky commands before it was bundled.

## Licences

- `LICENSE` - MIT. It covers only the files written for Kinso.
- `NOTICE.md` - every bundled skill with its source repo, commit and licence. Each skill keeps its own `LICENSE` in its folder.
- Tools that Kinso downloads but does not bundle are listed in `NOTICE.md` too. Remotion has a size limit for free use, see above.

## Troubleshooting

| Problem | Fix |
|---|---|
| Search tool is off. `search` steps say unresponsive or fail. | Start SearXNG (see Search tools). Check that `curl ... 127.0.0.1:8888/search?q=test` prints 200. |
| Playwright is missing. `reddit`, `fetch` or screenshots stop with a message. | Run `npx playwright install chromium`. |
| The sandbox refuses a folder: "not inside an allowed root". | Set `KINSO_ALLOWED_ROOTS` to your project folder before the command. Use a colon between several folders. Example: `KINSO_ALLOWED_ROOTS="$PWD"`. |
| The guard blocks a command. | Read the message. It names the rule. Use the allowed way (for example, `mv` to the Trash instead of `rm`, or `run.sh` for scripts). |
| You are on Windows without WSL2. | Run `wsl --install` in an admin terminal, restart, then install Kinso inside WSL2. Until then Kinso runs in limited mode. |
| Something else looks wrong. | Run `npx kinso-skills doctor`. |
