import {Circle, Gradient, Img, Latex, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, beginSlide, createRef, createSignal, linear, loop, makeRef, range, sequence, sin, cos, startPlayback, useRandom, slideTransition, Direction, waitFor} from '@motion-canvas/core';

import theplanet from '../images/k2-18_b.png';

export default makeScene2D(function* (view) {
  view.fill('#000000'); // set the background of this scene
  
  view.add(
    <Img src={theplanet} width={2160} />
  );

  const k218label = createRef<Txt>();

  view.add(
    <Txt fontFamily={'Atkinson Hyperlegible'} x={-800} y={-450} fontSize={50} fill={'#FFFFFF'} ref={k218label}> 
      K2-18 b
    </Txt>
  );

  const badExoplanetGrowyRect = createRef<Rect>();
  
  view.add(
    <Layout cache>
      <Rect
        x={0}
        y={0}
        height={0}
        width={1920}
        fill={'#FFFFFF'}
        ref={badExoplanetGrowyRect}
      />,
      <Rect layout fill={'#77B2BA'} padding={40} compositeOperation={'source-in'} direction={'column'} alignItems={'center'} textAlign={'center'}>
        <Txt fontFamily={'Atkinson Hyperlegible'} fontSize={100} fill={'#FFFFFF'}> 
      	  This is a
          &#10;
          bad exoplanet.
        </Txt>
      </Rect>
    </Layout>
  );
  
  yield* slideTransition(Direction.Right);

  yield* beginSlide('This is a bad exoplanet');
  yield* k218label().opacity(0,0.5);
  yield* badExoplanetGrowyRect().height(320,0.5);
  yield* beginSlide('END SLIDE');
  yield* badExoplanetGrowyRect().height(0,0.5);
});
