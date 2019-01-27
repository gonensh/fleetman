const express = require('express');
const app = express();
const cars = require('./MOCK_DATA');

const port = 3000;

var makes = {},
  years = {};

// ETL the data in lieu of a database
cars.forEach(car => {
  makes[car.make] = makes[car.make] ? makes[car.make] + 1 : 1;
  years[car.year] = years[car.year] ? years[car.year] + 1 : 1;
});

// Expose endpoints
app.get('/api/v1/cars/:id', (req, res) => {
    res.send(cars[req.params.id - 1]);
  })
  .get('/api/v1/cars', (req, res) => {
    res.send(cars);
  })
  .get('/api/v1/makes', (req, res) => {
    res.send(Object.keys(makes).sort());
  })
  .get('/api/v1/years', (req, res) => {
    res.send(Object.keys(years).sort());
  })

  // Serve the built application
  .use(express.static('../../dist/fleetman'))

  // Start the server
  .listen(port, () => console.log(`** FleetMan server is listening on localhost:${port}`));
