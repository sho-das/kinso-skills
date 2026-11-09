// Evening Routine Reel - a new mom's wind-down, 9:16 for Instagram.
// Real footage is the cropped, graded master (evening/master.mp4). All graphics drawn here.
import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {dreamyZoom} from '@remotion/transitions/dreamy-zoom';

export const FPS = 30;
export const W = 1080;
export const H = 1920;
const MASTER = 'evening/master.mp4';

const SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const GOLD = '#f3c97a';
const PAPER = '#f1e9dc';
const INK = '#2a2622';
const SOFT = '#8a8075';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const outCubic = {...clamp, easing: Easing.out(Easing.cubic)} as const;

// --- Each beat: a trimmed slice of the master with a slow Ken Burns move. ---
type Beat = {in: number; out: number; rate: number; kb: 'in' | 'left' | 'right'};
const BEATS: Beat[] = [
  {in: 5.6, out: 9.95, rate: 1, kb: 'in'}, // 0 hook (typewriter)
  {in: 15.9, out: 19.57, rate: 1, kb: 'left'}, // 1 eye patches
  {in: 2.3, out: 5.97, rate: 1, kb: 'right'}, // 2 skincare
  {in: 29.0, out: 34.42, rate: 1.25, kb: 'in'}, // 3 workout
  {in: 52.3, out: 55.97, rate: 1, kb: 'left'}, // 4 balcony
  {in: 59.5, out: 63.17, rate: 1, kb: 'right'}, // 5 reading
  {in: 63.9, out: 67.4, rate: 1, kb: 'in'}, // 6 date bites
  {in: 44.4, out: 46.73, rate: 1, kb: 'left'}, // 7 outro clip
];
const durOf = (b: Beat) => Math.round(((b.out - b.in) * FPS) / b.rate);
const ENDCARD = 80;
const TD = [16, 12, 12, 14, 12, 12, 12, 16]; // transition lengths after each beat
export const EVENING_FRAMES =
  BEATS.reduce((a, b) => a + durOf(b), 0) + ENDCARD - TD.reduce((a, t) => a + t, 0);

const Hl: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span style={{color: GOLD}}>{children}</span>
);

// Smooth caption: fades up, scales in, fades out near the end.
const Caption: React.FC<{dur: number; children: React.ReactNode}> = ({dur, children}) => {
  const f = useCurrentFrame();
  const o = Math.min(interpolate(f, [3, 13], [0, 1], outCubic), interpolate(f, [dur - 10, dur], [1, 0], clamp));
  const y = interpolate(f, [3, 15], [26, 0], outCubic);
  const s = interpolate(f, [3, 15], [0.96, 1], outCubic);
  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        right: 64,
        top: 1360,
        textAlign: 'center',
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: 60,
        lineHeight: 1.16,
        letterSpacing: -0.5,
        color: '#fff',
        textShadow: '0 2px 20px rgba(0,0,0,0.6)',
        opacity: o,
        transform: `translateY(${y}px) scale(${s})`,
      }}
    >
      {children}
    </div>
  );
};

// Intro hook: types two lines in sync with the keyboard clicks, then holds.
const Typewriter: React.FC = () => {
  const f = useCurrentFrame();
  const line1 = [...'my evening routine 🌙'];
  const line2 = [..."now that baby's down for his nap"];
  const total = line1.length + line2.length;
  const reveal = 50;
  const shown = Math.floor(interpolate(f, [4, reveal + 4], [0, total], clamp));
  const v1 = line1.slice(0, Math.min(shown, line1.length)).join('');
  const v2 = shown > line1.length ? line2.slice(0, shown - line1.length).join('') : '';
  const typing = shown < total;
  const cursor = typing && Math.floor(f / 7) % 2 === 0 ? '|' : typing ? ' ' : '';
  const o = interpolate(f, [0, 8], [0, 1], outCubic);
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        top: 760,
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: 72,
        lineHeight: 1.18,
        letterSpacing: -1,
        color: '#fff',
        textShadow: '0 2px 22px rgba(0,0,0,0.6)',
        opacity: o,
      }}
    >
      {v1}
      {v2 ? <br /> : null}
      <span style={{fontWeight: 600, fontSize: 56, color: '#f4ede1'}}>{v2}</span>
      <span style={{color: GOLD}}>{cursor}</span>
    </div>
  );
};

// Bottom scrim so captions stay readable over bright footage.
const Scrim: React.FC = () => (
  <AbsoluteFill
    style={{
      background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 28%, transparent 48%)',
      pointerEvents: 'none',
    }}
  />
);

const Clip: React.FC<{beat: Beat; dur: number; children?: React.ReactNode}> = ({beat, dur, children}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, dur], [1.02, 1.09], clamp);
  const pan = interpolate(f, [0, dur], [0, 26], clamp);
  const tx = beat.kb === 'left' ? -pan : beat.kb === 'right' ? pan : 0;
  const ty = beat.kb === 'in' ? -pan * 0.5 : 0;
  return (
    <AbsoluteFill style={{backgroundColor: '#000', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${z}) translate(${tx}px, ${ty}px)`}}>
        <OffthreadVideo
          src={staticFile(MASTER)}
          trimBefore={Math.round(beat.in * FPS)}
          trimAfter={Math.round(beat.out * FPS)}
          playbackRate={beat.rate}
          muted
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </AbsoluteFill>
      <Scrim />
      {children}
    </AbsoluteFill>
  );
};

const CAPTIONS: (React.ReactNode | null)[] = [
  null, // hook uses the typewriter
  <>eye patches for my <Hl>dark circles</Hl></>,
  <>+ skincare to actually fix them</>,
  <>gentle workouts to rebuild my <Hl>core</Hl></>,
  <>the only outside i get - my balcony 🌿</>,
  <>reading my book on <Hl>Kobo</Hl> 📖</>,
  <>recharging with date bites 🤎</>,
  <>and... baby's awake 👶 gotta go!</>,
];

// Light evening grain, applied over the whole piece.
const GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>";
const Grain: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url("${GRAIN}")`,
        backgroundSize: '180px 180px',
        backgroundPosition: `${(f * 13) % 180}px ${(f * 7) % 180}px`,
        opacity: 0.06,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
      }}
    />
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background: 'radial-gradient(ellipse at 50% 42%, transparent 52%, rgba(20,12,6,0.4) 100%)',
      pointerEvents: 'none',
    }}
  />
);

const STARS = [
  {x: 150, y: 420, s: 18, p: 0},
  {x: 920, y: 300, s: 12, p: 20},
  {x: 840, y: 1180, s: 16, p: 45},
  {x: 120, y: 1320, s: 11, p: 70},
  {x: 540, y: 220, s: 10, p: 95},
];
const Stars: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {STARS.map((st, i) => {
        const tw = 0.15 + 0.3 * (0.5 + 0.5 * Math.sin((f + st.p) / 16));
        return (
          <svg key={i} width={st.s * 2} height={st.s * 2} style={{position: 'absolute', left: st.x, top: st.y, opacity: tw}}>
            <path
              d={`M ${st.s} 0 L ${st.s * 1.18} ${st.s * 0.82} L ${st.s * 2} ${st.s} L ${st.s * 1.18} ${st.s * 1.18} L ${st.s} ${st.s * 2} L ${st.s * 0.82} ${st.s * 1.18} L 0 ${st.s} L ${st.s * 0.82} ${st.s * 0.82} Z`}
              fill="#fff6e6"
            />
          </svg>
        );
      })}
    </AbsoluteFill>
  );
};

const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [2, 14], [0, 1], outCubic);
  const s = interpolate(f, [2, 18], [0.92, 1], outCubic);
  const o2 = interpolate(f, [14, 26], [0, 1], outCubic);
  return (
    <AbsoluteFill style={{backgroundColor: PAPER, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{opacity: o, transform: `scale(${s})`, textAlign: 'center', padding: '0 80px'}}>
        <div style={{fontSize: 96, marginBottom: 8}}>🌙</div>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 86, letterSpacing: -2, color: INK, lineHeight: 1.1}}>
          that's my wind-down
        </div>
      </div>
      <div style={{position: 'absolute', top: 1120, textAlign: 'center', left: 0, right: 0, opacity: o2}}>
        <div style={{fontFamily: SANS, fontSize: 42, color: SOFT, marginBottom: 26}}>save this for your own evening</div>
        <div
          style={{
            display: 'inline-block',
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 46,
            color: INK,
            backgroundColor: GOLD,
            padding: '16px 34px',
            borderRadius: 999,
          }}
        >
          @your_handle
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PRES = [dreamyZoom(), fade(), fade(), slide({direction: 'from-right'}), fade(), fade(), fade(), fade()];

export const EveningRoutine: React.FC = () => {
  const nodes: React.ReactNode[] = [];
  BEATS.forEach((b, i) => {
    const dur = durOf(b);
    nodes.push(
      <TransitionSeries.Sequence key={`s${i}`} durationInFrames={dur}>
        <Clip beat={b} dur={dur}>
          {i === 0 ? (
            <>
              <Typewriter />
              <Audio src={staticFile('evening/typing.wav')} volume={0.5} />
            </>
          ) : (
            <Caption dur={dur}>{CAPTIONS[i]}</Caption>
          )}
        </Clip>
      </TransitionSeries.Sequence>
    );
    nodes.push(
      <TransitionSeries.Transition key={`t${i}`} presentation={PRES[i]} timing={linearTiming({durationInFrames: TD[i]})} />
    );
  });
  nodes.push(
    <TransitionSeries.Sequence key="end" durationInFrames={ENDCARD}>
      <EndCard />
    </TransitionSeries.Sequence>
  );

  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <TransitionSeries>{nodes}</TransitionSeries>
      <Vignette />
      <Grain />
      <Stars />
    </AbsoluteFill>
  );
};
