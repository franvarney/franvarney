const Mongoose = require('mongoose');

const RestaurantReservationSchema = Mongoose.Schema({
  restaurant: {
    type: String,
    ref: 'Restaurants'
  },
  date: {
    type: String,
    index: true,
    unique: true
  },
  reservations: {
    type: Array,
    default: new Array(48).fill([])
  }
});

RestaurantReservationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = Mongoose.model('RestaurantReservations', RestaurantReservationSchema);
