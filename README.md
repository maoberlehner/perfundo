# perfundo
a pure CSS lightbox (https://perfundo.oberlehner.net).

## Usage
### As an npm module
perfundo can be used as an [eyeglass](https://github.com/sass-eyeglass/eyeglass)
module. To do so, install the perfundo module into your project:
```
npm install perfundo --save
```

Now you can import perfundo into your scss file:
```scss
@import 'perfundo';
// OR
@import 'perfundo/with-icons';
```

There are variables to control certain aspects of the Lightbox:
```scss
$perfundo-namespace: 'perfundo';
$perfundo-background-color: rgba(#000, 0.9);
$perfundo-color: #fff;
$perfundo-control-use-icons: false;
$perfundo-html-padding: 2em;
$perfundo-html-max-width: 42em;
$perfundo-html-background-color: #fff;

@import 'perfundo';
```

If you want to use the JavaScript enhancements, load the perfundo module into
your JavaScript file:
```js
// Load the module.
var perfundo = require('perfundo');
// Initialize a perfundo Lightbox.
var myLightbox = new perfundo('.perfundo', {
  disableHistory: false,
  swipe: true,
  classNames: {
    link: 'perfundo__link',
    overlay: 'perfundo__overlay',
    content: 'perfundo__content',
    close: 'perfundo__close',
    prev: 'perfundo__prev',
    next: 'perfundo__next',
    untarget: 'perfundo__untarget',
    active: 'is-active'
  }
});
```

### Standalone (without npm)
Download https://perfundo.oberlehner.net/downloads/perfundo-2.0.3.zip. Add the
files to your HTML file like in the following example:
```html
<!-- Put this inside the <head> section of your HTML. -->
<link rel="stylesheet" href="perfundo.min.css">

<!-- Put this before the closing </body> tag (optionally!). -->
<script src="perfundo.min.js"></script>
<script>
  var myLightbox = new perfundo('.perfundo');
</script>
```

## About
### Author
Markus Oberlehner  
Twitter: https://twitter.com/MaOberlehner

### License
GPL v2 (http://www.gnu.org/licenses/gpl-2.0.html)
