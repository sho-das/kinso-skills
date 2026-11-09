import { createRequire } from 'node:module';
import path from 'node:path';

const { chromium } = createRequire(path.join(process.env.NODE_PATH || '.', 'x.js'))('playwright');
const [url, limitSec = '30', mode = 'text'] = process.argv.slice(2);
if (!url) { console.error('usage: pagetext.mjs <url> [limitSeconds] [text|items]'); process.exit(2); }
const timer = setTimeout(() => { console.log(JSON.stringify({ url, status: 'time limit' })); process.exit(3); }, Number(limitSec) * 1000);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) kinso-collector/1.0 (research; low volume)' });
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: Number(limitSec) * 800 });
  await page.waitForTimeout(2500);
  const text = await page.evaluate(() => {
    const meta = [...document.querySelectorAll('meta')].filter(m => /description|title/i.test(m.getAttribute('property') || m.getAttribute('name') || '')).map(m => m.content);
    return (meta.join(' ') + ' ' + (document.body ? document.body.innerText : '')).replace(/\s+/g, ' ').trim();
  });
  const items = mode !== 'items' ? undefined : await page.evaluate(() => {
    const seen = new Set();
    const out = [];
    for (const t of document.querySelectorAll('faceplate-timeago[ts]')) {
      let box = t.parentElement;
      while (box && !box.querySelector('a[href*="/comments/"]')) box = box.parentElement;
      if (!box || box.tagName === 'MAIN' || box === document.body) continue;
      const hrefs = [...box.querySelectorAll('a[href*="/comments/"]')].map(a => a.getAttribute('href').split('?')[0]);
      const href = hrefs.sort((a, b) => b.length - a.length)[0];
      if (seen.has(href)) continue;
      seen.add(href);
      out.push({ href, ts: t.getAttribute('ts'), text: box.innerText.replace(/\s+/g, ' ').trim() });
    }
    return out;
  });
  console.log(JSON.stringify({ url, status: res ? res.status() : null, text, items }));
} catch (e) {
  console.log(JSON.stringify({ url, status: 'error: ' + e.message.split('\n')[0] }));
} finally {
  clearTimeout(timer);
  await browser.close();
}
