import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const { chromium } = createRequire(path.join(process.env.NODE_PATH || '.', 'x.js'))('playwright');

const [url, outDir, label, locale = 'en-GB', limitSec = '60'] = process.argv.slice(2);
if (!url || !outDir || !label) { console.error('usage: capture.mjs <url> <outDir> <label> [locale] [limitSeconds]'); process.exit(2); }
const hardLimit = setTimeout(() => { fs.writeFileSync(path.join(outDir, `${label}-measure.json`), JSON.stringify({ url, label, locale, error: `time limit ${limitSec}s reached` }, null, 2)); console.log(JSON.stringify({ label, ok: false, error: 'time limit' })); process.exit(3); }, Number(limitSec) * 1000);
fs.mkdirSync(outDir, { recursive: true });

const measure = () => {
  const innerWidth = Math.min(window.innerWidth, screen.width);
  const px = v => Math.round(parseFloat(v) || 0);
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const pick = sel => [...document.querySelectorAll(sel)].filter(vis);
  const style = el => { if (!el) return null; const s = getComputedStyle(el); return { font: s.fontFamily.split(',')[0].replace(/["']/g, '').trim(), size: px(s.fontSize), weight: s.fontWeight, lineHeight: s.lineHeight, color: s.color, letterSpacing: s.letterSpacing, text: (el.innerText || '').trim().slice(0, 120) }; };
  const colours = {};
  for (const el of pick('body *')) {
    const s = getComputedStyle(el); const r = el.getBoundingClientRect(); const area = r.width * r.height;
    if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)' && area > 20000) colours[s.backgroundColor] = (colours[s.backgroundColor] || 0) + area;
  }
  const bodyBg = getComputedStyle(document.body).backgroundColor;
  const buttons = pick('a[href], button').filter(el => { const s = getComputedStyle(el); return s.backgroundColor !== 'rgba(0, 0, 0, 0)' && el.getBoundingClientRect().top < innerHeight * 1.2; }).slice(0, 6).map(el => ({ text: (el.innerText || '').trim().slice(0, 40), bg: getComputedStyle(el).backgroundColor, color: getComputedStyle(el).color, radius: getComputedStyle(el).borderRadius, height: Math.round(el.getBoundingClientRect().height) }));
  const h1 = pick('h1')[0];
  const words = (document.body.innerText || '').split(/\s+/).filter(Boolean).length;
  const firstScreenWords = pick('body *').filter(el => el.children.length === 0 && el.getBoundingClientRect().top < innerHeight).reduce((n, el) => n + (el.innerText || '').split(/\s+/).filter(Boolean).length, 0);
  return {
    title: document.title,
    lang: document.documentElement.lang || null,
    dir: document.documentElement.dir || getComputedStyle(document.documentElement).direction,
    fontsLoaded: [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/["']/g, '')))].slice(0, 12),
    h1: style(h1),
    h1Lines: h1 ? (() => { const rg = document.createRange(); rg.selectNodeContents(h1); return new Set([...rg.getClientRects()].filter(r => r.width > 1).map(r => Math.round(r.bottom))).size; })() : null,
    h2: pick('h2').slice(0, 4).map(style),
    body: style(pick('p')[0]),
    bodyBackground: bodyBg,
    topBackgrounds: Object.entries(colours).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([c]) => c),
    ctasNearTop: buttons,
    sections: pick('section, main > div, main > section').length,
    images: pick('img, picture, video').length,
    words, firstScreenWords,
    pageHeight: document.documentElement.scrollHeight,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
    wideBoxes: pick('body *').filter(el => { const r = el.getBoundingClientRect(); return r.width > 1 && r.right > 0 && r.left < innerWidth && (r.right > innerWidth + 1 || r.left < -1); }).map(el => { const r = el.getBoundingClientRect(); return { el: el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).join('.') : ''), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) }; }).slice(0, 8),
    sizes: (() => {
      const fs = sel => { const el = pick(sel)[0]; return el ? px(getComputedStyle(el).fontSize) : null; };
      const lede = pick('h1 ~ p, header p, section p')[0];
      const wrap = pick('main [class*=wrap], main [class*=container], [class*=wrap], [class*=container], main > *')[0];
      return { h1: fs('h1'), h2: fs('h2'), h3: fs('h3'), lede: lede ? px(getComputedStyle(lede).fontSize) : null, body: px(getComputedStyle(document.body).fontSize), p: fs('p'), wrapPaddingLeft: wrap ? px(getComputedStyle(wrap).paddingLeft) : null, wrapLeft: wrap ? Math.round(wrap.getBoundingClientRect().left) : null };
    })(),
    layout: (() => {
      const texts = [];
      const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.textContent.trim() && n.parentElement && vis(n.parentElement) ? 1 : 2 });
      while (walk.nextNode()) { const rg = document.createRange(); rg.selectNodeContents(walk.currentNode); for (const r of rg.getClientRects()) if (r.width > 1 && r.bottom > 0 && r.top < innerHeight) texts.push({ r, el: walk.currentNode.parentElement, t: walk.currentNode.textContent.trim().slice(0, 40) }); }
      const filled = pick('a[href], button, [role=button], input[type=submit]').filter(el => { const s = getComputedStyle(el); return s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== s.color; });
      const real = filled.filter(el => !/^(skip|pular|ir para|saltar)/i.test((el.innerText || '').trim()) && !/skip/i.test(el.className || '') && !(el.getAttribute('href') || '').match(/^#(main|content|conteudo|conte\u00fado)$/i));
      const main = real.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top).find(el => el.getBoundingClientRect().top > 0 && !el.closest('nav, header')) || real[0] || null;
      const mr = main && main.getBoundingClientRect();
      const offView = texts.filter(x => x.r.left < -1 || x.r.right > innerWidth + 1).map(x => x.t);
      const clipped = pick('body *').filter(el => { const s = getComputedStyle(el); return /hidden|clip/.test(s.overflowX + s.overflow + s.textOverflow) && el.scrollWidth > el.clientWidth + 1 && (el.innerText || '').trim(); }).map(el => (el.innerText || '').trim().slice(0, 40));
      return {
        mainAction: main ? { text: (main.innerText || main.value || '').trim().slice(0, 40), top: Math.round(mr.top), bottom: Math.round(mr.bottom), aboveFold: mr.bottom <= innerHeight } : null,
        gutterLeftPx: texts.length ? Math.round(Math.min(...texts.map(x => x.r.left))) : null,
        gutterRightPx: texts.length ? Math.round(Math.min(...texts.map(x => innerWidth - x.r.right))) : null,
        clippedText: [...new Set([...offView, ...clipped])].slice(0, 6)
      };
    })(),
    cookieBanner: (() => {
      const sel = '[id*=cookie i],[class*=cookie i],[id*=consent i],[class*=consent i],[id*=onetrust i],[class*=cmp i],[aria-label*=cookie i],[aria-label*=consent i]';
      const hits = [...document.querySelectorAll(sel)].filter(el => { if (!vis(el)) return false; const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0 && r.width * r.height > innerWidth * innerHeight * 0.05; });
      if (!hits.length) return null;
      const r = hits[0].getBoundingClientRect();
      const covered = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
      return { coversFirstScreenPercent: Math.round(100 * Math.max(0, covered) * Math.min(r.width, innerWidth) / (innerWidth * innerHeight)), text: (hits[0].innerText || '').trim().slice(0, 100) };
    })()
  };
};

const browser = await chromium.launch();
const result = { url, label, locale, capturedAt: new Date().toISOString(), viewports: {} };
for (const [name, vp, frames, mobile] of [['desktop', { width: 1440, height: 900 }, 5, false], ['mobile', { width: 390, height: 844 }, 2, true]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile, locale, extraHTTPHeaders: { 'Accept-Language': locale } });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(2500);
    const shots = [];
    const fold = path.join(outDir, `${label}-${name}-0.jpg`);
    await page.screenshot({ path: fold, type: 'jpeg', quality: 60 });
    shots.push(path.basename(fold));
    for (let i = 1; i <= frames; i++) {
      await page.mouse.wheel(0, vp.height * 0.9);
      await page.waitForTimeout(900);
      const f = path.join(outDir, `${label}-${name}-${i}.jpg`);
      await page.screenshot({ path: f, type: 'jpeg', quality: 60 });
      shots.push(path.basename(f));
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    result.viewports[name] = { size: vp, shots, measure: await page.evaluate(measure) };
  } catch (e) {
    result.viewports[name] = { size: vp, error: String(e).slice(0, 300) };
  }
  await ctx.close();
}
await browser.close();
clearTimeout(hardLimit);
fs.writeFileSync(path.join(outDir, `${label}-measure.json`), JSON.stringify(result, null, 2));
console.log(JSON.stringify({ label, ok: Object.values(result.viewports).every(v => !v.error), out: `${label}-measure.json` }));
