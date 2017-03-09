import { driver, browser } from '../support/driver';

module.exports = {

      go: function() {
        browser.manage().window().maximize();
        browser.get("https://github.com");
        return this.waitUntilVisible();
      },

      clickLink: function(text) {
        browser.findElement({ linkText: text }).click();
      },

      waitUntilVisible: function() {
          return browser.wait(driver.until.titleIs("The world's leading software development platform · GitHub"));
      }
};