import {Circle, Gradient, Img, Latex, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, beginSlide, createRef, createSignal, linear, loop, makeRef, range, sequence, sin, cos, startPlayback, useRandom, slideTransition, Direction, waitFor, Center} from '@motion-canvas/core';

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

  const gravityLatex = createRef<Rect>();

  const fmaEquation = createRef<Latex>();
  const fmaLable = createRef<Txt>();
  const gravEquation = createRef<Latex>();
  const gravLable = createRef<Txt>();
  const subbedFmaEquation = createRef<Latex>();
  const subbedGravEquation = createRef<Latex>();
  const combinedEquation = createRef<Latex>();
  const combinedEquation2 = createRef<Latex>();
  const planetEarthRatio1 = createRef<Latex>();
  const planetEarthRatio2 = createRef<Latex>();
  const planetEarthRatio3 = createRef<Rect>();
  const indexTitleRect = createRef<Rect>();
  
  view.add(
    <Rect layout fill={'#77B2BA'} padding={10} y={-580} ref={indexTitleRect}>
      <Txt fontFamily={'Atkinson Hyperlegible'} fontSize={50} fill={'#FFFFFF'}>
        Index
      </Txt>
    </Rect>
  );

  const topTenTitleRect = createRef<Rect>();
  
  view.add(
    <Rect layout fill={'#77B2BA'} padding={10} y={-580} ref={topTenTitleRect}>
      <Txt fontFamily={'Atkinson Hyperlegible'} fontSize={50} fill={'#FFFFFF'}>
        Top 10 Exoplanets
      </Txt>
    </Rect>
  );

  const gravityLatex = createRef<Layout>();

  view.add(
    <Rect ref={gravityLatex}>
      <Latex
      ref={fmaEquation}
      tex="{\color{white} F=ma}"
      opacity={0}
      position={[-450,-350]}
      width={400} // height and width can calculate based on each other
      />,
      <Txt fontFamily={'Atkinson Hyperlegible'}
      ref={fmaLable}
      fontSize={80} 
      position={[-450,-150]}
      opacity={0}
      fill={'#FFFFFF'}>
        Force Equation
      </Txt>
      ,
      <Latex
      ref={gravEquation}
      tex="{\color{white} F=G\frac{m_{1} \cdot m_{2}}{d^{2}}}"
      opacity={0}
      scale={1.4}
      position={[430,-350]}
      width={400} // height and width can calculate based on each other
      />,
      <Txt fontFamily={'Atkinson Hyperlegible'}
      ref={gravLable}
      fontSize={80} 
      position={[450,-150]}
      opacity={0}
      textAlign={'center'}
      fill={'#FFFFFF'}>
        Universal Gravitation&#10;Equation
      </Txt>
      ,
      <Latex
      ref={subbedFmaEquation}
      tex="{\color{white} F=m_{o}a}"
      opacity={0}
      position={[-450,-150]}
      width={400} // height and width can calculate based on each other
      />,
      <Latex
      ref={subbedGravEquation}
      tex="{\color{white} F=G\frac{m_{o} \cdot m_{p}}{{r_{p}}^{2}}}"
      opacity={0}
      position={[400,-140]}
      width={400} // height and width can calculate based on each other
      />,
      <Latex
      ref={combinedEquation}
      tex="{\color{white} m_{o}a=G\frac{m_{o} \cdot m_{p}}{{r_{p}}^{2}}}"
      opacity={0}
      y={100}
      scale={1.6}
      width={400} // height and width can calculate based on each other
      />,
      <Latex
      ref={combinedEquation2}
      tex="{\color{white} a=G\frac{m_{p}}{{r_{p}}^{2}}}"
      opacity={0}
      position={[0,50]}
      width={400} // height and width can calculate based on each other
      />,
      <Latex
      ref={planetEarthRatio1}
      tex="{\color{white} \frac{G\frac{m_{p}}{{r_{p}}^{2}}}{G\frac{m_{e}}{{r_{e}}^{2}}}}"
      opacity={0}
      position={[-260,250]}
      scale={0.6}
      width={400} // height and width can calculate based on each other
      />,
      <Latex
      ref={planetEarthRatio2}
      tex="{\color{white} =\frac{\frac{m_{p}}{{r_{p}}^{2}}}{1}}"
      opacity={0}
      position={[40,230]}
      scale={0.7}
      width={400} // height and width can calculate based on each other
      />,
      <Rect
      ref={planetEarthRatio3}
      position={[100,0]}
      opacity={0}
      >
        <Latex
        tex="{\color{white} =}"
        position={[130,264]}
        scale={1}
        width={80} // height and width can calculate based on each other
        />,
        <Latex
        tex="{\color{white} \frac{m_{p}}{{r_{p}}^{2}}}"
        opacity={100}
        position={[280,280]}
        scale={0.5}
        width={400} // height and width can calculate based on each other
        />,
      </Rect>
    </Rect>
  );

  const distanceExplanation = createRef<Txt>();

  view.add(
    <Txt fontFamily={'Atkinson Hyperlegible'} fontSize={100} opacity={0} fill={'#FFFFFF'} textAlign={'center'} ref={distanceExplanation}> 
      1 Parsec = 3.261 Light Years
    </Txt>
  );

  const waterExplanation = createRef<Txt>();

  view.add(
    <Txt fontFamily={'Atkinson Hyperlegible'} fontSize={100} opacity={0} fill={'#FFFFFF'} textAlign={'center'} ref={waterExplanation}> 
      250 K - 373 K
    </Txt>
  );

  const indexExplanation = createRef<Latex>();

  view.add(
    <Latex
    opacity={0}
    ref={indexExplanation}
    tex="{\color{white} \left| 1-g \right|\cdot d}"
    height={200} // height and width can calculate based on each other
    />,
  );

  const topTenList = createRef<Rect>();

  view.add(
    <Rect layout fill={'#77B2BA'} padding={20} direction={'column'} alignItems={'center'} textAlign={'center'} opacity={0} ref={topTenList}>
      <Txt fontFamily={'Atkinson Hyperlegible'} fontSize={50} fill={'#FFFFFF'}> 
        K2-18 b &#10;
        K2-18 b &#10;
        K2-3 d &#10;
        LHS 1140 b &#10;
        K2-18 b &#10;
        LHS 1140 b &#10;
        Kepler-1661 b &#10;
        Kepler-22 b &#10;
        TOI-2285 b &#10;
        LP 890-9 c
      </Txt>
    </Rect>
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

  /* -------------- Gravity -------------- */

  yield* beginSlide('Gravity');
  yield* planetattributelist().opacity(0, 0.5);
  yield* gravityTitleRect().y(-500, 0.5)


  yield* beginSlide('Fundemental Equations');
  yield fmaEquation().opacity(1,0.6);
  yield fmaEquation().position.y(-250,0.6);

  yield* waitFor(0.2)
  yield gravEquation().opacity(1,0.6);
  yield gravEquation().position.y(-230,0.6);

  yield* waitFor(0.2)

  yield fmaLable().opacity(1,0.6);
  yield fmaLable().position.y(-50,0.6);
  yield gravLable().opacity(1,0.6);
  yield* gravLable().position.y(-50,0.6);


  yield* beginSlide('Label Out, Next Equations');

  yield fmaLable().opacity(0,0.6);
  yield fmaLable().position.y(-150,0.6);

  yield gravLable().opacity(0,0.6);
  yield gravLable().position.y(-150,0.6);

  yield* waitFor(0.4)

  yield subbedFmaEquation().opacity(1,0.6);
  yield subbedFmaEquation().position.y(-50,0.6);

  yield* waitFor(0.2)

  yield subbedGravEquation().opacity(1,0.6);
  yield* subbedGravEquation().position.y(-30,0.6);


  yield* beginSlide('Combined Equation 1');

  yield combinedEquation().opacity(1,0.6);
  yield* combinedEquation().position.y(200,0.6);


  yield* beginSlide('Combined Equation 2');

  yield fmaEquation().opacity(0,0.6);
  yield fmaEquation().position.y(-350,0.6);
  yield gravEquation().opacity(0,0.6);
  yield gravEquation().position.y(-330,0.6);
  yield subbedFmaEquation().opacity(0,0.6);
  yield subbedFmaEquation().position.y(-150,0.6);
  yield subbedGravEquation().opacity(0,0.6);
  yield subbedGravEquation().position.y(-130,0.6);

  yield* waitFor(0.2)

  yield combinedEquation().position.y(-300,0.6);
  yield* waitFor(0.4)

  yield combinedEquation2().position.y(-50,0.6);
  yield* combinedEquation2().opacity(1,0.6);


  yield* beginSlide('Ratio 1');

  yield planetEarthRatio1().position.x(-360,0.6);
  yield* planetEarthRatio1().opacity(1,0.6);

  yield* beginSlide('Ratio 2');

  yield planetEarthRatio2().position.x(-60,0.6);
  yield* planetEarthRatio2().opacity(1,0.6);

  yield* beginSlide('Ratio 3');

  yield planetEarthRatio3().position.x(0,0.6);
  yield* planetEarthRatio3().opacity(1,0.6);

  /* --------- Distance From Earth --------- */

  yield* beginSlide('Distance from Earth');

  yield* gravityLatex().opacity(0, 0.5)

  yield* gravityTitleRect().y(-580, 0.5)
  yield* distanceTitleRect().y(-500, 0.5)

  yield* distanceExplanation().opacity(1, 0.5)

  yield* beginSlide('Right temperature for liquid water');

  yield* distanceExplanation().opacity(0, 0.5)

  yield* distanceTitleRect().y(-580, 0.5)
  yield* waterTitleRect().y(-500, 0.5)

  yield* waterExplanation().opacity(1, 0.5)

  yield* beginSlide('Index');

  yield* waterExplanation().opacity(0, 0.5)

  yield* waterTitleRect().y(-580, 0.5)
  yield* indexTitleRect().y(-500, 0.5)

  yield* indexExplanation().opacity(1, 0.5)

  yield* beginSlide('Top 10 Exoplanets');

  yield* indexExplanation().opacity(0, 0.5)

  yield* indexTitleRect().y(-580, 0.5)
  yield* topTenTitleRect().y(-500, 0.5)

  yield* topTenList().opacity(1, 0.5)
});
