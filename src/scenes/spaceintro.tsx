import {Circle, Gradient, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, beginSlide, createRef, createSignal, linear, loop, makeRef, range, sequence, sin, startPlayback, useRandom} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  view.fill('#000000'); // set the background of this scene
  
  const starCount = 50;

  const random = useRandom();
  const stars: Circle[] = [];

  const starData = 
    [...Array(starCount)].map(() => ({
      random1: random.nextInt(6, 25),
      random2: random.nextInt(10, 20),
      random3: random.nextFloat(4, 8),
      random4: random.nextFloat(0, 30)
    }));

  const time = createSignal(0)

  view.add(
    <Layout>
      {range(starCount).map(i => (
        <Circle
          ref={makeRef(stars, i)}
          width={() => starData[i].random1 + starData[i].random2 * sin(starData[i].random4 + time() * starData[i].random3)}
          ratio={1}
          x={random.nextInt(-960, 960)}
          y={random.nextInt(-540, 540)}
          fill={() => new Gradient({
            type: 'radial',
            toRadius: stars[i].width(),
            stops: [
              {offset: 0, color: '#888888'},
              {offset: 0.3, color: '#222222'},
              {offset: 1, color: '#000000'},
            ],
          })}
        />
      ))}
    </Layout>,
  );

  const timeTask = yield loop(Infinity, () => time(time()+1,1,linear));

  const text = createRef<Txt>();
  const growyRect = createRef<Rect>();

  view.add(
    <Layout cache>
    <Txt lineHeight={'150%'} x={0} y={0} fontFamily={'Atkinson Hyperlegible'} fontSize={200} fill={'#FFFFFF'} ref={text}>
      SPACE
    </Txt>,
      <Rect
        x={0}
        y={0}
        height={300}
        width={0}
        fill={'#FFFFFF'}
        ref={growyRect}
        compositeOperation={'source-in'}
      />,
    </Layout>
  );

  yield* beginSlide('Space Intro');
  yield* growyRect().width(700, 1);
  
  yield* beginSlide('Exoplanet Explanation');
});
