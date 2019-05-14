
import imagesLoaded from './imagesLoaded';

export function hide(item) {
  if (item instanceof HTMLElement) {
    item.style.display = 'none';
    return true;
  }
  return false;
}

export function hideAll(items) {
  if (Array.isArray(items) && items.length) {
    let bad = 0;
    items.forEach(item => {
      if (!hide(item)) {
        bad++;
      }
    });
    return bad === 0;
  } else {
    return hide(items);
  }
}

export function whenImagesLoaded(nodes, sCallback, fCallback) {
  imagesLoaded(nodes)
    .then(sCallback)
    .catch(e => {
      if (typeof fCallback === 'function') {
        fCallback(e);
      } else {
        throw new Error(e);
      }
    });
}

export function px(val) {
  return val + 'px';
}

export function getWidthByHeight(dim, ratio) {
  return dim * ratio;
}

export function getHeightByWidth(dim, ratio) {
  return dim / ratio;
}
