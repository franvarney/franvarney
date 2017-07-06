const Joi = require('joi');
const KnockKnock = require('knock-knock');

const Races = require('../handlers/races');
const Setup = require('../handlers/setup');

module.exports = [
  // server test
  {
    path: '/ping',
    method: 'GET',
    handler: (request, reply) => KnockKnock(reply)
  },

  // generate and add data to mongo
  {
    path: '/setup',
    method: 'POST',
    handler: Setup,
    config: {
      validate: {
        payload: Joi.object({
          car: Joi.number().default(20).min(5),
          race: Joi.number().default(40).min(5),
          track: Joi.number().default(10).min(3),
          user: Joi.number().default(20).min(10)
        })
      }
    }
  },

  // races
  {
    path: '/races',
    method: 'GET',
    handler: Races.index
  }
];
