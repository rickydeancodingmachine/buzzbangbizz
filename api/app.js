const dotenv = require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const passport = require('passport');
require('./auth/passport')(passport);
const database = require('./database/controllers');
const routes = require('./routes/index');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(morgan('combined'));
app.use(function(req, res, next) {
  req.db = database;
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(passport.initialize());

// api route
app.get('/api/*', routes);
app.post('/api/*', routes);

// all other routes get sent either their static files or the client index.html
if (process.env.NODE_ENV === 'production' || 'development') {
  console.log('production');
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

module.exports = app;
