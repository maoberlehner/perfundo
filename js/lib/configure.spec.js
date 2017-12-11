import configure from './configure';

describe(`configure()`, () => {
  test(`It should be a function.`, () => {
    expect(typeof configure).toBe(`function`);
  });

  test(`It should overrule default options with user options.`, () => {
    const elementMock = {
      getAttribute: () => null,
    };
    const userOptions = {
      valA: `a`,
      valB: `b`,
      valD: false,
    };
    const defaultOptions = {
      valA: `default-a`,
      valB: `default-b`,
      valC: `default-c`,
      valD: true,
    };
    const expected = {
      valA: `a`,
      valB: `b`,
      valC: `default-c`,
      valD: false,
    };
    const result = configure(elementMock, userOptions, defaultOptions);

    expect(result).toEqual(expected);
  });

  test(`It should overrule all other options with attribute options.`, () => {
    const elementMock = {
      getAttribute: key => (key === `data-vala` ? `overruled-a` : null),
    };
    const userOptions = {
      valA: `a`,
      valB: `b`,
    };
    const defaultOptions = {
      valA: `default-a`,
      valB: `default-b`,
    };
    const expected = {
      valA: `overruled-a`,
      valB: `b`,
    };
    const result = configure(elementMock, userOptions, defaultOptions);

    expect(result).toEqual(expected);
  });
});
