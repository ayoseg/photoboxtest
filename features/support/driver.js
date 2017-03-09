export const driver = require("selenium-webdriver");
export const browser = new driver.Builder().forBrowser("chrome").build();