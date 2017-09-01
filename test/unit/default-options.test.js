import test from 'ava';

import defaultOptions from '../../js/lib/default-options';

test(`Is an object.`, (t) => {
  t.true(typeof defaultOptions === `object`);
});
