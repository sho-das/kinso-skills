#!/usr/bin/env node
'use strict';
// Kinso installer. Plain Node, built-in modules only.

const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
const { spawnSync } = require('child_process');

const VERSION = '0.1.0';
const REPO_URL = 'https://github.com/sho-das/kinso-skills.git';
// Built from parts so the installer's own copy is never rewritten by the replacement step.
const PLACEHOLDER = '{{' + 'KINSO_ROOT' + '}}';
const TEXT_EXT = new Set(['.md', '.sh', '.py', '.mjs', '.js', '.json', '.ts', '.tsx', '.sb', '.txt']);
const MAX_TEXT_BYTES = 5 * 1024 * 1024;
const SKIP_DIRS = new Set(['.git', 'node_modules']);
const HOOK_MATCHER = 'Bash|mcp__terminal__run_in_terminal|Write|Edit|MultiEdit|NotebookEdit|WebFetch|WebSearch|Agent';

const HELP = `kinso ${VERSION} - installer for Kinso Skills

Usage:
  kinso install [--dir <path>] [--ref <tag or branch>] [--from <local folder>]
  kinso doctor [--dir <path>]
  kinso guard <project folder> [--dir <path>]
  kinso uninstall [--dir <path>]
  kinso --help
  kinso --version

Default install folder: ~/.kinso/kinso-skills
Nothing is ever deleted. Old files are moved to ~/.Trash.`;

// ---------- helpers ----------

function die(msg, code = 1) {
  console.error(msg);
  process.exit(code);
}

function home() {
  return os.homedir();
}

function defaultDir() {
  return path.join(home(), '.kinso', 'kinso-skills');
}

function isWSL() {
  if (process.platform !== 'linux') return false;
  try {
    return /microsoft/i.test(fs.readFileSync('/proc/version', 'utf8'));
  } catch {
    return false;
  }
}

function platformKind() {
  if (process.platform === 'win32') return 'windows';
  if (process.platform === 'darwin') return 'mac';
  return 'linux'; // includes WSL
}

function parseArgs(argv) {
  const opts = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dir' || a === '--ref' || a === '--from') {
      if (i + 1 >= argv.length) die(`${a} needs a value.`);
      opts[a.slice(2)] = argv[++i];
    } else if (a.startsWith('--') && a.includes('=')) {
      const k = a.slice(2, a.indexOf('='));
      opts[k] = a.slice(a.indexOf('=') + 1);
    } else if (a === '--help' || a === '-h') {
      opts.help = true;
    } else if (a === '--version' || a === '-v') {
      opts.version = true;
    } else if (a.startsWith('--')) {
      die(`Unknown option ${a}. Run kinso --help.`);
    } else {
      opts._.push(a);
    }
  }
  return opts;
}

function run(cmd, args, o = {}) {
  return spawnSync(cmd, args, { encoding: 'utf8', ...o });
}

function dateStamp() {
  return new Date().toISOString().slice(0, 10);
}

function timeStamp() {
  return new Date().toISOString().slice(11, 19).replace(/:/g, '');
}

// A new, empty Trash folder named <prefix>-<date> (adds the time if the name is taken).
function trashFolder(prefix) {
  const trash = path.join(home(), '.Trash');
  fs.mkdirSync(trash, { recursive: true });
  let dir = path.join(trash, `${prefix}-${dateStamp()}`);
  if (fs.existsSync(dir) && fs.readdirSync(dir).length > 0) {
    dir = path.join(trash, `${prefix}-${dateStamp()}-${timeStamp()}`);
  }
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

// Move a file or folder. Same disk uses rename; otherwise copy, then stop (never delete).
function moveTo(src, destDir, name) {
  let dest = path.join(destDir, name || path.basename(src));
  let n = 1;
  while (fs.existsSync(dest)) dest = path.join(destDir, `${name || path.basename(src)}.${n++}`);
  try {
    fs.renameSync(src, dest);
  } catch (e) {
    if (e.code === 'EXDEV') {
      die(`Cannot move ${src} to the Trash (different disk). Move it yourself, then run again.`);
    }
    throw e;
  }
  return dest;
}

function isKinsoInstall(dir) {
  return (
    fs.existsSync(path.join(dir, 'BRAIN-CORE.md')) &&
    fs.existsSync(path.join(dir, 'commands', 'kinso.md')) &&
    fs.existsSync(path.join(dir, 'user-skill', 'kinso', 'SKILL.md'))
  );
}

function walk(dir, fn) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      walk(p, fn);
    } else if (ent.isFile()) {
      fn(p);
    }
  }
}

function copyTree(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue;
    const s = path.join(src, ent.name);
    const d = path.join(dest, ent.name);
    if (ent.isDirectory()) copyTree(s, d);
    else if (ent.isSymbolicLink()) {
      try { fs.symlinkSync(fs.readlinkSync(s), d); } catch { /* skip */ }
    } else if (ent.isFile()) fs.copyFileSync(s, d);
  }
}

function replacePlaceholder(root) {
  let changed = 0;
  walk(root, (file) => {
    if (!TEXT_EXT.has(path.extname(file).toLowerCase())) return;
    let st;
    try { st = fs.statSync(file); } catch { return; }
    if (st.size > MAX_TEXT_BYTES) return;
    const text = fs.readFileSync(file, 'utf8');
    if (!text.includes(PLACEHOLDER)) return;
    fs.writeFileSync(file, text.split(PLACEHOLDER).join(root));
    changed++;
  });
  return changed;
}

function countPlaceholder(root) {
  let count = 0;
  walk(root, (file) => {
    if (!TEXT_EXT.has(path.extname(file).toLowerCase())) return;
    let st;
    try { st = fs.statSync(file); } catch { return; }
    if (st.size > MAX_TEXT_BYTES) return;
    if (fs.readFileSync(file, 'utf8').includes(PLACEHOLDER)) count++;
  });
  return count;
}

// Copy one file to dest. If a different file is already there, move it to the backup folder first.
function placeFile(src, dest, backup) {
  if (fs.existsSync(dest)) {
    const same = fs.readFileSync(src).equals(fs.readFileSync(dest));
    if (same) return 'same';
    if (!backup.dir) backup.dir = trashFolder('kinso-backup');
    const rel = dest.startsWith(home()) ? path.relative(home(), dest) : path.basename(dest);
    const target = path.join(backup.dir, rel);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.renameSync(dest, target);
    backup.moved.push(dest);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    return 'replaced';
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  return 'new';
}

function placeTree(srcDir, destDir, backup, counts) {
  for (const ent of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const s = path.join(srcDir, ent.name);
    const d = path.join(destDir, ent.name);
    if (ent.isDirectory()) placeTree(s, d, backup, counts);
    else if (ent.isFile()) counts[placeFile(s, d, backup)]++;
  }
}

function ask(question) {
  process.stdout.write(question + ' ');
  return new Promise((resolve) => {
    let buf = '';
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      process.stdin.pause();
      resolve(buf.split('\n')[0].trim());
    };
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (d) => {
      buf += d;
      if (buf.includes('\n')) finish();
    });
    process.stdin.on('end', finish);
    process.stdin.on('error', finish);
    process.stdin.resume();
  });
}

function refuseWindows() {
  die(
    `Kinso does not run on plain Windows. Use WSL2 (Linux inside Windows):
  1. Open PowerShell as administrator and run:  wsl --install
  2. Restart the computer.
  3. Open the Ubuntu app, then run inside WSL:  npx kinso install`
  );
}

// ---------- install ----------

function cmdInstall(opts) {
  const kind = platformKind();
  if (kind === 'windows') refuseWindows();

  const dir = path.resolve(opts.dir || defaultDir());
  const ref = opts.ref || 'main';

  if (fs.existsSync(dir)) {
    const isDir = fs.statSync(dir).isDirectory();
    if (!isDir || (fs.readdirSync(dir).length > 0 && !isKinsoInstall(dir))) {
      die(`Refusing to install: ${dir} exists and is not a Kinso install. Pick another folder with --dir.`);
    }
    if (isKinsoInstall(dir)) {
      die(`Kinso is already installed at ${dir}. Run kinso uninstall first, or pick another folder with --dir.`);
    }
  }

  fs.mkdirSync(path.dirname(dir), { recursive: true });

  if (opts.from) {
    const from = path.resolve(opts.from);
    if (!fs.existsSync(from) || !isKinsoInstall(from)) die(`--from ${from} is not a Kinso Skills folder.`);
    if (dir === from || dir.startsWith(from + path.sep)) die('--dir must not be inside --from.');
    console.log(`Copying ${from} to ${dir} ...`);
    copyTree(from, dir);
  } else {
    if (run('git', ['--version']).status !== 0) die('git is missing. Install git, then run again.');
    console.log(`Cloning ${REPO_URL} (${ref}) to ${dir} ...`);
    const r = run('git', ['clone', '--depth', '1', '--branch', ref, REPO_URL, dir], { stdio: 'inherit' });
    if (r.status !== 0) die('git clone failed.');
  }

  const changed = replacePlaceholder(dir);
  console.log(`Set the install path in ${changed} file(s).`);

  // Commands and skill go to ~/.claude
  const backup = { dir: null, moved: [] };
  const counts = { new: 0, replaced: 0, same: 0 };
  const cmdSrc = path.join(dir, 'commands');
  const cmdDest = path.join(home(), '.claude', 'commands');
  const cmdFiles = fs.readdirSync(cmdSrc).filter((f) => /^kinso.*\.md$/.test(f));
  for (const f of cmdFiles) counts[placeFile(path.join(cmdSrc, f), path.join(cmdDest, f), backup)]++;
  placeTree(path.join(dir, 'user-skill', 'kinso'), path.join(home(), '.claude', 'skills', 'kinso'), backup, counts);

  console.log(`Copied ${cmdFiles.length} commands to ${cmdDest}`);
  console.log(`Copied the skill to ${path.join(home(), '.claude', 'skills', 'kinso')}`);
  if (backup.moved.length) {
    console.log(`Moved ${backup.moved.length} different old file(s) to ${backup.dir}:`);
    for (const m of backup.moved) console.log(`  ${m}`);
  }

  if (kind === 'linux') {
    console.log(
      `\nNote: the script sandbox is not ready on Linux yet. Kinso runs in limited mode${isWSL() ? ' (WSL detected)' : ''}.`
    );
  }

  console.log(`
Done. Next steps:
  1. Restart Claude Code so it sees the new commands and skill.
  2. Run  npx kinso doctor  to check your tools.
  3. Add the safety hook to a project:  npx kinso guard <project folder>
  4. In Claude Code, type  /kinso  and describe what you want made.`);
}

// ---------- doctor ----------

function versionOf(cmd, args) {
  const r = run(cmd, args);
  if (r.error || r.status !== 0) return null;
  return (r.stdout || r.stderr || '').trim();
}

function findPlaywright() {
  const base = path.join(home(), '.npm', '_npx');
  try {
    for (const d of fs.readdirSync(base)) {
      if (fs.existsSync(path.join(base, d, 'node_modules', 'playwright'))) return path.join(base, d);
    }
  } catch { /* none */ }
  return null;
}

function httpReachable(url, ms) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => { res.resume(); resolve(true); });
    req.setTimeout(ms, () => { req.destroy(); resolve(false); });
    req.on('error', () => resolve(false));
  });
}

async function cmdDoctor(opts) {
  const kind = platformKind();
  const dir = path.resolve(opts.dir || defaultDir());
  let bad = 0;
  const line = (ok, name, detail, optional) => {
    console.log(`${ok ? 'ok' : 'missing'}${!ok && optional ? ' (optional)' : ''} - ${name}${detail ? ': ' + detail : ''}`);
    if (!ok && !optional) bad++;
  };

  const git = versionOf('git', ['--version']);
  line(!!git, 'git', git);

  const major = parseInt(process.versions.node.split('.')[0], 10);
  line(major >= 20, 'node 20+', `v${process.versions.node}`);

  // The tools' venvs need 3.12 or 3.13; a newer default python3 is fine if one of those is also present.
  const pyFound = ['python3', 'python3.13', 'python3.12']
    .map((cmd) => ({ cmd, v: versionOf(cmd, ['--version']) }))
    .filter((p) => p.v);
  const pyGood = pyFound.find((p) => /\b3\.1[23]\./.test(p.v));
  line(!!pyGood, 'python 3.12 or 3.13', pyGood ? `${pyGood.cmd}: ${pyGood.v}` : (pyFound[0] ? pyFound[0].v : 'not found'));

  if (kind === 'mac') {
    const ok = fs.existsSync('/usr/bin/sandbox-exec');
    line(ok, 'sandbox-exec', ok ? '/usr/bin/sandbox-exec' : null);
  } else {
    console.log('skipped - sandbox-exec: macOS only; Linux runs in limited mode');
  }

  const cc = versionOf('claude', ['--version']);
  line(!!cc, 'Claude Code', cc);

  const ff = versionOf('ffmpeg', ['-version']);
  line(!!ff, 'ffmpeg', ff && ff.split('\n')[0]);

  const installed = fs.existsSync(dir) && isKinsoInstall(dir);
  line(installed, 'install folder', dir);

  if (installed) {
    const left = countPlaceholder(dir);
    line(left === 0, `${PLACEHOLDER} left in files (should be 0)`, String(left));
  } else {
    line(false, `${PLACEHOLDER} left in files (should be 0)`, 'no install to check');
  }

  const venv = path.join(dir, 'tools', 'collect', 'venv-searxng');
  line(fs.existsSync(venv), 'SearXNG venv', venv, true);
  const up = await httpReachable('http://127.0.0.1:8888/', 1500);
  line(up, 'SearXNG at http://127.0.0.1:8888', null, true);

  const pw = findPlaywright();
  line(!!pw, 'Playwright in ~/.npm/_npx', pw, true);

  console.log(bad === 0 ? '\nAll required checks passed.' : `\n${bad} required check(s) missing.`);
  process.exitCode = bad === 0 ? 0 : 1;
}

// ---------- guard ----------

async function cmdGuard(opts) {
  const project = opts._[1];
  if (!project) die('Usage: kinso guard <project folder>');
  const proj = path.resolve(project);
  if (!fs.existsSync(proj) || !fs.statSync(proj).isDirectory()) die(`${proj} is not a folder.`);
  const dir = path.resolve(opts.dir || defaultDir());
  const guardPy = path.join(dir, 'tools', 'hooks', 'guard.py');
  if (!fs.existsSync(guardPy)) die(`Cannot find ${guardPy}. Run kinso install first.`);

  const settingsPath = path.join(proj, '.claude', 'settings.local.json');
  const answer = await ask(`Add the Kinso safety hook to ${proj}/.claude/settings.local.json? [y/N]`);
  if (!/^y(es)?$/i.test(answer)) {
    console.log('Nothing changed.');
    return;
  }

  let settings = {};
  if (fs.existsSync(settingsPath)) {
    const raw = fs.readFileSync(settingsPath, 'utf8');
    try {
      settings = raw.trim() ? JSON.parse(raw) : {};
    } catch (e) {
      die(`${settingsPath} is not valid JSON (${e.message}). Fix it, then run again.`);
    }
    if (typeof settings !== 'object' || settings === null || Array.isArray(settings)) {
      die(`${settingsPath} must hold a JSON object.`);
    }
    const bdir = trashFolder('kinso-backup');
    const bpath = path.join(bdir, 'settings.local.json');
    fs.copyFileSync(settingsPath, bpath);
    console.log(`Backed up the old file to ${bpath}`);
  }

  const command = `python3 -I "${guardPy}"`;
  if (typeof settings.hooks !== 'object' || settings.hooks === null || Array.isArray(settings.hooks)) settings.hooks = {};
  if (!Array.isArray(settings.hooks.PreToolUse)) settings.hooks.PreToolUse = [];

  const exists = settings.hooks.PreToolUse.some(
    (e) => e && Array.isArray(e.hooks) && e.hooks.some((h) => h && h.command === command)
  );
  if (exists) {
    console.log('The Kinso safety hook is already there. Nothing to add.');
    return;
  }
  settings.hooks.PreToolUse.push({ matcher: HOOK_MATCHER, hooks: [{ type: 'command', command }] });

  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n');
  console.log(`Added the Kinso safety hook to ${settingsPath}`);
}

// ---------- uninstall ----------

function cmdUninstall(opts) {
  const dir = path.resolve(opts.dir || defaultDir());
  const items = [];
  if (fs.existsSync(dir)) {
    if (!isKinsoInstall(dir)) die(`${dir} is not a Kinso install. Not touching it.`);
    items.push(dir);
  }
  const skill = path.join(home(), '.claude', 'skills', 'kinso');
  if (fs.existsSync(skill)) items.push(skill);
  const cmdDir = path.join(home(), '.claude', 'commands');
  if (fs.existsSync(cmdDir)) {
    for (const f of fs.readdirSync(cmdDir)) {
      if (/^kinso.*\.md$/.test(f)) items.push(path.join(cmdDir, f));
    }
  }
  if (items.length === 0) {
    console.log('Nothing to uninstall.');
    return;
  }
  const bdir = trashFolder('kinso-uninstall');
  for (const it of items) {
    const dest = moveTo(it, bdir, it === dir ? 'kinso-skills' : undefined);
    console.log(`Moved ${it} -> ${dest}`);
  }
  console.log(`\nNothing was deleted. Everything is in ${bdir}`);
  console.log('Project hooks added by kinso guard stay in .claude/settings.local.json. Remove them by hand if you want.');
}

// ---------- main ----------

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const cmd = opts._[0];
  if (opts.version) return console.log(VERSION);
  if (opts.help || !cmd || cmd === 'help') return console.log(HELP);
  switch (cmd) {
    case 'install': return cmdInstall(opts);
    case 'doctor': return cmdDoctor(opts);
    case 'guard': return cmdGuard(opts);
    case 'uninstall': return cmdUninstall(opts);
    default:
      console.error(`Unknown command: ${cmd}\n`);
      console.error(HELP);
      process.exit(1);
  }
}

main().catch((e) => die(`kinso: ${e.message}`));
