const Mongoose = require('mongoose');

const CarSchema = Mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  color: String,
  __v: {
    type: Number,
    select: false
  }
});

module.exports = Mongoose.model('Cars', CarSchema);
