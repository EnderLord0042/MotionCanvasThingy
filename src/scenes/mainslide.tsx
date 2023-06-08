import {Circle, Gradient, Img, Latex, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, beginSlide, createRef, createSignal, linear, loop, makeRef, range, sequence, sin, cos, startPlayback, useRandom, slideTransition, Direction, waitFor} from '@motion-canvas/core';

import exoplanetdatabase from '../images/exoplanetdatabase.png';
import datatable from '../images/datatable.png';

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
  
  const questionLayout = createRef<Layout>();
  const questionGrowyRect = createRef<Rect>();
  
  view.add(
    <Layout cache ref={questionLayout}>
      <Rect
        x={0}
        y={0}
        height={0}
        width={1920}
        fill={'#FFFFFF'}
        ref={questionGrowyRect}
      />,
      <Rect layout fill={'#77B2BA'} padding={40} compositeOperation={'source-in'} direction={'column'} alignItems={'center'} textAlign={'center'}>
        <Txt fontFamily={'Atkinson Hyperlegible'} fontSize={100} fill={'#FFFFFF'}> 
      	  Which exoplanet is most suitable
          &#10;
          for human colonization?
        </Txt>
      </Rect>
    </Layout>
  );

  
  const exoplanetdatabaseimg = createRef<Img>();

  view.add(
    <Img width={1920} height={1080} opacity={0} src={exoplanetdatabase} ref={exoplanetdatabaseimg} />
  );

  const datatableimg = createRef<Img>();

  view.add( 
    <Img width={1920} height={1080} opacity={0} src={datatable} ref={datatableimg} />
  );

  const planetattributelist = createRef<Txt>();

  view.add(
    <Txt fontFamily={'Atkinson Hyperlegible'} fontSize={100} opacity={0} fill={'#FFFFFF'} textAlign={'center'} ref={planetattributelist}> 
      Gravity
      &#10;
      Distance from Earth
      &#10;
      Right temperature for liquid water
    </Txt>
  );

  const gravityTitleRect = createRef<Rect>();
  
  view.add(
    <Rect layout fill={'#77B2BA'} padding={10} y={-580} ref={gravityTitleRect}>
      <Txt fontFamily={'Atkinson Hyperlegible'} fontSize={50} fill={'#FFFFFF'}>
      	Gravity
      </Txt>
    </Rect>
  );

  const distanceTitleRect = createRef<Rect>();
  
  view.add(
    <Rect layout fill={'#77B2BA'} padding={10} y={-580} ref={distanceTitleRect}>
      <Txt fontFamily={'Atkinson Hyperlegible'} fontSize={50} fill={'#FFFFFF'}>
        Distance from Earth
      </Txt>
    </Rect>
  );

  const waterTitleRect = createRef<Rect>();
  
  view.add(
    <Rect layout fill={'#77B2BA'} padding={10} y={-580} ref={waterTitleRect}>
      <Txt fontFamily={'Atkinson Hyperlegible'} fontSize={50} fill={'#FFFFFF'}>
        Right temperature for liquid water
      </Txt>
    </Rect>
  );

  const gravityLatex = createRef<Layout>();

  view.add(
    <Layout opacity={0} ref={gravityLatex}>
      <Latex
      tex="{\color{white} F=ma}"
      y={0}
      width={400} // height and width can calculate based on each other
      />,
      <Latex
      tex="{\color{white} F=G\frac{m_{1} \cdot m_{2}}{d^{2}}}"
      y={0}
      width={400} // height and width can calculate based on each other
      />,
      <Latex
      tex="{\color{white} F=m_{o}a}"
      y={0}
      width={400} // height and width can calculate based on each other
      />,
      <Latex
      tex="{\color{white} F=G\frac{m_{o} \cdot m_{p}}{d^{2}}}"
      y={0}
      width={400} // height and width can calculate based on each other
      />,
      <Latex
      tex="{\color{white} m_{o}a=G\frac{m_{o} \cdot m_{p}}{d^{2}}}"
      y={0}
      width={400} // height and width can calculate based on each other
      />,
      <Latex
      tex="{\color{white} a=G\frac{m_{p}}{r_{p}^{2}}"
      y={0}
      width={400} // height and width can calculate based on each other
      />,
      <Latex
      tex="{\color{white} \frac{\frac{m_{p}}{r_{p}^{2}}}{\frac{m_{e}}{r_{e}^{2}}}=\frac{\frac{m_{p}}{r_{p}^{2}}}{1}=\frac{m_{p}}{r_{p}^{2}}"
      y={0}
      width={400} // height and width can calculate based on each other
      />,
    </Layout>
  );
  
  yield* slideTransition(Direction.Right);
  yield* questionGrowyRect().height(320,0.5);

  yield* beginSlide('Where is the data?');
  yield* questionLayout().opacity(0);
  yield* exoplanetdatabaseimg().opacity(1);

  yield* beginSlide('The actual data table');
  yield* exoplanetdatabaseimg().opacity(0);
  yield* datatableimg().opacity(1);

  yield* beginSlide('What attributes will we look at?');
  yield* datatableimg().opacity(0);
  yield* planetattributelist().opacity(1);

  yield* beginSlide('Gravity');
  yield* planetattributelist().opacity(0, 0.5);
  yield* gravityTitleRect().y(-500, 0.5)

  yield* gravityLatex().opacity(1, 0.5)

  yield* beginSlide('Distance from Earth');

  yield* gravityLatex().opacity(0, 0.5)

  yield* gravityTitleRect().y(-580, 0.5)
  yield* distanceTitleRect().y(-500, 0.5)

  yield* beginSlide('Right temperature for liquid water');
  yield* distanceTitleRect().y(-580, 0.5)
  yield* waterTitleRect().y(-500, 0.5)
});
