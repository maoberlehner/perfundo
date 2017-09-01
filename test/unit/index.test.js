import test from 'ava';
import { mocks } from 'mock-browser';

import perfundo from '../../js/index';

const mockBrowser = new mocks.MockBrowser();
const document = mockBrowser.getDocument();

const context = document.createElement(`div`);
const perfundoElement = document.createElement(`div`);

perfundoElement.classList.add(`perfundo`);
context.appendChild(perfundoElement);

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
