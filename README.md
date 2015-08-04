# newrelic-winston [![Build Status](https://secure.travis-ci.org/namshi/newrelic-winston.png)](http://travis-ci.org/namshi/newrelic-winston)

A [newrelic][0] transport for [winston][1] including the [newrelic][2] Library

## Installation

Tested on node-0.12.x, requires npm.

``` sh
  $ npm install winston --save
  $ npm install newrelic-winston --save
```

## Usage
```javascript
  var winston = require('winston');
  winston.add(require('newrelic-winston'), options);

```

or

```javascript
var NewrelicWinston = require('newrelic-winston');
var logger = new(winston.Logger)({
        exitOnError: false,
        transports: [new(NewrelicWinston)(options)]
      });
```
## Options
* __env__:  the current evironment. Defatuls to `process.env.NODE_ENV`

If `env` is either 'dev' or 'test' the lib will _not_ load the included newrelic module saving devs from anoying errors ;)

## Config
Please refer to the [newrelic lib's readme](https://github.com/newrelic/node-newrelic#configuring-the-module) for specific module's configs.

## Log Levels
This trasport is meant to report errors to newrelic, so the only level available in order to log something is **error**

**All other possible winston's levels, or custom levels, will noop**

[0]: http://newrelic.com/
[1]: https://github.com/flatiron/winston
[2]: https://github.com/newrelic/node-newrelic
