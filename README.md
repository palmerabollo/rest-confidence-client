rest-confidence-client
======================

This is a node.js client for the simple [rest-confidence configuration server](https://github.com/palmerabollo/rest-confidence). It hides the REST API details if you do not want to worry about them.

See my the post about ["app configuration the easy way"](https://engineering.telefonica.com/app-configuration-the-easy-way-3723e2a8cc5a) if you plan to use rest-confidence-client.

Usage
-----

Initialize a ConfigurationResolver

```
var ConfigurationResolver = require('rest-confidence-client');

var resolver = new ConfigurationResolver('http://localhost:8000', {env: 'development'});
```

Use it with the traditional callback style:

```
resolver.load('key1', function(err, result) {
    if (err) {
        console.log('Unable to query rest-confidence server');
    } else {
        console.log('Value is', result);
    }
});
```

Or promise style:

```
resolver.load('key1')
    .then(function(result) { 
        console.log('Value is', result);
    })
    .fail(function(err) {
        console.log('Unable to query rest-confidence server');
    });
```

License
-------

MIT
