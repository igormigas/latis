/*
 * Grid-Horizontal v0.9.2
 * test
 */

import buildItemDataStructure from './modules/buildItemDataStructure';
import horizontalRowController from './modules/horizontalRowController';
import { px } from './modules/functions';

export default function (_reference, _callback) {
  return {
    horizontal: (_settings = {}) => {
      Grid(_reference, 'horizontal', _settings, _callback);
    },
    vertical: (_settings = {}) => {
      Grid(_reference, 'vertical', _settings, _callback);
    },
  };
}

function Grid(_reference, _method, _settings = {}, _callback) {
  let $container = _reference;

  const settings = {
    maxRowHeight: _settings.maxRowHeight || 350,
    minContainerWidth: _settings.minContainerWidth || 400,
    gutter: _settings.gutter || 15,
    overloadBehaviour: _settings.overloadBehaviour || 'left',

    itemSelector: _settings.itemSelector || 'latis-item',
    imageSelector: _settings.imageSelector || 'latis-image',
    stretchedSelector: _settings.stretchedSelector || 'stretched',
    lazySelector: _settings.lazySelector || 'lazy',
    hiddenSelector: _settings.hiddenSelector || 'hidden',

    ignoreBlocks: _settings.ignoreBlocks || false,
    ignoreImageStretching: _settings.ignoreImageStretching || false,
  };

  const state = {
    containerWidth: $container.offsetWidth,
    finalContainerHeight: 0,
    overloadHidden: false,
  };

  // PROCESS

  let items = buildItemDataStructure([...$container.children], settings);
  prepareHtmlEnvironment();
  calculateGridHorizontal([...items]);
  setContainerHeightStyle(state.finalContainerHeight);
  pushToDOM(items);

  if (typeof _callback === 'function') {
    _callback();
  }

  //
  // FUNCTIONS
  //

  function prepareHtmlEnvironment() {
    if (['absolute', 'fixed', 'relative'].includes($container.style.position) === false) {
      $container.style.position = 'relative';
    }
  }

  function calculateGridHorizontal(items) {
    const { containerWidth } = state;

    const Row = horizontalRowController(settings);
    Row.setWidth(containerWidth);

    for (let i = 0, countItems = items.length; i < countItems; i++) {
      if (items[i].latis.type !== 'image' && settings.ignoreBlocks) {
        hide(items[i]);
        continue;
      }
      Row.add(items[i]);
      console.dir(items[i]);
      if (containerWidth < settings.minContainerWidth) {
        Row.forceEnter();
      }
    }
    if (!Row.isEmpty()) {
      Row.enterOverload();
    }

    state.finalContainerHeight = Row.getFinalHeight();
  }

  function setContainerHeightStyle(value) {
    $container.style.height = px(Math.ceil(value));
  }

  function pushToDOM(items) {
    for (let i = 0; i < items.length; ++i) {
      let item = items[i].style;
      let lib = items[i].latis;
      item.position = 'absolute';
      item.width = px(lib.width);
      item.height = px(lib.height);
      item.top = px(lib.offsetTop);
      item.left = px(lib.offsetLeft);
    }
  }

  function hide(ref) {
    ref.style.display = "none";
  }
}
