# Latis
---
![npm](https://img.shields.io/npm/v/latis.svg?color=%237fa68e)
Latis is a small Javascript library which spreads given elements into rows, creating a nice looking layout with horizontal priority.


![Grid Horizontal Demo Image](http://igor.migasiewicz.pl/jpg/gh_git1.jpg)

##### Notice
The library is in an early stage of development. Although it is not fully optimized, feel free to try it, use it or give a feedback. Be aware that, until the script reaches stable release, any interface element may change in next versions without backward compatibility.

All images used in previews are taken from pexels.com, a free stock photos library.

## Current features
---
- creating grid of elements spreaded into rows of variable heights
- internal gutters
- overload content (managing elements which cannot form proper row)
- stretched blocks with lazy option
- 'onReady' callback

## Installation
---
```bash
$ npm install latis
```

## Usage
---
Latis is designed to work nearly out of the box, without diving into available settings. However you need to follow some basic rules to initialize the process.

Let's build a simple container-items structure with some Javasciript.

HTML (example):
```html
<div class="latis">
  <div class="latis-item">
    <a href="#">
      <img class="latis-image" src="default.jpg" />
    </a>
  </div>
  <div class="latis-item">
    <a href="#">
      <img class="latis-image" src="image.jpg" />
    </a>
  </div>
  <!-- more latis-items -->
</div>
```

JS:
```javascript
var container = document.getElementById('latis');
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    Latis(container).horizontal();
  };
}
```

What you need to know is:
1. The script obtains the width of given container as its calculation base parameter. However, you and your CSS have control over it as usual, you decide whether it is fixed or responsive.
2. Latis works best with some images or galleries. Put an image with `.latis-image` class inside an item to let the script find proper proportions.
3. Latis obtains all necessary size data from fully loaded images, therefore we need to make sure the script is being run at the very end.

#### Basic settings
To make changes in layout look and behaviour, use some basic settings.
For clarity, from this point examples are stripped from checking if document is ready.

```javascript
Latis(container).horizontal({
  maxRowHeight: 300,
  gutter: 15,
  overloadBehaviour: 'hide',
});
```

You can find more details about settings in the end of documentation.

#### Callback function
If for any reason you need to know when the script has finished, use callback.

```javascript
var callback = function() {
  console.log('Latis has finished');
}
Latis(container, callback).horizontal(settings);
```

#### Overload content
It is very probable that at the end of calculations there will be items that cannot form proper row. These items can be defined as overload content and we are able to set its behaviour. Please refer to `Settings -> overloadBehaviour()`.

Please be aware that responsive sites with flexible container may display different overload content depending on current container width.

#### Stretched blocks
Blocks are special items which are not calculated by the script as usual, instead they are stretched horizontally to reach container's full width.
Usage example: ad banner, quote, highlighted thought, header in the begining of new photo group... anything that should appear between your items.

```html
<div class="latis">
  <!-- many latis-items -->
  <div class="latis-item stretched">
    Less is more
  </div>
  <!-- more latis-items -->
</div>
```
Important! By default stretched blocks breaks the layout immediately. This means that all previous items in cache (these which could not build proper row) will behave as overload content.

#### Lazy blocks
Lazy blocks are the same stretched blocks as above, with one difference: they wait patiently for pending row to build. This means the layout will not break, there will be no gaps and no overload content before the block.

```html
<div class="latis">
  <!-- many latis-items -->
  <div class="latis-item stretched lazy">
    Less is more
  </div>
  <!-- more latis-items -->
</div>
```

Please be aware that this allows following regular items to go ahead in layout hierarchy.

## Settings
---
#### Common
###### `maxRowHeight`: integer
Defines maximal row height for calculation.
Stretched blocks and overload content may disobey this rule depending on their own settings.
###### `gutter`: integer
Width of gutter between items.
###### `overloadBehaviour`: string
Defines default behaviour of overload content. Depending on the value, the content:
- stretched - will be forced to create proper row by disobeying `maxRowHeight` setting
- hidden - will not be displayed (using css)
- left/center/right - will obey `maxRowHeight` setting and align itself accordingly
###### `minContainerWidth`: integer
Defines minimal container width to run the calculation. If container is smaller, the script will display items vertically.
#### Advanced
###### `itemSelector`: string
Defines custom class name for item selector.
###### `imageSelector`: string
Defines custom class name for cover image selector.
###### `stretchedSelector`: string
Defines custom class name for stretched item. This class name is additional to item selector (i.e. '.latis-item .stretched').
###### `lazySelector`: string
Defines custom class name for stretched lazy item. This class name is additional to item selector (i.e. '.latis-item .stretched .lazy').

#### Debug
###### `ignoreBlocks`: bool
If true, excludes and hides all block items.
###### `ignoreImageStretching`: bool
If true, prevents blocks filled with cover image from stretching. Such elements become regular latis items with cover image.

## License
---
Latis is MIT licensed.
