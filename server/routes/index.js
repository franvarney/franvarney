const KnockKnock = require('knock-knock');

module.exports = [
  {
    path: '/ping',
    method: 'GET',
    handler: (request, reply) => KnockKnock(reply)
  }
];
