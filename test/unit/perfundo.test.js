import swipe from 'vanilla-touchwipe';

import configure from '../../js/lib/configure';
import defaultOptions from '../../js/lib/default-options';
import createContext from './helper/create-context';

import Perfundo from '../../js/lib/perfundo';

const defaultContext = createContext(defaultOptions);
const defaultDependencies = {
  configure,
  context: defaultContext,
  defaultOptions,
  swipe,
};

describe(`Perfundo`, () => {
  test(`It is a function.`, () => {
    expect(typeof Perfundo).toBe(`function`);
  });

  test(`It returns an instance of itself if a single target is given.`, () => {
    const context = createContext(defaultOptions, 1);
    const dependencies = Object.assign({}, defaultDependencies, { context });
    const perfundoInstance = new Perfundo(dependencies, `.perfundo`);

    expect(typeof perfundoInstance).toBe(`object`);
    expect(perfundoInstance).toHaveProperty(`context`);
    expect(perfundoInstance).toHaveProperty(`element`);
    expect(perfundoInstance).toHaveProperty(`options`);
  });

  test(`It returns an array of Perfundo instances if a multi target is given.`, () => {
    const context = createContext(defaultOptions, 2);
    const dependencies = Object.assign({}, defaultDependencies, { context });
    const perfundoInstances = new Perfundo(dependencies, `.perfundo`);

    expect(Array.isArray(perfundoInstances)).toBe(true);
    expect(typeof perfundoInstances[0]).toBe(`object`);
    expect(typeof perfundoInstances[1]).toBe(`object`);
  });

  test(`It should add and remove active class on overlay element.`, () => {
    const context = createContext(defaultOptions, 1);
    const dependencies = Object.assign({}, defaultDependencies, { context });
    const perfundoInstance = new Perfundo(dependencies, `.perfundo`);

    perfundoInstance.open();
    let overlayElementHasActiveClass = context.querySelector(`.js-perfundo-overlay`).classList.contains(`is-active`);

    expect(overlayElementHasActiveClass).toBe(true);

    perfundoInstance.close();
    overlayElementHasActiveClass = context.querySelector(`.js-perfundo-overlay`).classList.contains(`is-active`);

    expect(overlayElementHasActiveClass).toBe(false);
  });

  test(`It should call \`close()\` on the current, and \`click()\` on the previous overlay element.`, () => {
    const context = createContext(defaultOptions, 2);
    const dependencies = Object.assign({}, defaultDependencies, { context });

    let mockCloseCalled = false;
    const mockClose = () => { mockCloseCalled = true; };

    let mockClickCalled = false;
    const mockClick = () => { mockClickCalled = true; };

    const perfundoInstances = new Perfundo(dependencies, `.perfundo`);

    perfundoInstances[1].close = mockClose;
    context.querySelector(`.js-perfundo-link`).click = mockClick;
    perfundoInstances[1].prev();

    expect(mockCloseCalled).toBe(true);
    expect(mockClickCalled).toBe(true);
  });

  test(`It should call \`close()\` on the current, and \`click()\` on the next overlay element.`, () => {
    const context = createContext(defaultOptions, 2);
    const dependencies = Object.assign({}, defaultDependencies, { context });

    let mockCloseCalled = false;
    const mockClose = () => { mockCloseCalled = true; };

    let mockClickCalled = false;
    const mockClick = () => { mockClickCalled = true; };

    const perfundoInstances = new Perfundo(dependencies, `.perfundo`);

    perfundoInstances[0].close = mockClose;
    context.querySelector(`.perfundo + .perfundo .js-perfundo-link`).click = mockClick;
    perfundoInstances[0].next();

    expect(mockCloseCalled).toBe(true);
    expect(mockClickCalled).toBe(true);
  });

  test(`Should return the elements root Perfundo element.`, () => {
    const context = createContext(defaultOptions, 1);
    const dependencies = Object.assign({}, defaultDependencies, { context });
    const perfundoInstance = new Perfundo(dependencies, `.perfundo`);

    const actual = perfundoInstance.getRootElement(context.querySelector(`.js-perfundo-overlay`));
    const expected = context.querySelector(`.perfundo`);

    expect(actual).toEqual(expected);
  });

  test(`Should throw an error.`, () => {
    const context = createContext(defaultOptions, 2);
    const dependencies = Object.assign({}, defaultDependencies, { context });
    const perfundoInstances = new Perfundo(dependencies, `.perfundo`);

    expect(() => perfundoInstances[0].prev()).toThrowError();
    expect(() => perfundoInstances[1].next()).toThrowError();
  });
});
