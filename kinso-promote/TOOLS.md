# kinso-promote - Free local tools

27 October 2026. Research, then a first install.

**Installed 27 October 2026** (with your OK, hashes checked): ffmpeg 9.0.2, exiftool 13.55, Remotion 4.0.539 with the motion packages, the Whisper `ggml-small.bin` model, and Kokoro (kokoro-onnx 0.6.1, English and Brazilian Portuguese voices). Versions, paths, hash checks, tests and disk use: `tools/INSTALLED.md`. Everything else below is still not installed. Each other tool needs your OK before install, and a scan of its download first (same rule as `vendor/`).

Facts come from Homebrew's own index (`brew info --json=v2`, read 27 October 2026) and from what is known about each project. Lines marked **[check]** must be read on the official site before install.

Today on this Mac: Homebrew is installed. Of the tools below, only ffmpeg and exiftool are installed (see `tools/INSTALLED.md`). Playwright's Chromium is already here (the collector uses it).

## Ready to download, needs your OK

Read 27 October 2026. Nothing below is downloaded. This Mac is Apple silicon (arm64). Sizes are in MB (1 MB = 1,000,000 bytes). Checksums are SHA-256. Details and reasons: section 6.

**Established apps (first choice for real work).** Source: the Homebrew cask URL, which is the project's own download server. Checksum: the one the Homebrew cask checks. Size: read from the server's file header.

| App | File | Source | Size | SHA-256 |
|---|---|---|---|---|
| Krita 5.3.4.1 | `krita-5.3.4.1-signed.dmg` | https://download.kde.org/stable/krita/5.3.4.1/krita-5.3.4.1-signed.dmg | 392.0 MB | `531e261da1fd8d5c468cfcd4eebd16e9edf6ab320e89406d2875f2e43c1148de` |
| Inkscape 1.4.4 | `Inkscape-1.4.4_arm64.dmg` | https://media.inkscape.org/dl/resources/file/Inkscape-1.4.4_arm64.dmg | 156.9 MB | `eacca94ab01e59467cdd5452a2867c3734450f9a4cfb3346956cc9b07f34f3f1` |
| GIMP 3.2.6 | `gimp-3.2.6-arm64.dmg` | https://download.gimp.org/gimp/v3.2/macos/gimp-3.2.6-arm64.dmg | 185.7 MB | `854573aec2be6a185aa021109c3c0ca94f210379204b704231bdd191b4060294` |
| Kdenlive 26.08.2 | `kdenlive-26.08.2-arm64.dmg` | https://cdn.download.kde.org/stable/kdenlive/26.08/macOS/kdenlive-26.08.2-arm64.dmg | 144.3 MB | `ffcbff6d6e6651fe7a7cd2b00cb7304c8ef049da8287c389dbda146d5e8928ac` |
| Audacity 4.0.1 | `audacity-macOS-4.0.1-arm64.dmg` | https://github.com/audacity/audacity/releases/download/Audacity-4.0.1/audacity-macOS-4.0.1-arm64.dmg | 50.0 MB | `278c8647b78c77af7f07dbd5e7d9bfc950bc14168047b65738716b61d12055ec` |
| Blender 5.2.3 | `blender-5.2.3-macos-arm64.dmg` | https://download.blender.org/release/Blender5.2/blender-5.2.3-macos-arm64.dmg | 346.3 MB | `acc05374485a272342d4b323c15ac01953e7f697da2f1bad8af9c3bf087267a4` |

All 6: 1,275.2 MB.

**ArtCraft Craft apps (early alpha, a trial only).** Source: the official GitHub releases of `github.com/storytold`, published 25 October 2026. Each file is signed and notarized by Apple (README). Checksum: from each release's `SHA256SUMS.txt`; it matches GitHub's own file digest for every file below. Universal build (Apple silicon and Intel).

| App | Replaces | File | Source | Size | SHA-256 |
|---|---|---|---|---|---|
| PhotoCraft 0.16.0 | Photoshop | `photocraft-0.16.0-macos-universal.dmg` | https://github.com/storytold/photocraft/releases/download/v0.16.0/photocraft-0.16.0-macos-universal.dmg | 99.0 MB | `489e00a7fd19f7e924a3a05ec33c7b057ea4766129b4eef132ce82ff42c10619` |
| VectorCraft 0.17.0 | Illustrator | `vectorcraft-0.17.0-macos-universal.dmg` | https://github.com/storytold/vectorcraft/releases/download/v0.17.0/vectorcraft-0.17.0-macos-universal.dmg | 144.7 MB | `0bd3f5ea47293cd6a55001463089bea3c6d98e5ba657fa006799c2be8787505a` |
| FilmCraft 0.13.0 | Premiere Pro | `filmcraft-0.13.0-macos-universal.dmg` | https://github.com/storytold/filmcraft/releases/download/v0.13.0/filmcraft-0.13.0-macos-universal.dmg | 103.7 MB | `1313efde320c25361c1bd015c47d18cc4ad40c9215e1eabf2a8ec5db6a7396ed` |
| LightCraft 0.14.0 | Lightroom | `lightcraft-0.14.0-macos-universal.dmg` | https://github.com/storytold/lightcraft/releases/download/v0.14.0/lightcraft-0.14.0-macos-universal.dmg | 114.8 MB | `cde8591da93f7b5aa7ad09137cc93c1ebf3b4748fe89e477bb036263d7c93e75` |
| PdfCraft 0.14.0 | Acrobat Pro | `pdfcraft-0.14.0-macos-universal.dmg` | https://github.com/storytold/pdfcraft/releases/download/v0.14.0/pdfcraft-0.14.0-macos-universal.dmg | 98.8 MB | `f0bddea3f0d711470d95f714b23ccce61c38b2bbcca821d397ce8dbb0564cf74` |
| EffectCraft 0.17.0 | After Effects | `effectcraft-0.17.0-macos-universal.dmg` | https://github.com/storytold/effectcraft/releases/download/v0.17.0/effectcraft-0.17.0-macos-universal.dmg | 66.4 MB | `241ae2e72cefc7ae70f583017a8e6b7763702a24683dbd64849e568693f94bad` |
| DesignCraft 0.13.0 | InDesign | `designcraft-0.13.0-macos-universal.dmg` | https://github.com/storytold/designcraft/releases/download/v0.13.0/designcraft-0.13.0-macos-universal.dmg | 120.8 MB | `14d020b90df9178de290d624e012bdceb353b1595ff5b7991d4896b8f42ea03b` |

All 7: 748.2 MB. Each app also has a command-line tool, `<app>-cli-<version>-macos-universal.zip` (61.1 to 111.4 MB), listed in section 6. Not on this list: the ArtCraft Launcher (it updates apps by itself), the ArtCraft AI studio (paid models), and open-higgsfield (no licence, no release, paid API). Reasons in section 6.

Before any install: check the SHA-256 of the file against this list, scan it as for `vendor/`, and run it only after your OK.

## How to read the table

- **Replaces:** the paid tool it stands in for.
- **Install:** the Homebrew cask (an app) or formula (a command-line tool). `brew install --cask <name>` or `brew install <name>`.
- **Account:** whether you must sign up to download or use it.
- **Could charge later:** whether a free tier might turn paid.
- **Script:** `yes` = can run from the command line with the same result every time. kinso-promote uses these first, so output is repeatable.

## 1. Command-line tools (first choice: repeatable)

| Tool | Job | Replaces | Licence | Install | Account | Could charge later | Script |
|---|---|---|---|---|---|---|---|
| **ffmpeg** 9.0.2 | Cut, join, resize, convert video; burn in captions; make GIFs; set loudness | Premiere export, Media Encoder | GPL-3.0-or-later (Homebrew build) | formula `ffmpeg` | No | No | yes |
| **ImageMagick** 7.1.2 | Resize, crop, pad images to each platform size; add text; batch | Photoshop batch actions, Canva resize | ImageMagick licence (Apache-2.0 style) | formula `imagemagick` | No | No | yes |
| **whisper.cpp** 1.9.5 | Speech to text on this Mac: SRT and VTT captions for the demo video | Descript, Rev, Premiere captions | MIT. Model files from Hugging Face (OpenAI Whisper weights, MIT) | formula `whisper-cpp` | No | No | yes |
| **Vale** 3.25.1 | Prose linter. Our rules as a style: no em dashes, banned AI words, sentence length | Grammarly Business, Writer.com | MIT | formula `vale` | No | No | yes |
| **resvg** 0.49.0 | SVG to PNG, exact and fast (banners drawn as SVG) | Illustrator export | MPL-2.0 | formula `resvg` | No | No | yes |
| **oxipng** 10.2.1 | Make PNGs smaller with no loss | TinyPNG (paid tier) | MIT | formula `oxipng` | No | No | yes |
| **pngquant** 3.0.3 | Make PNGs much smaller (lossy) | TinyPNG | GPL-3.0-or-later and BSD | formula `pngquant` | No | No | yes |
| **exiftool** 13.55 | Remove location and camera data from photos before posting (privacy) | Photoshop "export without metadata" | Artistic-1.0-Perl or GPL | formula `exiftool` | No | No | yes |
| **pandoc** 3.12.1 | Blog Markdown to HTML, Word or PDF | Word, Google Docs export | GPL-2.0-or-later | formula `pandoc` | No | No | yes |
| **HandBrake CLI** 1.11.2 | Compress video for each platform with saved presets | Media Encoder | GPL-2.0-only | formula `handbrake` | No | No | yes |

**Built into macOS (nothing to install):**
- `sips` - resize and convert images. Enough for simple platform sizes.
- `screencapture` - screenshots; `screencapture -v` records the screen.
- Screenshot app (Cmd+Shift+5) and QuickTime Player - screen recording. Replaces Loom and Camtasia for simple demos.
- `say` - a rough voice-over draft to time the demo script. Never the final voice.
- `avconvert` - convert video with Apple presets.

**Already on this Mac:**
- **Playwright Chromium** (Apache-2.0). Renders an HTML banner or social card to PNG at an exact size, the method of UI UX Pro Max `banner-design` and `social-photos-design`. Records a scripted demo of the product page (ECC `ui-demo`). Runs only through `tools/sandbox/run.sh`.

## 2. Desktop apps (for hand work by you)

| Tool | Job | Replaces | Licence | Install | Account | Could charge later | Script |
|---|---|---|---|---|---|---|---|
| **GIMP** 3.2.6 | Photo editing, retouch, export | Photoshop | GPL-3.0-or-later | cask `gimp` | No | No | partly: batch mode `gimp -i -b` (Script-Fu, Python) |
| **Krita** 5.3.4.1 | Painting, drawing, simple layouts | Photoshop painting, Procreate | GPL-3.0 | cask `krita` | No | No | partly: `krita --export`, Python plugins |
| **Inkscape** 1.4.4 | Vector design: logos, banners, icons | Illustrator | GPL-2.0-or-later **[check on inkscape.org]** | cask `inkscape` | No | No | yes: `inkscape --export-type=png` |
| **Penpot** (self-hosted) | Design and prototypes in the browser, shared with a team | Figma | MPL-2.0 | Official Docker Compose file from penpot.app. Needs Docker: Docker Desktop is paid for companies over 250 staff or $10M revenue; Colima (MIT, formula `colima`) is a free engine **[check]** | A local login on your own server only. No outside account | Self-hosted: no. Penpot's cloud has paid plans | no (has an API) |
| **Scribus** 1.6.6 | Page layout: one-pagers, press kit PDF | InDesign | GPL-2.0-or-later | cask `scribus` | No | No | yes: `scribus -g -py script.py` |
| **Kdenlive** 26.08.2 | Video editing. Built-in speech to text (Whisper) for captions | Premiere Pro | GPL | cask `kdenlive` | No | No | yes: render a saved project with `melt` (MLT) |
| **Shotcut** 26.9.28 | Video editing, simpler than Kdenlive. Built-in speech to text | Premiere Rush, CapCut | GPL-3.0 | cask `shotcut` | No | No | yes: `melt` renders its project files |
| **DaVinci Resolve** (free version) | Pro video edit, colour, audio (Fairlight) | Premiere, After Effects, Audition | **Proprietary freeware** (Blackmagic Design licence). Not open source | Official site blackmagicdesign.com, or the Mac App Store. **No Homebrew cask** | The site asks for a registration form (name, email, country and more) before download **[check]**; the App Store needs an Apple ID | Yes. Some features are only in Studio (paid, one-time) | partly: Python scripting API |
| **OBS Studio** 33.0.0 | Screen and camera recording, with scenes | Camtasia, Loom, ScreenFlow | GPL-2.0-or-later | cask `obs` | No | No | partly: built-in WebSocket control, `--startrecording` |
| **Kap** 3.6.0 | Quick screen recording to MP4 or GIF | CleanShot X, Loom | MIT | cask `kap` | No | No | no |
| **Audacity** 4.0.1 | Record and clean voice-over; noise removal | Audition | GPL-3.0 | cask `audacity` | No. Optional audio.com account for cloud saves: keep it off | Cloud storage (audio.com) has paid tiers; the app is free | partly: `mod-script-pipe` |
| **HandBrake** 1.11.2 | Video compression with a window | Media Encoder | GPL-2.0-only | cask `handbrake-app` | No | No | yes (CLI above) |
| **Blender** 5.2.3 | 3D, motion graphics, also a video editor | After Effects, Cinema 4D | GPL | cask `blender` | No | No | yes: `blender -b` with Python |

**Not available now:** darktable (raw photos) and Aegisub (subtitles) casks are **disabled** in Homebrew. Use GIMP for photos and whisper.cpp plus ffmpeg, Kdenlive or Shotcut for captions.

## 3. Better options found

- **Captions:** whisper.cpp (command line) or the speech-to-text inside Shotcut and Kdenlive. Free, on this Mac, no account. Better than paid caption services for a short demo.
- **Social images:** HTML at the exact platform size, rendered by Playwright, then `oxipng`. Repeatable, and the text stays real text. This is how UI UX Pro Max makes social photos; its paid image generators stay off.
- **Resizing for each platform:** ImageMagick, or `sips` for simple cases.
- **Our writing rules as a check:** Vale with a Kinso style file (no em dashes, the humanizer word list, banned claims from `handoff/PROMOTE.md`). Runs on every draft.
- **Photo privacy:** `exiftool -all= photo.jpg` before any photo goes in a post.

## 4. Not used

- **Remotion** (video in React): free only for individuals and companies up to 3 people; a company licence is paid. Used by ECC `video-editing`, `remotion-video-creation` and `demo-video-skill`. Off unless you confirm you qualify.
- **Paid generators:** ElevenLabs, fal.ai, Gemini image and voice, HeyGen, Synthesia, Midjourney, Nano Banana. Off by the free-only rule.
- **Posting and scheduling tools** (Buffer, SocialClaw, X API): kinso-promote never posts.
- **Canva, Adobe Express:** accounts, and paid tiers.

## 5. Install route, when you approve

1. You pick the tools.
2. For each: read the official page for licence and account lines marked **[check]**.
3. `brew info` first, then `brew install` (you run it, or approve it).
4. Command-line tools run through `kinso-frontend/tools/sandbox/run.sh`, writing only inside the job folder.

## 6. Design and video app suites

Research only, 27 October 2026. Nothing downloaded, installed or run. Sources: GitHub's own pages and API for each repo (README, releases, licence, commits), the collector (`../tools/collect/collect.sh`, search and fetch, raw lines in the session scratchpad), and the scanner run in memory only (`python3 -I tools/scan/scan.py <owner>/<repo>`, no `--save`).

### 6.1 ArtCraft Craft apps (Brandon Thomas, the ArtCraft team)

- **Official source:** the GitHub organisation `storytold` (https://github.com/storytold) and https://getartcraft.com (linked from the READMEs). Reported by cybernews.com, Ars Technica, PetaPixel and TechSpot (7 to 8 October 2026).
- **Watch out:** many look-alike sites (artcraftsuite.org, artcraft.tips, artcraftai.net, getcraftapps.com, artcraftapps.app and others) describe the apps and link to downloads. They are not the project. Download only from `github.com/storytold/<app>/releases`.
- **Licence:** each app is MIT OR Apache-2.0, your choice (README and badges; GitHub shows Apache-2.0). The ArtCraft name and logos are under a separate brand licence. Fonts and icons keep their own open licences (`ATTRIBUTION.md`).
- **Maturity:** early alpha. All are version 0.x. The first public releases came in early October 2026; a new release comes out about every 1 to 2 days (last: 25 October 2026). PhotoCraft's README says it "is not yet a Photoshop replacement for daily professional work". Badges: PhotoCraft and the Launcher "early alpha"; FilmCraft, LightCraft and EffectCraft "young and moving fast"; VectorCraft "in active development".
- **Account, key, cloud:** none for the 7 apps. PdfCraft and LightCraft say "no account, no telemetry, no cloud"; DesignCraft says "no subscription, no licence server, no telemetry"; EffectCraft says "no telemetry, and no network access unless you ask for it". A shared AI layer (`storytold/craft-ai-integrations`, "interim") lets apps connect to AI providers with your own keys: keep it off (free-only rule).
- **Script:** yes, for every app. Each release has a signed and notarized command-line tool (`<app>-cli-<version>-macos-universal.zip`). Every menu item is a command, so the CLI, a JSON control channel and an MCP server can do what the window does. Example from the PhotoCraft README: `photocraft-cli batch --actions grade.json --in ./raw --out ./graded`.

| App | Replaces | Version, date | macOS download (universal) | Size | CLI zip, size | How kinso-promote would use it |
|---|---|---|---|---|---|---|
| PhotoCraft | Photoshop | 0.16.0, 25 Oct 2026 | `photocraft-0.16.0-macos-universal.dmg` | 99.0 MB | 72.0 MB | Crop and clean real screenshots and photos (stage 7); batch resize with saved actions. Opens PSD, Krita `.kra`, GIMP `.xcf` |
| VectorCraft | Illustrator | 0.17.0, 25 Oct 2026 | `vectorcraft-0.17.0-macos-universal.dmg` | 144.7 MB | 111.4 MB | Banners and icons as vectors (stage 7), in place of Inkscape if it proves stable |
| FilmCraft | Premiere Pro | 0.13.0, 25 Oct 2026 | `filmcraft-0.13.0-macos-universal.dmg` | 103.7 MB | 90.5 MB | Cut the demo video (stage 8), in place of Kdenlive if it proves stable |
| LightCraft | Lightroom | 0.14.0, 25 Oct 2026 | `lightcraft-0.14.0-macos-universal.dmg` | 114.8 MB | 109.5 MB | Grade real photos (for example a restaurant's own photos) in one batch |
| PdfCraft | Acrobat Pro | 0.14.0, 25 Oct 2026 | `pdfcraft-0.14.0-macos-universal.dmg` | 98.8 MB | 63.1 MB | Check and combine a press kit PDF (stage 6) |
| EffectCraft | After Effects | 0.17.0, 25 Oct 2026 | `effectcraft-0.17.0-macos-universal.dmg` | 66.4 MB | 61.1 MB | Title cards and simple motion for the demo video (stage 8) |
| DesignCraft | InDesign | 0.13.0, 25 Oct 2026 | `designcraft-0.13.0-macos-universal.dmg` | 120.8 MB | 100.7 MB | One-pager or press kit layout (stage 6), in place of Scribus |

Full URLs and SHA-256 checksums: "Ready to download, needs your OK" at the top.

**Other parts of the suite (not on the download list):**
- **ArtCraft Launcher** 0.8.1 (`artcraft-launcher-0.8.1-macos-universal.dmg`, 20.0 MB, SHA-256 `519d2eb1481eac501f34e56e5d70194e2752ec745bd1e96a0c2e43d963be9e09`): installs and updates the apps by itself, and can add a login item in `~/Library/LaunchAgents`. Skipped: we want pinned versions, not self-updates.
- **ArtCraft** itself (`storytold/artcraft`, 0.41.0, 26 Sep 2026, `ArtCraft_0.41.0_universal.dmg`, 94.9 MB): an AI image and video studio. It generates through cloud models (Seedance, Kling, Veo, Sora, Midjourney, Grok and others) with ArtCraft credits or your own provider keys (for example Fal). Paid. Off by the free-only rule.
- More Craft apps exist (FigCraft for Figma, SoundCraft for Pro Tools, WordCraft, GridCraft, DeckCraft, CADCraft, AniCraft). Not needed for launch content.

### 6.2 open-higgsfield

- **Official source:** https://github.com/wide-trace/open-higgsfield (the repo linked at theinfinity.dev/tools/open-higgsfield). Hosted copy: openhiggsfield.ai.
- **Watch out:** at least 5 other GitHub repos use the same name (sunnychase, joymadhu49, Autom8AI, TechBeme, ClabstreamTeam), each with other code and other paid APIs (Muapi.ai, OpenRouter, Freepik). "Open Higgsfield" is also the name of Higgsfield's own API console (voyager.so, read 27 October 2026).
- **Licence: none.** The repo has no LICENSE file (GitHub API: "Not Found"). With no licence, the code is not open source: you may read it, but not copy, change or share it. **[check]** with the author before any use.
- **What it is:** one web app (Next.js 16, React 19). One prompt bar for image and video, per-model settings, and a gallery. It replaces the Higgsfield AI studio page. It has 38 models (8 image, 30 video): Soul 2, Soul Cinema, Seedance, Kling, Wan, Flux, Ideogram, Recraft, LTX, MiniMax, PixVerse, Grok, Qwen and more.
- **macOS download:** none. No releases and no tags. It must be built from source (`pnpm install`, `pnpm dev`).
- **Account, key, cloud:** yes, all three. Every generation goes to a paid cloud API through `HF_API_BASE_URL`, with a "platform key" in the form `id:secret`. The Soul models and the key form point to Higgsfield's own paid platform **[check]**. Uploads go to Vercel Blob, which needs a Vercel token (`OPEN_HIGGSFIELD_READ_WRITE_TOKEN`), and the files become public URLs. **No free local model:** the code has no local model path. Using one (for example ComfyUI) would mean writing a new client.
- **Maturity:** a young project. Created 26 August 2026; 3 commits; last commit 17 September 2026; about 4,800 stars.
- **Script:** not as it is. It is a browser studio; the API calls sit in server actions.
- **How kinso-promote would use it:** not at all, today. It breaks the free-only rule (paid API), the privacy rule (uploads become public URLs) and the licence rule (no licence). Stage 7 keeps making images from HTML with Playwright.

### 6.3 Scanner results (in memory, no `--save`)

| Repo and commit | Files | What it flags | Reading |
|---|---|---|---|
| `wide-trace/open-higgsfield` @b16a0ef | 105 | telemetry 1 (`pnpm-lock.yaml`), runs_commands 1 (`scripts/build-brand-assets.mjs`), eval 2 | Small and clean. Hosts: only openhiggsfield.ai, Google Fonts and framework sites. The paid API host is not in the code: it comes from an env variable |
| `storytold/photocraft` @7ac7b8b | 2,519 | eval 58, home_paths 5, rm_rf 1, hidden characters 14 | `rm -rf` is `/var/lib/apt/lists/*` in the Dockerfile. Hidden characters are zero-width joiners in emoji test strings. Expected for an editor with a script engine |
| `storytold/vectorcraft` @443b31b | 2,294 | eval 84, home_paths 4 | Script engine and prefs folder. Nothing aimed at AI |
| `storytold/filmcraft` @10d626c | 1,514 | eval 64, runs_commands 4, telemetry 1 | Test video files (`.h264`) are fixtures. Nothing aimed at AI |
| `storytold/lightcraft` @662df66 | 1,242 | aimed_at_ai 1, settings_or_hooks 10, rm_rf 1, home_paths 11 | "aimed_at_ai" is a comment in `entitlements.plist` (Apple Events to send photos to Apple Photos). `rm -rf ~` is a test string that checks the app escapes it. Settings hits are its own denoise settings. Not a problem |
| `storytold/pdfcraft` @1dd2737 | 1,816 | telemetry 37, hidden characters 40, base64 4 | "telemetry" hits are the words "no telemetry" and Acrobat feature lists; hidden characters are zero-width non-joiners in bidi text code; `.p12` files are signing test data |
| `storytold/effectcraft` @01c904b | 1,306 | eval 47, settings_or_hooks 3, home_paths 5 | Its own script and plugin docs. Nothing aimed at AI |
| `storytold/designcraft` @50650f7 | 832 | eval 14, telemetry 15, home_paths 2 | "telemetry" hits are "no telemetry" lines. Nothing aimed at AI |
| `storytold/craft-launcher` @7aafad6 | 218 | home_paths 2, settings_or_hooks 1 | `login.rs` writes a LaunchAgent for "start at login". It also updates apps by itself. Reason it is skipped |
| `storytold/artcraft` @1f969a9 | 5,817 | secret_names 10, telemetry 17, CLAUDE.md links 7 | "secret_names" are error names like `NeedsFalApiKey` (paid Fal key). Not used |

No repo has a curl-into-shell line or an install script hook. The scanner checks source code, not the built DMG: each DMG still needs its own checksum check before install.

### 6.4 Do the established apps still fit?

Read 27 October 2026 from `brew info --json=v2 --cask`. None is installed today (not in `/Applications`, not in `brew list`).

| App | Version now | Licence | Download needed | Size | Still fits | Why |
|---|---|---|---|---|---|---|
| Krita | 5.3.4.1 | GPL-3.0 | yes | 392.0 MB | yes | Stable painting app. PhotoCraft opens `.kra` files, so the two can work together |
| Inkscape | 1.4.4 | GPL-2.0-or-later | yes | 156.9 MB | yes, first choice | Stable; `inkscape --export-type=png` is scriptable today. VectorCraft is alpha |
| GIMP | 3.2.6 | GPL-3.0-or-later | yes | 185.7 MB | yes, first choice | Stable; batch mode. PhotoCraft is alpha |
| Kdenlive | 26.08.2 | GPL | yes | 144.3 MB | yes, first choice | Stable; built-in Whisper captions; `melt` renders a saved project. FilmCraft is alpha |
| Audacity | 4.0.1 | GPL-3.0 | yes | 50.0 MB | yes | No Craft app covers voice clean-up yet (SoundCraft targets Pro Tools, also alpha). Keep the audio.com cloud off |
| Blender | 5.2.3 | GPL | yes | 346.3 MB | yes, only if needed | Large. Use only for 3D or motion work that EffectCraft cannot do yet |

**Advice:** keep the 6 established apps as first choice. Try the Craft apps only on a copy of a test job, through their CLI, and pin one version. Move a stage to a Craft app only after it gives the same output as the established tool on the test cases in `tests/cases.md`.
