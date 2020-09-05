const {Server} = require('hapi');
const Mongoose = require('mongoose');
const Series = require('run-series');

const Config = require('../config/server');
const Routes = require('./routes');

const server = new Server();

function connectToMongo(callback) {
  Mongoose.connect(Config.mongo, {
    useMongoClient: true
  });

  const Db = Mongoose.connection;

  Db.on('error', callback);
  Db.once('open', callback.bind(null, null, `Mongo connected at ${Config.mongo}`));
}

function startServer(callback) {
  server.connection({
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : null,
    port: parseInt(Config.port, 10),
    routes: {
      cors: true
    }
  });

  server.route(Routes);

  server.start((err) => {
    if (err) return callback(err);
    return callback(null, `Server started at ${server.info.uri}`);
  });
}

Series([
    connectToMongo,
    startServer
  ], (err, messages) => {
    if (err) console.error(err);
    console.info(messages.join('\r\n'));
  }
);
