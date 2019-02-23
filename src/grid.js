/*
 * Grid-Horizontal v0.9.2
 * test
 */

 export default function(_reference, _callbacks={}) {
  return {
    horizontal: (_settings={}) => {
      Grid(_reference, 'horizontal', _settings, _callbacks);
    },
    vertical: (_settings={}) => {
      Grid(_reference, 'vertical', _settings, _callbacks);
    }
  }
}

function Grid(_reference, _method, _settings={}, _callbacks={}) {

  let $container = _reference.current;
  let items = $container.childNodes;

  const settings = {
    classItem:          _settings.item || '.item',
    classCover:         _settings.coverClass || '.cover',
    minContainerWidth:  _settings.minContainerWidth || 400,
    maxRowHeight:       _settings.maxRowHeight || 350,
    gutter:             _settings.gutter || 15,
    hideOverload:       _settings.hideOverload || false,

    minColumnWidth:     _settings.minColumnWidth || 200,
  }

  const state = {
    containerWidth: $container.offsetWidth,
    finalContainerHeight: 0,
  }

  if(['absolute', 'fixed', 'relative'].includes($container.style.position) === false ) {
    $container.style.position = 'relative';
  }

  buildItemDataStructure();
  if (_method == 'horizontal') {
    calculateGridHorizontal([...items]);
  } else {
    calculateGridVertical([...items]);
  }
  $container.style.height = px(Math.ceil(state.finalContainerHeight));
  pushToDOM(items);

  // Define size and ratio of each element
  function buildItemDataStructure() {
    for(let item of items) {
      let params = {};
      const $image = item.querySelector('img.cover');

      if ($image !== null) {
        params.originalWidth = $image.naturalWidth;
        params.originalHeight = $image.naturalHeight;
      } else {
        params.originalWidth = item.clientWidth;
        params.originalHeight = item.clientHeight;
      }
      params.ratio = params.originalWidth/params.originalHeight;
      item.GH = params;
    }
  }

  function calculateGridVertical(array) {
    const { containerWidth } = state;
    const { minColumnWidth, gutter } = settings;

    // Calculate number of columns within the container
    const calcColumnNumber = Math.floor((containerWidth + gutter)/(minColumnWidth + gutter));
    const calcColumnWidth = (containerWidth - (calcColumnNumber - 1)*gutter) / calcColumnNumber;
    const columns = [];
    for (let i=0; i<calcColumnNumber; i++) {
      columns[i] = {
        leftOffset: i * (calcColumnWidth + gutter),
        currentTopOffset: 0,
      }
    }

    // Calculate positions
    for(let i=0, countItems = array.length; i < countItems; i++) {
      const item = array[i];
      const columnId = getShortestColumnId();
      const calcItemHeight = getHeightByWidth(calcColumnWidth, item.GH.ratio);
      setGHParams(
        item,
        calcColumnWidth,
        calcItemHeight,
        columns[columnId].currentTopOffset,
        columns[columnId].leftOffset,
      );
      increaseColumnTopOffset(columnId, calcItemHeight + gutter);
    }
    state.finalContainerHeight = getLongestColumnValue();

    // FUNCTIONS

    function increaseColumnTopOffset(id, value) {
      columns[id].currentTopOffset += value;
    }

    function getShortestColumnId() {
      let id = 0;
      let offset = columns[0].currentTopOffset;
      columns.forEach(( col, index ) => {
        if (col.currentTopOffset < offset) {
          id = index;
          offset = col.currentTopOffset;
        }
      });
      return id;
    }

    function getLongestColumnValue() {
      let offset = 0;
      columns.forEach(( col, index ) => {
        if (col.currentTopOffset > offset) {
          offset = col.currentTopOffset;
        }
      });
      return offset;
    }
  }

  function calculateGridHorizontal(array) {
    const { containerWidth } = state;
    const { minContainerWidth, maxRowHeight, gutter, hideOverload } = settings;
    let subArray;
    let currentRowHeight = 0, currentOffsetTop = 0, currentOffsetLeft = 0;

    for(let i=1, countItems = array.length; i <= countItems; i++) {
      subArray = array.slice(0,i);

      if(containerWidth < minContainerWidth) {
        let item = subArray[0];
        setGHParams(
          item,
          containerWidth,
          getHeightByWidth(containerWidth, item.GH.ratio),
          currentOffsetTop,
          0,
        );
        currentRowHeight = item.GH.originalHeight;
      } else if((currentRowHeight=sliceHeightCalc(subArray)) < maxRowHeight) {
        let currentOffsetLeft = 0;

        for(let i=0, len = array.length; i<len; i++) {
          let item = array[i];
          setGHParams(
            item,
            getWidthByHeight(currentRowHeight, item.GH.ratio),
            currentRowHeight,
            currentOffsetTop,
            currentOffsetLeft,
          );
          currentOffsetLeft += item.GH.width + gutter;
        }
      } else {
        continue;
      }

      currentOffsetTop += currentRowHeight + gutter;

      array = array.slice(i);
      countItems=array.length;
      i = 0;
    }

    if(array.length > 0) {

      if(hideOverload == true) {
        array.each(function(i,elem) {
          $(elem).hide();
        });
      } else {
        for(let i=0, len = array.length; i<len; i++) {
          let item = array[i];
          setGHParams(
            item,
            getWidthByHeight(maxRowHeight, item.GH.ratio),
            maxRowHeight,
            currentOffsetTop,
            currentOffsetLeft,
          );
          currentOffsetLeft += item.width + gutter;
        }
        currentOffsetTop += maxRowHeight;
      }
    }

    state.finalContainerHeight = currentOffsetTop;
  }

  function pushToDOM(items) {
    for(let i=0;i<items.length;++i) {
      let item = items[i].style;
      let lib = items[i].GH;
      item.position = 'absolute';
      item.width = px(lib.width);
      item.height = px(lib.height);
      item.top = px(lib.offsetTop);
      item.left = px(lib.offsetLeft);
    }
  }

  function sliceHeightCalc(array) {
    const { gutter } = settings;
    const { containerWidth } = state;
    const workWidth = containerWidth - (array.length-1)*gutter;

    let sumRatio = 0;
    for (let i=0,len=array.length; i<len;i++) {
      sumRatio += array[i].GH.ratio;
    }

    return (sumRatio > 0) ? workWidth/sumRatio : 0;
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
    horizontal: () => {
      const a = setGHParams;
      return a;
    },
    vertical: () => {

    }
  }
}
