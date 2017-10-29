import configure from '../../js/lib/configure';

describe(`configure()`, () => {
  test(`It is a function.`, () => {
    expect(typeof configure).toBe(`function`);
  });

  test(`User options overrule default options.`, () => {
    const elementMock = {
      getAttribute: () => null,
    };
    const userOptions = {
      valA: `a`,
      valB: `b`,
    };
    const defaultOptions = {
      valA: `default-a`,
      valB: `default-b`,
      valC: `default-c`,
    };
    const expected = {
      valA: `a`,
      valB: `b`,
      valC: `default-c`,
    };
    const result = configure(elementMock, userOptions, defaultOptions);

    expect(result).toEqual(expected);
  });

  test(`Attribute options overrule all other options.`, () => {
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
