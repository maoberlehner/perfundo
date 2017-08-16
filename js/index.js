/**
 * perfundo - a pure CSS lightbox
 * @author Markus Oberlehner https://perfundo.oberlehner.net/
 */

/**
 * Helper functions taken from: http://blissfuljs.com/
 */
function $(expr, con) {
  return typeof expr === `string` ? (con || document).querySelector(expr) : expr || null;
}

function $$(expr, con) {
  return Array.prototype.slice.call((con || document).querySelectorAll(expr));
}

export default class Perfundo {
  constructor(element, options = {}) {
    const me = this;
    const defaultOptions = {
      disableHistory: false,
      swipe: true,
      classNames: {
        link: `perfundo__link`,
        overlay: `perfundo__overlay`,
        content: `perfundo__content`,
        close: `perfundo__close`,
        prev: `perfundo__prev`,
        next: `perfundo__next`,
        untarget: `perfundo__untarget`,
        active: `is-active`,
      },
    };

    // Make it possible to initialize perfundo on multiple elements at once.
    if (typeof element === `string` && $$(element).length > 1) {
      const object = [];
      $$(element).forEach((singleElement) => {
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

    $.bind($$(`.${this.options.classNames.link}`, this.element), {
      click(e) {
        if (me.options.disableHistory) {
          e.preventDefault();
        }
        me.open(this.getAttribute(`href`));
      },
    });

    $.bind(this.element, {
      click(e) {
        const isCloseButton = e.target.classList.contains(me.options.classNames.close);
        const isOverlay = e.target.classList.contains(me.options.classNames.overlay);

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
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;
      // Store the swipe distance.
      let swipeDistanceX;
      let swipeDistanceY;
      // Min X distance to count as horizontal swipe.
      const swipeMinX = 50;
      // Max Y distance to still count as horizontal swipe.
      const swipeMaxY = 60;

      $.bind($$(`.${this.options.classNames.content}`, this.element), {
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
  }

  open(overlayItem) {
    this.close();
    $(overlayItem).classList.add(this.options.classNames.active);
  }

  close() {
    $$(`.${this.options.classNames.overlay}.${this.options.classNames.active}`, this.element).forEach((overlayItem) => {
      overlayItem.classList.remove(this.options.classNames.active);
    });
  }

  next() {
    const nextLink = $(`.${this.options.classNames.next}`, this.element);
    if (nextLink) {
      nextLink.click();
    }
  }

  prev() {
    const prevLink = $(`.${this.options.classNames.prev}`, this.element);
    if (prevLink) {
      prevLink.click();
    }
  }

  /**
   * Private functions.
   */
  configure(defaultOptions) {
    // @TODO: refactor
    // - should data attributes trump arguments or the other way?
    Object.keys(defaultOptions).forEach((key) => {
      const initial = defaultOptions[key];
      const attrValue = this.element.getAttribute(`data-${key.toLowerCase()}`);

      if (typeof initial === `number`) {
        this.options[key] = parseInt(attrValue, 10);
      } else if (initial instanceof Function) {
        this.options[key] = null;
      } else if (attrValue) {
        this.options[key] = attrValue;
      }

      if (!this.options[key] && this.options[key] !== 0) {
        this.options[key] = (key in this.options) ? this.options[key] : initial;
      }
    });
  }
}

$.bind = function bind(elements, o) {
  if (elements) {
    const elementsArray = elements.length ? elements : [elements];
    elementsArray.forEach((element) => {
      Object.keys(o).forEach((events) => {
        const callback = o[events];
        events.split(/\s+/).forEach((event) => {
          element.addEventListener(event, callback);
        });
      });
    });
  }
};
