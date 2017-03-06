var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
/*
* A server listens on port
* A server won't handle any requests unless you tell it to do so
*/
var app = express();
app.listen(1337, function () {
  console.log('Hush now Im trying to sleep');
});


// // if you don't send a response, the client will just wait :(
// app.get('/example', function (request, response) {
//   console.log(Object.keys(request));
//   response.send('here you go: 786155213');
// });
// app.get('/example', function (request, response) {
//   console.log(Object.keys(request));
//   response.send('here you go: 786155213');
// });

// app.get('/example', function (request, response) {
//   console.log(Object.keys(request));
//   response.send('<h3 style="background-color:blue;">Not that fun...</h3>');
// });
// app.get('/example.html', function (request, response) {
//   response.send({
//     name: 'Jason',
//     favoriteColor: 'javascript'
//   });
// });
// app.get('/example.html', function (request, response) {
//   response.sendFile(__dirname + '/example.html');
// });

// app.get('/example', function (request, response) {
//   response.send('Coming back to you from a get request');
// });
// app.post('/example', function (request, response) {
//   response.send('Coming back to you from a post request');
// });

// // routes are NOT filepaths
// // a simple CR app
// var dumbledores = [],
//   id = 0;
// app.get('/data', function (request, response) {
//   response.json(dumbledores);
// });
// app.post('/data', function (request, response) {
//   dumbledores.push({
//     name: 'Dumbledore',
//     id: id++
//   });
//   response.json(dumbledores[dumbledores.length - 1]);
// });


// in express middleware == the route handling function (the thing that takes request and response)

// app.get('/athing', function (request, response, next) {
//   console.log('firstly!');
//   next(); // you need this! if you don't it hangs indefinitely
// });
// app.get('/athing', function (request, response) {
//   response.send('finally!');
// });


// // static file serving and good use case for next
// app.use(function (request, response, next) {
//   fs.readFile(__dirname + '/' + request.url, function (err, contents) {
//     if (err) {
//       next();
//     } else {
//       response.sendFile(__dirname + '/' + request.url);
//     }
//   });
// });

// var dumbledores = [],
//   id = 0;
// app.get('/data', function (request, response) {
//   response.json(dumbledores);
// });
// app.post('/data', function (request, response) {
//   dumbledores.push({
//     name: 'Dumbledore',
//     id: id++
//   });
//   response.json(dumbledores[dumbledores.length - 1]);
// });

// app.use(function (request, response) {
//   response.status(404).end();
// });

// // order matters
// app.get('/something', function (request, response) {
//   response.send('finally!');
// });
// app.get('/something', function (request, response, next) {
//   console.log('firstly!');
//   next();
// });

// // query string: `request.query`
// app.get('/times-two', function (request, response) {
//   response.send('' + request.query.number * 2);
// });
// // `request.params`
// app.get('/times-two/:num', function (request, response) {
//   response.send('' + request.params.num * 2);
// });
// // paylod: `request.body` (given existing body parsing middleware)
// app.use(bodyParser.json());
// app.post('/times-two', function (request, response) {
//   console.log(request.body);
//   response.send('' + request.body.n * 2);
// });


// example with 
var dumbledores = [],
  id = 0;
app.get('/data', function (request, response) {
  var filtered = dumbledores.filter(function (d) {
    // pseudocode
    return d.createdAt < Date.now() - req.query.timeFrame;
  });
  response.json(filtered);
});
app.get('/data/:id', function (request, response) {
  for (var i = 0; i < dumbledores.length; i++) {
    if (dumbledores[i].id === request.params.id) {
      response.send(dumbledores[i]);
    }
  }
});
app.put('/data/:id', function (request, response) {
  for (var i = 0; i < dumbledores.length; i++) {
    if (dumbledores[i].id === request.params.id) {
      for (var k in request.body) {
        dumbledores[i][k] = request.body[k];
      }
      response.send(dumbledores[i]);
      return;
    }
  }
});
app.post('/data', function (request, response) {
  dumbledores.push({
    name: 'Dumbledore',
    id: id++
  });
  response.json(dumbledores[dumbledores.length - 1]);
});