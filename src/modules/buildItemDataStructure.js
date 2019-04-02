export default function (array, settings) {
  if (!array.length) {
    return false;
  }

  const newArray = [];
  for (let [key, item] of array.entries()) {
    if (!item instanceof HTMLElement) {
      continue;
    }

    const classList = getElementClassList(item);
    if (classList.includes(settings.itemSelector)) {
      newArray.push(item);
    } else {
      continue;
    }

    let params = {};

    const $image = item.querySelector('img.' + settings.imageSelector);
    params.coverImage = $image;

    params.type = $image ? 'image' : 'block';

    params.display = !classList.includes(settings.hiddenSelector);
    params.stretched =
      params.type !== 'image'
      || (
        params.type === 'image'
        && classList.includes(settings.stretchedSelector)
        && !settings.ignoreImageStretching
      );
    params.lazy = classList.includes(settings.lazySelector);

    if ($image !== null) {
      params.originalWidth = $image.naturalWidth;
      params.originalHeight = $image.naturalHeight;
      $image.style.display = 'block';
      $image.style.width = '100%';
      $image.style.maxHeight = '100%';
    } else {
      params.originalWidth = item.clientWidth;
      params.originalHeight = item.clientHeight;
    }
    params.ratio = params.originalWidth / params.originalHeight;
    item.latis = params;

    item.style.boxSizing = 'border-box';
  }
  return newArray;
}

function getElementClassList(ref) {
  const array = [];
  if (ref.classList) {
    const classList = ref.classList;
    for (let x of classList) {
      array.push(x);
    }
  }
  return array;
}
