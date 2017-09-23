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

  this.element.setAttribute(this.options.rootAttribute, true);

  if (this.options.disableHistory) {
    this.element.addEventListener(`click`, (e) => {
      e.preventDefault();

      const close = e.target.classList.contains(this.options.classNames.close)
        || e.target.classList.contains(this.options.classNames.overlay);
      const open = e.target.classList.contains(this.options.classNames.link)
        || e.target.parentElement.classList.contains(this.options.classNames.link);

      if (close) this.close();
      else if (open) this.open();
      else if (e.target.classList.contains(this.options.classNames.prev)) this.prev();
      else if (e.target.classList.contains(this.options.classNames.next)) this.next();
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

    if (prevRoot) {
      this.close();
      prevRoot.querySelector(`.${this.options.classNames.link}`).click();
    }
  } catch (e) {
    throw new Error(`Previous item not found.`);
  }
};

Perfundo.prototype.next = function next() {
  try {
    const nextLink = this.element.querySelector(`.${this.options.classNames.next}`);
    const nextItem = this.context.querySelector(`${nextLink.getAttribute(`href`)}`);
    const nextRoot = this.getRootElement(nextItem);

    if (nextRoot) {
      this.close();
      nextRoot.querySelector(`.${this.options.classNames.link}`).click();
    }
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
