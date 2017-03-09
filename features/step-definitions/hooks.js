import { defineSupportCode } from 'cucumber';
import { driver, browser } from '../support/driver';

defineSupportCode(function({After}) {
  After(function() {
    //return browser.quit();
  });
});