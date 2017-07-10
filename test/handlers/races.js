const {expect} = require('code');
const {Server} = require('hapi');
const Lab = require('lab');
const Sinon = require('sinon');
require('sinon-mongoose');

const lab = exports.lab = Lab.script();
const {before, afterEach, describe, it} = lab;

const Races = require('../../server/handlers/races');
const Race = require('../../server/models/race');

const server = new Server();

describe('handlers/races', () => {
  before((done) => {
    return done();
  });

  describe('get', () => {
    before((done) => {
      server.connection();
      server.route({ method: 'GET', path: '/races', handler: Races.index });
      return done();
    });

    afterEach((done) => {
      Race.find.restore();
      return done();
    });

    describe('requesting the races', () => {
      before((done) => {
        Sinon.mock(Race)
          .expects('find')
          .chain('sort').withArgs({ fastestTime: 1 })
          .chain('limit').withArgs(10)
          .chain('populate').withArgs('track participants.user participants.car')
          .chain('exec')
          .yields(null, [{
            _id: '123',
            track: {},
            fastestTime: 65000,
            participants: []
          }]);

        return done();
      });

      it('yields the races', (done) => {
        return server.inject({
          method: 'GET',
          url: '/races'
        }, (response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.result).to.be.array();
          expect(response.result[0]._id).to.equal("123");
          expect(response.result[0].participants).to.be.array();
          return done();
        });
      });
    });

    describe('requesting the custom # of races', () => {
      before((done) => {
        Sinon.mock(Race)
          .expects('find')
          .chain('sort').withArgs({ fastestTime: 1 })
          .chain('limit').withArgs(2)
          .chain('populate').withArgs('track participants.user participants.car')
          .chain('exec')
          .yields(null, [{}, {}]);

        return done();
      });

      it('yields the races', (done) => {
        return server.inject({
          method: 'GET',
          url: '/races?limit=2'
        }, (response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.result).to.be.array();
          expect(response.result.length).to.equal(2);
          return done();
        });
      });
    });

    describe('requesting fails', () => {
      before((done) => {
        Sinon.mock(Race)
          .expects('find')
          .chain('sort').withArgs({ fastestTime: 1 })
          .chain('limit').withArgs(10)
          .chain('populate').withArgs('track participants.user participants.car')
          .chain('exec')
          .yields(require('boom').badRequest('Failed'));

        return done();
      });

      it('yields an error', (done) => {
        return server.inject({
          method: 'GET',
          url: '/races'
        }, (response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.result.message).to.equal('Failed');
          return done();
        });
      });
    });
  });
});
