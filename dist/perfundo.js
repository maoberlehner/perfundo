(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Perfundo = factory());
}(this, (function () { 'use strict';

/**
 * perfundo - a pure CSS lightbox
 * @author Markus Oberlehner https://perfundo.oberlehner.net/
 */

/**
 * Helper functions taken from: http://blissfuljs.com/
 */
function $(expr, con) {
  return typeof expr === "string" ? (con || document).querySelector(expr) : expr || null;
}

function $$(expr, con) {
  return Array.prototype.slice.call((con || document).querySelectorAll(expr));
}

var Perfundo = function Perfundo(element, options) {
  if ( options === void 0 ) options = {};

  var me = this;
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

  // Make it possible to initialize perfundo on multiple elements at once.
  if (typeof element === "string" && $$(element).length > 1) {
    var object = [];
    $$(element).forEach(function (singleElement) {
      object.push(new Perfundo(singleElement, options));
    });
    return object;
  }

  this.element = $(element);
  this.options = options;

  // Return an empty object if the element does not exist.
  if (!this.element) {
    return {};
  }

  this.configure(defaultOptions);

  $.bind($$(("." + (this.options.classNames.link)), this.element), {
    click: function click(e) {
      if (me.options.disableHistory) {
        e.preventDefault();
      }
      me.open(this.getAttribute("href"));
    },
  });

  $.bind(this.element, {
    click: function click(e) {
      var isCloseButton = e.target.classList.contains(me.options.classNames.close);
      var isOverlay = e.target.classList.contains(me.options.classNames.overlay);

      if (isCloseButton || isOverlay) {
        if (me.options.disableHistory) {
          e.preventDefault();
        }
        me.close();
      }
    },
  });

  if (this.options.swipe) {
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

    $.bind($$(("." + (this.options.classNames.content)), this.element), {
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
            me.next();
          } else {
            me.prev();
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
  }
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

/**
 * Private functions.
 */
Perfundo.prototype.configure = function configure (defaultOptions) {
    var this$1 = this;

  // @TODO: refactor
  // - should data attributes trump arguments or the other way?
  Object.keys(defaultOptions).forEach(function (key) {
    var initial = defaultOptions[key];
    var attrValue = this$1.element.getAttribute(("data-" + (key.toLowerCase())));

    if (typeof initial === "number") {
      this$1.options[key] = parseInt(attrValue, 10);
    } else if (initial instanceof Function) {
      this$1.options[key] = null;
    } else if (attrValue) {
      this$1.options[key] = attrValue;
    }

    if (!this$1.options[key] && this$1.options[key] !== 0) {
      this$1.options[key] = (key in this$1.options) ? this$1.options[key] : initial;
    }
  });
};

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

return Perfundo;

})));
