const CsvToJson = require('csvtojson');
const JsonToCsv = require('json2csv');

exports.toJson = function (csv, callback) {
  const results = [];

  CsvToJson()
    .fromString(csv)
    .on('json', (row) => results.push(row))
    .on('done', () => callback(null, results));
}

exports.toCsv = function (json) {
  return JsonToCsv({
    data: json,
    fields: Object.keys(json[0])
  }).split(/"/).join(''); // remove quotes
}
