import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

// 3 seconds at 30 fps: the title zooms in (frames 0-30), holds, then fades out (frames 60-90).
export const TitleTest: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = interpolate(spring({frame, fps, config: {damping: 14}}), [0, 1], [0.4, 1]);
  const opacity = interpolate(frame, [60, 90], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#1d1a16', justifyContent: 'center', alignItems: 'center'}}>
      <div
        style={{
          color: '#f4ead8',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: 140,
          fontWeight: 700,
          textAlign: 'center',
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        Kinso
      </div>
    </AbsoluteFill>
  );
};
