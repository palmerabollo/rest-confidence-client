var ConfigurationResolver = require('..');

var assert = require('assert'),
    should = require('should'),
    nock = require('nock');

describe('ConfigurationResolver', function() {
    before(function() {
        nock('http://localhost:8000')
            .get('/key1').reply(200, { value: 20 })
            .get('/key1?env=development').reply(200, { value: 10 })
            .get('/key1/value').reply(200, '20')
            .get('/key2').reply(200)
            .get('/key2').reply(200);
    });

    describe('should resolve properties', function() {
        it('should return "{value: 20}" when the key is "key1"', function(done) {
            var resolver = new ConfigurationResolver('http://localhost:8000');

            resolver.load('key1')
                .then(function(res) { 
                    assert.deepEqual(res, {value: 20});
                    done();
                })
                .fail(function(err) {
                    done(err);
                });
        });

        it('should return "{value: 10}" when the key is "key1" in "development"', function(done) {
            var resolver = new ConfigurationResolver('http://localhost:8000', {env: 'development'});

            resolver.load('key1')
                .then(function(res) { 
                    assert.deepEqual(res, {value: 10});
                    done();
                })
                .fail(function(err) {
                    done(err);
                });
        });

        it('should return nested objects with plain values', function(done) {
            var resolver = new ConfigurationResolver('http://localhost:8000');

            resolver.load('key1/value')
                .then(function(res) { 
                    assert.equal(res, '20');
                    done();
                })
                .fail(function(err) {
                    done(err);
                });
        });

        it('should return empty string if no property found', function(done) {
            var resolver = new ConfigurationResolver('http://localhost:8000');

            resolver.load('key2')
                .then(function(res) { 
                    done();
                })
                .fail(function(err) {
                    done(err);
                });
        });

        it('should work in callback style', function(done) {
            var resolver = new ConfigurationResolver('http://localhost:8000');

            resolver.load('key2', function(err, result) {
                done(err);
            });
        });
    })
})