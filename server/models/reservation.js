const Mongoose = require('mongoose');
const ShortId = require('ShortId');

const ReservationSchema = Mongoose.Schema({
  _id: {
    type: String,
    index: true,
    default: ShortId,
    unique: true
  },
  user: {
    type: String,
    ref: 'Users'
  },
  restaurant: {
    type: String,
    ref: 'Restaurants'
  },
  size: Number,
  date: String,
  time: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: Date
});

ReservationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = Mongoose.model('Reservations', ReservationSchema);
