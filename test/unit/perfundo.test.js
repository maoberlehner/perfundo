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
