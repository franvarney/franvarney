const Boom = require('boom');

const Series = require('run-series');
const Restaurant = require('../models/restaurant');

exports.create = function (request, reply) {
  Series([
    function (callback) {
      Restaurant.find({ name: request.payload.name }, (err, restaurant) => {
        if (err) return callback(Boom.badRequest(err));
        if (restaurant.length) return callback(Boom.badData('Restaurant already exists'));
        return callback();
      });
    },
    function (callback) {
      const restaurant = new Restaurant(request.payload);

      restaurant.save((err, saved) => {
        if (err) return callback(Boom.badRequest(err));
        return callback(null, saved);
      });
    }
  ], (err, [,restaurant]) => {
    if (err) return reply(err);
    return reply({ id: restaurant.id }).code(201);
  });
}

exports.get = function (request, reply) {
  Restaurant.findOne({ _id: request.params.id }, (err, restaurant) => {
    if (err) return reply(Boom.badRequest(err));
    if (!restaurant) return reply(Boom.notFound('Restaurant not found'));
    return reply(restaurant);
  });
}

exports.update = function (request, reply) {
  // TODO: add this so tables could be modified
}
