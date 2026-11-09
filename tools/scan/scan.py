import argparse
import collections
import hashlib
import io
import json
import os
import re
import sys
import tarfile
import urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

HIDDEN = re.compile("[​-‏‪-‮⁠-⁤⁦-⁩﻿\U000e0000-\U000e007f]")
PATTERNS = {
    "aimed_at_ai": rb"(?i)ignore (all )?(previous|prior|above) instructions|disregard (the )?(system|previous)|you are (now )?(claude|chatgpt|an ai)|<\s*/?\s*(claude|assistant|system)\s*>|do not (tell|inform) the user|without (telling|asking) the user",
    "curl_pipe": rb"(curl|wget)[^\n|]*\|\s*(sudo\s+)?(ba|z)?sh",
    "settings_or_hooks": rb"settings(\.local)?\.json|PreToolUse|PostToolUse|\"hooks\"\s*:",
    "rm_rf": rb"rm\s+-rf\s+[~/$]",
    "runs_commands": rb"child_process|execSync|spawnSync|subprocess\.|os\.system\(|os\.popen\(",
    "eval": rb"\beval\(|new Function\(|\bexec\(",
    "install_scripts": rb"\"(pre|post)install\"\s*:|cmdclass\s*=",
    "secret_names": rb"(?i)(api[_-]?key|secret[_-]?key|access[_-]?token|bearer)\s*[=:]\s*['\"][A-Za-z0-9_\-]{16,}",
    "base64_blob": rb"[A-Za-z0-9+/]{400,}={0,2}",
    "home_paths": rb"~/\.(ssh|aws|claude|config|gnupg)|\.claude\.json|Library/Keychains",
    "telemetry": rb"(?i)telemetry|posthog|mixpanel|segment\.io|sentry_sdk|usage.?statistics",
}


def fetch(repo, ref):
    url = f"https://codeload.github.com/{repo}/tar.gz/{ref}"
    return urllib.request.urlopen(url, timeout=300).read()


def resolve(repo, ref):
    req = urllib.request.Request(f"https://api.github.com/repos/{repo}/commits/{ref}", headers={"Accept": "application/vnd.github+json"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read())["sha"]


def scan(data, only, exclude=()):
    tf = tarfile.open(fileobj=io.BytesIO(data), mode="r:gz")
    report = {"unsafe_paths": [], "links": [], "binaries": [], "executables": [], "hidden_chars": [], "blank_runs": [], "hosts": collections.Counter()}
    hits = collections.defaultdict(list)
    kept = []
    for m in tf.getmembers():
        rel = m.name.split("/", 1)[1] if "/" in m.name else ""
        if not rel or (only and not any(rel == o.rstrip("/") or rel.startswith(o.rstrip("/") + "/") for o in only)):
            continue
        if any(rel == x.rstrip("/") or rel.startswith(x.rstrip("/") + "/") for x in exclude):
            continue
        if m.name.startswith("/") or ".." in m.name.split("/"):
            report["unsafe_paths"].append(m.name)
        if m.issym() or m.islnk():
            report["links"].append([rel, m.linkname])
            continue
        if not m.isfile():
            continue
        b = tf.extractfile(m).read()
        kept.append((rel, m, b))
        if m.mode & 0o111:
            report["executables"].append(rel)
        if b"\x00" in b[:8192]:
            report["binaries"].append([rel, m.size])
            continue
        text = b.decode("utf-8", errors="ignore")
        for i, line in enumerate(text.splitlines(), 1):
            for ch in HIDDEN.findall(line):
                report["hidden_chars"].append([rel, i, f"U+{ord(ch):04X}"])
        if re.search(r"(\n[ \t]*){40,}", text):
            report["blank_runs"].append(rel)
        for k, p in PATTERNS.items():
            for mt in re.finditer(p, b):
                line = b.count(b"\n", 0, mt.start()) + 1
                hits[k].append([rel, line])
                break
        for h in re.findall(rb"https?://([A-Za-z0-9.\-]+)", b):
            report["hosts"][h.decode().lower()] += 1
    report["files"] = len(kept)
    report["bytes"] = sum(m.size for _, m, _ in kept)
    report["hits"] = {k: {"count": len(v), "first": v[:12]} for k, v in hits.items()}
    report["hosts"] = [h for h, _ in report["hosts"].most_common(40)]
    report["hidden_chars"] = report["hidden_chars"][:40]
    return report, kept


def save(name, repo, sha, data, kept, only, licence, exclude=()):
    os.makedirs(os.path.join(ROOT, "archives"), exist_ok=True)
    os.makedirs(os.path.join(ROOT, "lock"), exist_ok=True)
    if only or exclude:
        buf = io.BytesIO()
        with tarfile.open(fileobj=buf, mode="w:gz") as out:
            for rel, m, b in kept:
                info = tarfile.TarInfo(f"{name}/{rel}")
                info.size, info.mode, info.mtime = len(b), m.mode & 0o755, m.mtime
                out.addfile(info, io.BytesIO(b))
        data = buf.getvalue()
    arch = os.path.join(ROOT, "archives", f"{name}.tar.gz")
    with open(arch, "wb") as f:
        f.write(data)
    arch_sha = hashlib.sha256(data).hexdigest()
    dest = os.path.join(ROOT, "vendor", name)
    files = []
    for rel, m, b in kept:
        p = os.path.join(dest, rel)
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "wb") as f:
            f.write(b)
        os.chmod(p, 0o644)
        files.append([rel, hashlib.sha256(b).hexdigest(), len(b)])
    for rel, h, n in files:
        with open(os.path.join(dest, rel), "rb") as f:
            if hashlib.sha256(f.read()).hexdigest() != h:
                sys.exit(f"hash mismatch after write: {rel}")
    with open(os.path.join(ROOT, "lock", f"lock-{name}.json"), "w") as f:
        json.dump(files, f, indent=1)
    with open(os.path.join(ROOT, "archives.sha256"), "a") as f:
        f.write(f"{arch_sha}  {name}.tar.gz\n")
    lock_path = os.path.join(ROOT, "LOCK.json")
    lock = json.load(open(lock_path))
    lock = [e for e in lock if e.get("name") != name]
    lock.append({"name": name, "repo": f"https://github.com/{repo}", "commit": sha, "licence": licence,
                 "downloaded": __import__("datetime").date.today().isoformat(), "archive_sha256": arch_sha,
                 "file_count": len(files), "files_lock": f"lock/lock-{name}.json",
                 "only": only or None, "excluded": list(exclude) or None, "status": "downloaded, scanned; nothing run", "run": "never"})
    with open(lock_path, "w") as f:
        json.dump(lock, f, indent=1)
    return arch_sha


def main():
    ap = argparse.ArgumentParser(description="Scan a GitHub repo in memory; save it only with --save.")
    ap.add_argument("repo")
    ap.add_argument("--ref", default="HEAD")
    ap.add_argument("--only", action="append", default=[], help="keep only this folder or file (repeat)")
    ap.add_argument("--exclude", action="append", default=[], help="leave out this folder or file (repeat)")
    ap.add_argument("--save", action="store_true")
    ap.add_argument("--licence", default="")
    ap.add_argument("--expect-sha", help="archive sha256 from the scan; --save refuses if the new download differs")
    a = ap.parse_args()
    sha = resolve(a.repo, a.ref)
    data = fetch(a.repo, sha)
    archive_sha = hashlib.sha256(data).hexdigest()
    report, kept = scan(data, a.only, a.exclude)
    name = f"{a.repo.replace('/', '_')}@{sha[:7]}"
    print(json.dumps({"name": name, "commit": sha, "archive_sha256": archive_sha, **report}, indent=1))
    if a.save:
        if a.expect_sha and a.expect_sha != archive_sha:
            sys.exit(f"refused: archive changed since the scan ({archive_sha})")
        print("saved", save(name, a.repo, sha, data, kept, a.only, a.licence, a.exclude))


if __name__ == "__main__":
    main()
