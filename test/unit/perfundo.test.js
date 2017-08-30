import test from 'ava';
import swipe from 'vanilla-touchwipe';
import { mocks } from 'mock-browser';

import configure from '../../js/lib/configure';
import defaultOptions from '../../js/lib/default-options';

import Perfundo from '../../js/lib/perfundo';

const mockBrowser = new mocks.MockBrowser();
const document = mockBrowser.getDocument();

const defaultDependencies = {
  configure,
  context: document,
  defaultOptions,
  swipe,
};

test(`Is a function.`, (t) => {
  t.true(typeof Perfundo === `function`);
});

test(`Returns an instance of itself if a single target is given.`, (t) => {
  const context = document.createElement(`div`);
  const perfundoElement = document.createElement(`div`);
  const dependencies = Object.assign({}, defaultDependencies, { context });

  perfundoElement.classList.add(`perfundo`);
  context.appendChild(perfundoElement);

  const perfundoInstance = new Perfundo(dependencies, `.perfundo`);

  t.true(typeof perfundoInstance === `object`);
  t.truthy(perfundoInstance.context);
  t.truthy(perfundoInstance.element);
  t.truthy(perfundoInstance.options);
});

test(`Returns an array of Perfundo instances if a multi target is given.`, (t) => {
  const context = document.createElement(`div`);
  const perfundoElement1 = document.createElement(`div`);
  const perfundoElement2 = document.createElement(`div`);
  const dependencies = Object.assign({}, defaultDependencies, { context });

  perfundoElement1.classList.add(`perfundo`);
  perfundoElement2.classList.add(`perfundo`);

  context.appendChild(perfundoElement1);
  context.appendChild(perfundoElement2);

  const perfundoInstances = new Perfundo(dependencies, `.perfundo`);

  t.true(Array.isArray(perfundoInstances));
  t.true(typeof perfundoInstances[0] === `object`);
  t.true(typeof perfundoInstances[1] === `object`);
});
