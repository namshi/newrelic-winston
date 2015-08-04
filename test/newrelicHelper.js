var stubs = {
  newrelic: require('./stubs/newrelic')
};
var expect = require('chai').expect;
var proxyquire = require('proxyquire');
var helper = {};

describe('Newrelic Helper', function() {

  describe('Dev ENV', function() {
    before(function() {
      helper = proxyquire('../newrelicHelper', stubs)('dev');
    });

    it('All methods whould noop and no errors should be thrown', function() {
      helper.getBrowserTimingHeader();
      helper.setTransactionName('blah');
      helper.noticeError(new Error('Ouch'));
      helper.noticeError(new Error('Ouch'), {transactionName: 'argh'});
    });
  });

  describe('Test ENV', function() {
    before(function() {
      helper = proxyquire('../newrelicHelper', stubs)('test');
    });

    it('All methods whould noop and no errors should be thrown', function() {
      helper.getBrowserTimingHeader();
      helper.setTransactionName('blah');
      helper.noticeError(new Error('Ouch'));
      helper.noticeError(new Error('Ouch'), {transactionName: 'argh'});
    });
  });

  describe('Live ENV', function() {
    before(function() {
      helper = proxyquire.noCallThru().load('../newrelicHelper', stubs)('live');
    });

    it('Has a getBrowserTimingHeader method returning the client javascript', function() {
      expect(helper.getBrowserTimingHeader()).to.be.equal('this would be the client JS script');
    });

    it('Should be able to set transaction name', function() {
      helper.setTransactionName('blah');
      expect(stubs.newrelic.transactionName).to.be.equal('blah');
    });

    it('Should be able to notify an error', function() {
      expect(helper.noticeError).to.not.throw(Error);
    });

    it('Should be able to notify an error and set a transaction name', function() {
      helper.noticeError(new Error('Ouch'), {transactionName: 'argh'});
      expect(stubs.newrelic.transactionName).to.be.equal('argh');
    });

  });

});
