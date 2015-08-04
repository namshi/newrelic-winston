var newrelic = {};
var _ = require('lodash');
var excludedEnvs = ['dev', 'test'];

/**
 * If the newrelic module was included will invoke
 * the given method eventually applying params
 *
 * @param  {String} methodName
 * @return {*}
 */
function callMethod(methodName) {
  var args = [];
  if (newrelic[methodName]) {
    args = [].splice.call(arguments, 1, (arguments.length - 1));
    return newrelic[methodName].apply(newrelic, args);
  }
}

var nmNewRelic = {
  getBrowserTimingHeader: function() {
    return callMethod('getBrowserTimingHeader');
  },

  setTransactionName: function(name) {
    callMethod('setTransactionName', name);
  },

  noticeError: function(error, options) {
    options = options || {};
    if (options.transactionName) {
      nmNewRelic.setTransactionName(options.transactionName);
    }

    callMethod('noticeError', error, options);
  }
};

module.exports = function(env) {
  if (_.isEmpty(newrelic) && !_.contains(excludedEnvs, env)) {
    newrelic = require('newrelic');
  }

  return nmNewRelic;
};
