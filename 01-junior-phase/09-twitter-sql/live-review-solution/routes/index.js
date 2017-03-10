'use strict';
var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');
var pg = require('pg');

var client = new pg.Client('postgres://localhost/twitter_sql');

client.connect(function (err) {
  if (err) {
    console.log('Waaaah, I couldnt connect to the database', err);
  } else {
    console.log('Waaaah, I connected to the database');
  }
});

// a reusable function
function respondWithAllTweets (req, res, next){
  client.query('SELECT * FROM tweets INNER JOIN users ON users.id = tweets.user_id', function (err, result) {
    if (err) {
      next(err); // this jumps to the next matching ERROR HANDLING middleware
    } else {
      res.render('index', {
        showForm: true,
        tweets: result.rows
      });
    }
  });
}

// here we basically treet the root view and tweets view as identical
router.get('/', respondWithAllTweets);
router.get('/tweets', respondWithAllTweets);

// single-user page
router.get('/users/:username', function(req, res, next){
  var queryText = "SELECT * FROM tweets INNER JOIN users ON tweets.user_id = users.id WHERE name = $1";
  // get all the tweets for that user name
  client.query(queryText, [req.params.username], function (err, result) {
    if (err) {
      next(err);
    } else {
      // render that to the index template
      // send it to the browser client
      res.render('index', {
        showForm: true,
        tweets: result.rows
      });
    }
  });
  
});

// single-tweet page
router.get('/tweets/:id', function(req, res, next){
  var tweetsWithThatId = tweetBank.find({ id: Number(req.params.id) });
  res.render('index', {
    title: 'Twitter.js',
    tweets: tweetsWithThatId // an array of only one element ;-)
  });
});

// create a new tweet
router.post('/tweets', function(req, res, next){
  tweetBank.add(req.body.name, req.body.text);
  res.redirect('/');
});

// // replaced this hard-coded route with general static routing in app.js
// router.get('/stylesheets/style.css', function(req, res, next){
//   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
// });

module.exports = router;
