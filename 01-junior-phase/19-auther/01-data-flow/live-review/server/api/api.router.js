'use strict';

var db = require('../db');
var User = db.model('user');

var router = require('express').Router();

router.use('/users', require('./users/user.router'));

router.use('/stories', require('./stories/story.router'));

router.get('/current-user', function (req, res, next) {
  // find current user, send back to client
  User.findById(req.session.currentUserId)
  .then(function (user) {
    res.json(user);
  })
  .catch(next);
});

router.post('/login', function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.sendStatus(401);
  }
  // expect request body to contain credentials
  User.findOne({
    where: req.body
  })
  .then(function (foundUser) {
    if (!foundUser) {
      return res.sendStatus(401);
    }
    // set user id on session
    // "keeps them logged in"
    req.session.currentUserId = foundUser.id;
    res.json(foundUser);
  })
  .catch(next);
});

router.post('/signup', function (req, res, next) {
  // expect request body to contain credentials
  User.create(req.body)
  .then(function (createdUser) {
    // set user id on session
    // "keeps them logged in"
    req.session.currentUserId = createdUser.id;
    res.json(createdUser);
  })
  .catch(next);
});


router.get('/logout', function (req, res, next) {
  req.session.currentUserId = null;
  res.status(204).end();
});

module.exports = router;
