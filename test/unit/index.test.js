import test from 'ava';

import defaultOptions from '../../js/lib/default-options';
import createContext from './helper/create-context';

import perfundo from '../../js/index';

const context = createContext(defaultOptions);

test(`Is a function.`, (t) => {
  t.true(typeof perfundo === `function`);
});

test(`Returns a new Perfundo instance.`, (t) => {
  const perfundoInstance = perfundo(`.perfundo`, {}, context);

  t.true(typeof perfundoInstance === `object`);
  t.truthy(perfundoInstance.context);
  t.truthy(perfundoInstance.element);
  t.truthy(perfundoInstance.options);
});
