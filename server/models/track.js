const Mongoose = require('mongoose');

const TrackSchema = Mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  country: String,
  fastestTime: Number,
  __v: {
    type: Number,
    select: false
  }
});

module.exports = Mongoose.model('Tracks', TrackSchema);
