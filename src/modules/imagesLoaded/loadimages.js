/*
Solution based on Ajay Beniwal example
https://stackoverflow.com/a/11072533
*/

import when from 'when';
import loadImage from './loadImage';

const loadImages = (srcs) => {
  let deferreds = [];
  for (var i = 0, len = srcs.length; i < len; i++) {
    deferreds.push(loadImage(srcs[i].src));
  }
  return when.all(deferreds);
};

export default loadImages;
