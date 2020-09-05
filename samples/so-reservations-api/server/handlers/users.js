const Boom = require('boom');

const Series = require('run-series');
const User = require('../models/user');

exports.create = function (request, reply) {
  Series([
    function (callback) {
      User.find({ email: request.payload.email }, (err, user) => {
        if (err) return callback(Boom.badRequest(err));
        if (user.length) return callback(Boom.badData('Email already exists'));
        return callback();
      });
    },
    function (callback) {
      const user = new User(request.payload);

      user.save((err, saved) => {
        if (err) return callback(Boom.badRequest(err));
        return callback(null, saved);
      });
    }
  ], (err, [,user]) => {
    if (err) return reply(err);
    return reply({ id: user.toJSON().id }).code(201);
  });
}

// This is only here so I don't have to use the terminal
exports.index = function (request, reply) {
  User.find({}, (err, users) => {
    if (err) return reply(Boom.badRequest(err));
    return reply(users);
  });
}
