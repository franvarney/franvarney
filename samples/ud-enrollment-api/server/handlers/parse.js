const CsvToJson = require('csvtojson');
const Series = require('run-series');
const Waterfall = require('run-waterfall');

const CompanyApi = require('../utilities/company');
const Convert = require('../utilities/convert');

const Company = new CompanyApi();

function enrollOrUnenroll(json, students, callback) {
  const tasks = json.map((obj) => {
    const {courseId, studentId, task} = obj;

    if (!students.hasOwnProperty(studentId)) {
      return (next) => next(null, { code: 404, result: 'MISSING' });
    }

    if (task === 'enroll') {
      return Company.enrollStudent.bind(Company, studentId, courseId);
    } else if (task === 'unenroll' && students[studentId] !== null) {
      return Company.unenrollStudent.bind(Company, studentId);
    } else if (task === 'unenroll' && students[studentId] === null) {
      return (next) => next(null, { code: 200, result: 'OK' });
    }
  });

  return Series(tasks, (err, results) => {
    if (err) return callback(err);
    return callback(null, json, results);
  });
}

function getStudentsCourse(companyId, json, callback) {
  Company.getCompanyStudents(companyId, (err, {result}) => {
    if (err) return callback(err);

    students = result.reduce((obj, student) => {
      obj[student._studentId] = student._enrolledIn;
      return obj;
    }, {});

    return callback(null, json, students);
  });
}

module.exports = function (request, reply) {
  const csv = request.payload.jobs;

  Waterfall([
    Convert.toJson.bind(null, csv),
    getStudentsCourse.bind(null, request.params.id),
    enrollOrUnenroll,
    function (json, results, callback) { // add response
      json.forEach((item, i) => item.response = results[i].result);
      return callback(null, json);
    }
  ], (err, results) => {
    if (err) return reply(err);

    if (request.headers['accept'] === 'application/json') {
      return reply(results);
    }

    return reply(Convert.toCsv(results)).type('text/csv');
  });
}
