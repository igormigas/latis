# Latis
---
Latis is a small Javascript library which helps in creating gallery layout filled with images or block elements, providing horizontal or vertical priority.

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
HTML (example):
```html
<div class="container" style="position: relative">
  <div class="item">
    <a href="#">
      <img class="cover" style="height: 100%" src="default.jpg" />
    </a>
  </div>
  <div class="item" style="width:200px; height: 100px;">
    Example content
    <img alt="Default UI image" src="defaultUIimg.jpg" />
  </div>
  <!-- more items -->
</div>
```
JS:
```javascript
var container = document.getElementById('container');
Latis(container).horizontal({
	item: '.item',
	imageClass: '.cover',
	minWidth: 400,
	maxRowHeight: 350,
	gutter: 15,
	hideOverload: false,
});
```
