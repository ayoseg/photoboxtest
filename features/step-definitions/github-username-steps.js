import World from '../support/world';
import { defineSupportCode } from 'cucumber';
import chai from 'chai';
chai.should();
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

var githubHome = require('../pages/githubHome');
var joinGithubPage = require('../pages/joinGithub');

defineSupportCode(function({Given, When, Then, setDefaultTimeout}) {

       setDefaultTimeout(60 * 1000);

       Given('a github username photobox', function () {
            console.log("Username is photobox");
       });

       When('I make a GET request to {arg1:stringInDoubleQuotes}', function (path) {
            return this.httpGet(path);
       });

       Then('I should get response statusCode {arg1:int}', function (status_200) {
           const statusCode = this.statusCode
           statusCode.should.equal(status_200);

       });

       Then('the response property {arg1:stringInDoubleQuotes} should be {arg2:stringInDoubleQuotes}', function (key, value, callback) {
           const actualValue = this.getValue(key);
           actualValue.toLowerCase().should.equal(value);
           callback();
       });

       Given('I am on Github homepage', function () {
          githubHome.go();
       });

       When('I choose {arg1:stringInDoubleQuotes}', function (text) {
          githubHome.clickLink(text);
       });

       When('I enter {arg1:stringInDoubleQuotes}', function (username) {
          joinGithubPage.enter(username);
       });


       Then('I should see username {arg1:stringInDoubleQuotes}', function (username_available, callback) {
         switch (username_available) {
           case "no":
              joinGithubPage.getError().should.eventually.equal("Username is already taken").and.notify(callback);
              break;
           case "yes":
              joinGithubPage.getNote().should.eventually.equal("This will be your username — you can enter your organization’s username next.").and.notify(callback);
              break;
           default:
               console.log("Invalid Entry, please enter yes or no for availability");
         }
       });
});