const Faker = require('faker');
const Series = require('run-series');

const Car = require('../models/car');
const Track = require('../models/track');
const User = require('../models/user');
const Race = require('../models/race');

const IDS = {
  cars: [],
  tracks: [],
  users: []
};

function createTask(item, next) {
  return item.save((err) => {
    if (err) return next(err);
    return next();
  });
}

function generateCars(amount, callback) {
  const cars = new Array(amount).fill({}).map((car) => {
    car = new Car({
      name: `${Faker.random.number({ min: 1980, max: 2015 })} ${Faker.random.words(2)}`,
      color: Faker.internet.color()
    });

    IDS.cars.push(car._id);
    return createTask.bind(null, car);
  });

  return Series(cars, callback);
}

function generateTracks(amount, callback) {
  const tracks = new Array(amount).fill({}).map((track) => {
    track = new Track({
      name: Faker.random.words(2),
      country: Faker.address.countryCode(),
      fastestTime: Faker.random.number({ min: 50000, max: 60000 })
    });

    IDS.tracks.push(track._id);
    return createTask.bind(null, track);
  });

  return Series(tracks, callback);
}

function generateUsers(amount, callback) {
  const users = new Array(amount).fill({}).map((user) => {
    user = new User({
      username: Faker.internet.userName(),
    });

    IDS.users.push(user._id);
    return createTask.bind(null, user);
  });

  return Series(users, callback);
}

function generateRaces(amount, callback) {
  let fastestTime = null;

  function generateParticipants() {
    return new Array(4).fill({}).map(() => {
      let finishTime = Faker.random.number({ min: 60000, max: 360000 });

      if (!fastestTime || finishTime < fastestTime) {
        fastestTime = finishTime;
      }

      return {
        user: Faker.random.arrayElement(IDS.users),
        car: Faker.random.arrayElement(IDS.cars),
        finishTime
      };
    });
  }

  const races = new Array(amount).fill({}).map((race) => {
    race = new Race({
      track: Faker.random.arrayElement(IDS.tracks),
      participants: generateParticipants(),
      fastestTime
    });

    fastestTime = null; // reset

    return createTask.bind(null, race);
  });

  return Series(races, callback);
}

module.exports = function (request, reply) {
  Series([
    generateCars.bind(null, request.payload.car),
    generateTracks.bind(null, request.payload.track),
    generateUsers.bind(null, request.payload.user),
    generateRaces.bind(null, request.payload.race)
  ], (err) => {
    if (err) return reply(err);
    console.info('Completed generating and storing sample data');
    return reply(IDS).code(201);
  });
}
