#!/usr/bin/env python3
"""Check pointers from one job file into another job file.

Usage (through the sandbox):
  run.sh "<job folder>" python3 "<kinso-business>/tools/check-pointers.py" "<job folder>" [file ...]

With no file, it checks every .md in business/ and picks/business/.
A file is a path relative to the job folder, for example business/COSTS.md.

A pointer looks like:   PRICING.md section 3 ("1 to 4 per club")
                        business/RISK.md section "First users" ("New York")
                        PRICING.md section 6 "Price to test first"
The quoted words (in brackets, or right after the section) are the anchor.
Rows of the NUMBERS.md Changes table are history and are skipped. The anchor must appear in that
section of that file (case, spaces, `*` and backticks are ignored).

Output, one line per pointer:
  OK       file:line -> target section N: anchor found
  MISSING  file:line -> target section N: anchor not in that section (stale)
  NO-SECT  file:line -> target section N: no such section (stale)
  NO-FILE  file:line -> target: file not in the job folder
  NO-ANCHOR file:line -> target section N: pointer has no anchor (add one)
  LINE     file:line -> target line N: line-number pointer (not allowed)
Exit code 1 if any line is not OK. Reads only; writes nothing.
"""
import os
import re
import sys

POINTER = re.compile(
    r'`?(?P<file>(?:[A-Za-z0-9_\-]+/)*[A-Z][A-Za-z0-9_\-]*\.md)`?,?\s+'
    r'(?:(?P<line>lines?\s+\d+)|section\s+(?P<sec>\d+[a-z]?|"[^"]+"))'
    r'(?P<rest>(?:,\s*step\s+\d+)?\s*(?:\((?P<paren>[^)]*)\)|(?P<q>"[^"]+")))?'
)
ANCHOR = re.compile(r'"([^"]+)"')
HEADING = re.compile(r'^(#+)\s+(.*)$')


def norm(text):
    text = re.sub(r'[`*_]', '', text)
    return re.sub(r'\s+', ' ', text).strip().lower()


def find_file(job, name):
    direct = os.path.join(job, name)
    if os.path.isfile(direct):
        return direct
    base = os.path.basename(name)
    for sub in ('', 'business', 'market', 'idea', 'evidence', 'picks/business', 'handoff'):
        p = os.path.join(job, sub, base)
        if os.path.isfile(p):
            return p
    return None


def section_text(path, sec):
    with open(path, encoding='utf-8') as f:
        lines = f.read().splitlines()
    # A numbered section may carry a letter: "section 2a" finds the heading "### 2a. ...".
    want_num = re.fullmatch(r'\d+[a-z]?', sec) is not None
    want = sec.strip('"').lower()
    start = level = None
    for i, line in enumerate(lines):
        m = HEADING.match(line)
        if not m:
            continue
        title = m.group(2).strip()
        if start is not None and len(m.group(1)) <= level:
            return '\n'.join(lines[start:i])
        if start is None:
            if want_num:
                hit = re.match(r'(?:section\s+)?' + re.escape(want) + r'[.)\s:]', title.lower() + ' ')
            else:
                hit = want in title.lower()
            if hit:
                start, level = i, len(m.group(1))
    if start is not None:
        return '\n'.join(lines[start:])
    return None


def default_files(job):
    out = []
    for sub in ('business', 'picks/business'):
        d = os.path.join(job, sub)
        if os.path.isdir(d):
            out += [os.path.join(sub, n) for n in sorted(os.listdir(d)) if n.endswith('.md')]
    return out


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    job = os.path.abspath(sys.argv[1])
    files = sys.argv[2:] or default_files(job)
    bad = 0
    total = 0
    for rel in files:
        src = os.path.join(job, rel)
        own = os.path.basename(rel)
        with open(src, encoding='utf-8') as f:
            in_changes = False
            for n, line in enumerate(f, 1):
                if line.startswith('#'):
                    in_changes = line.lower().startswith('## changes')
                # Rows of the Changes table are history: they record what was true then.
                # The notes under the table are claims about now, so they are checked.
                if in_changes and line.startswith('|'):
                    continue
                for m in POINTER.finditer(line):
                    target = m.group('file')
                    if os.path.basename(target) == own:
                        continue
                    total += 1
                    where = f'{rel}:{n} -> {target}'
                    if m.group('line'):
                        print(f'LINE      {where} {m.group("line")}: line-number pointer (not allowed)')
                        bad += 1
                        continue
                    sec = m.group('sec')
                    path = find_file(job, target)
                    if not path:
                        print(f'NO-FILE   {where}: file not in the job folder')
                        bad += 1
                        continue
                    body = section_text(path, sec)
                    if body is None:
                        print(f'NO-SECT   {where} section {sec}: no such section (stale)')
                        bad += 1
                        continue
                    anchors = ANCHOR.findall((m.group('paren') or '') + (m.group('q') or ''))
                    if not anchors:
                        print(f'NO-ANCHOR {where} section {sec}: pointer has no anchor (add one)')
                        bad += 1
                        continue
                    missing = [a for a in anchors if norm(a) not in norm(body)]
                    if missing:
                        print(f'MISSING   {where} section {sec}: anchor not in that section (stale): {missing}')
                        bad += 1
                    else:
                        print(f'OK        {where} section {sec}: anchor found')
    print(f'Pointers: {total}. Not OK: {bad}.')
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
