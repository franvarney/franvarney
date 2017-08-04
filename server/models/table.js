const Mongoose = require('mongoose');

const TableSchema = Mongoose.Schema({
  size: {
    type: Number,
    index: true,
    unique: true
  },
  count: {
    type: Number
  }
});

TableSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = Mongoose.model('Tables', TableSchema);
