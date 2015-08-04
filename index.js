var winston = require('winston');
var util = require('util');

var Newrelic = module.exports = function(options) {
  options = options || {};
  var env = options.env || process.env.NODE_ENV;
  this.name = 'newrelic-winston';
  this.level = 'error';
  this.newrelic = require('./newrelicHelper')(env);
};

util.inherits(Newrelic, winston.Transport);
winston.transports.newrelic = Newrelic;

Newrelic.prototype.log = function(level, msg, meta, callback) {
  if (level === 'error') {
    this.newrelic.noticeError(msg, meta);
  }

  callback(null, true);
};

module.exports = Newrelic;
