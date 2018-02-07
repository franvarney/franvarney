const KnockKnock = require('knock-knock');
const Joi = require('joi');
const Util = require('util');

const Vehicles = require('./handlers/vehicles');

module.exports = [
  {
    method: 'GET',
    path: '/ping',
    handler: async () => await Util.promisify(KnockKnock)()
  },

  {
    method: 'GET',
    path: '/vehicles/{id}',
    handler: Vehicles.get
  },

  {
    method: 'GET',
    path: '/vehicles/{id}/doors',
    handler: Vehicles.getDoors
  },

  {
    method: 'GET',
    path: '/vehicles/{id}/fuel',
    handler: Vehicles.getFuelRange
  },

  {
    method: 'GET',
    path: '/vehicles/{id}/battery',
    handler: Vehicles.getBatteryRange
  },

  {
    method: 'POST',
    path: '/vehicles/{id}/engine',
    handler: Vehicles.setEngine,
    config: {
      validate: {
        payload: Joi.object().keys({
          action: Joi.string().uppercase().allow(['START', 'STOP'])
        }).options({ stripUnknown: true })
      }
    }
  }
];
