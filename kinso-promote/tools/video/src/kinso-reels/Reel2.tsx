// Reel 2 - post li-2, "how it works". Real material: the launcher binary's ls line, the stage 3 sheets,
// the real FIXES.md row 4. Diagram: before - options - guards - after.
import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import timing from './reel2.timing.json';
import {C, Captions, EndCard, Fade, FPS, frames, MONO, ramp, SANS, SheetCam, Tag, Title, usePop} from './parts';

const T = frames(timing);
export const REEL2_FRAMES = Math.round((timing.voiceEnd + 1.0) * FPS);
const S1 = 'kinso-reels/stage3-C-options-desktop.jpg';
const S2 = 'kinso-reels/stage3-C-rerun-options-desktop.jpg';

const HookScene: React.FC<{len: number}> = ({len}) => {
  const f = useCurrentFrame();
  const b1 = T[1].s;
  const b2 = T[2].s;
  const box = ramp(f, b2, b2 + 14);
  const shake = f >= b1 && f < b1 + 10 ? Math.sin(f * 2.4) * 6 : 0;
  return (
    <Fade len={len} noIn>
      <AbsoluteFill style={{backgroundColor: C.dark}}>
        <Sequence durationInFrames={b1}>
          <Title text={<>It downloaded a <span style={{color: '#ff7a55'}}>17 MB binary.</span></>} color="#fff" size={88} />
        </Sequence>
        <Sequence from={b1}>
          <Title text={<>A BINARY.<br />From a design skill.</>} color="#fff" size={96} at={1} />
        </Sequence>
        <div style={{position: 'absolute', left: 60, right: 60, top: 640, backgroundColor: '#0f0e0c', borderRadius: 14,
          border: '2px solid #3a362f', fontFamily: MONO, fontSize: 30, color: '#d9d3c7', padding: '70px 34px 40px',
          transform: `translateX(${shake}px)`}}>
          <div style={{position: 'absolute', left: 24, top: 22, display: 'flex', gap: 12}}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => <div key={c} style={{width: 18, height: 18, borderRadius: 18, backgroundColor: c}} />)}
          </div>
          <div style={{color: '#8f887b'}}>$ ls -lh stage4/C/home/.impeccable/bin/0.1.17/</div>
          <div style={{marginTop: 18, whiteSpace: 'nowrap'}}>
            -rwx--x--x  <span style={{backgroundColor: '#ff7a55', color: '#111', padding: '0 6px'}}>17M</span>  Oct 27 14:12  <span style={{color: '#fff'}}>impeccable</span>
          </div>
          <div style={{marginTop: 26, color: '#8f887b', fontSize: 26}}>a design skill's launcher, run by my test runner</div>
        </div>
        <div style={{position: 'absolute', left: 30, right: 30, top: 610, height: 380, border: '5px dashed #7fd18b', borderRadius: 22,
          opacity: box, transform: `scale(${1.06 - 0.06 * box})`}} />
        <div style={{position: 'absolute', left: 50, top: 1010, fontFamily: SANS, fontWeight: 700, fontSize: 46, color: '#7fd18b',
          opacity: box}}>
          sandbox (phew)
        </div>
      </AbsoluteFill>
    </Fade>
  );
};

const WhyScene: React.FC<{len: number}> = ({len}) => (
  <Fade len={len}>
    <AbsoluteFill style={{backgroundColor: C.paper}}>
      <Title text={<>Rewriting skills in my own words = <span style={{color: C.red}}>AI-looking designs.</span></>} size={70} />
      <SheetCam src={S1} w={2224} h={1036} keys={[{f: 0, cx: 380, cy: 285, s: 1.2}, {f: len, cx: 1848, cy: 285, s: 1.3}]}>
        <Tag x={1500} y={16} text="first test run" at={len * 0.55} size={30} red />
      </SheetCam>
    </AbsoluteFill>
  </Fade>
);

// A crop of one option's first screen from the rerun sheet, name hidden.
const Thumb: React.FC<{col: number; at: number; x: number}> = ({col, at, x}) => {
  const p = usePop(at);
  const s = 0.3;
  const left = [17, 753, 1489][col];
  return (
    <div style={{position: 'absolute', left: x, top: 92, width: 718 * s, height: 448 * s, overflow: 'hidden',
      border: `3px solid ${C.ink}`, transform: `scale(${p})`, opacity: p > 0.01 ? 1 : 0}}>
      <Img src={staticFile(S2)} style={{position: 'absolute', width: 2224 * s, height: 1036 * s, left: -left * s, top: -61 * s}} />
      <div style={{position: 'absolute', right: 6, bottom: 6, backgroundColor: C.ink, color: '#fff', fontFamily: MONO, fontSize: 18,
        padding: '2px 8px'}}>skill: ?</div>
    </div>
  );
};

const Node: React.FC<{y: number; h: number; on: number; label: string; text: string; children?: React.ReactNode}> = ({
  y, h, on, label, text, children,
}) => {
  const f = useCurrentFrame();
  const a = ramp(f, on, on + 10);
  return (
    <div style={{position: 'absolute', left: 70, right: 70, top: y, height: h, borderRadius: 12,
      border: `4px solid ${a > 0.5 ? C.ink : C.line}`, backgroundColor: a > 0.5 ? '#fff' : 'transparent',
      opacity: 0.35 + 0.65 * a, transform: `scale(${0.97 + 0.03 * a})`}}>
      <div style={{position: 'absolute', left: 26, top: 22, fontFamily: MONO, fontWeight: 700, fontSize: 40,
        color: a > 0.5 ? C.red : C.soft}}>{label}</div>
      <div style={{position: 'absolute', left: 300, right: 26, top: 22, fontFamily: SANS, fontSize: 38, lineHeight: 1.15,
        color: C.ink, opacity: a}}>{text}</div>
      {children}
    </div>
  );
};

const Arrow: React.FC<{y: number; on: number}> = ({y, on}) => {
  const f = useCurrentFrame();
  const a = ramp(f, on - 6, on + 4);
  return (
    <svg width={60} height={40} style={{position: 'absolute', left: 510, top: y}}>
      <line x1={30} y1={0} x2={30} y2={30 * a} stroke={C.ink} strokeWidth={5} />
      <path d="M18 24 L30 38 L42 24" fill="none" stroke={C.ink} strokeWidth={5} opacity={a > 0.9 ? 1 : 0} />
    </svg>
  );
};

const DiagramScene: React.FC<{len: number}> = ({len}) => {
  const o = T[4].s - 4;
  const on = (i: number) => T[i].s - o;
  return (
    <Fade len={len}>
      <AbsoluteFill style={{backgroundColor: C.paper}}>
        <Title text={<>The outside skill runs <span style={{backgroundColor: '#fff2a8', padding: '0 8px'}}>as it is.</span> My rules sit around it.</>} size={62} />
        <Node y={500} h={150} on={on(5)} label="BEFORE" text="job folder + shared rules, like free tools only" />
        <Arrow y={652} on={on(6)} />
        <Node y={690} h={250} on={on(6)} label="OPTIONS" text="deals 3, a fresh judge picks one">
          <Thumb col={0} at={on(6) + 8} x={240} />
          <Thumb col={1} at={on(6) + 12} x={465} />
          <Thumb col={2} at={on(6) + 16} x={690} />
        </Node>
        <Arrow y={942} on={on(7)} />
        <Node y={980} h={150} on={on(7)} label="GUARDS" text="scripts only in the sandbox, nothing posted without my OK" />
        <Arrow y={1132} on={on(8)} />
        <Node y={1170} h={150} on={on(8)} label="AFTER" text="facts, links, accessibility, SEO. Never the style." />
      </AbsoluteFill>
    </Fade>
  );
};

const FixScene: React.FC<{len: number}> = ({len}) => {
  const f = useCurrentFrame();
  const pass = T[10].s - T[9].s + 2;
  const stamp = usePop(pass);
  const hl = ramp(f, 40, 56);
  return (
    <Fade len={len}>
      <AbsoluteFill style={{backgroundColor: C.paper}}>
        <Title text="One line in FIXES.md." />
        <div style={{position: 'absolute', left: 60, right: 60, top: 470, backgroundColor: '#fff', border: `3px solid ${C.ink}`,
          borderRadius: 10, fontFamily: MONO, fontSize: 31, lineHeight: 1.45, color: C.ink, padding: '24px 30px'}}>
          <div style={{color: C.soft, fontSize: 26, marginBottom: 14}}>kinso-frontend/FIXES.md - row 4</div>
          <div>| 2026-10-27 | 4 | C |</div>
          <div>| Guard broken: the runner ran the Impeccable launcher (...). It downloaded and ran a 17 MB binary inside the sandbox home.</div>
          <div style={{marginTop: 10}}>| RULES.md now names the launcher and bans every subcommand,{' '}
            <span style={{backgroundColor: `rgba(255, 226, 90, ${hl})`, padding: '0 4px'}}>`--help` included.</span> |</div>
        </div>
        <div style={{position: 'absolute', left: 90, top: 1130, fontFamily: SANS, fontWeight: 800, fontSize: 76, color: C.green,
          border: `8px solid ${C.green}`, padding: '6px 26px', transform: `scale(${stamp}) rotate(-5deg)`, opacity: stamp > 0.01 ? 1 : 0}}>
          RERUN: PASSED
        </div>
      </AbsoluteFill>
    </Fade>
  );
};

export const Reel2: React.FC<{cover?: boolean}> = ({cover}) => {
  const cut = (i: number) => T[i].s - 4;
  const scenes: [number, number, React.FC<{len: number}>][] = [
    [0, cut(3), HookScene],
    [cut(3), cut(4), WhyScene],
    [cut(4), cut(9), DiagramScene],
    [cut(9), cut(11), FixScene],
  ];
  return (
    <AbsoluteFill style={{backgroundColor: C.paper}}>
      {scenes.map(([a, b, S], i) => (
        <Sequence key={i} from={a} durationInFrames={b - a + 6}>
          <S len={b - a + 6} />
        </Sequence>
      ))}
      <Sequence from={cut(11)}>
        <EndCard len={REEL2_FRAMES - cut(11)} line="Still testing." />
      </Sequence>
      {!cover && <Captions chunks={T} />}
      {!cover && <Audio src={staticFile('kinso-reels/reel2.wav')} />}
    </AbsoluteFill>
  );
};
