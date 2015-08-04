function Newrelic() {
  this.transactionName = 'default';
}

Newrelic.prototype.getBrowserTimingHeader = function() {
  return 'this would be the client JS script';
};

Newrelic.prototype.setTransactionName = function(transactionName) {
  this.transactionName = transactionName;
};

Newrelic.prototype.noticeError = function() {
};

module.exports = (function() {
  console.log('creating new nerelic stub instance');
  return new Newrelic();
}());
