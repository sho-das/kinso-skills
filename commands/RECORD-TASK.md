# Record task - a demo video of the built app

DRAFT, 27 October 2026. Not a stage of kinso-promote yet. It runs after kinso-promote stage 8 (`video/SCRIPT.md`, `video/SHOTS.md`) and the user's OK. Command: `kinso-record.md`.

## What it makes

- One MP4 of the real, locally running app, for example a 30 to 60 second social cut.
- On top of the screen recording:
  - zoom in and out on the part that matters;
  - a visible cursor;
  - highlight boxes on buttons and results;
  - a title card;
  - captions;
  - a voice-over in a local Kokoro voice.
- A cover image (PNG).

## Tools (all on this Mac, all free)

| Job | Tool | Where |
|---|---|---|
| Drive the app and record the screen | Playwright 1.61.0 (`recordVideo`), method from the `ui-demo` skill (discover, rehearse, record; injected cursor) | `<a folder holding node_modules/playwright>`; method in `kinso-promote/skills/ui-demo/SKILL.md` |
| Voice-over | Kokoro (kokoro-onnx 0.6.1), script `reel_voice.py` | `kinso-promote/tools/voice/` |
| Voices | `af_heart` (English, female), `am_michael` (English, male), `pf_dora` (Brazilian Portuguese, female), `pm_alex` (Brazilian Portuguese, male) | `kinso-promote/tools/voice/models/voices.npz` |
| Zoom, highlights, title, captions, render | Remotion 4.0.539 | `kinso-promote/tools/video/` (pattern: `src/kinso-reels/parts.tsx`) |
| Convert WebM to MP4, check length | ffmpeg 9.0.2 and ffprobe | `/opt/homebrew/bin/` |
| Sandbox for every script | `run.sh` | `kinso-frontend/tools/sandbox/run.sh` |

## Steps

All outputs go under `<job>/promote/video/record/`.

0. **Preflight.**
   - Read `handoff/PROMOTE-BUILD.md`, `<code>/RUN.md`, `promote/video/SCRIPT.md`, `SHOTS.md`, `promote/FACTS.md`, `promote/MUST-NOT.md`.
   - Start the app on `127.0.0.1` through `run.sh`, as `RUN.md` says. Use test data marked as test data.
   - Check the tools above exist. Install nothing.
   - Check no large local model runs: `pgrep -fl "ollama serve|mflux-generate|mlx_wan"` must print nothing. Kokoro is exempt.
   - Write `PREFLIGHT.md`. **Stop for the user's OK**: the app URL, the shots, the voice, the length.
1. **Discover** (ui-demo phase 1).
   - Open each page in `SHOTS.md` with Playwright, through `run.sh`.
   - List the real buttons, fields and selectors. Write `DISCOVER.md`.
   - A shot whose page does not exist is dropped and listed as a gap.
2. **Plan.**
   - `PLAN.md`: one row per shot - start and end time, page, action, zoom target, highlight target, caption.
   - `zoom.json`: a list of `{t, x, y, scale}` keyframes. Scale 1 is the full screen.
   - `voice.script.json`: the same shape as `tools/video/src/kinso-reels/reel1.script.json` - `chunks` of `beat`, `say`, `cap`, `facts`. Every chunk names its row in `FACTS.md`.
   - Title: the product name and one line from `promote/MESSAGE.md`.
   - **Stop for the user's OK** on the plan and the voice lines.
3. **Rehearse** (ui-demo phase 2).
   - Run `record.mjs` once without video. Every selector must work.
   - Write `REHEARSE.md`. Fix the script, never the app.
4. **Record** (ui-demo phase 3).
   - Playwright with `recordVideo`, through `run.sh`, with the `NODE_PATH` and `PLAYWRIGHT_BROWSERS_PATH` line from `kinso-build/SKILL.md` "Tools".
   - Viewport 1440 x 900 at device scale 2, video size 2880 x 1800, so zooms stay sharp [Guess: check in step 3 that the video keeps the scale].
   - Inject the ui-demo cursor overlay. Natural pauses between actions.
   - Out: `raw/demo.webm`, then `raw/demo.mp4` by ffmpeg.
   - Stop the app server after.
5. **Voice.**
   - Through `run.sh`: `tools/voice/.venv/bin/python tools/voice/scripts/reel_voice.py tools/voice/models/model.onnx tools/voice/models/voices.npz <voice> 1.1 voice.script.json voice.wav voice.timing.json`.
   - Language: `reel_voice.py` takes an optional 8th argument, `en-us` (default) or `pt-br`. Use `pt-br` for `pf_dora` and `pm_alex` (added 2026-10-27).
6. **Compose and render.**
   - A new Remotion composition, `DemoRecord`, in `tools/video/src/kinso-record/`, built on `parts.tsx`:
     - `OffthreadVideo` of `raw/demo.mp4`;
     - zoom: scale and move the video between the `zoom.json` keyframes, eased;
     - highlights: a box with a short fade, at the `PLAN.md` times;
     - title card, captions from `voice.timing.json`, `Audio` of `voice.wav`.
   - Render through `run.sh`: `npx remotion render src/index.ts DemoRecord <job>/promote/video/record/out/demo.mp4`, and a cover still.
   - Sizes: 1920 x 1080 for the README and blog; 1080 x 1920 for Reels, cropped to the zoom target.
   - Text is drawn by Remotion. This ffmpeg has no `drawtext`.
7. **Check.**
   - Every caption and voice line is in `FACTS.md`. Nothing from `MUST-NOT.md`.
   - Length matches `AUDIENCE.md` for each platform. `ffprobe` for length, size and frame rate.
   - Screens show test data only. No real name, email, key, account or browser bar with private tabs.
   - Captions readable at phone size.
   - Write `CHECK.md`. **Stop**: show the video path, the cover, `CHECK.md` and the voice script as text blocks. The user watches it and posts by hand.

## Limits

- **Local only.** The app runs on `127.0.0.1`. Never record a live site, a rival's site or a staging site.
- **No login on real accounts.** If the app needs a login, use a test account from the project's own seed file, on the local app only. Never the user's main accounts. Never a third-party sign-in page.
- **No posting.** Never upload, post, schedule or share the video.
- **Free only.** No paid API, no paid voice, no stock footage. Never set a Remotion `licenseKey`.
- **No installs** without the user's OK. whisper.cpp is not built; captions come from the script, not from speech to text.
- **One large local model at a time.** Kokoro is exempt, but nothing starts ollama, mflux or FastVideo during this task.
- **Sandbox.** Every Playwright, Remotion, ffmpeg and Kokoro command only through `kinso-frontend/tools/sandbox/run.sh`.
- **Nothing deleted.** Re-runs write a new numbered folder (`record/02/`).
- Every override in `OVERRIDES.md`.

## Open points

- Remotion licence: free for individuals and companies of up to 3 people. A bigger company needs a paid company licence. Confirm this fits before any client work.
- Portuguese voice-over: closed 2026-10-27, `reel_voice.py` takes `pt-br` as its 8th argument.
- Device scale 2 recording: not tested yet.
