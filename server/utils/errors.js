const Boom = require('boom');

module.exports = function (err) {
  let error;

  switch (Number(err.status)) {
    // could have more errors
    case 404:
      error = Boom.notFound;
      break;
    default:
      error = Boom.badRequest;
      break;
  }

  return error(err && err.reason ? err.reason : '');
}
