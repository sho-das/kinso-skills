"""Table test for guard.py. Run it through the sandbox:
"ROOT/kinso-frontend/tools/sandbox/run.sh" <scratch folder> /usr/bin/python3 -I -B "ROOT/tools/hooks/test_guard.py"
"""
import importlib.util
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
spec = importlib.util.spec_from_file_location("guard", os.path.join(HERE, "guard.py"))
g = importlib.util.module_from_spec(spec)
spec.loader.exec_module(g)

RUN = '"/a b/kinso-frontend/tools/sandbox/run.sh"'
REAL_RUN = '"%s/kinso-frontend/tools/sandbox/run.sh"' % ROOT

DENY = [
    "KINSO_COLLECT_CAP=99 kinso-frontend/tools/sandbox/run.sh r /bin/echo hi",
    "rm -rf x",
    r"\rm -rf x",
    "'rm' -rf x",
    '"rm" -rf x',
    "/bin/rm x",
    "/bin/r? x",
    "$'\\x72m' x",
    "{rm,x} f",
    'eval "rm -rf x"',
    "bash -lc 'rm -rf x'",
    "bash -lc 'python3 x.py'",
    "ls | xargs rm",
    "ls | xargs *",
    "find . -exec * {} +",
    "env * x",
    "ls d/r?",
    "ls | xargs /bin/r?",
    "echo pip*",
    "echo $(rm x)",
    "unlink f",
    "find . -name '*.tmp' -delete",
    "git clean -fdx",
    "python3 x.py tools/sandbox/run.sh",
    "python3 x.py # kinso-frontend/tools/sandbox/run.sh",
    "python3 -I evil.py tools/scan/scan.py",
    "python3 -I tools/scan/scan.py --save out",
    "node -I x.js tools/scan/scan.py",
    "env python3 x.py",
    "pip install foo",
    "pip3 install foo",
    "npm install",
    "npx vite",
    "pnpm i",
    "yarn",
    "uv run x.py",
    "bun x.ts",
    "deno run x.ts",
    "perl -e 1",
    "ruby -e 1",
    "bash my.sh",
    "cat my.sh | sh",
    "zsh < my.sh",
    "P=python3; $P x.py",
    "./script.py",
    "git push origin main",
    "git commit -m x",
    "git merge dev",
    "git reset --hard HEAD~1",
    "gh pr merge 12",
    "vercel --prod",
    "netlify deploy",
    "fly deploy",
    "terraform apply",
    RUN + " . npm publish",
    RUN + " . python3 $(python3 evil.py)",
    "BASH_ENV=/x/evil.sh " + RUN + " . ls",
    "export PATH=/x/evil:$PATH",
    "curl -s https://example.com",
    "wget https://example.com",
    "ls; curl https://example.com",
]

ALLOW = [
    "KINSO_ALLOWED_ROOTS=\"$PWD\" kinso-frontend/tools/sandbox/run.sh kinso/job1/run1 /bin/echo hi",
    "KINSO_NO_NET=1 KINSO_SKILL=kinso-validate KINSO_STAGE=3 kinso-frontend/tools/sandbox/run.sh r /bin/echo hi",
    "ls new2/D/picks/*",
    "grep -il \"a\\|b\" judge/*",
    "ls kinso-business/tests/new/*",
    "cat d/*.md | wc -l",
    "find x -type f | grep -v node_modules | head -80",
    "wc -l runs/*.log",
    "ls -la",
    "cat notes.md",
    "grep -n foo file.txt",
    "sed -n '1,20p' file.txt",
    "shasum -a 256 f",
    "du -sh .",
    'pgrep -fl "ollama serve|mflux"',
    "mv x ~/.Trash/",
    'cd "/a b" && "/a b/kinso-frontend/tools/sandbox/run.sh" "/a b/run" /usr/bin/env X=1 venv/bin/python -I s.py',
    '"ROOT/kinso-frontend/tools/sandbox/run.sh" . /usr/bin/curl -s URL -o f',
    'tools/collect/collect.sh run1 search "q" --out f',
    RUN + " run1 /usr/bin/env K6_NO_USAGE_REPORT=true /opt/homebrew/bin/k6 run --no-usage-report s.js",
    '(env -i HOME="/r/home" OLLAMA_MODELS="$HOME/.ollama/models" OLLAMA_HOST=127.0.0.1:11434 '
    "/usr/bin/sandbox-exec -f tools/ollama/no-net.sb tools/ollama/v0.40.2/bin/ollama serve "
    "> /r/build/runs/ollama.log 2>&1 &)",
    'pkill -f "v0.40.2/bin/ollama serve"',
    "brew analytics",
    "git status",
    "git diff",
    "git log --oneline -5",
    'cd "/a b/kinso-frontend" && PATH=/Users/x/.nvm/versions/node/v24.13.1/bin:$PATH '
    './tools/sandbox/run.sh "r" python3 -I t.py',
    'NODE_PATH="/x/node_modules" PLAYWRIGHT_BROWSERS_PATH="$HOME/Library/Caches/ms-playwright" '
    + RUN + ' r node capture.mjs "http://localhost:3000/" out a en-GB 45',
    RUN + " job sh -c 'python3 x.py && curl -s y'",
    "bash " + RUN + " job python3 x.py",
    "python3 -I tools/scan/scan.py target",
    "ls 2>&1 | head -5",
]

# Strict mode, as the live hook runs it: run.sh must be this project's own file.
STRICT_DENY = ['"/tmp/fake/kinso-frontend/tools/sandbox/run.sh" . python3 x.py']
STRICT_ALLOW = [REAL_RUN + " . python3 x.py"]


def hook(stdin):
    p = subprocess.run([sys.executable, "-I", os.path.join(HERE, "guard.py")],
                       input=stdin, capture_output=True, text=True)
    return p.stdout.strip()


def denied_by_hook(stdin):
    out = hook(stdin)
    return bool(out) and json.loads(out)["hookSpecificOutput"]["permissionDecision"] == "deny"


HOOK_DENY = [
    "not json",
    "[]",
    json.dumps({"tool_name": "Bash", "tool_input": {}}),
    json.dumps({"tool_name": "Bash", "tool_input": {"command": "rm x"}}),
    json.dumps({"tool_name": "mcp__terminal__run_in_terminal", "tool_input": {"command": "python3 x.py"}}),
    json.dumps({"tool_name": "WebFetch", "tool_input": {"url": "https://x"}}),
    json.dumps({"tool_name": "Write", "tool_input": {"file_path": ROOT + "/tools/hooks/guard.py"}}),
    json.dumps({"tool_name": "Agent", "tool_input": {"model": "x-contributor"}}),
]
HOOK_ALLOW = [
    json.dumps({"tool_name": "Bash", "tool_input": {"command": "ls"}}),
    json.dumps({"tool_name": "Write", "tool_input": {"file_path": ROOT + "/jobs/a/x.md"}}),
]


def main():
    fails = []
    for c in DENY:
        if not g.check(c):
            fails.append("should deny: " + c)
    for c in ALLOW:
        r = g.check(c)
        if r:
            fails.append("should allow: %s  (%s)" % (c, r))
    for c in STRICT_DENY:
        if not g.check(c, root=ROOT):
            fails.append("strict should deny: " + c)
    for c in STRICT_ALLOW:
        r = g.check(c, root=ROOT)
        if r:
            fails.append("strict should allow: %s  (%s)" % (c, r))
    for s in HOOK_DENY:
        if not denied_by_hook(s):
            fails.append("hook should deny: " + s)
    for s in HOOK_ALLOW:
        if hook(s):
            fails.append("hook should allow: " + s)
    nd = len(DENY) + len(STRICT_DENY) + len(HOOK_DENY)
    na = len(ALLOW) + len(STRICT_ALLOW) + len(HOOK_ALLOW)
    for f in fails:
        print("FAIL", f)
    print("deny cases: %d, allow cases: %d, failures: %d" % (nd, na, len(fails)))
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
