const Mongoose = require('mongoose');
const ShortId = require('ShortId');

const RestaurantSchema = Mongoose.Schema({
  _id: {
    type: String,
    index: true,
    default: ShortId,
    unique: true
  },
  name: {
    type: String,
    unique: true
  },
  open: Number,
  close: Number,
  tables: [{
    size: Number,
    count: Number
  }]
});

RestaurantSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = Mongoose.model('Restaurants', RestaurantSchema);
