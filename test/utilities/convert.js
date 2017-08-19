const {expect} = require('code');
const Fs = require('fs');
const Lab = require('lab');

const lab = exports.lab = Lab.script();
const {before, afterEach, describe, it} = lab;

const Convert = require('../../server/utilities/convert');
const CsvFixture = Fs.readFileSync('./test/fixtures/students.csv', 'utf-8');
const JsonFixture = require('../fixtures/students.json');

describe('Convert', () => {
  describe('toJson', () => {
    it('yields a JSON object', (done) => {
      Convert.toJson(CsvFixture, (err, json) => {
        expect(json).to.be.array();
        expect(json.length).to.equal(7);
        return done();
      });
    });
  });

  describe('toCsv', () => {
    it('return a JSON object', (done) => {
      const csv = Convert.toCsv(JsonFixture);
      expect(csv).to.be.string();
      expect(csv + '\n').to.equal(CsvFixture);
      return done();
    });
  });
});
