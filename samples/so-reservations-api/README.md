reservations-api
================

## Install

- Use Node 6+
- Run `npm install` (or use yarn)
- Run MongoDB locally or set environment variable `MONGO_URL`
- Run `npm start`
- View at http://localhost:3000

### Notes

- Create at least one user and use the `token` in the header (`Authorization: Bearer <token>`)
- For `POST /api/restaurants` and `POST /api/reservations`, the `open`/`close` and `time` input is the index where 0 = midnight, 1 = 00:30, 2 = 1:00, etc
- Should be able to determine `POST` body information by viewing the `Joi` schemes in the routes index
