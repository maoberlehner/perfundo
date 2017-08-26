import swipe from 'vanilla-touchwipe';

import configure from './lib/configure';
import defaultOptions from './lib/default-options';
import Perfundo from './lib/perfundo';

export default (selector, userOptions, context = document) =>
  new Perfundo({ configure, context, defaultOptions, swipe }, selector, userOptions);
