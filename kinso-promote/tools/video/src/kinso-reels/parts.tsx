// Shared parts for the kinso reels. All text is drawn here (this ffmpeg has no drawtext).
import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const FPS = 30;
export const W = 1080;
export const H = 1920;

export const C = {
  paper: '#efebe3',
  ink: '#191714',
  soft: '#6d665c',
  red: '#c63a1d',
  dark: '#1b1916',
  line: '#d8d1c4',
  green: '#2f6b3a',
};
export const SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif';
export const MONO = 'Menlo, Monaco, "Courier New", monospace';

export type Timing = {voiceEnd: number; chunks: {i: number; beat: string; cap: string; start: number; end: number}[]};
export const frames = (t: Timing) =>
  t.chunks.map((c) => ({s: Math.round(c.start * FPS), e: Math.round(c.end * FPS), cap: c.cap}));

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ramp = (f: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(f, [a, b], [from, to], {...clamp, easing: Easing.out(Easing.cubic)});

// A scene with a short fade at both ends. `noIn` keeps frame 0 fully visible (hooks, covers).
export const Fade: React.FC<{len: number; noIn?: boolean; children: React.ReactNode; bg?: string}> = ({len, noIn, children, bg}) => {
  const f = useCurrentFrame();
  const o = Math.min(noIn ? 1 : ramp(f, 0, 7), ramp(f, len - 6, len, 1, 0));
  const y = noIn ? 0 : ramp(f, 0, 9, 24, 0);
  return (
    <AbsoluteFill style={{opacity: o, transform: `translateY(${y}px)`, backgroundColor: bg}}>{children}</AbsoluteFill>
  );
};

// Pops in at frame `at` (local), springy.
export const usePop = (at: number) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - at, fps, config: {damping: 13, stiffness: 160}});
};

// Big heading near the top, inside the Reels safe zone.
export const Title: React.FC<{text: React.ReactNode; at?: number; color?: string; size?: number; top?: number}> = ({
  text, at = 0, color = C.ink, size = 78, top = 250,
}) => {
  const f = useCurrentFrame();
  const o = at <= 0 ? 1 : ramp(f, at, at + 8);
  const y = at <= 0 ? 0 : ramp(f, at, at + 10, 18, 0);
  return (
    <div style={{position: 'absolute', left: 70, right: 70, top, fontFamily: SANS, fontWeight: 700, fontSize: size,
      lineHeight: 1.08, letterSpacing: -1.5, color, opacity: o, transform: `translateY(${y}px)`}}>
      {text}
    </div>
  );
};

export type Key = {f: number; cx: number; cy: number; s: number};
const lerpKeys = (f: number, keys: Key[], k: 'cx' | 'cy' | 's') =>
  keys.length === 1
    ? keys[0][k]
    : interpolate(f, keys.map((x) => x.f), keys.map((x) => x[k]), {...clamp, easing: Easing.inOut(Easing.cubic)});

// A camera over a real sheet: zoom and pan in image pixels. Children are placed in image pixels too.
export const SheetCam: React.FC<{
  src: string; w: number; h: number; keys: Key[];
  box?: {x: number; y: number; w: number; h: number}; children?: React.ReactNode;
}> = ({src, w, h, keys, box = {x: 0, y: 560, w: W, h: 760}, children}) => {
  const f = useCurrentFrame();
  const cx = lerpKeys(f, keys, 'cx');
  const cy = lerpKeys(f, keys, 'cy');
  const s = lerpKeys(f, keys, 's');
  return (
    <div style={{position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h, overflow: 'hidden',
      backgroundColor: '#fff', boxShadow: '0 2px 0 rgba(0,0,0,0.06)'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: w, height: h, transformOrigin: '0 0',
        transform: `translate(${box.w / 2 - cx * s}px, ${box.h / 2 - cy * s}px) scale(${s})`}}>
        <Img src={staticFile(src)} style={{width: w, height: h, display: 'block'}} />
        {children}
      </div>
    </div>
  );
};

// Score badge in image pixels (lives inside SheetCam).
export const Score: React.FC<{x: number; y: number; n: number; at: number; bad?: boolean; crossAt?: number; size?: number}> = ({
  x, y, n, at, bad, crossAt, size = 190,
}) => {
  const p = usePop(at);
  const f = useCurrentFrame();
  const cross = crossAt === undefined ? 0 : ramp(f, crossAt, crossAt + 10);
  const bg = bad ? C.red : C.ink;
  return (
    <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size,
      transform: `scale(${p}) rotate(${bad ? -6 : -3}deg)`, opacity: p > 0.01 ? 1 : 0}}>
      <div style={{width: size, height: size, borderRadius: size, backgroundColor: bg, color: '#fff', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, border: '6px solid #fff',
        boxShadow: '0 6px 18px rgba(0,0,0,0.25)'}}>
        <div style={{fontSize: size * 0.5, fontWeight: 800, lineHeight: 0.95}}>{n}</div>
        <div style={{fontSize: size * 0.12, fontWeight: 600, letterSpacing: 1, opacity: 0.85}}>AI LOOK</div>
      </div>
      {crossAt !== undefined && (
        <svg width={size * 1.6} height={size * 1.6} style={{position: 'absolute', left: -size * 0.3, top: -size * 0.3}}>
          <line x1={size * 0.15} y1={size * 0.15} x2={size * 0.15 + size * 1.3 * cross} y2={size * 0.15 + size * 1.3 * cross}
            stroke={C.red} strokeWidth={size * 0.09} strokeLinecap="round" />
          <line x1={size * 1.45} y1={size * 0.15} x2={size * 1.45 - size * 1.3 * cross} y2={size * 0.15 + size * 1.3 * cross}
            stroke={C.red} strokeWidth={size * 0.09} strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};

// A sticky label in image pixels (lives inside SheetCam), or in screen pixels outside it.
export const Tag: React.FC<{x: number; y: number; text: string; at: number; size?: number; red?: boolean; rot?: number}> = ({
  x, y, text, at, size = 40, red, rot = -2,
}) => {
  const p = usePop(at);
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `scale(${p}) rotate(${rot}deg)`, transformOrigin: '0 50%',
      opacity: p > 0.01 ? 1 : 0, backgroundColor: red ? C.red : '#fff2a8', color: red ? '#fff' : C.ink, fontFamily: SANS,
      fontWeight: 700, fontSize: size, padding: `${size * 0.22}px ${size * 0.4}px`, whiteSpace: 'nowrap',
      boxShadow: '0 4px 12px rgba(0,0,0,0.18)'}}>
      {text}
    </div>
  );
};

// Captions from the script timing: each chunk is cut into short groups, timed by their share of characters.
export const Captions: React.FC<{chunks: {s: number; e: number; cap: string}[]}> = ({chunks}) => {
  const f = useCurrentFrame();
  const groups: {s: number; e: number; text: string}[] = [];
  for (const c of chunks) {
    const words = c.cap.split(' ');
    const lines: string[] = [];
    let cur: string[] = [];
    for (const w of words) {
      const next = [...cur, w].join(' ');
      if (cur.length > 0 && (next.length > 46 || cur.length >= 9)) {
        lines.push(cur.join(' '));
        cur = [w];
      } else cur.push(w);
      if (/[.?!:]$/.test(w) && cur.join(' ').length > 22) {
        lines.push(cur.join(' '));
        cur = [];
      }
    }
    if (cur.length) lines.push(cur.join(' '));
    const total = lines.reduce((a, l) => a + l.length + 4, 0);
    let t = c.s;
    for (const l of lines) {
      const d = ((l.length + 4) / total) * (c.e - c.s);
      groups.push({s: Math.round(t), e: Math.round(t + d), text: l});
      t += d;
    }
  }
  // Hold the last group of each chunk until the next chunk starts, so the screen never flickers empty.
  for (let i = 0; i < groups.length - 1; i++) groups[i].e = Math.max(groups[i].e, Math.min(groups[i + 1].s, groups[i].e + 12));
  const g = groups.find((x) => f >= x.s && f < x.e);
  if (!g) return null;
  const p = ramp(f, g.s, g.s + 4);
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: 1395, display: 'flex', justifyContent: 'center'}}>
      <div style={{backgroundColor: C.ink, color: '#fff', fontFamily: SANS, fontWeight: 700, fontSize: 56, lineHeight: 1.15,
        padding: '14px 26px', borderRadius: 10, textAlign: 'center', opacity: p, transform: `scale(${0.96 + 0.04 * p})`,
        maxWidth: 940}}>
        {g.text}
      </div>
    </div>
  );
};

// End card with the link slot (no real link yet).
export const EndCard: React.FC<{len: number; line: string}> = ({len, line}) => {
  const f = useCurrentFrame();
  const p = usePop(10);
  return (
    <Fade len={len + 6}>
      <AbsoluteFill style={{backgroundColor: C.paper}}>
        <Title text={line} top={420} size={92} />
        <div style={{position: 'absolute', left: 70, top: 760, transform: `scale(${p}) rotate(-1.5deg)`, transformOrigin: '0 50%',
          opacity: p > 0.01 ? 1 : 0, fontFamily: MONO, fontSize: 62, fontWeight: 700, color: C.ink, backgroundColor: '#fff2a8',
          padding: '22px 30px', border: `4px solid ${C.ink}`}}>
          [link - to confirm]
        </div>
        <div style={{position: 'absolute', left: 74, top: 930, fontFamily: SANS, fontSize: 40, color: C.soft, opacity: ramp(f, 22, 32)}}>
          Soumya Das · Kinso skills
        </div>
      </AbsoluteFill>
    </Fade>
  );
};
