const Boom = require('boom');
const Waterfall = require('run-waterfall');

const Reservation = require('../models/reservation');
const Restaurant = require('../models/restaurant');
const RestaurantReservation = require('../models/restaurant-reservation');

function formatDate(date) {
  date = new Date(date);
  return [date.getMonth() + 1, date.getDate() + 1, date.getFullYear()].join('-');
}

exports.create = function (request, reply) {
  Waterfall([
    function (callback) { // validate restaurant exists
      Restaurant.findOne({
        _id: request.payload.restaurant
      }, (err, restaurant) => {
        if (err) return callback(Boom.badRequest(err));
        if (!restaurant) return callback(Boom.notFound('Restaurant not found'));
        return callback(null, restaurant);
      });
    },
    function (restaurant, callback) { // validate range
      const {time} = request.payload;

      // don't allow reservations before open or less than an hour before close
      if (time < restaurant.open || time > restaurant.close - 2) {
        return callback(Boom.badData('Invalid reservation time'));
      }

      return callback(null, restaurant);
    },
    function (restaurant, callback) { // validate restaurant has table big enough
      const {size} = request.payload;
      const tables = restaurant.tables.some((table) => {
        return size >= table.size;
      });

      if (!tables) {
        return callback(Boom.badData('Restaurant doesn\'t have required table size'));
      }

      return callback(null, restaurant);
    },
    function (restaurant, callback) { // validate seats are available and return table size available
      const {date, time, size} = request.payload;
      const query = {
        restaurant: restaurant.id,
        date: formatDate(date)
      };
      const options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      };

      RestaurantReservation.findOneAndUpdate(query, query, options, (err, reservations) => {
        if (err) return callback(err);

        if (!reservations.length) {
          // filter tables that are too small
          const available = restaurant.tables.filter((table) => {
            return table.size >= size;
          });
          return callback(null, restaurant, available[0].size);
        }

        const slots = reservations.slice(time, time + 3).reduce((obj, reservation) => {
          if (!obj[reservation.size] && reservation.size >= size) obj[reservation.size] = 1;
          if (obj[reservation.size] && reservation.size >= size) obj[reservation.size]++;
          return obj;
        }, {});

        const available = Object.keys(slots).reduce((size, key) => {
          if (size === 0 && slots[key] < restaurant.tables.find((table) => table.size === key)) {
            size = key;
          }
        }, 0);

        if (!available) {
          return callback(Boom.badData('Table not available'));
        }

        return callback(null, restaurant, available);
      });
    },
    function (restaurant, available, callback) { // save reservation and update total reservations
      const {payload} = request;
      payload.user = request.auth.credentials._id;
      payload.date = formatDate(payload.date);

      const reservation = new Reservation(payload);
      reservation.save((err, saved) => {
        if (err) return callback(Boom.badRequest(err));

        const query = {
          restaurant: restaurant.id,
          date: saved.date
        };
        const data = {
          start: saved.time,
          end: saved.time + 3,
          size: available,
          id: saved.id
        };

        RestaurantReservation.findOne(query, (err, restaurantReservation) => {
          if (err) return callback(Boom.badRequest(err));

          restaurantReservation.reservations.forEach((item, index) => {
            if (index >= saved.time && index <= (saved.time + 3)) {
              if (!Array.isArray(item)) item = [];
              item.push(data);
            }
          });

          RestaurantReservation.update(query, {
            reservations: restaurantReservation.reservations
          }, (err) => {
            if (err) return callback(Boom.badRequest(err));
            return callback(null, saved.id);
          });
        });
      });
    }
  ], (err, id) => {
    if (err) return reply(err);
    return reply({ id }).code(201);
  });
}

// This is only here so I don't have to use the terminal
exports.index = function (request, reply) {
  Reservation.find({}, (err, reservations) => {
    if (err) return reply(Boom.badRequest(err));
    return reply(reservations);
  });
}
