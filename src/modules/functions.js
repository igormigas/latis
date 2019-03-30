export function getWidthByHeight(dim, ratio) {
  return dim * ratio;
}

export function getHeightByWidth(dim, ratio) {
  return dim / ratio;
}

export function px(val) {
  return val + 'px';
}
