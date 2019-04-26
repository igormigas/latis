/*
 * Latis
 * v0.2.4
 */

import buildItemDataStructure from './modules/buildItemDataStructure';
import horizontalRowController from './modules/horizontalRowController';
import { px } from './modules/functions';

export default function (_reference, _callback) {
  return {
    horizontal: (_settings = {}) => {
      Grid(_reference, 'horizontal', _settings, _callback);
    },
  };
}

function Grid(_reference, _method, _settings = {}, _callback) {
  const $container = _reference;
  const itemsRefs = [...$container.children];

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
  };

  //
  // PROCESS
  //
  // Todo:
  // - redesign process flow
  // - export some parts to external modules
  // - optimize and split tasks

  let [items, deniedItems] = buildItemDataStructure(itemsRefs, settings, state.containerWidth);
  prepareHtmlEnvironment();
  hideItems(deniedItems);
  calculateGridHorizontal([...items]);
  setContainerHeightStyle(state.finalContainerHeight);
  pushToDOM(items);

  //
  // CALLBACK
  //
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
      let result = Row.add(items[i]);
      if (!result) {
        hide(items[i]);
        continue;
      }
      if (result && containerWidth < settings.minContainerWidth) {
        Row.forceEnter();
      }
    }
    Row.enterOverload();
    state.finalContainerHeight = Row.getFinalHeight();
  }

  function setContainerHeightStyle(value) {
    $container.style.height = px(Math.ceil(value));
  }

  function pushToDOM(items) {
    items.forEach(item => {
      const css = item.style;
      const params = item.latis;
      //css.position = 'absolute';
      css.width = px(params.width);
      css.height = px(params.height);
      css.top = px(params.offsetTop);
      css.left = px(params.offsetLeft);
    });
  }

  function hide(ref) {
    ref.style.display = 'none';
  }

  function hideItems(array) {
    array.forEach(ref => hide(ref));
  }
}
