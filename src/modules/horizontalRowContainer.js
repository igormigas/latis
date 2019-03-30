export default function () {
  let items = [];
  let ratio = 0;

  function put(elem) {
    items.push(elem);
    recalculateRatio();
  }

  function get(pos) {
    if (pos !== undefined) {
      return items[pos] || null;
    }
    return items;
  }

  function clear() {
    items = [];
    ratio = 0;
  }

  function count() {
    return items.length;
  }

  function isEmpty() {
    if (items.length > 0) {
      return false;
    }
    return true;
  }

  function isFilled() {
    return !isEmpty();
  }

  /*
  function getRowHeight(width, gutterWidth = 0) {
    let workWidth = width - (count() - 1) * gutterWidth;
    return width ? workWidth / ratio : false;
  }*/

  function getRowWidth(height) {
    return height ? height * ratio : false;
  }

  function getContentRatio() {
    return ratio;
  }

  function recalculateRatio() {
    let sumRatio = 0;
    items.forEach(item => {
      sumRatio += item.latis.ratio;
    });
    ratio = sumRatio;
  }

  return {
    put,
    get,
    clear,
    count,
    isEmpty,
    isFilled,
    getRowWidth,
    getContentRatio,
  };
}
