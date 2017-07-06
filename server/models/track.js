const Mongoose = require('mongoose');

const TrackSchema = Mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  country: String,
  fastestTime: Number
});

module.exports = Mongoose.model('Tracks', TrackSchema);
