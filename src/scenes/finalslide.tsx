import {Circle, Gradient, Img, Latex, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, beginSlide, createRef, createSignal, linear, loop, makeRef, range, sequence, sin, cos, startPlayback, useRandom, slideTransition, Direction, waitFor} from '@motion-canvas/core';

import theplanet from '../images/k2-18_b.png';

export default makeScene2D(function* (view) {
  view.fill('#000000'); // set the background of this scene
  
  view.add(
    <Img src={theplanet} width={2160} />
  );
  
  yield* slideTransition(Direction.Right);

  yield* beginSlide('This is a bad exoplanet');
});
