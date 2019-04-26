export default function (array, settings, containerWidth) {
  if (!array.length) {
    return false;
  }

  const acceptedArray = [];
  const deniedArray = [];

  for (let item of array) {
    if (!item instanceof HTMLElement) {
      continue;
    }
    if (item.classList.contains(settings.itemSelector)) {
      acceptedArray.push(item);
    } else {
      deniedArray.push(item);
      continue;
    }

    const params = {};

    // Define item position as absolute right now
    // to prevent collapsing margin issue
    item.style.position = 'absolute';
    item.style.boxSizing = 'border-box';

    params.nodeType = item.nodeName;
    params.display = !item.classList.contains(settings.hiddenSelector);
    params.stretched = item.classList.contains(settings.stretchedSelector);
    params.lazy = item.classList.contains(settings.lazySelector);

    let reference = item.querySelector('img.' + settings.imageSelector);
    if (reference) {
      params.coverImage = reference;
    } else if (item.nodeName === 'IMG') {
      params.coverImage = item;
    }

    // Define item type based on cover image existence
    if (params.coverImage instanceof HTMLElement) {
      params.scriptType = 'image';
      const $img = params.coverImage;
      params.originalWidth = $img.naturalWidth;
      params.originalHeight = $img.naturalHeight;

      // Cover image style changes should be moved to different module
      // Todo with infinite scroll functionality
      $img.style.display = 'block';
      $img.style.width = '100%';
      $img.style.maxHeight = '100%';
    } else {
      params.scriptType = 'block';
      params.originalWidth = parseInt(item.style.width, 10) || containerWidth;
      params.originalHeight = parseInt(item.style.height, 10) || item.scrollHeight;

      // Force block without full dimension set
      // to be stretch
      if (!item.style.width || !item.style.height) {
        params.stretched = true;
      }
    }
    params.ratio = params.originalWidth / params.originalHeight;

    // Apply new params to node element
    item.latis = params;
  }

  return [
    acceptedArray,
    deniedArray,
  ];
}
