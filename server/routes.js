const Util = require('util');

const KnockKnock = require('knock-knock');

module.exports = [
  {
    method: 'GET',
    path: '/ping',
    handler: async () => await Util.promisify(KnockKnock)()
  }
];
