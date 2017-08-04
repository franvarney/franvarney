const Mongoose = require('mongoose');

const Uuid = require('uuid/v4');

const UserSchema = Mongoose.Schema({
  email: {
    type: String,
    index: true,
    unique: true
  },
  password: {
    type: String,
    index: true
  },
  token: {
    type: String,
    index: true,
    default: Uuid
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  __v: {
    type: Number,
    select: false
  }
});

module.exports = Mongoose.model('Users', UserSchema);
