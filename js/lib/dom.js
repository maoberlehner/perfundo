/**
 * Helper functions taken from: http://blissfuljs.com/
 */

export function $(selector, context) {
  return typeof selector === `string` ? (context || document).querySelector(selector) : selector || null;
}

export function $$(selector, context) {
  return Array.prototype.slice.call((context || document).querySelectorAll(selector));
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
