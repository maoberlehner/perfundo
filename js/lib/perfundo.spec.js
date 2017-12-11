import configure from './configure';
import createContext from '../../test/unit/helper/create-context';
import defaultOptions from './default-options';

import Perfundo from './perfundo';

describe(`Perfundo`, () => {
  let defaultContext;
  let defaultDependencies;

  beforeEach(() => {
    defaultContext = createContext(defaultOptions);
    defaultDependencies = {
      configure,
      context: defaultContext,
      defaultOptions,
      swipe: jest.fn(),
    };
  });

  test(`It should be a function.`, () => {
    expect(typeof Perfundo).toBe(`function`);
  });

  test(`It should return an instance of itself if a single target is given.`, () => {
    const perfundoInstance = new Perfundo(defaultDependencies, `.perfundo`);

    expect(perfundoInstance instanceof Perfundo).toBe(true);
  });

  test(`It should return an array of \`Perfundo\` instances if a multi target is given.`, () => {
    const context = createContext(defaultOptions, 2);
    const dependencies = Object.assign({}, defaultDependencies, { context });
    const perfundoInstances = new Perfundo(dependencies, `.perfundo`);

    expect(Array.isArray(perfundoInstances)).toBe(true);
    expect(perfundoInstances[0] instanceof Perfundo).toBe(true);
    expect(perfundoInstances[1] instanceof Perfundo).toBe(true);
  });

  test(`It should not handle click events if the history is not disabled.`, () => {
    const perfundoInstance = new Perfundo(defaultDependencies, `.perfundo`, { disableHistory: false });

    perfundoInstance.open = jest.fn();

    defaultContext.querySelector(`.js-perfundo-link`).click();
    expect(perfundoInstance.open).not.toBeCalled();
  });

  test(`It should handle click events if the history is disabled.`, () => {
    const context = createContext(defaultOptions, 2);
    const dependencies = Object.assign({}, defaultDependencies, { context });
    const perfundoInstances = new Perfundo(dependencies, `.perfundo`, { disableHistory: true });

    perfundoInstances[0].open = jest.fn();
    perfundoInstances[0].close = jest.fn();
    perfundoInstances[1].prev = jest.fn();
    perfundoInstances[0].next = jest.fn();

    // Click on the main element to cover all test possibilities,
    perfundoInstances[0].element.click();

    context.querySelector(`.js-perfundo-link`).click();
    expect(perfundoInstances[0].open).toBeCalled();

    context.querySelector(`.js-perfundo-close`).click();
    expect(perfundoInstances[0].close).toBeCalled();

    context.querySelector(`.js-perfundo-prev`).click();
    expect(perfundoInstances[1].prev).toBeCalled();

    context.querySelector(`.js-perfundo-next`).click();
    expect(perfundoInstances[0].next).toBeCalled();
  });

  test(`It should not handle keyboard events if they are disabled.`, () => {
    const perfundoInstance = new Perfundo(defaultDependencies, `.perfundo`, { keyboard: false });

    perfundoInstance.prev = jest.fn();
    perfundoInstance.next = jest.fn();

    const pressArrowLeft = new KeyboardEvent(`keyup`, { keyCode: 37 });
    const pressArrowRight = new KeyboardEvent(`keyup`, { keyCode: 39 });

    perfundoInstance.element.dispatchEvent(pressArrowLeft);
    expect(perfundoInstance.prev).not.toBeCalled();

    perfundoInstance.element.dispatchEvent(pressArrowRight);
    expect(perfundoInstance.next).not.toBeCalled();
  });

  test(`It should handle keyboard events if they are enabled.`, () => {
    const context = createContext(defaultOptions, 2);
    const dependencies = Object.assign({}, defaultDependencies, { context });
    const perfundoInstances = new Perfundo(dependencies, `.perfundo`, { keyboard: true });

    perfundoInstances[1].prev = jest.fn();
    perfundoInstances[0].next = jest.fn();

    const pressArrowLeft = new KeyboardEvent(`keyup`, { keyCode: 37 });
    const pressArrowRight = new KeyboardEvent(`keyup`, { keyCode: 39 });

    perfundoInstances[1].element.dispatchEvent(pressArrowLeft);
    expect(perfundoInstances[1].prev).toBeCalled();

    perfundoInstances[0].element.dispatchEvent(pressArrowRight);
    expect(perfundoInstances[0].next).toBeCalled();
  });

  test(`It should not handle touch swipes if swiping is disabled.`, () => {
    // eslint-disable-next-line no-new
    new Perfundo(defaultDependencies, `.perfundo`, { swipe: false });

    expect(defaultDependencies.swipe).not.toBeCalled();
  });

  test(`It should handle touch swipes.`, () => {
    let swipeOptions;
    const swipeMock = (element, options) => {
      swipeOptions = options;
    };
    const dependencies = Object.assign({}, defaultDependencies, { swipe: swipeMock });
    const perfundoInstance = new Perfundo(dependencies, `.perfundo`, { swipe: true });

    perfundoInstance.next = jest.fn();
    perfundoInstance.prev = jest.fn();

    swipeOptions.wipeLeft();
    expect(perfundoInstance.next).toBeCalled();

    swipeOptions.wipeRight();
    expect(perfundoInstance.prev).toBeCalled();
  });

  describe(`open()`, () => {
    test(`It should focus the current instance.`, () => {
      const perfundoInstance = new Perfundo(defaultDependencies, `.perfundo`);
      const link = defaultContext.querySelector(`.js-perfundo-link`);
      link.focus = jest.fn();

      perfundoInstance.open();

      expect(link.focus).toBeCalled();
    });

    test(`It should add a class to mark the overlay as active.`, () => {
      const perfundoInstance = new Perfundo(defaultDependencies, `.perfundo`);
      const overlay = defaultContext.querySelector(`.js-perfundo-overlay`);

      perfundoInstance.open();

      expect(overlay.classList.contains(`is-active`)).toBe(true);
    });
  });

  describe(`close()`, () => {
    test(`It should remove the class which marks the overlay as active.`, () => {
      const perfundoInstance = new Perfundo(defaultDependencies, `.perfundo`);
      const overlay = defaultContext.querySelector(`.js-perfundo-overlay`);
      overlay.classList.add(`is-active`);

      perfundoInstance.close();

      expect(overlay.classList.contains(`is-active`)).toBe(false);
    });
  });

  describe(`prev()`, () => {
    test(`It should close the current instance and activate the previous.`, () => {
      const context = createContext(defaultOptions, 2);
      const dependencies = Object.assign({}, defaultDependencies, { context });
      const perfundoInstances = new Perfundo(dependencies, `.perfundo`);
      const firstInstanceLink = perfundoInstances[0].element.querySelector(`.js-perfundo-link`);

      firstInstanceLink.click = jest.fn();
      perfundoInstances[1].close = jest.fn();
      perfundoInstances[1].open();
      perfundoInstances[1].prev();

      expect(perfundoInstances[1].close).toBeCalled();
      expect(firstInstanceLink.click).toBeCalled();
    });

    test(`It should throw an error if there is no previous item.`, () => {
      const perfundoInstance = new Perfundo(defaultDependencies, `.perfundo`);

      expect(() => perfundoInstance.prev()).toThrowError();
    });
  });

  describe(`next()`, () => {
    test(`It should close the current instance and activate the next.`, () => {
      const context = createContext(defaultOptions, 2);
      const dependencies = Object.assign({}, defaultDependencies, { context });
      const perfundoInstances = new Perfundo(dependencies, `.perfundo`);
      const secondInstanceLink = perfundoInstances[1].element.querySelector(`.js-perfundo-link`);

      secondInstanceLink.click = jest.fn();
      perfundoInstances[0].close = jest.fn();
      perfundoInstances[0].open();
      perfundoInstances[0].next();

      expect(perfundoInstances[0].close).toBeCalled();
      expect(secondInstanceLink.click).toBeCalled();
    });

    test(`It should throw an error if there is no next item.`, () => {
      const perfundoInstance = new Perfundo(defaultDependencies, `.perfundo`);

      expect(() => perfundoInstance.next()).toThrowError();
    });
  });

  describe(`getRootElement()`, () => {
    test(`It should return the elements root \`Perfundo\` element.`, () => {
      const perfundoInstance = new Perfundo(defaultDependencies, `.perfundo`);
      const actual = perfundoInstance.getRootElement(defaultContext.querySelector(`.js-perfundo-link`));
      const expected = defaultContext.querySelector(`.perfundo`);

      expect(actual).toEqual(expected);
    });

    test(`It should return \`null\` if no root \`Perfundo\` element is found.`, () => {
      const perfundoInstance = new Perfundo(defaultDependencies, `.perfundo`);
      const result = perfundoInstance.getRootElement(document.querySelector(`body`));

      expect(result).toBe(null);
    });
  });
});
