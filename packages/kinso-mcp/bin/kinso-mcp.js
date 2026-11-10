#!/usr/bin/env node
'use strict';
// kinso-mcp: a small local MCP server (JSON-RPC 2.0, one JSON message per line on stdin/stdout).
// Built-in Node modules only. Logs go to stderr, never stdout.

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const readline = require('node:readline');

const NAME = 'kinso-mcp';
const VERSION = '0.1.0';
const SKILLS = ['validate', 'business', 'build', 'frontend', 'qa', 'promote'];

function log(...a) {
  process.stderr.write(`[${NAME}] ${a.join(' ')}\n`);
}

function getRoot() {
  return path.resolve(process.env.KINSO_ROOT || path.join(os.homedir(), '.kinso', 'kinso-skills'));
}

function rootError(root) {
  return `Kinso is not installed at ${root}. Run \`npx kinso-skills install\`, or set KINSO_ROOT to your Kinso Skills folder.`;
}

function rootOk(root) {
  try {
    return fs.statSync(root).isDirectory();
  } catch {
    return false;
  }
}

function readText(p) {
  return fs.readFileSync(p, 'utf8');
}

// ---------- routing ----------

const STOP = new Set(('a an the and or of to for in on at by with from into about me my our your you i we it is are be ' +
  'this that these those can could would should will make build create want need please some any new get use using ' +
  'do does how what which who as up out so just like also them their then than').split(' '));

function stem(w) {
  if (w.length > 3 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

function tokens(text) {
  const out = [];
  for (const raw of String(text).toLowerCase().split(/[^a-z0-9]+/)) {
    if (!raw || raw.length < 2 || STOP.has(raw)) continue;
    out.push(stem(raw));
  }
  return out;
}

// Related words, so "landing page" also finds skills that say "website" or "frontend".
const RELATED = {
  landing: ['website', 'frontend', 'design', 'interface'],
  page: ['website', 'frontend'],
  homepage: ['website', 'frontend', 'design'],
  site: ['website', 'frontend'],
  web: ['website', 'frontend'],
  website: ['frontend', 'design'],
  app: ['frontend', 'interface', 'screen'],
  screen: ['frontend', 'interface', 'design'],
  ui: ['frontend', 'interface', 'design'],
  logo: ['brand', 'identity', 'mark'],
  brand: ['identity', 'logo'],
  pricing: ['price', 'business'],
};

function parseRows(markdown) {
  const rows = [];
  let section = 'kinso';
  for (const line of markdown.split('\n')) {
    if (/^#+\s/.test(line)) {
      section = /outside kinso/i.test(line) ? 'user' : 'kinso';
      continue;
    }
    if (!line.startsWith('|')) continue;
    const cells = line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
    if (cells.length < 4) continue;
    if (/^-+$/.test(cells[0]) || /^(Kinso skill|Where)$/i.test(cells[0])) continue;
    rows.push({
      section,
      kinso: cells[0],
      skill: cells[1],
      stages: cells[2],
      good: cells.slice(3).join('|'),
    });
  }
  return rows;
}

function skillPath(root, row) {
  if (row.section === 'user') return path.join(os.homedir(), '.claude', 'skills', row.skill, 'SKILL.md');
  return path.join(root, `kinso-${row.kinso}`, 'skills', row.skill, 'SKILL.md');
}

function nameKey(name) {
  return tokens(name).map((t) => (t.length > 5 && t.endsWith('er') ? t.slice(0, -2) : t));
}

function nearIdentical(a, b) {
  const ka = nameKey(a), kb = nameKey(b);
  const sa = new Set(ka), sb = new Set(kb);
  let inter = 0;
  for (const t of sa) if (sb.has(t)) inter++;
  const jac = inter / (sa.size + sb.size - inter || 1);
  return jac >= 0.5 || a.startsWith(b) || b.startsWith(a);
}

function toolRoute(args) {
  const root = getRoot();
  const indexPath = path.join(root, 'SKILL-INDEX.md');
  if (!rootOk(root) || !fs.existsSync(indexPath)) return fail(rootError(root));
  const request = args && typeof args.request === 'string' ? args.request.trim() : '';
  if (!request) return fail('`request` is required: a short plain description of what you want made.');
  let count = args.count === undefined ? 3 : Number(args.count);
  if (!Number.isFinite(count)) count = 3;
  count = Math.max(1, Math.min(5, Math.floor(count)));

  const rows = parseRows(readText(indexPath));
  const req = [...new Set(tokens(request))];
  const scored = rows.map((row) => {
    const nameT = new Set(tokens(row.skill));
    const goodT = new Set(tokens(row.good));
    let score = 0;
    const hits = [];
    for (const t of req) {
      if (nameT.has(t)) { score += 3; hits.push(t); }
      else if (goodT.has(t)) { score += 1; hits.push(t); }
    }
    const seen = new Set(req);
    for (const t of req) {
      for (const rel of (RELATED[t] || []).map(stem)) {
        if (seen.has(rel)) continue;
        seen.add(rel);
        if (nameT.has(rel)) { score += 1; hits.push(rel); }
        else if (goodT.has(rel)) { score += 0.7; hits.push(rel); }
      }
    }
    if (score > 0 && row.stages !== '-') score += 0.5 + 0.15 * Math.min(row.stages.split(/\s+/).length, 10);
    return { row, score, hits };
  }).filter((s) => s.score > 0).sort((a, b) => b.score - a.score || a.row.skill.localeCompare(b.row.skill));

  const picks = [];
  for (const s of scored) {
    if (picks.length >= count) break;
    if (picks.some((p) => p.row.kinso === s.row.kinso && nearIdentical(p.row.skill, s.row.skill))) continue;
    picks.push(s);
  }
  if (!picks.length) {
    return ok(`No skill matched "${request}". Try other words, or read the full list in ${indexPath}.`);
  }
  const lines = [`Top ${picks.length} skills for: ${request}`, ''];
  picks.forEach((p, i) => {
    const r = p.row;
    lines.push(
      `${i + 1}. ${r.skill}`,
      `   Kinso skill: ${r.section === 'user' ? 'none (user skill)' : r.kinso}`,
      `   Stages: ${r.stages}`,
      `   Path: ${skillPath(root, r)}`,
      `   Why: matches ${p.hits.join(', ')}. ${r.good.split(/(?<=\.)\s/)[0]}`,
      '',
    );
  });
  return ok(lines.join('\n').trimEnd());
}

// ---------- stage ----------

function safePart(v) {
  return typeof v === 'string' && v.length > 0 && !v.includes('/') && !v.includes('\\') && !v.includes('..') && /^[A-Za-z0-9_-]+$/.test(v);
}

function toolStage(args) {
  const root = getRoot();
  if (!rootOk(root)) return fail(rootError(root));
  const skill = args && args.skill;
  const stage = args && args.stage;
  if (!safePart(skill) || !safePart(stage)) return fail('`skill` and `stage` must be plain names with no "/" or "..".');
  if (!SKILLS.includes(skill)) return fail(`Unknown skill "${skill}". Use one of: ${SKILLS.join(', ')}.`);
  const dir = path.join(root, `kinso-${skill}`, 'references');
  let files;
  try {
    files = fs.readdirSync(dir).sort();
  } catch {
    return fail(`No references folder at ${dir}.`);
  }
  const hit = files.find((f) => f.startsWith(`${stage}-`) && f.endsWith('.md'));
  if (!hit) return fail(`No stage file "${stage}-*.md" in ${dir}. Available: ${files.filter((f) => f.endsWith('.md')).join(', ')}`);
  const p = path.join(dir, hit);
  return ok(`Path: ${p}\n\n${readText(p)}`);
}

// ---------- status ----------

function toolStatus(args) {
  const project = args && args.project;
  if (typeof project !== 'string' || !path.isAbsolute(project)) return fail('`project` must be an absolute path.');
  const kdir = path.join(project, 'kinso');
  const job = path.join(kdir, 'JOB.md');
  if (!fs.existsSync(job)) return ok('No Kinso job in this project yet.');
  let out = `Path: ${job}\n\n${readText(job)}\n\nFiles in ${path.join(kdir, 'picks')}:\n`;
  try {
    const files = fs.readdirSync(path.join(kdir, 'picks')).sort();
    out += files.length ? files.map((f) => `- ${f}`).join('\n') : '(none)';
  } catch {
    out += '(no picks folder yet)';
  }
  return ok(out);
}

// ---------- tools table ----------

const TOOLS = [
  {
    name: 'kinso_route',
    description: 'Pick the best Kinso skills for a plain-English request, for example "make me a logo". Returns up to 5 skills with the Kinso skill, stages, SKILL.md path and a one-line reason.',
    inputSchema: {
      type: 'object',
      properties: {
        request: { type: 'string', description: 'What the user wants made or decided.' },
        count: { type: 'number', description: 'How many picks to return. Default 3, maximum 5.', minimum: 1, maximum: 5 },
      },
      required: ['request'],
    },
    run: toolRoute,
  },
  {
    name: 'kinso_stage',
    description: 'Return the instructions for one stage of a Kinso skill, read from kinso-<skill>/references/<stage>-*.md.',
    inputSchema: {
      type: 'object',
      properties: {
        skill: { type: 'string', enum: SKILLS, description: 'The Kinso skill.' },
        stage: { type: 'string', description: 'Stage number such as "03".' },
      },
      required: ['skill', 'stage'],
    },
    run: toolStage,
  },
  {
    name: 'kinso_status',
    description: 'Show the state of a Kinso job in a project: the contents of kinso/JOB.md and the files in kinso/picks/.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Absolute path of the project folder.' },
      },
      required: ['project'],
    },
    run: toolStatus,
  },
];

function ok(text) { return { content: [{ type: 'text', text }] }; }
function fail(text) { return { content: [{ type: 'text', text }], isError: true }; }

// ---------- resources ----------

function listResources() {
  const root = getRoot();
  if (!rootOk(root)) return [];
  const rels = [];
  for (const f of ['BRAIN-CORE.md', 'SKILL-INDEX.md']) if (fs.existsSync(path.join(root, f))) rels.push(f);
  let entries = [];
  try { entries = fs.readdirSync(root).sort(); } catch { /* ignore */ }
  for (const e of entries) {
    if (e.startsWith('kinso-') && fs.existsSync(path.join(root, e, 'SKILL.md'))) rels.push(`${e}/SKILL.md`);
  }
  return rels.map((rel) => ({
    uri: `kinso://${rel}`,
    name: rel,
    mimeType: 'text/markdown',
    description: `Kinso file ${rel}`,
  }));
}

function readResource(uri) {
  const root = getRoot();
  if (!rootOk(root)) throw rpcError(-32002, rootError(root));
  if (typeof uri !== 'string' || !uri.startsWith('kinso://')) throw rpcError(-32602, 'Unknown resource uri.');
  const rel = decodeURIComponent(uri.slice('kinso://'.length));
  const full = path.resolve(root, rel);
  let realRoot, real;
  try {
    realRoot = fs.realpathSync(root);
    real = fs.realpathSync(full);
  } catch {
    throw rpcError(-32002, `Resource not found: ${uri}`);
  }
  if (real !== realRoot && !real.startsWith(realRoot + path.sep)) throw rpcError(-32602, 'Resource is outside the Kinso root.');
  if (!fs.statSync(real).isFile()) throw rpcError(-32002, `Not a file: ${uri}`);
  return { contents: [{ uri, mimeType: 'text/markdown', text: readText(real) }] };
}

// ---------- JSON-RPC ----------

function rpcError(code, message) {
  const e = new Error(message);
  e.rpcCode = code;
  return e;
}

function handle(method, params) {
  switch (method) {
    case 'initialize':
      return {
        protocolVersion: (params && params.protocolVersion) || '2024-11-05',
        serverInfo: { name: NAME, version: VERSION },
        capabilities: { tools: {}, resources: {} },
      };
    case 'ping':
      return {};
    case 'tools/list':
      return { tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) };
    case 'tools/call': {
      const tool = TOOLS.find((t) => t.name === (params && params.name));
      if (!tool) throw rpcError(-32602, `Unknown tool: ${params && params.name}`);
      try {
        return tool.run((params && params.arguments) || {});
      } catch (err) {
        log('tool error', err && err.stack || err);
        return fail(`Tool failed: ${err && err.message}`);
      }
    }
    case 'resources/list':
      return { resources: listResources() };
    case 'resources/read':
      return readResource(params && params.uri);
    default:
      throw rpcError(-32601, `Method not found: ${method}`);
  }
}

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + '\n');
}

function onLine(line) {
  line = line.trim();
  if (!line) return;
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } });
    return;
  }
  if (!msg || typeof msg !== 'object' || typeof msg.method !== 'string') return; // responses or junk: ignore
  const isNotification = msg.id === undefined || msg.id === null;
  try {
    const result = handle(msg.method, msg.params);
    if (!isNotification) send({ jsonrpc: '2.0', id: msg.id, result });
  } catch (err) {
    if (isNotification) {
      if (!msg.method.startsWith('notifications/')) log('error on notification', msg.method, err.message);
      return;
    }
    send({ jsonrpc: '2.0', id: msg.id, error: { code: err.rpcCode || -32603, message: err.message } });
  }
}

const rl = readline.createInterface({ input: process.stdin, terminal: false });
rl.on('line', onLine);
rl.on('close', () => process.exit(0));
log(`ready, root ${getRoot()}`);
