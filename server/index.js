const {Server} = require('hapi');

const Config = require('../config');
const Routes = require('./routes');

const server = new Server();

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

startServer((err, message) => {
  if (err) console.error(err);
  console.info(message);
});
