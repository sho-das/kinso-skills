#!/usr/bin/env node
// kinso-frontend / inspect-overrides - read taste-skill inspect.mjs report.json together with the
// job's OVERRIDES.md, and print one result where an overridden check shows as OVERRIDE with its
// reason, not as a silent FAIL and not hidden (inspect.mjs --allow hides a rule with no trace).
//
//   node tools/inspect-overrides.mjs <report.json> <OVERRIDES.md>
//
// OVERRIDES.md rows that name an inspect check (RULES.md "Client override"):
//   | Date | Stage | Check | Rule or check said | Client chose | Why | Risk | Signed off |
//   Check:      inspect:<rule id>  or  inspect:<rule id>@<width>  (no width = every width)
//   Signed off: who and when, for example "user 2026-10-28". "pending" (or empty) = waiting for the user.
//
// Writes overrides.json next to report.json. Exit 0 = no FAIL and no pending override.
// Exit 1 = a FAIL with no override. Exit 3 = no open FAIL, but an override waits for sign-off.
// Never edits report.json or anything under skills/.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const [reportPath, overridesPath] = process.argv.slice(2);
if (!reportPath || !overridesPath) { console.error('usage: node tools/inspect-overrides.mjs <report.json> <OVERRIDES.md>'); process.exit(2); }

const report = JSON.parse(readFileSync(reportPath, 'utf8'));
const rows = [];
if (existsSync(overridesPath)) {
  const lines = readFileSync(overridesPath, 'utf8').split('\n').filter((l) => l.trim().startsWith('|'));
  const head = (lines[0] || '').split('|').slice(1, -1).map((c) => c.trim().toLowerCase());
  const col = (name) => head.findIndex((h) => h.startsWith(name));
  const iCheck = col('check'), iWhy = col('why'), iSigned = col('signed'), iChose = col('client chose'), iRisk = col('risk');
  for (const l of lines.slice(2)) {
    const c = l.split('|').slice(1, -1).map((x) => x.trim());
    const m = /inspect:([a-z-]+)(?:@(\d+))?/.exec(c[iCheck] || '');
    if (!m) continue;
    const signed = (c[iSigned] || '').replace(/`/g, '').trim();
    rows.push({ id: m[1], width: m[2] ? Number(m[2]) : null, why: c[iWhy] || '', chose: c[iChose] || '', risk: c[iRisk] || '',
      signed: signed && !/^pending/i.test(signed) ? signed : null });
  }
}

const widthsOf = (f) => [f.width, ...(f.alsoAt || [])];
const findings = report.findings.map((f) => {
  const o = rows.find((r) => r.id === f.id && (r.width === null || widthsOf(f).includes(r.width)));
  if (!o || f.level !== 'FAIL' && f.level !== 'WARN') return { ...f, status: f.level };
  return { ...f, status: 'OVERRIDE', was: f.level, override: o };
});

// PASS = site rule ids with no finding at any width. App-only rules (judgeApp) are left out.
const here = dirname(fileURLToPath(import.meta.url));
const rulesSrc = readFileSync(resolve(here, '../skills/taste-skill/scripts/lib/rules.mjs'), 'utf8');
const ruleIds = JSON.parse(/export const RULE_IDS = (\[[^\]]*\])/.exec(rulesSrc)[1].replace(/'/g, '"'));
const cut = rulesSrc.indexOf('export function judgeApp');
const idsIn = (s) => new Set([...s.matchAll(/add\('(?:FAIL|WARN)', '([a-z-]+)'/g)].map((x) => x[1]));
const sitePart = idsIn(rulesSrc.slice(0, cut));
const appOnly = new Set([...idsIn(rulesSrc.slice(cut))].filter((id) => !sitePart.has(id)));
const siteIds = ruleIds.filter((id) => !appOnly.has(id));
const hit = new Set(findings.map((f) => f.id));
const pass = siteIds.filter((id) => !hit.has(id));

const fails = findings.filter((f) => f.status === 'FAIL'), warns = findings.filter((f) => f.status === 'WARN');
const overs = findings.filter((f) => f.status === 'OVERRIDE'), pending = overs.filter((f) => !f.override.signed);
const at = (f) => `@${f.width}px${f.alsoAt ? ' (+' + f.alsoAt.join(', ') + ')' : ''}`;
console.log(`KINSO · INSPECT WITH OVERRIDES   ${report.url}`);
for (const f of fails) console.log(`  FAIL     [${f.id}] ${at(f)}  ${f.message}`);
for (const f of warns) console.log(`  WARN     [${f.id}] ${at(f)}  ${f.message}`);
for (const f of overs) console.log(`  OVERRIDE [${f.id}] ${at(f)}  was ${f.was}. Reason: ${f.override.why}. ${f.override.signed ? 'Signed off: ' + f.override.signed : 'NOT SIGNED - blocked on the user'}.`);
const result = { report: reportPath, overrides: overridesPath, pass: pass.length, siteRules: siteIds.length, fail: fails.length, warn: warns.length, override: overs.length, pendingSignOff: pending.length,
  findings: findings.map(({ id, level, status, width, alsoAt, override }) => ({ id, level, status, width, alsoAt, reason: override?.why, signed: override ? override.signed : undefined })) };
writeFileSync(join(dirname(reportPath), 'overrides.json'), JSON.stringify(result, null, 1));
console.log(`RESULT: ${pass.length} PASS (site rules with no finding, of ${siteIds.length}), ${warns.length} WARN, ${fails.length} FAIL, ${overs.length} OVERRIDE (${pending.length} waiting for sign-off).`);
process.exit(fails.length ? 1 : pending.length ? 3 : 0);
