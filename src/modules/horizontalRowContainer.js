export default function () {
  let items = [];
  let ratio = 0;

  function clear() {
    items = [];
    ratio = 0;
  }

  function put(elem) {
    items.push(elem);
    recalculateRatio();
  }

  function get(pos) {
    if (Number.isInteger(pos)) {
      return items[pos] || null;
    }
    return items;
  }

  function count() {
    return items.length;
  }

  function recalculateRatio() {
    let sumRatio = 0;
    items.forEach(item => {
      sumRatio += item.latis.ratio;
    });
    ratio = sumRatio;
  }

  function isEmpty(arr = items.length) {
    return !arr;
  }

  function isFilled() {
    return !isEmpty();
  }

  function getContentRatio() {
    return ratio;
  }

  return {
    clear,
    put,
    get,
    count,
    isEmpty,
    isFilled,
    getContentRatio,
  };
}
