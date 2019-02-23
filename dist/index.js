(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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

// CONCATENATED MODULE: ./src/grid.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
 * Grid-Horizontal v0.9.2
 * test
 */
/* harmony default export */ var grid = (function (_reference) {
  var _callbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return {
    horizontal: function horizontal() {
      var _settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      Grid(_reference, 'horizontal', _settings, _callbacks);
    },
    vertical: function vertical() {
      var _settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      Grid(_reference, 'vertical', _settings, _callbacks);
    }
  };
});

function Grid(_reference, _method) {
  var _settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _callbacks = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var $container = _reference.current;
  var items = $container.childNodes;
  var settings = {
    classItem: _settings.item || '.item',
    classCover: _settings.coverClass || '.cover',
    minContainerWidth: _settings.minContainerWidth || 400,
    maxRowHeight: _settings.maxRowHeight || 350,
    gutter: _settings.gutter || 15,
    hideOverload: _settings.hideOverload || false,
    minColumnWidth: _settings.minColumnWidth || 200
  };
  var state = {
    containerWidth: $container.offsetWidth,
    finalContainerHeight: 0
  };

  if (['absolute', 'fixed', 'relative'].includes($container.style.position) === false) {
    $container.style.position = 'relative';
  }

  buildItemDataStructure();

  if (_method == 'horizontal') {
    calculateGridHorizontal(_toConsumableArray(items));
  } else {
    calculateGridVertical(_toConsumableArray(items));
  }

  $container.style.height = px(Math.ceil(state.finalContainerHeight));
  pushToDOM(items); // Define size and ratio of each element

  function buildItemDataStructure() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;
        var params = {};
        var $image = item.querySelector('img.cover');

        if ($image !== null) {
          params.originalWidth = $image.naturalWidth;
          params.originalHeight = $image.naturalHeight;
        } else {
          params.originalWidth = item.clientWidth;
          params.originalHeight = item.clientHeight;
        }

        params.ratio = params.originalWidth / params.originalHeight;
        item.GH = params;
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

  function calculateGridVertical(array) {
    var containerWidth = state.containerWidth;
    var minColumnWidth = settings.minColumnWidth,
        gutter = settings.gutter; // Calculate number of columns within the container

    var calcColumnNumber = Math.floor((containerWidth + gutter) / (minColumnWidth + gutter));
    var calcColumnWidth = (containerWidth - (calcColumnNumber - 1) * gutter) / calcColumnNumber;
    var columns = [];

    for (var i = 0; i < calcColumnNumber; i++) {
      columns[i] = {
        leftOffset: i * (calcColumnWidth + gutter),
        currentTopOffset: 0
      };
    } // Calculate positions


    for (var _i = 0, countItems = array.length; _i < countItems; _i++) {
      var item = array[_i];
      var columnId = getShortestColumnId();
      var calcItemHeight = getHeightByWidth(calcColumnWidth, item.GH.ratio);
      setGHParams(item, calcColumnWidth, calcItemHeight, columns[columnId].currentTopOffset, columns[columnId].leftOffset);
      increaseColumnTopOffset(columnId, calcItemHeight + gutter);
    }

    console.warn(getLongestColumnValue());
    state.finalContainerHeight = getLongestColumnValue(); // FUNCTIONS

    function increaseColumnTopOffset(id, value) {
      columns[id].currentTopOffset += value;
    }

    function getShortestColumnId() {
      var id = 0;
      var offset = columns[0].currentTopOffset;
      columns.forEach(function (col, index) {
        if (col.currentTopOffset < offset) {
          id = index;
          offset = col.currentTopOffset;
        }
      });
      return id;
    }

    function getLongestColumnValue() {
      var offset = 0;
      columns.forEach(function (col, index) {
        if (col.currentTopOffset > offset) {
          offset = col.currentTopOffset;
        }
      });
      return offset;
    }
  }

  function calculateGridHorizontal(array) {
    var containerWidth = state.containerWidth;
    var minContainerWidth = settings.minContainerWidth,
        maxRowHeight = settings.maxRowHeight,
        gutter = settings.gutter,
        hideOverload = settings.hideOverload;
    var subArray;
    var currentRowHeight = 0,
        currentOffsetTop = 0,
        currentOffsetLeft = 0;

    for (var i = 1, countItems = array.length; i <= countItems; i++) {
      subArray = array.slice(0, i);

      if (containerWidth < minContainerWidth) {
        var item = subArray[0];
        setGHParams(item, containerWidth, getHeightByWidth(containerWidth, item.GH.ratio), currentOffsetTop, 0);
        currentRowHeight = item.GH.originalHeight;
      } else if ((currentRowHeight = sliceHeightCalc(subArray)) < maxRowHeight) {
        var _currentOffsetLeft = 0;

        for (var _i2 = 0, len = array.length; _i2 < len; _i2++) {
          var _item = array[_i2];
          setGHParams(_item, getWidthByHeight(currentRowHeight, _item.GH.ratio), currentRowHeight, currentOffsetTop, _currentOffsetLeft);
          _currentOffsetLeft += _item.GH.width + gutter;
        }
      } else {
        continue;
      }

      currentOffsetTop += currentRowHeight + gutter;
      array = array.slice(i);
      countItems = array.length;
      i = 0;
    }

    if (array.length > 0) {
      if (hideOverload == true) {
        array.each(function (i, elem) {
          $(elem).hide();
        });
      } else {
        for (var _i3 = 0, _len = array.length; _i3 < _len; _i3++) {
          var _item2 = array[_i3];
          setGHParams(_item2, getWidthByHeight(maxRowHeight, _item2.GH.ratio), maxRowHeight, currentOffsetTop, currentOffsetLeft);
          currentOffsetLeft += _item2.width + gutter;
        }

        currentOffsetTop += maxRowHeight;
      }
    }

    state.finalContainerHeight = currentOffsetTop;
  }

  function pushToDOM(items) {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i].style;
      var lib = items[i].GH;
      item.position = 'absolute';
      item.width = px(lib.width);
      item.height = px(lib.height);
      item.top = px(lib.offsetTop);
      item.left = px(lib.offsetLeft);
    }
  }

  function sliceHeightCalc(array) {
    var gutter = settings.gutter;
    var containerWidth = state.containerWidth;
    var workWidth = containerWidth - (array.length - 1) * gutter;
    var sumRatio = 0;

    for (var i = 0, len = array.length; i < len; i++) {
      sumRatio += array[i].GH.ratio;
    }

    return sumRatio > 0 ? workWidth / sumRatio : 0;
  }

  function setGHParams(item, width, height, offTop, offLeft) {
    item.GH.width = width;
    item.GH.height = height;
    item.GH.offsetTop = offTop;
    item.GH.offsetLeft = offLeft;
  }

  function px(val) {
    return val + 'px';
  }

  function increaseCurrentOffsetTop(value) {
    currentOffsetTop += value;
  }

  function getWidthByHeight(dim, ratio) {
    return dim * ratio;
  }

  function getHeightByWidth(dim, ratio) {
    return dim / ratio;
  }

  return {
    horizontal: function horizontal() {
      var a = setGHParams;
      return a;
    },
    vertical: function vertical() {}
  };
}
// CONCATENATED MODULE: ./src/index.js

/* harmony default export */ var src = __webpack_exports__["default"] = (grid);

/***/ })
/******/ ])["default"];
});