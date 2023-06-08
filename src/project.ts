import {makeProject} from '@motion-canvas/core';

import spaceintro from './scenes/spaceintro?scene';
import exoplanetexplain from './scenes/exoplanetexplain?scene';
import mainslide from './scenes/mainslide?scene';
import finalslide from './scenes/finalslide?scene';

import './global.css';

export default makeProject({
  scenes: [spaceintro,exoplanetexplain,mainslide,finalslide],
});
