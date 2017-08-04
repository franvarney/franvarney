module.exports = {
  mongo: process.env.MONGO_URL || 'mongodb://localhost:27017/reservations',
  port: process.env.PORT || 3000
};
