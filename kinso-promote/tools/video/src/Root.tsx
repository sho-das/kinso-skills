import React from 'react';
import {Composition} from 'remotion';
import {TitleTest} from './TitleTest';
import {CaptionStill} from './CaptionStill';
import {Reel1, REEL1_FRAMES} from './kinso-reels/Reel1';
import {Reel2, REEL2_FRAMES} from './kinso-reels/Reel2';
import {EveningRoutine, EVENING_FRAMES} from './evening/EveningRoutine';

export const RemotionRoot: React.FC = () => {
  return (
    <>
    <Composition
      id="TitleTest"
      component={TitleTest}
      durationInFrames={90}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="CaptionStill"
      component={CaptionStill}
      durationInFrames={1}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{text: 'Comida mineira de verdade'}}
    />
    <Composition id="Reel1" component={Reel1} durationInFrames={REEL1_FRAMES} fps={30} width={1080} height={1920} defaultProps={{cover: false}} />
    <Composition id="Reel1Cover" component={Reel1} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{cover: true}} />
    <Composition id="Reel2" component={Reel2} durationInFrames={REEL2_FRAMES} fps={30} width={1080} height={1920} defaultProps={{cover: false}} />
    <Composition id="Reel2Cover" component={Reel2} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{cover: true}} />
    <Composition id="EveningRoutine" component={EveningRoutine} durationInFrames={EVENING_FRAMES} fps={30} width={1080} height={1920} />
    </>
  );
};
