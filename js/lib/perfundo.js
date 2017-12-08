export default function Perfundo(dependencies, target, userOptions = {}) {
  const { configure, context, defaultOptions, swipe } = dependencies;
  const elements = typeof target === `string`
    ? context.querySelectorAll(target)
    : target;

  if (elements.length > 1) {
    return [].slice.call(elements).map(element => new Perfundo(dependencies, element, userOptions));
  }

  this.context = context;
  this.element = elements[0] || elements;
  this.options = configure(this.element, userOptions, defaultOptions);
  this.hasPrev = this.element.querySelector(`.${this.options.classNames.prev}`) !== null;
  this.hasNext = this.element.querySelector(`.${this.options.classNames.next}`) !== null;

  this.element.setAttribute(this.options.rootAttribute, true);

  if (this.options.disableHistory) {
    this.element.addEventListener(`click`, (e) => {
      e.preventDefault();

      const open = e.target.classList.contains(this.options.classNames.link)
        || e.target.parentElement.classList.contains(this.options.classNames.link);
      const close = e.target.classList.contains(this.options.classNames.close)
        || e.target.classList.contains(this.options.classNames.overlay);
      const prev = e.target.classList.contains(this.options.classNames.prev);
      const next = e.target.classList.contains(this.options.classNames.next);

      if (open) this.open();
      else if (close) this.close();
      else if (prev) this.prev();
      else if (next) this.next();
    });
  }

  if (this.options.keyboard) {
    this.element.addEventListener(`keyup`, (e) => {
      if (this.hasPrev && e.keyCode === 37) this.prev();
      else if (this.hasNext && e.keyCode === 39) this.next();
    });
  }

  if (this.options.swipe) {
    swipe(this.element, {
      wipeLeft: () => this.next(),
      wipeRight: () => this.prev(),
      preventDefaultEvents: this.options.disableHistory,
    });
  }

  return this;
}

Perfundo.prototype.open = function open() {
  this.element.querySelector(`.${this.options.classNames.link}`).focus();
  this.element.querySelector(`.${this.options.classNames.overlay}`)
    .classList.add(this.options.classNames.active);
};

Perfundo.prototype.close = function close() {
  this.element.querySelector(`.${this.options.classNames.overlay}`)
    .classList.remove(this.options.classNames.active);
};

Perfundo.prototype.prev = function prev() {
  try {
    const prevLink = this.element.querySelector(`.${this.options.classNames.prev}`);
    const prevItem = this.context.querySelector(`${prevLink.getAttribute(`href`)}`);
    const prevRoot = this.getRootElement(prevItem);

    this.close();
    prevRoot.querySelector(`.${this.options.classNames.link}`).click();
  } catch (e) {
    throw new Error(`Previous item not found.`);
  }
};

Perfundo.prototype.next = function next() {
  try {
    const nextLink = this.element.querySelector(`.${this.options.classNames.next}`);
    const nextItem = this.context.querySelector(`${nextLink.getAttribute(`href`)}`);
    const nextRoot = this.getRootElement(nextItem);

    this.close();
    nextRoot.querySelector(`.${this.options.classNames.link}`).click();
  } catch (e) {
    throw new Error(`Next item not found.`);
  }
};

Perfundo.prototype.getRootElement = function getRootElement(element) {
  let parent = element.parentElement;

  while (parent && parent !== this.context) {
    if (parent.hasAttribute(this.options.rootAttribute)) return parent;

    parent = parent.parentElement;
  }

  return null;
};
