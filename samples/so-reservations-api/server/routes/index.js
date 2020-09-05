const Joi = require('joi');

const Reservations = require('../handlers/reservations');
const Restaurants = require('../handlers/restaurants');
const Users = require('../handlers/users');

function createTimesAllowed() {
  let count = 0;
  return new Array(48).fill(0).map((item) => count++);
}

module.exports = [
  {
    path: '/api/users',
    method: 'POST',
    handler: Users.create,
    config: {
      validate: {
        payload: Joi.object().keys({
          email: Joi.string().email().required(),
          password: Joi.string().min(6).max(20).required()
        })
      }
    }
  },

  {
    path: '/api/users',
    method: 'GET',
    handler: Users.index
  },

  {
    path: '/api/restaurants',
    method: 'POST',
    handler: Restaurants.create,
    config: {
      validate: {
        payload: Joi.object().keys({
          name: Joi.string().min(2).max(25).required(),
          open: Joi.allow(createTimesAllowed()).required(),
          close: Joi.allow(createTimesAllowed()).required(),
          tables: Joi.array().min(1).items(Joi.object({
            size: Joi.number().min(1).max(16),
            count: Joi.number().min(1).max(40)
          }))
        })
      }
    }
  },

  {
    path: '/api/restaurants/{id}',
    method: 'GET',
    handler: Restaurants.get
  },

  {
    path: '/api/restaurants',
    method: 'GET',
    handler: Restaurants.index
  },

  {
    path: '/api/reservations',
    method: 'POST',
    handler: Reservations.create,
    config: {
      auth: 'simple',
      validate: {
        payload: Joi.object().keys({
          restaurant: Joi.string().required(),
          size: Joi.number().min(1).max(16),
          date: Joi.date().min('now').max(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ),
          time: Joi.allow(createTimesAllowed()).required()
        })
      }
    }
  },

  {
    path: '/api/reservations',
    method: 'GET',
    handler: Reservations.index
  },
];
