# Latis
---
Latis is a small Javascript library which spreads given elements into rows, creating a nice looking layout with horizontal priority.


![Grid Horizontal Demo Image](http://igor.migasiewicz.pl/jpg/gh_git1.jpg)

##### Notice
The library is in a very early stage of development and as for now remains author's playground for educational purposes. Although it is not fully optimized and not all of the functions may work properly, feel free to try it, use it or give a feedback.

## Current features
- vertical priority
- setting maximum row height
- setting optional minimum container width for starting calculation (if smaller, elements are displayed vertically in single column)
- gutters
- hide last elements which cannot create proper row
- stretched blocks with lazy option
- 'onReady' callback

## Installation
```bash
npm install latis
```

## Basic usage
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
}''
```

What you need to know is:
1. The script obtains the width of given container as its calculation base parameter. However, you and your CSS have control over it as usual, you decide whether it is fixed or responsive.
2. Latis works best with some images or galleries. Put an image with 'latis-image' class inside an item to let the script find proper proportions.
3. Latis obtains all necessary size data from fully loaded images, therefore we need to make sure the script is being run at the very end.

## Basic settings
To make changes in layout look and behaviour, use some basic settings.
For clarity, from this point examples are stripped from checking if document is ready.

```javascript
Latis(container).horizontal({
  maxRowHeight: 300,
  gutter: 15,
  overloadBehaviour: 'hide',
});
```

You can find these settings definitions later.

## Callback function
If for any reason you need to know when the script has finished, use callback.

```javascript
var callback = function() {
  console.log('Latis has finished');
}

Latis(container, callback).horizontal(settings);
```
