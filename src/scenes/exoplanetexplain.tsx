import {Circle, Gradient, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, beginSlide, createRef, createSignal, linear, loop, makeRef, range, sequence, sin, cos, startPlayback, useRandom, slideTransition, Direction, waitFor} from '@motion-canvas/core';

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
  
  
  const questionRect = createRef<Rect>();
  
  view.add(
    <Rect layout fill={'#77B2BA'} padding={10} y={-580} ref={questionRect}>
      <Txt fontFamily={'Atkinson Hyperlegible'} fontSize={50} fill={'#FFFFFF'}>
      	What is an exoplanet?
      </Txt>
    </Rect>
  );
  
  view.add(
    <Layout x={-700} absoluteRotation={() => -30+40*time()}>
      <Circle width={100} height={100} fill={'#FCB90F'} />
      <Circle width={300} height={300} lineWidth={2} stroke={'#FFFFFF'} />
      <Circle y={-150} width={25} height={25} fill={'#846F3E'} />
    </Layout>
  );
  
  const thisistext = createRef<Txt>();
  
  view.add(
    <Txt ref={thisistext} opacity={0} x={-500} y={-150} absoluteRotation={20} fontFamily={'Atkinson Hyperlegible'} fontSize={50} fill={'#FFFFFF'}>
      This is!
    </Txt>
  );
  
  yield* slideTransition(Direction.Left);
  yield* questionRect().y(-500, 0.5)
  yield* waitFor(0.5);
  yield* thisistext().opacity(1,0.5);

  yield* beginSlide('Question Slide');
});
