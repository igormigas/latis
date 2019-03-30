/*
  function calculateGridVertical(array) {
    const { containerWidth } = state;
    const { minColumnWidth, gutter } = settings;

    // Calculate number of columns within the container
    const calcColumnNumber = Math.floor((containerWidth + gutter) / (minColumnWidth + gutter));
    const calcColumnWidth = (containerWidth - (calcColumnNumber - 1) * gutter) / calcColumnNumber;
    const columns = [];
    for (let i = 0; i < calcColumnNumber; i++) {
      columns[i] = {
        leftOffset: i * (calcColumnWidth + gutter),
        currentTopOffset: 0,
      };
    }

    // Calculate positions
    for (let i = 0, countItems = array.length; i < countItems; i++) {
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
      columns.forEach((col, index) => {
        if (col.currentTopOffset < offset) {
          id = index;
          offset = col.currentTopOffset;
        }
      });
      return id;
    }

    function getLongestColumnValue() {
      let offset = 0;
      columns.forEach(col => {
        if (col.currentTopOffset > offset) {
          offset = col.currentTopOffset;
        }
      });
      return offset;
    }

    function setItemParams(item, width, height, offTop, offLeft) {
      item.latis.width = width;
      item.latis.height = height;
      item.latis.offsetTop = offTop;
      item.latis.offsetLeft = offLeft;
    }

    function getHeightByWidth(dim, ratio) {
      return dim / ratio;
    }
  } */
