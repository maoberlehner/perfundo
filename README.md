# perfundo
[![Build Status](https://travis-ci.org/maoberlehner/perfundo.svg?branch=master)](https://travis-ci.org/maoberlehner/perfundo)

a pure CSS lightbox (https://perfundo.oberlehner.net).

## Usage
### As an npm module
To use perfundo in your Sass project, it is recommended to use the [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer/tree/master/packages/node-sass-magic-importer) node-sass importer so it is possible to easily load perfundo directly from your `node_modules` directory.
Make sure you checkout the [usage section](https://github.com/maoberlehner/node-sass-magic-importer/tree/master/packages/node-sass-magic-importer#usage) on how to use the [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer/tree/master/packages/node-sass-magic-importer).

Install perfundo:
```bash
npm install perfundo --save
```
Also install [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer/tree/master/packages/node-sass-magic-importer)
```bash
npm install node-sass-magic-importer --save
```

Now you can import perfundo into your Sass file:
```scss
@import '~perfundo';
// OR
@import '~perfundo/with-icons';

// Without node-sass-magic-importer installed
@import 'node_modules/perfundo/scss/index.scss';
// OR
@import 'node_modules/perfundo/scss/with-icons.scss';
```

There are variables to control certain aspects of the Lightbox:
```scss
$perfundo-background-color: rgba(#000, 0.9);
$perfundo-color: #fff;
$perfundo-control-use-icons: false;
$perfundo-html-padding: 2em;
$perfundo-html-max-width: 42em;
$perfundo-html-background-color: #fff;
```

If you want to use the JavaScript enhancements, load the perfundo module into your JavaScript file:
```js
// Load the module.
var perfundo = require('perfundo');
// Initialize a perfundo Lightbox.
perfundo('.perfundo', {
  // This are the default options.
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
Download https://github.com/maoberlehner/perfundo/archive/3.0.0.zip. Add the files to your HTML file like in the following example:
```html
<!-- Put this inside the <head> section of your HTML. -->
<link rel="stylesheet" href="perfundo.min.css">

<!-- Put this before the closing </body> tag (optionally!). -->
<script src="perfundo.min.js"></script>
<script>
  perfundo('.perfundo');
</script>
```

## About
### Author
Markus Oberlehner  
Website: https://markus.oberlehner.net  
Twitter: https://twitter.com/MaOberlehner  
PayPal.me: https://paypal.me/maoberlehner

### License
MIT
