'use strict';

var request = require('request'),
    Q = require('q');

function ConfigurationResolver(configurationServerURL, opts) {
    this._opts = opts;
    this._configurationServerURL = configurationServerURL;

    // property in confidence syntax (ex. key1/key2)
    this.load = function load(property, callback) {
        var deferred = Q.defer();

        var options = {
            uri: configurationServerURL + '/' + property,
            qs: this._opts || {},
            json: true
        };

        request(options, function process(error, response, body) {
            if (!error) {
                deferred.resolve(body);
            } else {
                deferred.reject(new Error(error));
            }
        });

        return deferred.promise.nodeify(callback);
    }
}

module.exports = ConfigurationResolver;