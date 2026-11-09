# Stage 8 - Demo video script

Read `../RULES-RESEARCH.md` and `BRAIN.md` first. Paths are from `kinso-promote/`. The script is the output. Recording happens only after your OK on tools.

## Runs

Each skill is followed as its own `SKILL.md` says, read in place.

1. `skills/social/references/short-form-video.md`: visual, spoken and text hooks in the first seconds.
2. `skills/content-engine/SKILL.md`: its short video and YouTube rules.
3. `skills/ui-demo/SKILL.md`: discover, rehearse, record. The recording plan and its checklist.
4. `skills/video-editing/SKILL.md`: the ffmpeg parts only.

Off: ElevenLabs, fal.ai, Descript, Remotion; video-editing's Fusion `.lua` installers; any voice or video generator.

## In

- `promote/MESSAGE.md`, `promote/FACTS.md`, `promote/MUST-NOT.md`, `handoff/PROMOTE-BUILD.md` (how to try it, real screens, real limits), the chosen visuals from stage 7, the Reel idea from stage 5.
- `promote/AUDIENCE.md` (stage 1): short or long video, which platforms, and the length per platform. If AUDIENCE.md chose no video (or cut the Reel), nothing is dealt or built: `promote/video/SCRIPT.md` holds "cut by AUDIENCE.md (<row>)" and one line on what a video would need if you add time later; `SHOTS.md` is not written, and `08-PICK.md` says "skipped, cut by AUDIENCE.md".

## Deal and pick

- **Deal 3 cold opens:** A the result first; B the problem first; C before and after.
- No random draw: the 3 opens are fixed. The seed `<job>-promote-08` picks which skill drafts which open (social, content-engine, ui-demo's storytelling flow), so each comes from a different skill.
- **Rubric (0 to 3 per line):** shows the product working in the first seconds; every on-screen claim is in `FACTS.md`; one length per use (a 30 to 60 second social cut, and a longer walkthrough only if you asked); recordable on the real product as it is today; rival test.
- A fresh judge scores with skill names hidden. Keep 1. Save the others in `promote/ALTERNATIVES.md`. Write `<job>/picks/promote/08-PICK.md`.

## Guards

- Shared guards from `BRAIN.md` (never post; never main accounts; no MUST-NOT claim; no invented numbers, quotes, users or testimonials; platform rules; free only; local tools only from `TOOLS.md`, nothing installed without your OK).
- The video shows only what the product does today. A step it cannot do (for example an automatic merge, when it only waits for approval) is never shown or implied.
- Recording runs only through `../kinso-frontend/tools/sandbox/run.sh`, on our own page or local build, with test data marked as test data. Never a logged-in main account on screen.
- `say` only for a timing draft, never the final voice.
- Captions with whisper.cpp and edits with ffmpeg only after you OK those installs.

## Checks after

- Every on-screen text and voice-over line traces to `FACTS.md`; MUST-NOT scan on both.
- Shot times add up to the target length.
- Each shot names the page or screen to record, and that page exists in the build.
- Caption plan present; on-screen text short enough to read at phone size.
- Length and size limits per platform, from a dated platform page.
- Humanizer and clear-English passes on the voice-over. Voice kept.

## Override

As in `BRAIN.md`: reason once, your call, a row in `OVERRIDES.md`.

## Out

- `promote/video/SCRIPT.md` (cold open, voice-over, on-screen text, captions plan), `promote/video/SHOTS.md` (shot list with times and pages).
- Later, after your OK: `promote/video/captions.srt` and the video file.
- `promote/ALTERNATIVES.md`, `<job>/picks/promote/08-PICK.md`.

## Stop point

None of its own. The script is shown in the final kit after stage 9. Recording waits for your tool OK.
