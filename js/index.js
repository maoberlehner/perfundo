import configure from './lib/configure';
import defaultOptions from './default-options';
import { $, $$ } from './lib/dom';

/**
 * perfundo - a pure CSS lightbox
 * @author Markus Oberlehner https://perfundo.oberlehner.net/
 */
export default class Perfundo {
  constructor(selector, options = {}) {
    const self = this;

    // Make it possible to initialize perfundo on multiple elements at once.
    if (typeof selector === `string` && $$(selector).length > 1) {
      return $$(selector).map(element => new Perfundo(element, options));
    }

    self.element = $(selector);

    // Return an empty object if the element does not exist.
    if (!self.element) {
      return {};
    }

    self.options = configure(self.element, options, defaultOptions);

    self.initEvents();
  }

  initEvents() {
    const self = this;

    $.bind($$(`.${self.options.classNames.link}`, self.element), {
      click(e) {
        if (self.options.disableHistory) {
          e.preventDefault();
        }
        self.open(this.getAttribute(`href`));
      },
    });

    $.bind(self.element, {
      click(e) {
        const isCloseButton = e.target.classList.contains(self.options.classNames.close);
        const isOverlay = e.target.classList.contains(self.options.classNames.overlay);

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
  }

  initSwipeEvents() {
    const self = this;

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

    $.bind($$(`.${self.options.classNames.content}`, self.element), {
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
}
