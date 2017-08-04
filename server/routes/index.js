const Joi = require('joi');

const Tables = require('../handlers/tables');
const Users = require('../handlers/users');

module.exports = [
  {
    path: '/api/users',
    method: 'POST',
    handler: Users.create,
    config: {
      validate: {
        payload: Joi.object().keys({
          email: Joi.string().email(),
          password: Joi.string().min(6).max(20)
        })
      }
    }
  },

  {
    path: '/api/tables',
    method: 'POST',
    handler: Tables.create,
    config: {
      validate: {
        payload: Joi.object().keys({
          size: Joi.number().min(1).max(12),
          count: Joi.number().min(1).max(40)
        })
      }
    }
  }
];
