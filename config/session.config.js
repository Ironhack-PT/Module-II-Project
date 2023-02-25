const User = require('../models/User.model')
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const { MONGODB_URI } = require('./db.config');

const MAX_AGE = 7;

module.exports.sessionConfig = expressSession({
  secret: process.env.COOKIE_SECRET || 'super-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.COOKIE_SECURE || false,
    httpOnly: true,
    maxAge: 24 * 3600 * 1000 * MAX_AGE
  },
  store: new MongoStore({
    mongoUrl: MONGODB_URI,
  })
})

