#!/bin/bash
# collect.sh - the collector entry point (swapped in 2026-10-27). Based on the live collect.sh of 2026-10-27 20:55
# (keeps: --out <run>/raw.jsonl always added; all commands of collect.py, including
# search --days 0, hn --in url, wayback, wayback-urls).
# Changes (reviews/2026-10-27: ENG R1, PONYTAIL 21 and 22):
# - The search cap counts per skill and stage: <run>/.collect/<skill>-<NN>.count.
#   Skill and stage come from --skill/--stage, or KINSO_SKILL/KINSO_STAGE. Both are required for
#   search and reddit. The cap comes from --cap, or KINSO_COLLECT_CAP, default 20 per stage.
# - The counter is read and written under a mkdir lock, so 2 parallel agents cannot pass the cap.
# - NODE_PATH: taken from the caller, else the newest ~/.npm/_npx/*/node_modules that holds
#   playwright. reddit, fetch and quote-check stop with a clear message if none is found.
# - Each raw.jsonl row gets "skill" and "stage" fields (collect_tag.py).
# - Runs through run.sh, with one extra write path: the shared search cache and pace lock.
# - --dry (before the run folder): counts as usual, then writes one marked row, no web call.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
usage() {
  echo "usage: collect.sh [--skill <name>] [--stage <NN>] [--cap <n>] [--dry] <run folder> <search|reddit|hn|bluesky|jobs|fetch|wayback|wayback-urls|quote-check> [args...]" >&2
  exit 2
}
SKILL="${KINSO_SKILL:-}"; STAGE="${KINSO_STAGE:-}"; CAP="${KINSO_COLLECT_CAP:-20}"; DRY=0
while [ $# -gt 0 ]; do
  case "$1" in
    --skill) SKILL="${2:-}"; shift 2;;
    --stage) STAGE="${2:-}"; shift 2;;
    --cap) CAP="${2:-}"; shift 2;;
    --dry) DRY=1; shift;;
    --) shift; break;;
    -*) usage;;
    *) break;;
  esac
done
[ $# -lt 2 ] && usage
RUN="$1"; shift
mkdir -p "$RUN"
case "$CAP" in ''|*[!0-9]*) echo "collect.sh: cap must be a whole number, got '$CAP'." >&2; exit 2;; esac
case "$STAGE" in [0-9]) STAGE="0$STAGE";; esac

case "$1" in
  search|reddit)
    if [ -z "$SKILL" ] || [ -z "$STAGE" ]; then
      echo "collect.sh: $1 needs the skill and stage: --skill kinso-validate --stage 3 (or KINSO_SKILL and KINSO_STAGE)." >&2
      exit 2
    fi
    case "$SKILL" in *[!a-z0-9-]*) echo "collect.sh: skill '$SKILL' may hold only a-z, 0-9 and '-'." >&2; exit 2;; esac
    case "$STAGE" in *[!0-9a-z]*) echo "collect.sh: stage '$STAGE' may hold only a-z and 0-9 (for example 3, 03, 8a)." >&2; exit 2;; esac
    case "$STAGE" in [0-9]) STAGE="0$STAGE";; esac
    mkdir -p "$RUN/.collect"
    COUNT_FILE="$RUN/.collect/$SKILL-$STAGE.count"
    LOCK="$RUN/.collect/$SKILL-$STAGE.lock"
    tries=0
    until mkdir "$LOCK" 2>/dev/null; do
      tries=$((tries + 1))
      if [ "$tries" -ge 100 ]; then
        echo "collect.sh: the counter lock $LOCK is held for 10 s. If no other collector runs, move that folder to ~/.Trash/ and retry." >&2
        exit 3
      fi
      sleep 0.1
    done
    COUNT=$(cat "$COUNT_FILE" 2>/dev/null || echo 0)
    case "$COUNT" in ''|*[!0-9]*) COUNT=0;; esac
    if [ "$COUNT" -ge "$CAP" ]; then
      rmdir "$LOCK"
      echo "collect.sh: search cap reached ($COUNT of $CAP) for $SKILL stage $STAGE in $RUN. Use what you have; note the gap." >&2
      exit 3
    fi
    echo $((COUNT + 1)) > "$COUNT_FILE"
    rmdir "$LOCK"
    ;;
esac

# Always save to the run's raw.jsonl (FIXES.md row 7d), as collect.sh does.
if [ "$1" != "quote-check" ]; then
  HAS_OUT=0
  for x in "$@"; do [ "$x" = "--out" ] && HAS_OUT=1; done
  [ "$HAS_OUT" = 0 ] && set -- "$@" --out "$RUN/raw.jsonl"
fi

export PLAYWRIGHT_BROWSERS_PATH="${PLAYWRIGHT_BROWSERS_PATH:-$HOME/Library/Caches/ms-playwright}"
if [ -z "${NODE_PATH:-}" ]; then
  # Newest npx cache folder that holds playwright. No fixed hash: npm cache clean changes it.
  NODE_PATH="$(ls -dt "$HOME"/.npm/_npx/*/node_modules/playwright 2>/dev/null | head -1)"
  NODE_PATH="${NODE_PATH%/playwright}"
fi
if [ -z "$NODE_PATH" ] || [ ! -d "$NODE_PATH/playwright" ]; then
  case "$1" in
    reddit|fetch|quote-check)
      echo "collect.sh: no Playwright for the browser. Set NODE_PATH to a folder holding node_modules/playwright, for example NODE_PATH=\"<a folder holding node_modules/playwright>\"." >&2
      exit 3;;
  esac
  NODE_PATH=""
fi
[ -n "$NODE_PATH" ] && export NODE_PATH || unset NODE_PATH
[ -n "$SKILL" ] && export KINSO_SKILL="$SKILL"
[ -n "$STAGE" ] && export KINSO_STAGE="$STAGE"
# collect.py keeps its search cache and the shared 30-second pace lock here (collect.py CACHE).
export KINSO_COLLECT_CACHE="${KINSO_COLLECT_CACHE:-/private/tmp/kinso-collect-cache}"
export KINSO_SANDBOX_WRITE="$KINSO_COLLECT_CACHE${KINSO_SANDBOX_WRITE:+:$KINSO_SANDBOX_WRITE}"

PY_ARGS=("$HERE/collect_tag.py")
[ "$DRY" = 1 ] && PY_ARGS+=(--dry)
exec "$HERE/../../kinso-frontend/tools/sandbox/run.sh" "$RUN" "$HERE/venv-jobspy/bin/python" "${PY_ARGS[@]}" "$@"
