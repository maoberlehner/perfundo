import defaultOptions from './lib/default-options';
import createContext from '../test/unit/helper/create-context';

import perfundo from './';

const context = createContext(defaultOptions);

describe(`perfundo()`, () => {
  test(`It is a function.`, () => {
    expect(typeof perfundo).toBe(`function`);
  });

  test(`Returns a new Perfundo instance.`, () => {
    const perfundoInstance = perfundo(`.perfundo`, {}, context);

    expect(typeof perfundoInstance).toBe(`object`);
    expect(perfundoInstance).toHaveProperty(`context`);
    expect(perfundoInstance).toHaveProperty(`element`);
    expect(perfundoInstance).toHaveProperty(`options`);
  });
});
