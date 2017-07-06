const Mongoose = require('mongoose');

const UserSchema = Mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Users', UserSchema);
