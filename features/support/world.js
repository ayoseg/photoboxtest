import { defineSupportCode } from 'cucumber';
import http from 'request-promise';
const _ = require('lodash');
const env = require('./env.js')

function World() {
        const self = this;


        this.httpGet = function (uri) {
            return _httpRequest({ method: 'GET', uri: uri, headers: {'User-Agent': 'node.js'}})
        }

        this.getValue = function(path){
            return _.get(self.actualResponse, path);
        };

        function _httpRequest(options){
            if(env.github_api_url){
                options.uri = env.github_api_url + options.uri;
            }

            return http({
                method: options.method,
                uri: options.uri,
                headers: options.headers,
                body: self.requestBody,
                json: true,
                resolveWithFullResponse: true
            }).then(function(response) {

                if(process.env.DEBUG){
                    console.log(response);
                }

                self.actualResponse = response.body;
                self.statusCode = response.statusCode;
            }, function(response){

                if(process.env.DEBUG){
                    console.log(response);
                }

                const bodyString = response.message.slice(6);
                const body = JSON.parse(bodyString);

                self.actualResponse = body;
                self.statusCode = response.statusCode;
            });
        }

}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(World)
});

