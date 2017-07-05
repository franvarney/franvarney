const {Schema, model} = require('mongoose');

const UserSchema = Schema({
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

module.exports = model('Users', UserSchema);
