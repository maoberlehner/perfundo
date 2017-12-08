import defaultOptions from './lib/default-options';
import createContext from '../test/unit/helper/create-context';

import perfundo from './';
import Perfundo from './lib/perfundo';

describe(`perfundo()`, () => {
  const context = createContext(defaultOptions);
  document.body.appendChild(context);

  test(`It is a function.`, () => {
    expect(typeof perfundo).toBe(`function`);
  });

  test(`Returns a new \`Perfundo\` instance.`, () => {
    const perfundoInstance = perfundo(`.perfundo`);

    expect(perfundoInstance instanceof Perfundo).toBe(true);
  });
});
