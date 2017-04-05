'use strict';

var app = require('express')();
var path = require('path');
var expressSession = require('express-session');

// "Enhancing" middleware (does not send response, server-side effects only)

app.use(require('./logging.middleware'));

app.use(require('./body-parsing.middleware'));

// this will establish `req.session` object
// that session object only present on server
// contains data/state that we want to persist about a client (not user)
// usable downstream of this middlware
app.use(expressSession({
  secret: 'tongiscool',
  resave: false,
  saveUnitialized: false
}));

// "Responding" middleware (may send a response back to client)

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./statics.middleware'));

app.use(require('./error.middleware'));

module.exports = app;
