const Race = require('../models/race');

exports.index = function(request, reply) {
  // TODO validate request.query.limit
  const limit = parseInt(request.query.limit, 10) || 10;

  const query = Race.find().sort({ fastestTime: 1 }).limit(limit);

  query.populate('track participants.user participants.car').exec((err, results) => {
    if (err) return reply(err);
    return reply(results);
  });
}
