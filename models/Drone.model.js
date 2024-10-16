// Iteration #1
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema of drones to seed the db
const droneSchema = new Schema({
  name: String,
  propellers: Number,
  maxSpeed: Number,
});

const Drone = mongoose.model('Drone', droneSchema);

module.exports = Drone;
