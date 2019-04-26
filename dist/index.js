(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["latis"] = factory();
	else
		root["latis"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/modules/buildItemDataStructure.js
/* harmony default export */ var buildItemDataStructure = (function (array, settings, containerWidth) {
  if (!array.length) {
    return false;
  }

  var acceptedArray = [];
  var deniedArray = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (!item instanceof HTMLElement) {
        continue;
      }

      if (item.classList.contains(settings.itemSelector)) {
        acceptedArray.push(item);
      } else {
        deniedArray.push(item);
        continue;
      }

      var params = {}; // Define item position as absolute right now
      // to prevent collapsing margin issue

      item.style.position = 'absolute';
      item.style.boxSizing = 'border-box';
      params.nodeType = item.nodeName;
      params.display = !item.classList.contains(settings.hiddenSelector);
      params.stretched = item.classList.contains(settings.stretchedSelector);
      params.lazy = item.classList.contains(settings.lazySelector);
      var reference = item.querySelector('img.' + settings.imageSelector);

      if (reference) {
        params.coverImage = reference;
      } else if (item.nodeName === 'IMG') {
        params.coverImage = item;
      } // Define item type based on cover image existence


      if (params.coverImage instanceof HTMLElement) {
        params.scriptType = 'image';
        var $img = params.coverImage;
        params.originalWidth = $img.naturalWidth;
        params.originalHeight = $img.naturalHeight; // Cover image style changes should be moved to different module
        // Todo with infinite scroll functionality

        $img.style.display = 'block';
        $img.style.width = '100%';
        $img.style.maxHeight = '100%';
      } else {
        params.scriptType = 'block';
        params.originalWidth = parseInt(item.style.width, 10) || containerWidth;
        params.originalHeight = parseInt(item.style.height, 10) || item.scrollHeight; // Force block without full dimension set
        // to be stretch

        if (!item.style.width || !item.style.height) {
          params.stretched = true;
        }
      }

      params.ratio = params.originalWidth / params.originalHeight; // Apply new params to node element

      item.latis = params;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return [acceptedArray, deniedArray];
});
// CONCATENATED MODULE: ./src/modules/horizontalRowContainer.js
/* harmony default export */ var horizontalRowContainer = (function () {
  var items = [];
  var ratio = 0;

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
    var sumRatio = 0;
    items.forEach(function (item) {
      sumRatio += item.latis.ratio;
    });
    ratio = sumRatio;
  }

  function isEmpty() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : items.length;
    return !arr;
  }

  function isFilled() {
    return !isEmpty();
  }

  function getContentRatio() {
    return ratio;
  }

  return {
    clear: clear,
    put: put,
    get: get,
    count: count,
    isEmpty: isEmpty,
    isFilled: isFilled,
    getContentRatio: getContentRatio
  };
});
// CONCATENATED MODULE: ./src/modules/functions.js
function getWidthByHeight(dim, ratio) {
  return dim * ratio;
}
function getHeightByWidth(dim, ratio) {
  return dim / ratio;
}
function px(val) {
  return val + 'px';
}
// CONCATENATED MODULE: ./src/modules/horizontalRowController.js


/* harmony default export */ var horizontalRowController = (function (Settings) {
  var Container = horizontalRowContainer();
  var itemsCached = [];
  var containerWidth;
  var currentOffsetTop = 0;

  function add(ref) {
    if (ref.latis.display === false) {
      return false;
    }

    if (ref.latis.scriptType !== 'image' && Settings.ignoreBlocks) {
      return false;
    }

    if (ref.latis.stretched) {
      itemsCached.push(ref);

      if (!ref.latis.lazy) {
        if (Container.isFilled()) {
          enterOverload();
        } else {
          pushCachedBlocks();
        }
      }
    } else {
      Container.put(ref);

      if (getRowHeight() < Settings.maxRowHeight) {
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
      var finalHeight = buildRow(Settings.maxRowHeight, Settings.overloadBehaviour);
      increaseOffsetTop(finalHeight);
      Container.clear();
    }

    pushCachedBlocks();
  }

  function forceEnter() {
    enter();
  }

  function buildRow(height) {
    var align = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
    var rowHeight = 0;

    if (Container.isFilled()) {
      var currentOffsetLeft = 0;
      rowHeight = getRowHeight();

      if (align !== 'auto' && height) {
        rowHeight = height;
        var rowWidth = getRowWidth(rowHeight);

        switch (align) {
          case 'right':
            currentOffsetLeft = containerWidth - rowWidth;
            break;

          case 'center':
            currentOffsetLeft = (containerWidth - rowWidth) / 2;
            break;
        }
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Container.get()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;
          var itemWidth = getWidthByHeight(rowHeight, item.latis.ratio);
          setItemParams(item, itemWidth, rowHeight, currentOffsetTop, currentOffsetLeft);
          currentOffsetLeft += itemWidth + Settings.gutter;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    return rowHeight;
  }

  function pushCachedBlocks() {
    if (itemsCached.length > 0) {
      itemsCached.forEach(function (item) {
        var rowHeight = containerWidth / item.latis.ratio;
        setItemParams(item, containerWidth, rowHeight, currentOffsetTop, 0);
        increaseOffsetTop(rowHeight);
      });
      itemsCached = [];
    }
  }

  function getRowHeight() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : containerWidth;
    var len = Container.count();
    var ratio = Container.getContentRatio();
    var workWidth = width - (len - 1) * Settings.gutter;
    return ratio > 0 ? workWidth / ratio : null;
  }

  function getRowWidth(height) {
    var len = Container.count();
    var ratio = Container.getContentRatio();
    return ratio > 0 ? height * ratio + (len - 1) * Settings.gutter : null;
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
    add: add,
    clear: clear,
    get: get,
    forceEnter: forceEnter,
    enterOverload: enterOverload,
    setWidth: setWidth,
    getRowHeight: getRowHeight,
    getOffsetTop: getOffsetTop,
    getFinalHeight: getFinalHeight,
    isEmpty: isEmpty
  };
});
// CONCATENATED MODULE: ./src/latis.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
 * Latis
 * v0.2.4
 */



/* harmony default export */ var latis = (function (_reference, _callback) {
  return {
    horizontal: function horizontal() {
      var _settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      Grid(_reference, 'horizontal', _settings, _callback);
    }
  };
});

function Grid(_reference, _method) {
  var _settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _callback = arguments.length > 3 ? arguments[3] : undefined;

  var $container = _reference;

  var itemsRefs = _toConsumableArray($container.children);

  var settings = {
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
    ignoreImageStretching: _settings.ignoreImageStretching || false
  };
  var state = {
    containerWidth: $container.offsetWidth,
    finalContainerHeight: 0
  }; //
  // PROCESS
  //
  // Todo:
  // - redesign process flow
  // - export some parts to external modules
  // - optimize and split tasks

  var _buildItemDataStructu = buildItemDataStructure(itemsRefs, settings, state.containerWidth),
      _buildItemDataStructu2 = _slicedToArray(_buildItemDataStructu, 2),
      items = _buildItemDataStructu2[0],
      deniedItems = _buildItemDataStructu2[1];

  prepareHtmlEnvironment();
  hideItems(deniedItems);
  calculateGridHorizontal(_toConsumableArray(items));
  setContainerHeightStyle(state.finalContainerHeight);
  pushToDOM(items); //
  // CALLBACK
  //

  if (typeof _callback === 'function') {
    _callback();
  } //
  // FUNCTIONS
  //


  function prepareHtmlEnvironment() {
    if (['absolute', 'fixed', 'relative'].includes($container.style.position) === false) {
      $container.style.position = 'relative';
    }
  }

  function calculateGridHorizontal(items) {
    var containerWidth = state.containerWidth;
    var Row = horizontalRowController(settings);
    Row.setWidth(containerWidth);

    for (var i = 0, countItems = items.length; i < countItems; i++) {
      var result = Row.add(items[i]);

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
    items.forEach(function (item) {
      var css = item.style;
      var params = item.latis; //css.position = 'absolute';

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
    array.forEach(function (ref) {
      return hide(ref);
    });
  }
}
// CONCATENATED MODULE: ./src/index.js

/* harmony default export */ var src = __webpack_exports__["default"] = (latis);

/***/ })
/******/ ])["default"];
});