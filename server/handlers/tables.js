const Boom = require('boom');

const Series = require('run-series');
const Table = require('../models/table');

exports.create = function (request, reply) {
  Series([
    function (callback) {
      Table.find({ size: request.payload.size }, (err, table) => {
        if (err) return callback(Boom.badRequest(err));
        if (table.length) return callback(Boom.badData('Table already exists'));
        return callback();
      });
    },
    function (callback) {
      const table = new Table(request.payload);

      table.save((err, user) => {
        if (err) return callback(Boom.badRequest(err));
        return callback(null, table);
      });
    }
  ], (err, [,table]) => {
    if (err) return reply(err);
    return reply(table).code(201);
  });
}
