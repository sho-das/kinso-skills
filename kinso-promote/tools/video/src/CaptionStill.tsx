import React from 'react';
import {AbsoluteFill} from 'remotion';

// Transparent 1080x1920 PNG with one caption line near the bottom.
// Used because Homebrew ffmpeg 9.0.2 has no drawtext or subtitles filter; ffmpeg burns it in with overlay.
export const CaptionStill: React.FC<{text: string}> = ({text}) => {
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 260}}>
      <div
        style={{
          color: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0.6)',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: 56,
          fontWeight: 600,
          padding: '18px 32px',
          borderRadius: 12,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
