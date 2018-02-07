const Joi = require('joi');
const _get = require('lodash.get');

const convert = (path, context) => _get(context, path);

exports.vehicle = Joi.object().keys({
  vin: Joi.string().default(convert.bind(null, 'data.vin.value'), 'Vin'),
  color: Joi.string().default(convert.bind(null, 'data.color.value'), 'Color'),
  doorCount: Joi.number().default((context) => {
    return _get(context, 'data.fourDoorSedan.value') ? 4 : 2;
  }, 'Door Count'),
  driveTrain: Joi.string().default(convert.bind(null, 'data.driveTrain.value'), 'DriveTrain')
}).options({ stripUnknown: true });

const doors = Joi.object().keys({
  oldLocked: Joi.object({
    value: Joi.boolean()
  }).strip(),
  location: Joi.string().default(convert.bind(null, 'oldLocation.value'), 'Location'),
  locked: Joi.boolean().default(convert.bind(null, 'oldLocked.value'), 'Locked')
}).rename('location', 'oldLocation')
  .rename('locked', 'oldLocked')
  .options({
    allowUnknown: true,
    stripUnknown: true
  });

exports.doorValues = Joi.object().keys({
  values: Joi.any().default(convert.bind(null, 'data.doors.values'), 'Values')
}).options({ stripUnknown: true });

exports.doors = Joi.array().items(doors);

const convertNumber = (path, context) => {
  let value = Number(_get(context, path));
  return isNaN(value) ? 0 : value;
}

exports.fuel = Joi.object().keys({
  percent: Joi.number().default(convertNumber.bind(null, 'data.tankLevel.value'), 'Fuel')
}).options({ stripUnknown: true });

exports.battery = Joi.object().keys({
  percent: Joi.number().default(convertNumber.bind(null, 'data.batteryLevel.value'), 'Battery')
}).options({ stripUnknown: true });

exports.engine = Joi.object().keys({
  actionResult: Joi.object({
    status: Joi.string()
  }).strip(),
  status: Joi.string().default((context) => {
    if (context.actionResult.status == 'EXECUTED') return 'SUCCESS';
    if (context.actionResult.status == 'FAILED') return 'ERROR';
  }, 'Status')
}).rename('status', 'statusCode')
  .options({
  allowUnknown: true,
  stripUnknown: true
});
