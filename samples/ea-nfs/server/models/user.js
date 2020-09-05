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
  },
  __v: {
    type: Number,
    select: false
  }
});

module.exports = Mongoose.model('Users', UserSchema);
