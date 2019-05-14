export default function () {
  let items = [];

  function put(elem) {
    items.push(elem);
  }

  function get(pos) {
    if (Number.isInteger(pos)) {
      return items[pos] || null;
    }
    return items;
  }

  function clear() {
    items = [];
  }

  function count() {
    return items.length;
  }

  function isEmpty() {
    return !isFilled();
  }

  function isFilled() {
    return items.length > 0;
  }

  return {
    put,
    get,
    clear,
    count,
    isEmpty,
    isFilled,
  };
}
