// Render one local HTML or SVG file to a PNG at an exact pixel size.
// Usage (always through the sandbox, from the Kinso Skills root):
//   NODE_PATH=".../node_modules" PLAYWRIGHT_BROWSERS_PATH="$HOME/Library/Caches/ms-playwright" \
//   bash kinso-frontend/tools/sandbox/run.sh <run folder> node kinso-promote/tools/render-png.mjs <in.html|in.svg> <out.png> <width> <height>
// Why: kinso-frontend/tools/capture.mjs makes JPEG screenshots at fixed viewports (1440x900, 390x844), not exact-size PNGs.
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
const { chromium } = createRequire(path.join(process.env.NODE_PATH || '.', 'x.js'))('playwright');
const [inFile, outFile, w, h] = process.argv.slice(2);
if (!inFile || !outFile || !w || !h) { console.error('usage: render-png.mjs <in.html|in.svg> <out.png> <width> <height>'); process.exit(2); }
const width = Number(w), height = Number(h);
const src = path.resolve(inFile);
if (!fs.existsSync(src)) { console.error('not found: ' + src); process.exit(2); }
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto('file://' + src, { waitUntil: 'load', timeout: 30000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.resolve(outFile), type: 'png', clip: { x: 0, y: 0, width, height } });
  console.log(JSON.stringify({ ok: true, out: path.resolve(outFile), width, height }));
} finally { await browser.close(); }
