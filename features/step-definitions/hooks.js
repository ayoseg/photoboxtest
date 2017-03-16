import { defineSupportCode } from 'cucumber';
//import world from '../support/world';
import fs from 'fs';
import path from 'path';
import sanitize from 'sanitize-filename';
import { driver, browser } from '../support/driver';
import reporter from 'cucumber-html-reporter';


defineSupportCode(function({After, registerHandler}) {

  After(function(scenarioResult) {
    if(scenarioResult.isFailed()) {
      browser.takeScreenshot().then(function(data){
        var base64Data = data.replace(/^data:image\/png;base64,/,"");
        fs.writeFile(path.join('features/screenshots', sanitize(scenarioResult.scenario.name + ".png").replace(/ /g,"_")), base64Data, 'base64', function(err) {
            if(err) console.log(err);
        });
      });
    }
    return browser.manage().deleteAllCookies();
  });

  registerHandler('AfterFeatures', function (features, callback) {
    var options = {
        theme: 'bootstrap',
        jsonFile: 'features/reports/cucumber_report.json',
        output: 'features/reports/cucumber_report.html',
        reportSuiteAsScenarios: true,
        launchReport: true,
        metadata: {
            "App Version":"0.3.2",
            "Test Environment": "STAGING",
            "Browser": "Chrome  54.0.2840.98",
            "Platform": "Windows 10",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        }
    };

    reporter.generate(options);
    callback();
  });

  registerHandler("AfterFeatures", function() {
      return browser.quit();
  });

});
