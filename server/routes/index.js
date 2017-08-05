const Joi = require('joi');

const Restaurants = require('../handlers/restaurants');
const Users = require('../handlers/users');

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
    path: '/api/restaurants',
    method: 'POST',
    handler: Restaurants.create,
    config: {
      validate: {
        payload: Joi.object().keys({
          name: Joi.string().min(2).max(25).required(),
          open: Joi.number().min(0).max(2359).required(),
          close: Joi.number().min(0).max(2359).required(),
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
  }
];
