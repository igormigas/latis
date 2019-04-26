# Latis

![npm](https://img.shields.io/npm/v/latis.svg?color=%237fa68e)

Latis is a small Javascript library which spreads given elements into rows, creating a nice looking layout with horizontal priority.


![Grid Horizontal Demo Image](http://igor.migasiewicz.pl/latis/promo/Latis_CoverExample.jpg)

##### Notice
The library is in an early stage of development. Although it is not fully optimized, feel free to try it, use it or give a feedback. Be aware that, until the script reaches stable release, any interface element may change in next versions without backward compatibility.

All images used in previews are taken from pexels.com, a free stock photos library.

## Installation

```bash
$ npm install --save latis
```

## Usage

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
import Latis from 'latis';

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

## Settings and advanced usage
Full documentation has been published here: [Latis Documentation](http://dev.migasiewicz.pl/latis)

## License

Latis is MIT licensed.
