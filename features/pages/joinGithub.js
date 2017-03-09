import { driver, browser } from '../support/driver';

module.exports = {

      enter: function(username) {
        return browser.findElement({ id : "user_login" }).sendKeys(username);
        //return this._usernameField().sendKeys(this.driver.Key.ENTER);

      },

      getError: function() {
        this.waitUntilElementIsVisible({ css : ".error" })
        return browser.findElement({ css : ".error" }).getText();
      },

      getNote: function() {
        return browser.findElement({ css : ".note" }).getText();
      },

      waitUntilElementIsVisible: function(locator) {
         const element = browser.wait(driver.until.elementLocated(locator));
         return browser.wait(driver.until.elementIsVisible(element));
      }

};