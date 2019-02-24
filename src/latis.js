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
  let calculateGrid;

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

  // PREPARATION

  if(['absolute', 'fixed', 'relative'].includes($container.style.position) === false ) {
    $container.style.position = 'relative';
  }
  if (_method == 'horizontal') {
    calculateGrid = calculateGridHorizontal;
  } else {
    calculateGrid = calculateGridVertical;
  }

  // PROCESS

  buildItemDataStructure();
  calculateGrid([...items]);
  setContainerHeightStyle(state.finalContainerHeight);
  pushToDOM(items);

  //
  // FUNCTIONS
  //

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
      item.latis = params;
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
      const calcItemHeight = getHeightByWidth(calcColumnWidth, item.latis.ratio);
      setItemParams(
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
        setItemParams(
          item,
          containerWidth,
          getHeightByWidth(containerWidth, item.latis.ratio),
          currentOffsetTop,
          0,
        );
        currentRowHeight = item.latis.originalHeight;
      } else if((currentRowHeight=sliceHeightCalc(subArray)) < maxRowHeight) {
        let currentOffsetLeft = 0;

        for(let i=0, len = array.length; i<len; i++) {
          let item = array[i];
          setItemParams(
            item,
            getWidthByHeight(currentRowHeight, item.latis.ratio),
            currentRowHeight,
            currentOffsetTop,
            currentOffsetLeft,
          );
          currentOffsetLeft += item.latis.width + gutter;
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
          setItemParams(
            item,
            getWidthByHeight(maxRowHeight, item.latis.ratio),
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

  function setContainerHeightStyle(value) {
    $container.style.height = px(Math.ceil(value));
  }

  function pushToDOM(items) {
    for(let i=0;i<items.length;++i) {
      let item = items[i].style;
      let lib = items[i].latis;
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
      sumRatio += array[i].latis.ratio;
    }

    return (sumRatio > 0) ? workWidth/sumRatio : 0;
  }

  function setItemParams(item, width, height, offTop, offLeft) {
    item.latis.width = width;
    item.latis.height = height;
    item.latis.offsetTop = offTop;
    item.latis.offsetLeft = offLeft;
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
      const a = setItemParams;
      return a;
    },
    vertical: () => {

    }
  }
}
