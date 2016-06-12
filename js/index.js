/**
 * perfundo - a pure CSS lightbox
 * @author Markus Oberlehner https://perfundo.oberlehner.net/
 */
'use strict';

const defaultOptions = {
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
};

export default class Perfundo {
  constructor(element, options = {}) {
    let me = this;

    // Make it possible to initialize perfundo on multiple elements at once.
    if (typeof element === 'string' && $$(element).length > 1) {
      let object = [];
      $$(element).forEach((element) => {
        object.push(new Perfundo(element, options));
      });
      return object;
    }

    this.element = $(element);
    this.options = options;

    // Return an empty object if the element does not exist.
    if (!this.element) {
      return {};
    }

    this._configure(defaultOptions);

    $.bind($$('.' + this.options.classNames.link, this.element), {
      click(e) {
        if (me.options.disableHistory) {
          e.preventDefault();
        }
        me.open(this.getAttribute('href'));
      }
    });

    $.bind(this.element, {
      click(e) {
        if (e.target.classList.contains(me.options.classNames.close) || e.target.classList.contains(me.options.classNames.overlay)) {
          if (me.options.disableHistory) {
            e.preventDefault();
          }
          me.close();
        }
      }
    });

    if (this.options.swipe) {
      // Initialize swipe detection variables.
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;
      // Store the swipe distance.
      let swipeDistanceX;
      let swipeDistanceY;
      // Min X distance to count as horizontal swipe.
      let swipeMinX = 50;
      // Max Y distance to still count as horizontal swipe.
      let swipeMaxY = 60;

      $.bind($$('.' + this.options.classNames.content, this.element), {
        touchstart(e) {
          // Save touchstart coordinates.
          touchStartX = e.changedTouches[0].clientX;
          touchStartY = e.changedTouches[0].clientY;
        },
        touchend(e) {
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
            }
            else {
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
        }
      });
    }
  }

  open(overlayItem) {
    overlayItem = $(overlayItem);
    this.close();
    overlayItem.classList.add(this.options.classNames.active);
  }

  close() {
    $$('.' + this.options.classNames.overlay + '.' + this.options.classNames.active, this.element).forEach((overlayItem) => {
      overlayItem.classList.remove(this.options.classNames.active);
    });
  }

  next() {
    let nextLink = $('.' + this.options.classNames.next, this.element);
    if (nextLink) {
      nextLink.click();
    }
  }

  prev() {
    let prevLink = $('.' + this.options.classNames.prev, this.element);
    if (prevLink) {
      prevLink.click();
    }
  }

  /**
   * Private functions.
   */
  _configure(defaultOptions) {
    // @TODO: refactor
    // - should data attributes trump arguments or the other way?
    for (let i in defaultOptions) {
      let initial = defaultOptions[i];
      let attrValue = this.element.getAttribute('data-' + i.toLowerCase());

      if (typeof initial === 'number') {
        this.options[i] = parseInt(attrValue);
      }
      else if (initial instanceof Function) {
        this.options[i] = null;
      }
      else if (attrValue) {
        this.options[i] = attrValue;
      }

      if (!this.options[i] && this.options[i] !== 0) {
        this.options[i] = (i in this.options) ? this.options[i] : initial;
      }
    }
  }
}

/**
 * Helper functions taken from: http://blissfuljs.com/
 */
function $(expr, con) {
  return typeof expr === 'string' ? (con || document).querySelector(expr) : expr || null;
}

function $$(expr, con) {
  return Array.prototype.slice.call((con || document).querySelectorAll(expr));
}

$.bind = function(elements, o) {
  if (elements) {
    elements = elements.length ? elements : [elements];
    elements.forEach(function (element) {
      for (let event in o) {
        let callback = o[event];
        event.split(/\s+/).forEach(function (event) {
          element.addEventListener(event, callback);
        });
      }
    });
  }
};
