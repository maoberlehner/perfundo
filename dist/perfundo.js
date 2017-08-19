(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Perfundo = factory());
}(this, (function () { 'use strict';

function configure(element, userOptions, defaultOptions) {
  return Object.keys(defaultOptions).reduce(function (options, key) {
    var initial = defaultOptions[key];
    var attrValue = element.getAttribute(("data-" + (key.toLowerCase())));

    // eslint-disable-next-line no-param-reassign
    options[key] = attrValue || userOptions[key] || initial;

    return options;
  }, {});
}

var defaultOptions = {
  disableHistory: false,
  swipe: true,
  classNames: {
    link: "perfundo__link",
    overlay: "perfundo__overlay",
    content: "perfundo__content",
    close: "perfundo__close",
    prev: "perfundo__prev",
    next: "perfundo__next",
    untarget: "perfundo__untarget",
    active: "is-active",
  },
};

/**
 * Helper functions taken from: http://blissfuljs.com/
 */

function $(selector, context) {
  return typeof selector === "string" ? (context || document).querySelector(selector) : selector || null;
}

function $$(selector, context) {
  return Array.prototype.slice.call((context || document).querySelectorAll(selector));
}

$.bind = function bind(elements, o) {
  if (elements) {
    var elementsArray = elements.length ? elements : [elements];
    elementsArray.forEach(function (element) {
      Object.keys(o).forEach(function (events) {
        var callback = o[events];
        events.split(/\s+/).forEach(function (event) {
          element.addEventListener(event, callback);
        });
      });
    });
  }
};

/**
 * perfundo - a pure CSS lightbox
 * @author Markus Oberlehner https://perfundo.oberlehner.net/
 */
var Perfundo = function Perfundo(selector, options) {
  if ( options === void 0 ) options = {};

  var self = this;

  // Make it possible to initialize perfundo on multiple elements at once.
  if (typeof selector === "string" && $$(selector).length > 1) {
    return $$(selector).map(function (element) { return new Perfundo(element, options); });
  }

  self.element = $(selector);

  // Return an empty object if the element does not exist.
  if (!self.element) {
    return {};
  }

  self.options = configure(self.element, options, defaultOptions);

  self.initEvents();
};

Perfundo.prototype.initEvents = function initEvents () {
  var self = this;

  $.bind($$(("." + (self.options.classNames.link)), self.element), {
    click: function click(e) {
      if (self.options.disableHistory) {
        e.preventDefault();
      }
      self.open(this.getAttribute("href"));
    },
  });

  $.bind(self.element, {
    click: function click(e) {
      var isCloseButton = e.target.classList.contains(self.options.classNames.close);
      var isOverlay = e.target.classList.contains(self.options.classNames.overlay);

      if (isCloseButton || isOverlay) {
        if (self.options.disableHistory) {
          e.preventDefault();
        }
        self.close();
      }
    },
  });

  if (self.options.swipe) {
    self.initSwipeEvents();
  }
};

Perfundo.prototype.initSwipeEvents = function initSwipeEvents () {
  var self = this;

  // Initialize swipe detection variables.
  var touchStartX = 0;
  var touchStartY = 0;
  var touchEndX = 0;
  var touchEndY = 0;
  // Store the swipe distance.
  var swipeDistanceX;
  var swipeDistanceY;
  // Min X distance to count as horizontal swipe.
  var swipeMinX = 50;
  // Max Y distance to still count as horizontal swipe.
  var swipeMaxY = 60;

  $.bind($$(("." + (self.options.classNames.content)), self.element), {
    touchstart: function touchstart(e) {
      // Save touchstart coordinates.
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    },
    touchend: function touchend(e) {
      // Save touchend coordinates.
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      // Calculate swipe distances.
      swipeDistanceX = touchStartX - touchEndX;
      swipeDistanceY = touchStartY - touchEndY;

      // Check if touch gesture was a swipe.
      if ((Math.abs(swipeDistanceX) >= swipeMinX) && (Math.abs(swipeDistanceY) <= swipeMaxY)) {
        if (swipeDistanceX > swipeMinX) {
          self.next();
        } else {
          self.prev();
        }
      }

      // Reset variables to be ready to detect the next swipe.
      touchStartX = 0;
      touchStartY = 0;
      touchEndX = 0;
      touchEndY = 0;
      swipeDistanceX = null;
      swipeDistanceY = null;
    },
  });
};

Perfundo.prototype.open = function open (overlayItem) {
  this.close();
  $(overlayItem).classList.add(this.options.classNames.active);
};

Perfundo.prototype.close = function close () {
    var this$1 = this;

  $$(("." + (this.options.classNames.overlay) + "." + (this.options.classNames.active)), this.element).forEach(function (overlayItem) {
    overlayItem.classList.remove(this$1.options.classNames.active);
  });
};

Perfundo.prototype.next = function next () {
  var nextLink = $(("." + (this.options.classNames.next)), this.element);

  if (nextLink) {
    nextLink.click();
  }
};

Perfundo.prototype.prev = function prev () {
  var prevLink = $(("." + (this.options.classNames.prev)), this.element);

  if (prevLink) {
    prevLink.click();
  }
};

return Perfundo;

})));
