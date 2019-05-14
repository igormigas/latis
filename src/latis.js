/*
 * Latis
 * v0.3.0
 */

import * as utils from './modules/utils';
import buildItemDataStructure from './modules/buildItemDataStructure';
import horizontalRowController from './modules/horizontalRowController';

export default function (_reference, _callbackFunction) {
  let $ref;
  try {
    $ref = Grid(_reference, _callbackFunction);
    return {
      layout: (_settings = {}) => {
        $ref.layout(_settings);
      },
    };
  }
  catch (e) {
    console.error(e);
    return {
      layout: function () {},
    };
  }
}

function Grid(_reference, _callbackFunction) {
  const $container = testReference(_reference);
  const itemsRefs = [...$container.children];
  let acceptedItems;
  let deniedItems;

  const settings = {
    maxRowHeight: 350,
    minContainerWidth: 400,
    gutter: 15,
    overloadBehaviour: 'left',

    itemSelector: 'latis-item',
    imageSelector: 'latis-image',
    stretchedSelector: 'stretched',
    lazySelector: 'lazy',
    hiddenSelector: 'hidden',

    ignoreBlocks: false,
    ignoreImageStretching: false,
  };

  const state = {
    containerWidth: getCurrentContainerWidth(),
    finalContainerHeight: 0,
    structuresBuilded: false,
  };

  ////////////////////////////////////////
  // INIT PROCESS
  ////////////////////////////////////////

  prepareHtmlEnvironment($container);

  ////////////////////////////////////////
  // FUNCTIONS
  ////////////////////////////////////////

  function testReference(ref) {
    if (ref instanceof HTMLElement) {
      return ref;
    }
    throw new Error('The container reference is not a valid HTMLElement.');
  }

  function layout(_settings) {
    updateSettings(_settings);
    if (!state.structuresBuilded) {
      onTrueLoad(() => {
        buildStructures();
        utils.hideAll(deniedItems);
        calculateAcceptedItems();
        onReadyCallback();
      });
    } else {
      calculateAcceptedItems();
    }
  }

  function updateSettings(newSettings = {}) {
    for (let property in newSettings) {
      if (settings.hasOwnProperty(property)) {
        settings[property] = newSettings[property];
      }
    }
  }

  function buildStructures() {
    const results = buildItemDataStructure(itemsRefs, settings, getCurrentContainerWidth());
    acceptedItems = results[0];
    deniedItems = results[1];
    state.structuresBuilded = true;
  }

  function calculateAcceptedItems() {
    if (noItems()) {
      // Error - there is no items to process in given reference.
      console.error('There is no items in referenced container. Nothing to process.');
      return false;
    }
    calculateGridHorizontal(acceptedItems);
    setContainerHeight($container, state.finalContainerHeight);
    pushToDOM(acceptedItems);
    return null;
  }

  function calculateGridHorizontal(items) {
    const containerWidth = getCurrentContainerWidth();

    const Row = horizontalRowController(settings);
    Row.setWidth(containerWidth);

    // Check performance of array.forEach() and loop continue possibility
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

  function onTrueLoad(successCallback, failureCallback) {
    const imgNodes = $container.querySelectorAll('img.' + settings.imageSelector);

    if (document.readystate === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        utils.whenImagesLoaded(imgNodes, successCallback, failureCallback);
      });
    } else {
      utils.whenImagesLoaded(imgNodes, successCallback, failureCallback);
    }
  }

  function prepareHtmlEnvironment(container) {
    if (['absolute', 'fixed', 'relative'].includes(container.style.position) === false) {
      container.style.position = 'relative';
    }
  }

  function setContainerHeight(container, height) {
    container.style.height = utils.px(Math.ceil(height));
  }

  function pushToDOM(items) {
    items.forEach(item => {
      const css = item.style;
      const params = item.latis;
      css.width = utils.px(params.width);
      css.height = utils.px(params.height);
      css.top = utils.px(params.offsetTop);
      css.left = utils.px(params.offsetLeft);
    });
  }

  function noItems() {
    return !acceptedItems.length > 0;
  }

  function getCurrentContainerWidth() {
    return $container.offsetWidth;
  }

  function onReadyCallback() {
    if (typeof _callbackFunction === 'function') {
      _callbackFunction();
    }
  }

  return {
    layout,
  };
}
