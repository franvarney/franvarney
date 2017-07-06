const Mongoose = require('mongoose');

const CarSchema = Mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  color: String
});

module.exports = Mongoose.model('Cars', CarSchema);
