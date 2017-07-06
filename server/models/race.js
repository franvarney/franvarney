const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const RaceSchema = Schema({
  track: {
    type: Schema.Types.ObjectId,
    ref: 'Tracks'
  },
  participants: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Cars'
    },
    finishTime: {
      type: Number,
      default: 0
    }
  }],
  fastestTime: {
    type: Number,
    index: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  __v: {
    type: Number,
    select: false
  }
});

module.exports = Mongoose.model('Races', RaceSchema);
