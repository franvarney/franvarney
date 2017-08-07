const Mongoose = require('mongoose');

const ShortId = require('ShortId');
const Uuid = require('uuid/v4');

const UserSchema = Mongoose.Schema({
  _id: {
    type: String,
    index: true,
    default: ShortId,
    unique: true
  },
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
  }
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
    // delete ret.token; // commented out for convenience only 
  }
});

module.exports = Mongoose.model('Users', UserSchema);
