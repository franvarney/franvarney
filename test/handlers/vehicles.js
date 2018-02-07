const {expect} = require('code');
const Lab = require('lab');
const Hapi = require('hapi');
const Nock = require('nock');

const {before, beforeEach, afterEach, describe, it} = exports.lab = Lab.script();

const Config = require('../../config');
const GMFixtures = require('../fixtures/gm');
const Routes = require('../../server/routes');

const server = Hapi.server({ port: '8181' });
const goodData = {
  id: 1,
  responseType: "JSON"
};
const badData = {
  id: 2,
  responseType: "JSON"
};

// This should really have stubs on GMVehicle instead of using Nock, but the
// proxyquire module does not seem to support the class syntax yet?

describe('handlers/vehicle', () => {
  before(() => {
    server.route(Routes);
  });

  beforeEach(() => {
    Nock.disableNetConnect();
    Nock.enableNetConnect('http://localhost:8181');
  });

  afterEach(() => {
    Nock.cleanAll();
    Nock.enableNetConnect();
  });

  describe('get', () => {
    describe('success', () => {
      before(() => {
        Nock(Config.gmApiUrl).post(`/${GMFixtures.get.service}Service`)
          .reply(200, GMFixtures.get);
      });

      it('responds with clean vehicle info', async () => {
        const response = await server.inject('/vehicles/1');
        expect(response.request.params.id).to.equal('1');
        expect(Object.keys(response.result).length).to.equal(4);
      });
    });

    describe('failure', () => {
      before(() => {
        Nock(Config.gmApiUrl).post(`/${GMFixtures.get.service}Service`)
          .reply(200, GMFixtures.badGet);
      });

      it('responds with 404 if vehicle not found', async () => {
          const response = await server.inject('/vehicles/2');
          expect(response.result).to.not.be.null();
          expect(response.result.statusCode).to.equal(404);
      });
    });
  });

  describe('getDoors', () => {
    describe('success', () => {
      before(() => {
        Nock(Config.gmApiUrl).post(`/${GMFixtures.security.service}Service`)
          .reply(200, GMFixtures.security);
      });

      it('responds with vehicle door info', async () => {
        const response = await server.inject('/vehicles/1/doors');
        expect(response.request.params.id).to.equal('1');
        expect(Object.keys(response.result).length).to.equal(2);
      });
    });

    describe('failure', () => {
      before(() => {
        Nock(Config.gmApiUrl).post(`/${GMFixtures.security.service}Service`)
          .reply(200, GMFixtures.badGet);
      });

      it('responds with 404 if vehicle not found', async () => {
          const response = await server.inject('/vehicles/2/doors');
          expect(response.result).to.not.be.null();
          expect(response.result.statusCode).to.equal(404);
      });
    });
  });
});
