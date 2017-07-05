module.exports = {
  mongo: process.env.SERVER_MONGO_URL || 'mongodb://localhost:27017/n4s',
  port: process.env.SERVER_PORT || 5000
};
