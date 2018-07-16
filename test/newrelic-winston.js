const stubs = {
  './newrelicHelper': require('./stubs/newrelicHelper')
};

const winston = require('winston');
const proxyquire = require('proxyquire');
const NewrelicWinston = proxyquire.noCallThru().load('../index.js', stubs);
const expect = require('chai').expect;

describe('newrelic-winston', function() {
  describe('Creating the trasport', function() {

    it('Have default properties when instantiated', function() {
        const newrelicWinston = new(NewrelicWinston)();

      expect(newrelicWinston.name).to.be.equal('newrelic-winston');
    });

    it('should have a log function', function() {
      const newrelicWinston = new(NewrelicWinston)();
      expect(typeof newrelicWinston.log).to.be.equal('function');
    });

    it('can be registered as winston transport using the add() function', function() {
        const logger = winston.createLogger({
        exitOnError: false,
        transports: []
      });

      logger.add(new NewrelicWinston());

      return expect(logger.transports.map(i=>i.name)).to.include('newrelic-winston');
    });

  });
});
