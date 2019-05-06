/*
 * Latis
 * v0.3.0
 */

import buildItemDataStructure from './modules/buildItemDataStructure';
import horizontalRowController from './modules/horizontalRowController';
import imagesLoaded from './modules/imagesLoaded';
import { px } from './modules/functions';

export default function (_reference, _settings, _callbackFunction) {
  const $ref = Grid(_reference, _settings, _callbackFunction);
  return {
    layout: (_settings = {}) => {
      $ref.layout(_settings);
    },
  };
}

function Grid(_reference, _settings = {}, _callbackFunction) {
  const $container = _reference;
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
    imagesLoaded: false,
  };

  ////////////////////////////////////////
  // INIT PROCESS
  ////////////////////////////////////////

  prepareHtmlEnvironment();



  ////////////////////////////////////////
  // FUNCTIONS
  ////////////////////////////////////////

  function layout(settings) {
    updateSettings(settings);
    if (!state.structuresBuilded) {
      onWindowTrueLoad(() => {
        buildStructures();
        hideDeniedItems(deniedItems);
        calculateAcceptedItems();
        callback();
      });
    } else {
      calculateAcceptedItems();
    }
  }

  function calculateAcceptedItems() {
    if (noItems()) {
      // Error - there is no items to process in given reference.
      console.error('There is no items in referenced container. Nothing to process.');
      return false;
    }
    calculateGridHorizontal(acceptedItems);
    setContainerHeightStyle(state.finalContainerHeight);
    pushToDOM(acceptedItems);
  }

  // Current version based on DOMConteneLoaded and imagesLoaded
  // lets init the calculation when scripts and JS styles
  // were applied and images are loaded,
  // but probably before final load event, which is better.
  function onWindowTrueLoad(successCallback, failureCallback) {
    window.addEventListener('DOMContentLoaded', () => {
      const imgNodes = $container.querySelectorAll('img.' + settings.imageSelector);
      imagesLoaded(imgNodes)
        .then(successCallback)
        .catch(e => {
          if (typeof failureCallback === 'function') {
            failureCallback(e);
          } else {
            console.error(e);
          }
        });
    });
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

  function prepareHtmlEnvironment() {
    if (['absolute', 'fixed', 'relative'].includes($container.style.position) === false) {
      $container.style.position = 'relative';
    }
  }

  function calculateGridHorizontal(items) {
    const containerWidth = getCurrentContainerWidth();

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

  function pushToDOM(nodes) {
    nodes.forEach(item => {
      const css = item.style;
      const params = item.latis;
      css.width = px(params.width);
      css.height = px(params.height);
      css.top = px(params.offsetTop);
      css.left = px(params.offsetLeft);
    });
  }

  function hide(ref) {
    ref.style.display = 'none';
  }

  function hideDeniedItems(array) {
    array.forEach(ref => hide(ref));
  }

  function noItems() {
    return !acceptedItems.length > 0;
  }

  function getCurrentContainerWidth() {
    return $container.offsetWidth;
  }

  function callback() {
    if (typeof _callbackFunction === 'function') {
      _callbackFunction();
    }
  }

  return {
    layout,
  };
}
