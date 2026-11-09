// Reel 1 - post li-1, "the AI-looking designs". Real material: the stage 3 option sheets (first run and rerun).
import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import timing from './reel1.timing.json';
import {C, Captions, EndCard, Fade, FPS, frames, MONO, ramp, SANS, Score, SheetCam, Tag, Title, usePop} from './parts';

const T = frames(timing);
export const REEL1_FRAMES = Math.round((timing.voiceEnd + 2.0) * FPS);
const S1 = 'kinso-reels/stage3-C-options-desktop.jpg';
const S2 = 'kinso-reels/stage3-C-rerun-options-desktop.jpg';
const SW = 2224;
const SH = 1036;

// Option 3 of the first run: the split hero (AI look 3).
const HookScene: React.FC<{len: number}> = ({len}) => {
  const a = T[1].s;
  const d = T[1].e - T[1].s;
  const b = T[2].s;
  return (
    <Fade len={len} noIn>
      <AbsoluteFill style={{backgroundColor: C.paper}}>
        <Sequence durationInFrames={b}>
          <Title text={<>The page every AI model makes.<br /><span style={{color: C.red}}>Including mine 🤦‍♂️</span></>} />
        </Sequence>
        <Sequence from={b}>
          <Title text={<>Yep. That was literally my page 🤦‍♂️</>} at={1} />
        </Sequence>
        <SheetCam src={S1} w={SW} h={SH} keys={[
          {f: 0, cx: 1738, cy: 255, s: 2.05},
          {f: a - 6, cx: 1745, cy: 260, s: 1.9},
          {f: a + 6, cx: 1610, cy: 250, s: 2.3},
          {f: a + d * 0.35, cx: 1850, cy: 252, s: 2.1},
          {f: a + d * 0.68, cx: 1600, cy: 470, s: 2.4},
          {f: b, cx: 1848, cy: 270, s: 1.35},
          {f: b + 40, cx: 1800, cy: 260, s: 1.25},
        ]}>
          <Tag x={1505} y={150} text="heading left" at={a + 4} size={30} />
          <Tag x={1760} y={330} text="picture right" at={a + d * 0.35} size={28} rot={2} />
          <Tag x={1625} y={462} text="one careful accent" at={a + d * 0.68} size={24} />
          <Tag x={1500} y={16} text="option 3, my test run" at={b + 4} size={30} red />
        </SheetCam>
      </AbsoluteFill>
    </Fade>
  );
};

// Three identical page skeletons: the rules that flattened everything.
const Skeleton: React.FC<{at: number; x: number}> = ({at, x}) => {
  const p = usePop(at);
  return (
    <div style={{position: 'absolute', left: x, top: 1040, width: 290, height: 190, backgroundColor: '#fbf9f5',
      border: `3px solid ${C.ink}`, transform: `scale(${p})`, opacity: p > 0.01 ? 1 : 0}}>
      <div style={{position: 'absolute', left: 18, top: 50, width: 110, height: 16, backgroundColor: C.ink}} />
      <div style={{position: 'absolute', left: 18, top: 76, width: 90, height: 16, backgroundColor: C.ink}} />
      <div style={{position: 'absolute', left: 18, top: 140, width: 70, height: 22, backgroundColor: C.red}} />
      <div style={{position: 'absolute', left: 150, top: 40, width: 120, height: 100, backgroundColor: '#cfc8bb'}} />
    </div>
  );
};

const RulesScene: React.FC<{len: number}> = ({len}) => {
  const f = useCurrentFrame();
  const t4 = T[4].s - T[3].s;
  const rules = ['one accent colour', 'about 80 words on the first screen', 'no random picks'];
  return (
    <Fade len={len}>
      <AbsoluteFill style={{backgroundColor: C.paper}}>
        <Title text={<>The reason was <span style={{color: C.red}}>me.</span></>} />
        <div style={{position: 'absolute', left: 70, top: 450, fontFamily: SANS, fontSize: 40, color: C.soft, opacity: ramp(f, 4, 12)}}>
          good design skills, rewritten into my own rules:
        </div>
        {rules.map((r, i) => (
          <div key={r} style={{position: 'absolute', left: 70, top: 540 + i * 110, fontFamily: MONO, fontSize: 46, color: C.ink,
            opacity: ramp(f, 12 + i * 12, 20 + i * 12), transform: `translateX(${ramp(f, 12 + i * 12, 24 + i * 12, -30, 0)}px)`}}>
            <span style={{color: C.red}}>-</span> {r}
          </div>
        ))}
        <div style={{position: 'absolute', left: 70, top: 900, fontFamily: SANS, fontWeight: 700, fontSize: 44, color: C.ink,
          opacity: ramp(f, t4, t4 + 8)}}>
          together → every design came out the same
        </div>
        <Skeleton at={t4 + 10} x={70} />
        <Skeleton at={t4 + 16} x={395} />
        <Skeleton at={t4 + 22} x={720} />
      </AbsoluteFill>
    </Fade>
  );
};

const StopScene: React.FC<{len: number}> = ({len}) => {
  const f = useCurrentFrame();
  return (
    <Fade len={len}>
      <AbsoluteFill style={{backgroundColor: C.dark}}>
        <Title text="So I stopped rewriting them." color="#fff" size={96} top={480} />
        <div style={{position: 'absolute', left: 70, right: 70, top: 760, fontFamily: SANS, fontSize: 56, lineHeight: 1.2,
          color: '#e9e3d8', opacity: ramp(f, 4, 12)}}>
          Each stage runs the <span style={{backgroundColor: '#fff2a8', color: C.ink, padding: '0 10px'}}>original skill, as it is.</span>
        </div>
      </AbsoluteFill>
    </Fade>
  );
};

// First run: 8, 5, 3, and the client agent's pick.
const FailScene: React.FC<{len: number}> = ({len}) => {
  const o = T[6].s;
  const s7 = T[7].s - o;
  const d7 = T[7].e - T[7].s;
  const s8 = T[8].s - o;
  const f = useCurrentFrame();
  return (
    <Fade len={len}>
      <AbsoluteFill style={{backgroundColor: C.paper}}>
        <Title text={<>First test: <span style={{color: C.red}}>STILL</span> failed.</>} />
        <div style={{position: 'absolute', left: 70, top: 360, fontFamily: SANS, fontSize: 38, color: C.soft, opacity: ramp(f, s7 + d7 * 0.6, s7 + d7 * 0.6 + 8)}}>
          AI-look score: higher = less AI-looking
        </div>
        <SheetCam src={S1} w={SW} h={SH} keys={[
          {f: 0, cx: 1112, cy: 520, s: 0.475},
          {f: s8 - 4, cx: 1112, cy: 520, s: 0.475},
          {f: s8 + 22, cx: 1848, cy: 300, s: 1.25},
        ]}>
          <Score x={600} y={165} n={8} at={s7 + d7 * 0.38} size={220} />
          <Score x={1340} y={165} n={5} at={s7 + d7 * 0.46} size={220} />
          <Score x={2060} y={165} n={3} at={s7 + d7 * 0.54} size={220} bad />
          <Tag x={1520} y={400} text="the test client agent picked this one" at={s8 + 24} size={34} red />
        </SheetCam>
      </AbsoluteFill>
    </Fade>
  );
};

const GateScene: React.FC<{len: number}> = ({len}) => {
  const f = useCurrentFrame();
  return (
    <Fade len={len}>
      <AbsoluteFill style={{backgroundColor: C.red}}>
        <Title text="New gate, before anyone sees the options:" size={64} color="#fff" />
        <div style={{position: 'absolute', left: 70, right: 70, top: 600, fontFamily: SANS, fontWeight: 800, fontSize: 150,
          letterSpacing: -4, color: "#fff", opacity: ramp(f, 6, 14)}}>
          under <span style={{color: "#fff2a8"}}>7</span>
        </div>
        <div style={{position: 'absolute', left: 74, top: 820, fontFamily: SANS, fontSize: 64, color: "#fff", opacity: ramp(f, 20, 30)}}>
          → rebuilt once, or dropped
        </div>
      </AbsoluteFill>
    </Fade>
  );
};

// Rerun: 7, 6, 7; the 6 dropped; pass.
const RerunScene: React.FC<{len: number}> = ({len}) => {
  const d = T[10].e - T[10].s;
  const f = useCurrentFrame();
  const stamp = usePop(d * 0.5);
  return (
    <Fade len={len}>
      <AbsoluteFill style={{backgroundColor: C.paper}}>
        <Title text="Rerun." />
        <SheetCam src={S2} w={SW} h={SH} keys={[{f: 0, cx: 1112, cy: 520, s: 0.475}, {f: len, cx: 1112, cy: 500, s: 0.5}]}>
          <Score x={600} y={165} n={7} at={d * 0.1} size={220} />
          <Score x={1340} y={165} n={6} at={d * 0.2} size={220} bad crossAt={d * 0.3} />
          <Score x={2060} y={165} n={7} at={d * 0.3} size={220} />
          <Tag x={1150} y={330} text="dropped" at={d * 0.36} size={70} red />
        </SheetCam>
        <div style={{position: 'absolute', right: 80, top: 230, fontFamily: SANS, fontWeight: 800, fontSize: 84, color: C.green,
          border: `8px solid ${C.green}`, padding: '6px 26px', transform: `scale(${stamp}) rotate(-7deg)`,
          opacity: stamp > 0.01 ? Math.min(1, ramp(f, d * 0.5, d * 0.5 + 3)) : 0}}>
          STAGE PASSED
        </div>
      </AbsoluteFill>
    </Fade>
  );
};

export const Reel1: React.FC<{cover?: boolean}> = ({cover}) => {
  const cut = (i: number) => T[i].s - 4;
  const scenes: [number, number, React.FC<{len: number}>][] = [
    [0, cut(3), HookScene],
    [cut(3), cut(5), RulesScene],
    [cut(5), cut(6), StopScene],
    [cut(6), cut(9), FailScene],
    [cut(9), cut(10), GateScene],
    [cut(10), cut(11), RerunScene],
  ];
  return (
    <AbsoluteFill style={{backgroundColor: C.paper}}>
      {scenes.map(([a, b, S], i) => (
        <Sequence key={i} from={a} durationInFrames={b - a + 6}>
          <S len={b - a + 6} />
        </Sequence>
      ))}
      <Sequence from={cut(11)}>
        <EndCard len={REEL1_FRAMES - cut(11)} line="Still testing all of it." />
      </Sequence>
      {!cover && <Captions chunks={T} />}
      {!cover && <Audio src={staticFile('kinso-reels/reel1.wav')} />}
    </AbsoluteFill>
  );
};
