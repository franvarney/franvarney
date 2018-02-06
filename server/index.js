const {Server} = require('hapi');

const Config = require('../config');
const Routes = require('./routes');

;(async function start() {
  const server = new Server({
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : null,
    port: Config.port,
    routes: {
      cors: true
    }
  });

  server.route(Routes);

  try {
    await server.start();
    console.log(`Server started at ${server.info.uri}`);
  } catch (err) {
    throw err;
  }
})();
