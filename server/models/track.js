const {Schema, model} = require('mongoose');

const TrackSchema = Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  country: String,
  fastestTime: Number
});

module.exports = model('Tracks', TrackSchema);
