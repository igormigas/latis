# Latis
---
Latis is a small Javascript library which spreads given elements into rows, creating a nice looking layout with horizontal priority.

##### Notice
The library is in a very early stage of development and as for now remains author's playground for educational purposes. Although it is not fully optimized and not all of the functions may work properly, feel free to try it, use it or give a feedback.

## Screenshots
![Grid Horizontal Demo Image](http://igor.migasiewicz.pl/jpg/gh_git1.jpg)

## Current features
- horizontal or vertical priority
- setting maximum row height (or column width)
- setting optional minimum container width for starting calculation (if smaller, elements are displayed vertically in single column)
- gutters
- [horizontal] hide last elements which cannot create proper row

## Working on
- callbacks

## Installation
```npm
npm install latis
```
```link
sdsdf
```

## Basic usage
Latis is designed to work nearly out of the box, without diving into available settings. However you need to follow some basic rules to initialize the process.

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
