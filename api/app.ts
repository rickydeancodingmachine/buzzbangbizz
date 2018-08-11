const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./auth/passport')(passport);
const database = require('./database/controllers');
const api = require('./api/routes');

const app = express();
const PORT = process.env.PORT || 9000;

//middleware
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // credentials: true,
  }),
);
// app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(morgan('combined'));
app.use(function(req, res, next) {
  req.db = database;
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

//landing page route
app.post('/', (req, res) => {
  res.status(200).json({ response: 'called landing page' });
});
app.get('/', (req, res) => {
  res.status(200).json({ response: 'called landing page' });
});

// //api route
app.get('/api/*', api);
app.post('/api/*', api);

module.exports = app;
