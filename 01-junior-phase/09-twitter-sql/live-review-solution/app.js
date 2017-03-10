'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var routes = require('./routes');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var bodyParser = require('body-parser');

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// static and dynamic routing
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes);

// // "ordinary" success handling middleware
// app.use(function (a,b,c) { });

// // "error handling" middleware
// app.use(function (a,b,c,d) { });

app.use(function (req, res, next) {
  // next(err) will not take you here!
  next();
});

app.use(function (err, req, res, next) {
  console.error('There was an error and Im sad about it');
  console.error(err.message);
  console.error(err.stack);
  res.status(err.status || 500).send(err);
});

// start the server
app.listen(1337, function(){
  console.log('listening on port 1337');
});

// // manually-written static file middleware
// app.use(function(req, res, next){
//   var mimeType = mime.lookup(req.path);
//   fs.readFile('./public' + req.path, function(err, fileBuffer){
//     if (err) return next();
//     res.header('Content-Type', mimeType);
//     res.send(fileBuffer);
//   });
// });
