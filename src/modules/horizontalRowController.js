
import horizontalRowContainer from './horizontalRowContainer';
import { getWidthByHeight } from './utils';

export default function (settings) {
  const Container = horizontalRowContainer();
  const StrContainer = horizontalRowContainer();

  let containerWidth;
  let currentOffsetTop = 0;

  function add(ref) {
    if (ref.latis.display === false) {
      return false;
    }
    if (ref.latis.scriptType === 'block' && settings.ignoreBlocks) {
      return false;
    }

    if (ref.latis.stretched) {
      StrContainer.put(ref);
      if (!ref.latis.lazy) {
        if (Container.isFilled()) {
          enterOverload();
        }
        pushCachedBlocks();
      }
    } else {
      Container.put(ref);
      if (getRowHeight() < settings.maxRowHeight) {
        enter();
      }
    }
    return true;
  }

  function enter() {
    if (Container.isFilled()) {
      buildRow();
      increaseOffsetTop(getRowHeight());
      Container.clear();
    }
    pushCachedBlocks();
  }

  function enterOverload() {
    if (Container.isFilled()) {
      const finalHeight = buildRow(settings.maxRowHeight, settings.overloadBehaviour);
      increaseOffsetTop(finalHeight);
      Container.clear();
    }
    pushCachedBlocks();
  }

  function forceEnter() {
    enter();
  }

  function buildRow(height, align) {
    let rowHeight = 0;
    let currentOffsetLeft = 0;

    if (Container.isFilled()) {
      rowHeight = getRowHeight();

      if (align !== 'auto' && height) {
        rowHeight = height;
        const rowWidth = getRowWidth(rowHeight);
        switch (align) {
          case 'right':
            currentOffsetLeft = containerWidth - rowWidth;
            break;

          case 'center':
            currentOffsetLeft = (containerWidth - rowWidth) / 2;
            break;
        }
      }

      Container.get().forEach(item => {
        const itemWidth = getWidthByHeight(rowHeight, item.latis.ratio);
        set(item).size(itemWidth, rowHeight).position(currentOffsetLeft, currentOffsetTop);
        currentOffsetLeft += itemWidth + settings.gutter;
      });
    }
    return rowHeight;
  }

  function pushCachedBlocks() {
    if (StrContainer.isFilled()) {
      StrContainer.get().forEach(item => {
        let rowHeight = item.scrollHeight;
        set(item).size(containerWidth,'auto').position(0,currentOffsetTop);
        increaseOffsetTop(rowHeight);
      });
      StrContainer.clear();
    }
  }

  function set(item) {
    const ref = item.latis;

    function size(w, h) {
      ref.width = w;
      ref.height = h;
      return scope;
    }

    function position(x, y) {
      ref.offsetTop = y;
      ref.offsetLeft = x;
      return scope;
    }

    const scope = {
      size,
      position
    };
    return scope;
  }

  function getRowHeight(width = containerWidth) {
    const len = Container.count();
    const ratio = getContentRatio();
    const workWidth = width - (len - 1) * settings.gutter;
    return (ratio > 0) ? workWidth / ratio : null;
  }

  function getRowWidth(height) {
    const len = Container.count();
    const ratio = getContentRatio();
    return (ratio > 0) ? height * ratio + (len - 1) * settings.gutter : null;
  }

  function getContentRatio() {
    let ratio = 0;
    const items = Container.get();
    items.forEach(item => ratio += item.latis.ratio);
    return ratio;
  }

  function clear() {
    Container.clear();
  }

  function isEmpty() {
    return Container.isEmpty();
  }

  function increaseOffsetTop(height) {
    currentOffsetTop += height + settings.gutter;
  }

  function setWidth(value) {
    containerWidth = parseInt(value, 10);
    return containerWidth;
  }

  function getOffsetTop() {
    return currentOffsetTop;
  }

  function getFinalHeight() {
    return currentOffsetTop - settings.gutter;
  }

  return {
    add,
    clear,
    forceEnter,
    enterOverload,
    setWidth,
    getOffsetTop,
    getFinalHeight,
    isEmpty,
  };
}
