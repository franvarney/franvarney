const Parse = require('./handlers/parse');

module.exports = [
  {
    method: 'POST',
    path: '/api/company/{id}/manage-students',
    handler: Parse
  }
];
