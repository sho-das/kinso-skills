"""PreToolUse guard for the Kinso project (stricter version of guard.py).

shortcut: this is a text filter over the command line, not a shell. It reads the
command the way bash would split it into words (quotes, backslashes, $(...),
backticks, redirects), then checks each simple command. It cannot see what a
variable, alias, script file or program does at run time. The sandbox (run.sh)
is the real wall; this guard keeps work inside it.

Any error, or input it cannot read, gives a deny decision (fail closed).
"""
import codecs
import fnmatch
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

RUN_SH = "kinso-frontend/tools/sandbox/run.sh"
COLLECT_SH = "tools/collect/collect.sh"
SCAN_PY = "tools/scan/scan.py"

DELETE = {"rm", "unlink", "rmdir", "shred", "srm"}
RUNNER = re.compile(
    r"(?:i?python[0-9.]*(?:-config)?|pythonw|node|nodejs|npx|bun|bunx|deno|perl[0-9.]*|ruby|irb|"
    r"uv|uvx|pip[0-9.]*|pipx|npm|pnpm|pnpx|yarn|pytest|tsx|ts-node|php|osascript|poetry|conda)"
)
RUNNER_SAMPLES = {"python", "python3", "node", "npx", "perl", "ruby", "bun", "deno", "uv", "pip", "pip3", "npm"}
SHELLS = {"bash", "sh", "zsh", "dash", "ksh", "fish", "csh", "tcsh"}
NET = {"curl", "wget"}
SCRIPT_EXT = re.compile(r"\.(?:py|js|mjs|cjs|ts|rb|pl|php|sh|bash|zsh)$")
ASSIGN = re.compile(r"^([A-Za-z_][A-Za-z0-9_]*)\+?=(.*)$", re.S)
# Variables that change how the next program loads, or that lift a project limit.
RISKY_ENV = re.compile(
    r"^(?:BASH_ENV|ENV|PATH|DYLD_\w*|LD_\w*|NODE_OPTIONS|PYTHON(?:STARTUP|PATH|HOME)|PERL5OPT|"
    r"RUBYOPT|KINSO_COLLECT_CAP)$"
)
# Variables run.sh itself reads (run.sh:17-19, 21, 25, 49, 76). Allowed before run.sh.
RUNSH_ENV = {"NODE_PATH", "PLAYWRIGHT_BROWSERS_PATH", "CHROME_PATH", "KINSO_CHROME_REAL",
             "KINSO_SANDBOX_DENY", "KINSO_SANDBOX_READ", "PATH",
             "KINSO_ALLOWED_ROOTS", "KINSO_NO_NET", "KINSO_SKILL", "KINSO_STAGE"}
SAFE_PATH_PART = re.compile(r"^(?:\$PATH|\$\{PATH\}|/usr(?:/.*)?|/bin|/sbin|/opt/homebrew/bin|"
                            r"(?:\$HOME|\$\{HOME\}|/Users/[^/]+)/\.nvm/versions/node/v[0-9.]+/bin)$")
GUARDED_WRITES = (".claude", "tools/hooks", "kinso-frontend/tools/sandbox")
SHELL_TOOLS = {"Bash", "mcp__terminal__run_in_terminal"}
WRITE_TOOLS = {"Write", "Edit", "MultiEdit", "NotebookEdit"}

MSG_RM = "rm and other delete commands are blocked in this project. Move files to ~/.Trash with mv, or ask the user."
MSG_RUN = ("Scripts, package managers and runners must start the command with "
           "kinso-frontend/tools/sandbox/run.sh <run folder> <cmd>.")
MSG_NET = "curl and wget run only after run.sh or through tools/collect/collect.sh."
MSG_SHIP = "push, commit, merge, reset --hard, publish and deploy commands are blocked. Ask the user."


class ParseError(Exception):
    pass


class Word:
    def __init__(self):
        self.text, self.vars, self.glob, self.subst, self.brace = "", set(), False, False, False


class Segment:
    def __init__(self):
        self.words = []


def _read_paren(s, i):
    """s[i] is just after '$('. Return (body, index after the matching ')')."""
    depth, q, j = 1, None, i
    while j < len(s):
        c = s[j]
        if q:
            if c == "\\" and q == '"':
                j += 1
            elif c == q:
                q = None
        elif c in "'\"":
            q = c
        elif c == "\\":
            j += 1
        elif c == "(":
            depth += 1
        elif c == ")":
            depth -= 1
            if depth == 0:
                return s[i:j], j + 1
        j += 1
    raise ParseError("unclosed $(")


def _read_tick(s, i):
    j = i
    while j < len(s):
        if s[j] == "\\":
            j += 2
            continue
        if s[j] == "`":
            return s[i:j], j + 1
        j += 1
    raise ParseError("unclosed backtick")


def lex(s):
    """Split a command line into segments of words. Return (segments, substitutions)."""
    segs, subs = [Segment()], []
    cur, target = None, False
    i, n = 0, len(s)

    def word():
        nonlocal cur
        if cur is None:
            cur = Word()
        return cur

    def flush():
        nonlocal cur, target
        if cur is not None:
            if not target:
                segs[-1].words.append(cur)
            target = False
            cur = None

    def var_at(j, w):
        m = re.match(r"\$(?:\{([^}]*)\}|([A-Za-z_][A-Za-z0-9_]*|[0-9@*#?$!-]))", s[j:])
        if m:
            w.vars.add(m.group(1) or m.group(2))

    while i < n:
        c = s[i]
        if c in " \t\r":
            flush()
            i += 1
        elif c == "\\":
            if i + 1 < n and s[i + 1] == "\n":
                i += 2
                continue
            word().text += s[i + 1] if i + 1 < n else ""
            i += 2
        elif c == "'":
            j = s.find("'", i + 1)
            if j < 0:
                raise ParseError("unclosed quote")
            word().text += s[i + 1:j]
            i = j + 1
        elif c == "$" and s[i + 1:i + 2] == "'":
            j = i + 2
            while j < n and s[j] != "'":
                j += 2 if s[j] == "\\" else 1
            if j >= n:
                raise ParseError("unclosed $'")
            word().text += codecs.decode(s[i + 2:j].encode("latin-1", "backslashreplace"), "unicode_escape")
            i = j + 1
        elif c == '"' or (c == "$" and s[i + 1:i + 2] == '"'):
            w = word()
            i += 1 if c == '"' else 2
            while True:
                if i >= n:
                    raise ParseError("unclosed quote")
                d = s[i]
                if d == '"':
                    i += 1
                    break
                if d == "\\" and i + 1 < n:
                    w.text += s[i + 1] if s[i + 1] in '"\\$`\n' else "\\" + s[i + 1]
                    i += 2
                elif d == "$" and s[i + 1:i + 2] == "(":
                    body, i = _read_paren(s, i + 2)
                    subs.append(body)
                    w.text += "$(...)"
                    w.subst = True
                elif d == "`":
                    body, i = _read_tick(s, i + 1)
                    subs.append(body)
                    w.text += "$(...)"
                    w.subst = True
                else:
                    if d == "$":
                        var_at(i, w)
                    w.text += d
                    i += 1
        elif c == "$" and s[i + 1:i + 2] == "(":
            body, i = _read_paren(s, i + 2)
            subs.append(body)
            w = word()
            w.text += "$(...)"
            w.subst = True
        elif c == "`":
            body, i = _read_tick(s, i + 1)
            subs.append(body)
            w = word()
            w.text += "$(...)"
            w.subst = True
        elif c == "#" and cur is None:
            j = s.find("\n", i)
            i = n if j < 0 else j
        elif c in "<>" or (c == "&" and s[i + 1:i + 2] == ">"):
            if cur is not None and cur.text.isdigit() and not cur.vars:
                cur = None  # file descriptor number such as the 2 in 2>&1
            else:
                flush()
            j = i
            while j < n and s[j] in "<>&":
                j += 1
            if s[j:j + 1] == "|":
                j += 1
            if j < n and s[j] == "(":  # <( ) or >( ) process substitution: a new segment
                segs.append(Segment())
                i = j + 1
                continue
            op = s[i:j]
            if op.endswith("&"):
                m = re.match(r"[0-9]*-?", s[j:])
                j += m.end()
                target = not m.group(0)
            else:
                target = True
            i = j
        elif c in ";&|\n()":
            flush()
            segs.append(Segment())
            i += 1
        elif c == "$" and s[i + 1:i + 2] == "{":
            j = s.find("}", i)
            if j < 0:
                raise ParseError("unclosed ${")
            w = word()
            var_at(i, w)
            w.text += s[i:j + 1]
            i = j + 1
        else:
            w = word()
            if c in "*?[":
                w.glob = True
            if c == "{":
                w.brace = True
            if c == "$":
                var_at(i, w)
            w.text += c
            i += 1
    flush()
    return [g for g in segs if g.words], subs


def base(text):
    return os.path.basename(text.rstrip("/")) or text


def expand_home(w):
    """Return the word text with $HOME and ~ expanded, or None when it holds other variables."""
    if w.subst or (w.vars - {"HOME"}):
        return None
    t = w.text.replace("${HOME}", "$HOME").replace("$HOME", os.path.expanduser("~"))
    return os.path.expanduser(t)


def is_tool(w, rel, cwd, root):
    p = expand_home(w)
    if p is None:
        return False
    if not os.path.isabs(p) and cwd:
        p = os.path.join(cwd, p)
    p = os.path.normpath(p)
    if root:
        return os.path.isabs(p) and os.path.realpath(p) == os.path.realpath(os.path.join(root, rel))
    return p == rel or p.endswith("/" + rel)


def safe_path_value(v):
    return all(SAFE_PATH_PART.match(part) for part in v.split(":"))


def names_in(words):
    out = []
    for w in words:
        out.append(base(w.text))
    return out


LAUNCHERS = {"xargs", "env", "exec", "command", "nice", "nohup", "timeout", "time", "sudo", "doas",
             "caffeinate", "-exec", "-execdir", "-ok", "-okdir"}


def glob_hits(w, banned, prev=None):
    """True when a glob word such as /bin/r? could expand to a banned command.
    A word that is only wildcards in its last part (picks/*, *) is a file list, unless it
    follows a word that runs its argument as a command (xargs, env, find -exec ...)."""
    if not w.glob:
        return False
    b = base(w.text)
    if not re.sub(r"\[[^\]]*\]|[*?]", "", b) and (prev is None or base(prev.text) not in LAUNCHERS):
        return False
    return any(fnmatch.fnmatchcase(x, b) for x in banned)


def shell_c_arg(words, k):
    """words[k] is a shell. Return ('c', command) for -c, ('file', None) for a script or stdin."""
    j = k + 1
    while j < len(words):
        t = words[j].text
        if t in ("-o", "+o", "-O", "+O", "--rcfile", "--init-file"):
            j += 2
            continue
        if t == "--":
            j += 1
            break
        if t.startswith("-") and len(t) > 1 and not t.startswith("--"):
            if "c" in t[1:]:
                if j + 1 >= len(words):
                    raise ParseError("-c without a command")
                return "c", words[j + 1]
            j += 1
            continue
        if t.startswith("--"):
            j += 1
            continue
        break
    return "file", None


def git_sub(words, k):
    j = k + 1
    while j < len(words):
        t = words[j].text
        if t in ("-C", "-c", "--git-dir", "--work-tree", "--namespace", "--exec-path"):
            if t == "-c" and j + 1 < len(words) and words[j + 1].text.lower().startswith("alias."):
                return "alias"
            j += 2
            continue
        if t.startswith("-"):
            j += 1
            continue
        return t
    return ""


def check(cmd, cwd=None, root=None, sandboxed=False, depth=0):
    """Return a deny reason, or None to allow."""
    if depth > 6:
        return "Command nests too deep to check."
    try:
        segs, subs = lex(cmd)
    except ParseError as e:
        return "Could not read this command (%s). Write it more simply." % e
    for sub in subs:  # $( ) and backticks run in the outer shell, never inside the sandbox
        r = check(sub, cwd, root, False, depth + 1)
        if r:
            return r
    for seg in segs:
        r, cwd = check_segment(seg.words, cwd, root, sandboxed, depth)
        if r:
            return r
    return None


def check_segment(words, cwd, root, sandboxed, depth):
    k, assigns = 0, []
    while k < len(words):
        m = ASSIGN.match(words[k].text)
        if not m or words[k].glob:
            break
        assigns.append((m.group(1), m.group(2), words[k]))
        k += 1
    cmdw = words[k:]
    if not cmdw:
        if not sandboxed and any(RISKY_ENV.match(a[0]) for a in assigns):
            return "Setting %s is blocked in this project." % assigns[0][0], cwd
        return None, cwd
    names = names_in(cmdw)
    first = cmdw[0]

    if names[0] in ("cd", "pushd"):
        if len(cmdw) < 2:
            return None, os.path.expanduser("~")
        p = expand_home(cmdw[1])
        if p is None or (not os.path.isabs(p) and not cwd):
            return None, None  # unknown folder from here on
        return None, os.path.normpath(os.path.join(cwd or "/", p))

    if first.vars or first.subst:
        return "The command name comes from a variable or $( ). Write the command out.", cwd
    if first.glob:
        return "The command name uses a wildcard. Write the command out.", cwd
    if any(w.brace and re.search(r"\{[^}]*(?:,|\.\.)[^}]*\}", w.text) for w in words):
        return "Brace expansion such as {a,b} is blocked. Write each word out.", cwd
    if names[0] in ("source", ".", "sudo", "doas", "su"):
        return "%s is blocked in this project." % names[0], cwd

    # Rules that hold everywhere, also inside the sandbox.
    for i, (nm, w) in enumerate(zip(names, cmdw)):
        if nm in DELETE or glob_hits(w, DELETE, cmdw[i - 1] if i else None):
            return MSG_RM, cwd
        if nm == "find" and any(x.text == "-delete" for x in cmdw[i:]):
            return MSG_RM, cwd
        if nm == "git":
            sub = git_sub(cmdw, i)
            if sub in ("push", "commit", "merge", "clean", "alias") or (
                    sub == "reset" and any(x.text == "--hard" for x in cmdw[i:])):
                return MSG_RM if sub == "clean" else MSG_SHIP, cwd
        rest = [x.text for x in cmdw[i + 1:]]
        if nm == "gh" and rest[:2] == ["pr", "merge"]:
            return MSG_SHIP, cwd
        if nm in ("vercel", "netlify"):
            return MSG_SHIP, cwd
        if nm in ("fly", "flyctl") and "deploy" in rest:
            return MSG_SHIP, cwd
        if nm in ("terraform", "tofu") and ("apply" in rest or "destroy" in rest):
            return MSG_SHIP, cwd
        if nm in ("npm", "pnpm", "yarn", "bun") and "publish" in rest:
            return MSG_SHIP, cwd

    # Is this segment inside the sandbox?
    bash_runsh = names[0] in SHELLS and len(cmdw) > 1 and is_tool(cmdw[1], RUN_SH, cwd, root)
    runsh = bash_runsh or is_tool(first, RUN_SH, cwd, root)
    if runsh:
        for name, value, _ in assigns:
            if name not in RUNSH_ENV or (name == "PATH" and not safe_path_value(value)):
                return "Only %s may be set before run.sh. Put other variables after run.sh." % (
                    ", ".join(sorted(RUNSH_ENV))), cwd
    inside = sandboxed or runsh
    collect = not inside and is_tool(first, COLLECT_SH, cwd, root)
    scan = (not inside and names[0] in ("python3",) and first.text in ("python3", "/usr/bin/python3")
            and len(cmdw) > 2 and cmdw[1].text == "-I" and is_tool(cmdw[2], SCAN_PY, cwd, root)
            and not any(x.text.startswith("--save") for x in cmdw))

    if not inside:
        for a in assigns:
            if RISKY_ENV.match(a[0]):
                return "Setting %s is blocked in this project." % a[0], cwd
        for w in cmdw:
            m = ASSIGN.match(w.text)
            if m and RISKY_ENV.match(m.group(1)) and names[0] in ("export", "declare", "typeset", "env", "local"):
                return "Setting %s is blocked in this project." % m.group(1), cwd

    # Commands that carry another command as a string: check that string too.
    for i, (nm, w) in enumerate(zip(names, cmdw)):
        if nm == "eval":
            r = check(" ".join(x.text for x in cmdw[i + 1:]), cwd, root, inside, depth + 1)
            if r:
                return r, cwd
        if nm == "env":
            for j in range(i + 1, len(cmdw) - 1):
                if cmdw[j].text in ("-S", "--split-string"):
                    r = check(cmdw[j + 1].text, cwd, root, inside, depth + 1)
                    if r:
                        return r, cwd
        if nm == "watch" and i + 1 < len(cmdw):
            r = check(" ".join(x.text for x in cmdw[i + 1:]), cwd, root, inside, depth + 1)
            if r:
                return r, cwd
        if nm in SHELLS:
            if i == 0 and bash_runsh:
                continue
            kind, arg = shell_c_arg(cmdw, i)
            if kind == "c":
                r = check(arg.text, cwd, root, inside, depth + 1)
                if r:
                    return r, cwd
            elif not inside:
                return "%s with a script file or stdin must run through run.sh." % nm, cwd

    if inside or scan:
        return None, cwd

    for i, (nm, w) in enumerate(zip(names, cmdw)):
        if RUNNER.fullmatch(nm) or glob_hits(w, RUNNER_SAMPLES, cmdw[i - 1] if i else None):
            return MSG_RUN, cwd
    if SCRIPT_EXT.search(first.text) and not collect:
        return MSG_RUN, cwd
    if not collect:
        for i, (nm, w) in enumerate(zip(names, cmdw)):
            if nm in NET or glob_hits(w, NET, cmdw[i - 1] if i else None):
                return MSG_NET, cwd
    return None, cwd


def guarded_write(path, root):
    p = os.path.realpath(os.path.expanduser(path))
    home = os.path.realpath(os.path.expanduser("~"))
    if re.match(re.escape(os.path.join(home, ".claude")) + r"/settings[^/]*\.json$", p):
        return True
    for rel in GUARDED_WRITES:
        g = os.path.realpath(os.path.join(root, rel))
        if p == g or p.startswith(g + "/"):
            return True
    return False


def decide(data, root=ROOT):
    if not isinstance(data, dict):
        raise ValueError("hook input is not an object")
    tool = data.get("tool_name")
    ti = data.get("tool_input")
    if not isinstance(tool, str) or not isinstance(ti, dict):
        raise ValueError("hook input has no tool_name or tool_input")
    if tool in SHELL_TOOLS:
        cmd = ti.get("command", ti.get("cmd"))
        if not isinstance(cmd, str):
            raise ValueError("no command string")
        cwd = data.get("cwd") if isinstance(data.get("cwd"), str) else None
        return check(cmd, cwd=cwd, root=root)
    if tool in ("WebFetch", "WebSearch"):
        return "Web access goes only through tools/collect/collect.sh in this project."
    if tool in WRITE_TOOLS:
        path = ti.get("file_path", ti.get("notebook_path"))
        if not isinstance(path, str):
            raise ValueError("no file path")
        if guarded_write(path, root):
            return "The guard, the sandbox and settings files are read-only for agents. Ask the user."
        return None
    if tool == "Agent":
        if "-contributor" in str(ti.get("model", "")):
            return "-contributor models are not allowed (CONDUCTOR-PLAN.md:19)."
        return None
    return None


def deny(reason):
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse",
                                             "permissionDecision": "deny",
                                             "permissionDecisionReason": reason}}))


def main():
    try:
        reason = decide(json.loads(sys.stdin.read()))
    except Exception as e:  # fail closed
        reason = "guard error, so the call is blocked: %s: %s" % (type(e).__name__, e)
    if reason:
        deny(reason)


if __name__ == "__main__":
    main()
