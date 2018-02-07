const Joi = require('joi');
const _get = require('lodash.get');

const Config = require('../../config');
const Vehicle = require('./vehicle');
const VehicleSchema = require('../schemas/vehicle');

module.exports = class GMVehicle extends Vehicle {
  constructor() {
    super(Config.gmApiUrl);
    this.schemas = VehicleSchema;
  }

  _body(id) {
    return { id, responseType: 'JSON' };
  }

  get(id) {
    return super.get('/getVehicleInfoService', 'POST', this._body(id))
      .then(super.errorCheck)
      .then((results) => Joi.validate(results, this.schemas.vehicle));
  }

  getDoors(id) {
    return super._request('/getSecurityStatusService', 'POST', this._body(id))
      .then(super.errorCheck)
      .then((results) => Joi.validate(_get(results, 'data.doors'), this.schemas.doorValues))
      .then((results) => Joi.validate(results.values, this.schemas.doors));
  }

  _getEnergy(id) {
    return super._request('/getEnergyService', 'POST', this._body(id));
  }

  getFuel(id) {
    return super._request('/getEnergyService', 'POST', this._body(id))
     .then(super.errorCheck)
     .then((results) => Joi.validate(results, this.schemas.fuel));
  }

  getBattery(id) {
    return this._getEnergy(id)
      .then(super.errorCheck)
      .then((results) => Joi.validate(results, this.schemas.battery));
  }

  setEngine(id, command) {
    const body = Object.assign(this._body(id), { command: command += '_VEHICLE' });
    return super._request('/actionEngineService', 'POST', body)
     .then(super.errorCheck)
     .then((results) => Joi.validate(results, this.schemas.engine));
  }
}
