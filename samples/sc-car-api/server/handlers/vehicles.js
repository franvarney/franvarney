const Joi = require('joi');

const GMVehicle = require('../utils/gm-vehicle');
const Errors = require('../utils/errors');

const gmVehicle = new GMVehicle();

exports.get = async (request) => {
  try {
    const results = await gmVehicle.get(request.params.id);
    return results;
  } catch (err) {
    return Errors(err);
  }
}

exports.getDoors = async (request) => {
  try {
    const results = await gmVehicle.getDoors(request.params.id);
    return results;
  } catch (err) {
    return Errors(err);
  }
}

exports.getFuelRange = async (request) => {
  try {
    const results = await gmVehicle.getFuel(request.params.id);
    return results;
  } catch (err) {
    return Errors(err);
  }
}

exports.getBatteryRange = async (request) => {
  try {
    const results = await gmVehicle.getBattery(request.params.id);
    return results;
  } catch (err) {
    return Errors(err);
  }
}

exports.setEngine = async (request) => {
  try {
    const results = await gmVehicle.setEngine(request.params.id, request.payload.action);
    return results;
  } catch (err) {
    return Errors(err);
  }
}
