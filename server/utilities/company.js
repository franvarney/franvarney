const Request = require('request');

const Config = require('../../config');

module.exports = class CompanyApi {
  constructor(apiUrl=Config.company.apiUrl, authorizationEmail=Config.email) {
    this.apiUrl = apiUrl;
    this.authorizationEmail = authorizationEmail;
  }

  _request(method, url, data, callback) {
    if (typeof data === 'function') {
      callback = data;
      data = null;
    }

    const options = {
      method,
      baseUrl: this.apiUrl,
      url,
      headers: {
        Authorization: `ent: ${this.authorizationEmail}`
      },
      json: true
    };

    if (data) {
      options.body = data;
    }

    Request(options, function (err, response, body) {
      if (err) return callback(err);

      if (Number(response.statusCode) === 404) {
        return callback(null, { code: 404, result: 'MISSING' });
      }

      if (Number(response.statusCode) === 409) {
        return callback(null, { code: 409, result: 'CONFLICT' });
      }

      if (Array.isArray(body)) body = { result: body };

      return callback(null, Object.assign({ code: Number(response.statusCode) }, body));
    });
  }

  // getCompanies() {}

  // getCompany() {}

  getCompanyStudents(companyId, callback) {
    return this._request('GET', `/api/company/${companyId}/students`, callback);
  }

  // getStudentStats() {}

  enrollStudent(studentId, courseId, callback) {
    return this._request('POST', '/api/student/enroll', {
      student: studentId,
      course: courseId
    }, (err, results) => {
      if (err) return callback(err);

      if (results.code === 404) {
        return callback(null, { code: 409, result: 'CONFLICT' });
      }

      return callback(null, results);
    });
  }

  unenrollStudent(studentId, callback) {
    return this._request('POST', `/api/student/unenroll/${studentId}`, callback);
  }

  // getCourses() {}

  // getCourse() {}
}
