#!/bin/bash
# Chrome for scripts that run inside run.sh (for example taste-skill inspect.mjs).
# macOS does not allow a sandbox inside a sandbox: inside sandbox-exec, Chrome's own child
# processes fail with "sandbox initialization failed: Operation not permitted", the GPU process
# dies, and the page never answers ("CDP timeout: Page.enable"). Even with --no-sandbox, the
# headless GPU process cannot reach the display from inside the sandbox, and "Page.navigate"
# times out, so the GPU is off too (pages draw in software). Desktop Chrome still hung on
# Page.navigate in 4 of 5 smoke runs, so run.sh sets KINSO_CHROME_REAL to Playwright's
# headless shell when it is installed (8 of 8 passed). So Chrome runs with
# --no-sandbox here, as Playwright already does for tools/capture.mjs. run.sh's sandbox-exec
# profile still wraps Chrome and every child: reads of secrets are denied, and writes are
# allowed only in the run folder and the temp folders.
set -euo pipefail
REAL="${KINSO_CHROME_REAL:-}"
if [ -z "$REAL" ]; then
  for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
           "/Applications/Chromium.app/Contents/MacOS/Chromium" \
           /usr/bin/google-chrome /usr/bin/chromium /usr/bin/chromium-browser; do
    if [ -x "$c" ]; then REAL="$c"; break; fi
  done
fi
if [ -z "$REAL" ]; then
  echo "chrome.sh: no Chrome found. Set KINSO_CHROME_REAL to its executable." >&2
  exit 3
fi
exec "$REAL" --no-sandbox --disable-gpu "$@"
