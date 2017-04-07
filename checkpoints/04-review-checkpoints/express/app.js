const path = require('path');
const chalk = require('chalk');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const HTTP_Error = require('./utils').HTTP_Error;
const apiRouter = require('./api');

var app = express();

// configuration

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: 'ring ring ring ring ring ring ring, banana phone',
  resave: false,
  saveUninitialized: false
}));

// routing

app.use('/api', apiRouter); // api routing

app.use('/files', express.static(path.join(__dirname, './public/static'))) // static routing

// error handling

/**
 * NOTE: the following two routes are naturally not something you'd normally
 * have in an app, they're just ways to demonstrate how you can trigger and
 * handle errors in Express apps. They're to pass the specs, in other words.
 */

app.get('/broken', function (req, res, next) {
  // Strategy 1: in non-async code, we can simply throw an error.
  throw Error('The default Express error handler will send a 500.');
  // Strategy 2: in async callbacks, `throw` would crash the app, so we need to use `next`.
  setTimeout(function () {
    next(Error('`next` lets us tell Express an error happened, even in async contexts.'))
  }, 0)
  // strategy 3: promises are great because we can specify error handlers (like `next`) and go back to `throw`ing errors like normal.
  Promise.resolve()
  .then(function () {
    throw Error('a thrown error in a promise chain bubbles to the next error handler');
  })
  .catch(next);
})

app.get('/forbidden', function (req, res, next) {
  // We want to specify the status code, but Express's default error handler just sends a 500. What can we do?
  // Strategy 1: send the status code manually. HOWEVER, now you are skipping any app-wide error handling, which might be problematic if you want to do something every time there's an error.
  res.sendStatus(403);
  // Strategy 2: Express's default error handler also honors any `.status` on the error object. So we can customize the error object before throwing it:
  var err = Error('If I have a .status, Express will use it');
  err.status = 403;
  throw err;
  // Strategy 3: doing those three lines each time is a drag. Let's make a helper class!
  throw HTTP_Error(403, 'nice and clean!');
  // And don't forget, in async we need to give the error to `next` somehow:
  setTimeout(function () {
    next(HTTP_Error(403, 'from a vanilla callback'));
  }, 0)
  // Even if that means throwing an error in a promise chain and giving `next` as the error handler function for the chain:
  Promise.resolve()
  .then(function () {
    throw HTTP_Error(403, 'a thrown error in a promise chain bubbles to the next error handler');
  })
  .catch(next);
})

/**
 * NOTE: the following custom error handler is NOT required by the spec, it's
 * just one that allows me to turn stack traces on and off easily. The default
 * error handling middleware in Express is very similar to this, so you don't
 * have to write our own handler if you don't want to.
 */
app.use(function (err, req, res, next) {
  console.error(chalk.dim.magenta(err.message));
  // console.error(err.stack); // can easily un-comment for stack traces
  res.status(err.status || 500).end();
});

module.exports = app;
