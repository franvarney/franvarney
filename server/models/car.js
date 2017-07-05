const {Schema, model} = require('mongoose');

const CarSchema = Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  color: String
});

module.exports = model('Cars', CarSchema);
