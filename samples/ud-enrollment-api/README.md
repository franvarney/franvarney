enrollment-api
==============

## Instructions

- Run `git clone <repo>`
- Run `npm install`
- Run `API_URL=<apiUrl> EMAIL=<email> npm start`

#### Request

- Route
  - `POST http://localhost:3000/api/company/1/manage-students`


- Headers
  - `Content-Type: application/x-www-form-urlencoded`
  - `Content-Disposition: attachment`
  - [optional] `Accept: application/json`
  

- Body
  - jobs: `<somedata.csv>`

#### Tests

- Run `npm test`
