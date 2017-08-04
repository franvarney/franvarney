const Users = require('../handlers/users');

module.exports = [
  {
    path: '/api/users',
    method: 'POST',
    handler: Users.create
  }
];
