const express = require('express');
const app = express();
const cars = require('./MOCK_DATA');

const port = 3000;

var makeCounters = {},
  yearCounters = {};

// ETL the data in lieu of a database
cars.forEach(car => {
  makeCounters[car.make] = makeCounters[car.make] ? makeCounters[car.make] + 1 : 1;
  yearCounters[car.year] = yearCounters[car.year] ? yearCounters[car.year] + 1 : 1;
});

var makes = Object.keys(makeCounters).sort(),
  years = Object.keys(yearCounters).sort();

// Expose endpoints
app.get('/api/v1/cars/:id', (req, res) => {
    res.send(cars[req.params.id - 1]);
  })
  .get('/api/v1/cars', (req, res) => {
    res.send(cars);
  })
  .get('/api/v1/makes', (req, res) => {
    res.send(makes);
  })
  .get('/api/v1/years', (req, res) => {
    res.send(years);
  })

  // Serve the built application
  .use(express.static('../../dist/fleetman'))

  // Start the server
  .listen(port, () => console.log(`** FleetMan server is listening on localhost:${port}`));
