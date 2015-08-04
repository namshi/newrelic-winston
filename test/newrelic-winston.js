var stubs = {
  './newrelicHelper': require('./stubs/newrelicHelper')
};

var winston = require('winston');
var proxyquire = require('proxyquire');
var NewrelicWinston = proxyquire.noCallThru().load('../index.js', stubs);
var expect = require('chai').expect;

describe('newrelic-winston', function() {
  describe('Creating the trasport', function() {

    it('Have default properties when instantiated', function() {
      var newrelicWinston = new(NewrelicWinston)();

      expect(newrelicWinston.name).to.be.equal('newrelic-winston');
      expect(newrelicWinston.level).to.be.equal('error');
    });

    it('should have a log function', function() {
      var newrelicWinston = new(NewrelicWinston)();
      expect(typeof newrelicWinston.log).to.be.equal('function');
    });

    it('can be registered as winston transport', function() {
      var logger = new(winston.Logger)({
        exitOnError: false,
        transports: [new(NewrelicWinston)()]
      });

      return expect(logger.transports.hasOwnProperty('newrelic-winston')).to.be.true;
    });

    it('can be registered as winston transport using the add() function', function() {
      var logger = new(winston.Logger)({
        exitOnError: false,
        transports: []
      });

      logger.add(NewrelicWinston);

      return expect(logger.transports.hasOwnProperty('newrelic-winston')).to.be.true;
    });

  });
});
