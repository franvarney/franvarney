const User = require('../models/user');

module.exports = function (token, callback) {
  User.findOne({ token }, (err, user) => {
    if (err) return callback(err, false);
    if (!user) return callback(null, false);
    return callback(null, true, { user });
  });
}
