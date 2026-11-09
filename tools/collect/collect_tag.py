"""collect_tag.py - runs the live collect.py unchanged, with 2 additions:
- every raw.jsonl row (and every printed row) gets "skill" and "stage" from KINSO_SKILL and KINSO_STAGE;
- KINSO_COLLECT_CACHE moves the search cache and pace lock (default: collect.py's /private/tmp/kinso-collect-cache).
--dry as the first argument writes one marked row and makes no web call (for tests).
"""
import json
import os
import sys

import collect

SKILL = os.environ.get("KINSO_SKILL") or None
STAGE = os.environ.get("KINSO_STAGE") or None
if os.environ.get("KINSO_COLLECT_CACHE"):
    collect.CACHE = os.environ["KINSO_COLLECT_CACHE"]


class _Json:
    """json for collect.py: rows (dicts with fetched_at) get the skill and stage fields."""

    def __getattr__(self, name):
        return getattr(json, name)

    @staticmethod
    def dumps(obj, *a, **k):
        if isinstance(obj, dict) and "fetched_at" in obj:
            obj = {**obj, "skill": SKILL, "stage": STAGE}
        return json.dumps(obj, *a, **k)


collect.json = _Json()


def dry(argv):
    out = argv[argv.index("--out") + 1] if "--out" in argv else None
    query = argv[1] if len(argv) > 1 else ""
    line = collect.json.dumps(collect.record("dry:" + (argv[0] if argv else ""), query, None, status="dry run, no web call"))
    if out:
        with open(out, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    print(line)


if __name__ == "__main__":
    if sys.argv[1:2] == ["--dry"]:
        dry(sys.argv[2:])
    else:
        collect.main()
