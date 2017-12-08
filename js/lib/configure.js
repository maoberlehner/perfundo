export default function configure(element, userOptions, defaultOptions) {
  return Object.keys(defaultOptions).reduce((options, key) => {
    const attrValue = element.getAttribute(`data-${key.toLowerCase()}`);

    // eslint-disable-next-line no-param-reassign
    if (attrValue !== null) options[key] = attrValue;
    // eslint-disable-next-line no-param-reassign
    else if (key in userOptions) options[key] = userOptions[key];
    // eslint-disable-next-line no-param-reassign
    else options[key] = defaultOptions[key];

    return options;
  }, {});
}
