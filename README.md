# perfundo
a pure CSS lightbox (https://perfundo.oberlehner.net).

## Usage
### As an npm module
To use perfundo in your SASS project, it is recommended to use the [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer) node-sass importer so it is possible to easily load perfundo directly from your `node_modules` directory.
Make sure you checkout the [usage section](https://github.com/maoberlehner/node-sass-magic-importer#usage) on how to use the [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer).

Alternatively you can use perfundo as an [eyeglass](https://github.com/sass-eyeglass/eyeglass) module.

Install perfundo:
```bash
npm install perfundo --save
```
Also install [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer)
```bash
npm install node-sass-magic-importer --save
```
OR [eyeglass](https://github.com/sass-eyeglass/eyeglass)
```bash
npm install eyeglass --save
```

Now you can import perfundo into your scss file:
```scss
@import 'perfundo';
// OR
@import 'perfundo/with-icons';

// Without node-sass-magic-importer or eyeglass installed
@import 'node_modules/perfundo/scss/index.scss';
// OR
@import 'node_modules/perfundo/scss/with-icons.scss';
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

If you want to use the JavaScript enhancements, load the perfundo module into your JavaScript file:
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
Download https://perfundo.oberlehner.net/downloads/perfundo-2.0.4.zip. Add the files to your HTML file like in the following example:
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
