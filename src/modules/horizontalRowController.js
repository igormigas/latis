
import horizontalRowContainer from './horizontalRowContainer';
import { getWidthByHeight } from './functions';

export default function (Settings) {
  const Container = horizontalRowContainer();
  let itemsCached = [];

  let containerWidth;
  let currentOffsetTop = 0;

  function add(ref) {
    if (ref.latis.display === false) {
      return false;
    }
    if (ref.latis.type !== 'image' && Settings.ignoreBlocks) {
      return false;
    }

    if (ref.latis.stretched) {
      if (ref.latis.lazy && Container.isFilled()) {
        itemsCached.push(ref);
      } else {
        enterOverload();
        itemsCached.push(ref);
        pushCachedBlocks();
      }
    } else {
      Container.put(ref);
      if (getRowHeight() < Settings.maxRowHeight) {
        enter();
        pushCachedBlocks();
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
  }

  function enterOverload() {
    if (Container.isFilled()) {
      const finalHeight = buildRow(Settings.maxRowHeight, Settings.overloadBehaviour);
      increaseOffsetTop(finalHeight);
      Container.clear();
      pushCachedBlocks();
    }
  }

  function forceEnter() {
    enter();
  }

  function buildRow(height, align = 'auto') {
    let rowHeight = 0;
    if (Container.isFilled()) {
      let currentOffsetLeft = 0;
      rowHeight = getRowHeight();

      if (align !== 'auto' && height) {
        rowHeight = height;
        let rowWidth = getRowWidth(rowHeight);
        switch (align) {
          case 'right':
            currentOffsetLeft = containerWidth - rowWidth;
            break;

          case 'center':
            currentOffsetLeft = (containerWidth - rowWidth) / 2;
            break;
        }
      }

      for (let item of Container.get()) {
        let itemWidth = getWidthByHeight(rowHeight, item.latis.ratio);
        setItemParams(
          item,
          itemWidth,
          rowHeight,
          currentOffsetTop,
          currentOffsetLeft
        );
        currentOffsetLeft += itemWidth + Settings.gutter;
      }
    }
    return rowHeight;
  }

  function pushCachedBlocks() {
    if (itemsCached.length > 0) {
      itemsCached.forEach(item => {
        let rowHeight = containerWidth / item.latis.ratio;
        setItemParams(
          item,
          containerWidth,
          rowHeight,
          currentOffsetTop,
          0
        );
        increaseOffsetTop(rowHeight);
      });
      itemsCached = [];
    }
  }

  function getRowHeight(width = containerWidth) {
    const len = Container.count();
    const ratio = Container.getContentRatio();
    const workWidth = width - (len - 1) * Settings.gutter;
    return (ratio > 0) ? workWidth / ratio : null;
  }

  function getRowWidth(height) {
    const len = Container.count();
    const ratio = Container.getContentRatio();
    return (ratio > 0) ? height * ratio + (len - 1) * Settings.gutter : null;
  }

  function clear() {
    Container.clear();
  }

  function isEmpty() {
    return Container.isEmpty();
  }

  function setItemParams(item, width, height, offTop, offLeft) {
    item.latis.width = width;
    item.latis.height = height;
    item.latis.offsetTop = offTop;
    item.latis.offsetLeft = offLeft;
  }

  function increaseOffsetTop(height) {
    currentOffsetTop += height + Settings.gutter;
  }

  function get(pos) {
    if (pos !== undefined) {
      return items[pos] || null;
    }
    return items;
  }

  function setWidth(value) {
    containerWidth = parseInt(value, 10);
    return containerWidth;
  }

  function getOffsetTop() {
    return currentOffsetTop;
  }

  function getFinalHeight() {
    return currentOffsetTop - Settings.gutter;
  }

  return {
    add,
    clear,
    get,
    forceEnter,
    enterOverload,
    setWidth,
    getRowHeight,
    getOffsetTop,
    getFinalHeight,
    isEmpty,
  };
}
