const {expect} = require('code');
const Lab = require('lab');
const Nock = require('nock');

const {before, beforeEach, afterEach, describe, it} = exports.lab = Lab.script();

const Config = require('../../config');
const GMFixtures = require('../fixtures/gm');
const GMVehicle = require('../../server/utils/gm-vehicle');

const gmVehicle = new GMVehicle();
const goodData = {
  id: 1,
  responseType: "JSON"
};
const badData = {
  id: 2,
  responseType: "JSON"
};

describe('GMVehicle', () => {
  beforeEach(() => {
    Nock.disableNetConnect();
    Nock.enableNetConnect('http://localhost:8181');
  });

  afterEach(() => {
    Nock.cleanAll();
    Nock.enableNetConnect();
  });

  describe('GMVehicle.get', () => {
    describe('success', () => {
      before(() => {
        Nock(Config.gmApiUrl).post(`/${GMFixtures.get.service}Service`, goodData)
          .reply(200, GMFixtures.get);
      });

      it('yields vehicle info', async () => {
        const results = await gmVehicle.get(goodData.id);
        expect(Object.keys(results).length).to.equal(4);
        expect(results.vin).to.equal('123');
        expect(results.color).to.equal('Color');
        expect(results.doorCount).to.be.a.number();
        expect(results.doorCount).to.equal(4);
        expect(results.driveTrain).to.equal('v1');
      });
    });

    describe('failure', () => {
      before(() => {
        Nock(Config.gmApiUrl).post(`/${GMFixtures.get.service}Service`, badData)
          .reply(200, GMFixtures.badGet);
      });

      it('yields vehicle not found', async () => {
        try {
          const results = await gmVehicle.get(badData.id);
          expect(results).to.be.null();
        } catch (err) {
          expect(err).to.not.be.null();
          expect(err.status).to.equal('404');
        }
      });
    });
  });

  describe('GMVehicle.getDoors', () => {
    describe('success', () => {
      before(() => {
        Nock(Config.gmApiUrl).post(`/${GMFixtures.security.service}Service`, goodData)
          .reply(200, GMFixtures.security);
      });

      it('yields door security info', async () => {
        const results = await gmVehicle.getDoors(goodData.id);
        expect(results.length).to.equal(2);
        expect(results[0].location).to.equal('frontLeft');
        expect(results[0].locked).to.be.false();
      });
    });

    describe('failure', () => {
      before(() => {
        Nock(Config.gmApiUrl).post(`/${GMFixtures.security.service}Service`, badData)
          .reply(200, GMFixtures.badGet);
      });

      it('yields vehicle not found', async () => {
        try {
          const results = await gmVehicle.getDoors(badData.id);
          expect(results).to.be.null();
        } catch (err) {
          expect(err).to.not.be.null();
          expect(err.status).to.equal('404');
        }
      });
    });
  });
});
