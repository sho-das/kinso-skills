#!/bin/bash
# run.sh - the sandbox. Usage: run.sh [--no-net] <run folder> <command> [args...]
# Changes from run.sh (reviews/2026-10-27: PONYTAIL 6-8, ENG R5, R6 telemetry row):
# - Refuses a run folder that is /, $HOME, above $HOME, outside an allowed root, or that holds .claude.
#   Allowed roots: the Kinso folder (3 levels above this file), plus KINSO_ALLOWED_ROOTS (colon list,
#   for example a client code folder for kinso-build). / and $HOME are never accepted as roots.
# - TMPDIR is <run folder>/.tmp. No write rule for /private/tmp or /private/var/folders.
#   KINSO_SANDBOX_WRITE (colon list) adds a write path, only under an allowed root or /private/tmp/kinso-*.
# - macOS: reads of $HOME are denied, except the allowed roots, the run folder, the node and python
#   toolchains when they live in $HOME, the Playwright cache, NODE_PATH, KINSO_CHROME_REAL and
#   KINSO_SANDBOX_READ (colon list). File names can still be stat'ed, not read or listed.
# - macOS: (deny lsopen) and (deny appleevent-send): no opening apps, no scripting other apps.
# - Telemetry off for every run: DO_NOT_TRACK, K6_NO_USAGE_REPORT, the 4 PROMPTFOO_* variables.
# - Network off with KINSO_NO_NET=1 or --no-net: only localhost stays open.
set -euo pipefail

NO_NET="${KINSO_NO_NET:-0}"
if [ "${1:-}" = "--no-net" ]; then NO_NET=1; shift; fi
if [ $# -lt 2 ]; then
  echo "usage: run.sh [--no-net] <run folder> <command> [args...]" >&2
  exit 2
fi

HERE="$(cd "$(dirname "$0")" && pwd -P)"
KROOT="$(cd "$HERE/../../.." && pwd -P)"
REAL_HOME="$(cd "$HOME" && pwd -P)"

refuse() { echo "run.sh: refused: $*" >&2; exit 4; }
# under <path> <root>: true when path is root or inside it
under() { case "$1/" in "$2"/*) return 0;; esac; return 1; }
# too_wide <path>: / , $HOME, or any folder that holds $HOME
too_wide() { [ "$1" = "/" ] || under "$REAL_HOME" "$1"; }

[ -d "$1" ] || refuse "run folder '$1' does not exist"
RUN="$(cd "$1" && pwd -P)"
shift

ROOTS=("$KROOT")
IFS=':' read -r -a EXTRA_ROOTS <<< "${KINSO_ALLOWED_ROOTS:-}"
for r in "${EXTRA_ROOTS[@]:-}"; do
  [ -z "$r" ] && continue
  [ -d "$r" ] || refuse "allowed root '$r' does not exist"
  r="$(cd "$r" && pwd -P)"
  too_wide "$r" && refuse "allowed root '$r' is / or holds your home folder"
  ROOTS+=("$r")
done

too_wide "$RUN" && refuse "run folder '$RUN' is / or holds your home folder"
ok=0
for r in "${ROOTS[@]}"; do
  if under "$RUN" "$r" && [ "$RUN" != "$r" ]; then ok=1; fi
done
[ "$ok" = 1 ] || refuse "run folder '$RUN' is not inside an allowed root (${ROOTS[*]}). Add one with KINSO_ALLOWED_ROOTS."
# A .claude folder holds the hook settings. A script must never be able to rewrite them.
if [ -n "$(find "$RUN" -maxdepth 4 -name .claude -type d -print -quit 2>/dev/null)" ]; then
  refuse "run folder '$RUN' holds a .claude folder"
fi

WRITES=()
IFS=':' read -r -a EXTRA_W <<< "${KINSO_SANDBOX_WRITE:-}"
for w in "${EXTRA_W[@]:-}"; do
  [ -z "$w" ] && continue
  mkdir -p "$w"
  w="$(cd "$w" && pwd -P)"
  good=0
  case "$w" in /private/tmp/kinso-?*) good=1;; esac
  for r in "${ROOTS[@]}"; do under "$w" "$r" && [ "$w" != "$r" ] && good=1; done
  too_wide "$w" && good=0
  [ "$good" = 1 ] || refuse "extra write path '$w' is not under an allowed root or /private/tmp/kinso-*"
  WRITES+=("$w")
done

mkdir -p "$RUN/home" "$RUN/.tmp"
WORK="$(pwd -P)"
NODE_BIN="$(dirname "$(command -v node || echo /usr/bin/node)")"
PY_BIN="$(dirname "$(command -v python3 || echo /usr/bin/python3)")"
SAFE_PATH="$NODE_BIN:$PY_BIN:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

ENV_ARGS=(HOME="$RUN/home" LANG="${LANG:-en_GB.UTF-8}" PATH="$SAFE_PATH" TMPDIR="$RUN/.tmp")
# Telemetry off for every tool, always (kinso-qa/BRAIN.md guard 8, references/08a-ai-evals.md).
ENV_ARGS+=(DO_NOT_TRACK=1 K6_NO_USAGE_REPORT=true
  PROMPTFOO_DISABLE_TELEMETRY=1 PROMPTFOO_DISABLE_UPDATE=1 PROMPTFOO_DISABLE_SHARING=1
  PROMPTFOO_DISABLE_REMOTE_GENERATION=true)
[ -n "${PLAYWRIGHT_BROWSERS_PATH:-}" ] && ENV_ARGS+=(PLAYWRIGHT_BROWSERS_PATH="$PLAYWRIGHT_BROWSERS_PATH")
[ -n "${NODE_PATH:-}" ] && ENV_ARGS+=(NODE_PATH="$NODE_PATH")
# Pass the collector's labels through, so collect_tag.py can tag raw.jsonl rows.
[ -n "${KINSO_SKILL:-}" ] && ENV_ARGS+=(KINSO_SKILL="$KINSO_SKILL")
[ -n "${KINSO_STAGE:-}" ] && ENV_ARGS+=(KINSO_STAGE="$KINSO_STAGE")
[ -n "${KINSO_COLLECT_CACHE:-}" ] && ENV_ARGS+=(KINSO_COLLECT_CACHE="$KINSO_COLLECT_CACHE")
# Chrome cannot start its own sandbox inside this one; see chrome.sh.
ENV_ARGS+=(CHROME_PATH="${CHROME_PATH:-$HERE/chrome.sh}")
PW_CACHE="${PLAYWRIGHT_BROWSERS_PATH:-$HOME/Library/Caches/ms-playwright}"
if [ -z "${KINSO_CHROME_REAL:-}" ]; then
  for d in $(ls -d "$PW_CACHE"/chromium_headless_shell-* 2>/dev/null | sort -r); do
    s="$(ls "$d"/*/chrome-headless-shell 2>/dev/null | head -1)"
    if [ -n "$s" ] && [ -x "$s" ]; then KINSO_CHROME_REAL="$s"; break; fi
  done
fi
[ -n "${KINSO_CHROME_REAL:-}" ] && ENV_ARGS+=(KINSO_CHROME_REAL="$KINSO_CHROME_REAL")
ENV_ARGS+=(TASTE_SKILL_TMP="$RUN/home")

case "$(uname -s)" in
  Darwin)
    # Read allow list inside $HOME. Each entry is a folder a current caller needs.
    READS=("${ROOTS[@]}" "$RUN")
    under "$WORK" "$REAL_HOME" && for r in "${ROOTS[@]}"; do under "$WORK" "$r" && READS+=("$WORK"); done
    # node from nvm (~/.nvm/versions/node/vX): every node, npm and npx call.
    for b in "$NODE_BIN" "$PY_BIN"; do
      under "$b" "$REAL_HOME" && READS+=("$(dirname "$b")")
    done
    # Playwright browsers: capture.mjs, pagetext.mjs (collector), render-png.mjs, chrome.sh.
    [ -d "$PW_CACHE" ] && READS+=("$(cd "$PW_CACHE" && pwd -P)")
    # NODE_PATH: the folder holding node_modules/playwright (capture.mjs, pagetext.mjs).
    if [ -n "${NODE_PATH:-}" ] && [ -d "$NODE_PATH" ]; then READS+=("$(cd "$NODE_PATH" && pwd -P)"); fi
    [ -n "${KINSO_CHROME_REAL:-}" ] && READS+=("$(dirname "$KINSO_CHROME_REAL")")
    IFS=':' read -r -a EXTRA_R <<< "${KINSO_SANDBOX_READ:-}"
    for p in "${EXTRA_R[@]:-}"; do
      [ -z "$p" ] && continue
      too_wide "$p" && refuse "extra read path '$p' is / or holds your home folder"
      READS+=("$p")
    done

    PROFILE="$(mktemp /tmp/kinso-sandbox.XXXXXX)"
    trap 'rm -f "$PROFILE"' EXIT
    {
      echo '(version 1)'
      echo '(allow default)'
      echo '(deny lsopen)'
      echo '(deny appleevent-send)'
      # Home: no reads, no listing. Metadata (stat) stays open so path lookups through $HOME work.
      echo "(deny file-read* (subpath \"$REAL_HOME\"))"
      echo "(allow file-read-metadata (subpath \"$REAL_HOME\"))"
      echo '(allow file-read*'
      for p in "${READS[@]}"; do echo "  (subpath \"$p\")"; done
      echo ')'
      # The old deny list stays, last, so it wins even inside an allowed folder.
      echo '(deny file-read*'
      for p in .claude .ssh .aws .config .gnupg .kube .docker Documents Desktop Downloads \
               "Library/Keychains" "Library/Cookies" "Library/Safari" "Library/Mail" "Library/Messages" \
               "Library/Application Support/Google" "Library/Application Support/Firefox" \
               "Library/Application Support/BraveSoftware" "Library/Application Support/Claude"; do
        echo "  (subpath \"$REAL_HOME/$p\")"
      done
      for p in .claude.json .npmrc .netrc .pypirc .git-credentials .zsh_history .bash_history; do
        echo "  (literal \"$REAL_HOME/$p\")"
      done
      IFS=':' read -r -a DENY <<< "${KINSO_SANDBOX_DENY:-}"
      for p in "${DENY[@]:-}"; do
        [ -n "$p" ] && echo "  (subpath \"$p\")"
      done
      echo ')'
      echo '(deny file-write*)'
      echo '(allow file-write*'
      echo "  (subpath \"$RUN\")"
      for w in "${WRITES[@]:-}"; do [ -n "$w" ] && echo "  (subpath \"$w\")"; done
      echo '  (literal "/dev/null") (literal "/dev/tty") (literal "/dev/stdout") (literal "/dev/stderr") (literal "/dev/dtracehelper"))'
      if [ "$NO_NET" = 1 ]; then
        echo '(deny network*)'
        echo '(allow network* (local ip "localhost:*") (remote ip "localhost:*"))'
      fi
    } > "$PROFILE"
    env -i "${ENV_ARGS[@]}" /usr/bin/sandbox-exec -f "$PROFILE" "$@"
    ;;
  Linux)
    if ! command -v bwrap >/dev/null 2>&1; then
      echo "bubblewrap (bwrap) is not installed. Install it, or run inside a container. Not running without a sandbox." >&2
      exit 3
    fi
    NET=--share-net
    [ "$NO_NET" = 1 ] && NET=
    BW=(--ro-bind / / --dev /dev --proc /proc --tmpfs /tmp --tmpfs "$HOME"
        --ro-bind "$WORK" "$WORK" --bind "$RUN" "$RUN"
        --unshare-all $NET --die-with-parent --new-session --chdir "$WORK")
    for w in "${WRITES[@]:-}"; do [ -n "$w" ] && BW+=(--bind "$w" "$w"); done
    for d in "$NODE_BIN" "$PY_BIN"; do
      case "$d" in "$HOME"/*) BW+=(--ro-bind "$(dirname "$d")" "$(dirname "$d")");; esac
    done
    IFS=':' read -r -a READS <<< "${KINSO_SANDBOX_READ:-}"
    for p in "${READS[@]:-}"; do
      [ -n "$p" ] && BW+=(--ro-bind "$p" "$p")
    done
    [ -n "${PLAYWRIGHT_BROWSERS_PATH:-}" ] && BW+=(--ro-bind "$PLAYWRIGHT_BROWSERS_PATH" "$PLAYWRIGHT_BROWSERS_PATH")
    [ -n "${NODE_PATH:-}" ] && BW+=(--ro-bind "$NODE_PATH" "$NODE_PATH")
    env -i "${ENV_ARGS[@]}" bwrap "${BW[@]}" "$@"
    ;;
  *)
    echo "No sandbox for $(uname -s). Not running." >&2
    exit 3
    ;;
esac
