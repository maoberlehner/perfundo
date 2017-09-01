import test from 'ava';
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

test(`Is a function.`, (t) => {
  t.true(typeof Perfundo === `function`);
});

test(`Returns an instance of itself if a single target is given.`, (t) => {
  const context = createContext(defaultOptions, 1);
  const dependencies = Object.assign({}, defaultDependencies, { context });
  const perfundoInstance = new Perfundo(dependencies, `.perfundo`);

  t.true(typeof perfundoInstance === `object`);
  t.truthy(perfundoInstance.context);
  t.truthy(perfundoInstance.element);
  t.truthy(perfundoInstance.options);
});

test(`Returns an array of Perfundo instances if a multi target is given.`, (t) => {
  const context = createContext(defaultOptions, 2);
  const dependencies = Object.assign({}, defaultDependencies, { context });
  const perfundoInstances = new Perfundo(dependencies, `.perfundo`);

  t.true(Array.isArray(perfundoInstances));
  t.true(typeof perfundoInstances[0] === `object`);
  t.true(typeof perfundoInstances[1] === `object`);
});

test(`Should add and remove active class on overlay element.`, (t) => {
  const context = createContext(defaultOptions, 1);
  const dependencies = Object.assign({}, defaultDependencies, { context });
  const perfundoInstance = new Perfundo(dependencies, `.perfundo`);

  perfundoInstance.open();
  let overlayElementHasActiveClass = context.querySelector(`.perfundo__overlay`).classList.contains(`is-active`);

  t.true(overlayElementHasActiveClass);

  perfundoInstance.close();
  overlayElementHasActiveClass = context.querySelector(`.perfundo__overlay`).classList.contains(`is-active`);

  t.false(overlayElementHasActiveClass);
});

test(`Should call \`close()\`, and \`click()\` on the previous overlay element.`, (t) => {
  const context = createContext(defaultOptions, 2);
  const dependencies = Object.assign({}, defaultDependencies, { context });

  let mockCloseCalled = false;
  const mockClose = () => { mockCloseCalled = true; };

  let mockClickCalled = false;
  const mockClick = () => { mockClickCalled = true; };

  const perfundoInstances = new Perfundo(dependencies, `.perfundo`);

  perfundoInstances[1].close = mockClose;
  context.querySelector(`.perfundo__link`).click = mockClick;
  perfundoInstances[1].prev();

  t.true(mockCloseCalled);
  t.true(mockClickCalled);
});

test(`Should call \`close()\`, and \`click()\` on the next overlay element.`, (t) => {
  const context = createContext(defaultOptions, 2);
  const dependencies = Object.assign({}, defaultDependencies, { context });

  let mockCloseCalled = false;
  const mockClose = () => { mockCloseCalled = true; };

  let mockClickCalled = false;
  const mockClick = () => { mockClickCalled = true; };

  const perfundoInstances = new Perfundo(dependencies, `.perfundo`);

  perfundoInstances[0].close = mockClose;
  context.querySelector(`.perfundo + .perfundo .perfundo__link`).click = mockClick;
  perfundoInstances[0].next();

  t.true(mockCloseCalled);
  t.true(mockClickCalled);
});

test(`Should return the elements root Perfundo element.`, (t) => {
  const context = createContext(defaultOptions, 1);
  const dependencies = Object.assign({}, defaultDependencies, { context });
  const perfundoInstance = new Perfundo(dependencies, `.perfundo`);

  const actual = perfundoInstance.getRootElement(context.querySelector(`.perfundo__overlay`));
  const expected = context.querySelector(`.perfundo`);

  t.deepEqual(actual, expected);
});
