require('dotenv/config');
require('./db');

const express = require('express');
const hbs = require('hbs');

const app = express();
app.use(express.static('public'));

// This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-express-drones';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
app.locals.title = `${capitalized(projectName)}`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index); // Home page route

const droneRoutes = require('./routes/drones');
app.use('/', droneRoutes); // Drone-related routes

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
