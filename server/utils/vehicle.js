const Request = require('request-promise');
const Url = require('url');

module.exports = class Vehicle {
  constructor(apiUrl) {
    this.url = apiUrl;
  }

  errorCheck(results) {
    if (results && Number(results.status) >= 400) return Promise.reject(results);
    return results;
  }

  _request(path, method, body=null) {
    const options = {
      method: method,
      uri: Url.resolve(this.url, path),
      json: true // could be configurable
    };

    if (body) options.body = body;

    return Request(options);
  }

  get(path, method, body=null) {
    return this._request.apply(this, arguments);
  }
}
