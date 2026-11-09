# Stage 10 - Mobile

Read `BRAIN.md` first. Paths are from `kinso-qa/`. Skip when `build/STACK.md` has no Android or iOS app.

## Runs

1. By the app's platform in `build/STACK.md`:

| Platform | Skill | Device needed |
|---|---|---|
| Flutter | `skills/flutter-testing-skill/SKILL.md` (LambdaTest) - widget, integration and golden tests | Widget and golden tests: none. Integration: an emulator or simulator |
| React Native | `skills/detox-skill/SKILL.md` (LambdaTest) - end-to-end | A simulator or emulator |
| Android (Kotlin) | `skills/espresso-skill/SKILL.md` (LambdaTest) | An emulator for UI tests; JVM unit tests need none |
| iOS (Swift) | `skills/xcuitest-skill/SKILL.md` (LambdaTest) | The iOS Simulator |
| Any, cross-platform | `skills/appium-skill/SKILL.md` (LambdaTest), the second tester for high cells | A simulator or emulator |

2. Accessibility: `skills/accessibility/SKILL.md` (ECC, its iOS and Android parts) and `skills/screen-reader-testing/SKILL.md` (wshobson, VoiceOver and TalkBack).
3. The platform skill from `../kinso-build/skills/` named in `STACK.md` (for example `flutter-expert`, `react-native-expert`, `kotlin-specialist`, `swift-expert`) for the app's own test tools.
4. The app's API is the one stage 3 tested: mobile cases add only what is mobile (network loss, background, rotation, permissions, push).

**Skip:** every LambdaTest cloud section (real-device upload to `manual-api.lambdatest.com`, `hub.lambdatest.com`, HyperExecute); any device farm; app store steps. An emulator or simulator install without the founder's OK. Log each skip in `qa/PROCESS.md`.

## In

- `qa/MATRIX.md` (mobile cells), `build/STACK.md`, the app's mobile folder and its existing tests, `build/API.md`, `qa/HOSTS.md`.
- Draws: `banks/EDGE-CASES.md` section E10, one persona (often "the old phone user").

## Deal and pick

- As `BRAIN.md`. Write `<job>/picks/qa/10-PICK.md`.
- Without a device (no install OK): run the tests that need none (widget, golden, unit), and write the device tests as "planned, not run".

## Guards

- Local simulators or emulators only, after the founder's OK. Never a cloud device.
- The app points at the local API on a host in `qa/HOSTS.md`, with test data.
- Through the sandbox where the tool allows; simulator control follows the founder's OK. Never `rm`. Never commit. Never sign or upload a build.

## Checks after

- Each mobile cell: tests run (count from the run log) or "planned, not run - no device".
- Network loss and background return: no lost save, no duplicate.
- Large text and screen reader on the main flow: every control named and reachable.
- Screens at 2 sizes (small phone and tablet), saved.

## Override

The founder may test one platform first. Logged; the report lists the other as not tested.

## Out

- `<job>/qa/MOBILE.md` - platform, tests run or planned, findings.
- `<job>/qa/screens/mobile/`, `<job>/qa/runs/mobile/<run>/`, `<job>/picks/qa/10-PICK.md`.

## Stop point

None. Go on to stage 11.
