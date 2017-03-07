var express = require('express');
var nunjucks = require('nunjucks');
var volleyball = require('volleyball');
var bodyParser = require('body-parser');

var app = express();

// // our own little volleyball, shuttlecock
// var volleyball = function (request, response, next) {
//   console.log(request.method, request.url);
//   var originalSendMethod = response.send;
//   response.send = function () {
//     console.log('outgoing message!');
//     originalSendMethod.apply(response, arguments);
//   };
//   next();
// };
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// // if we were writing express static ourself (which is NOT necessary)
// express.static = function (folderPath) {
//   return function (req, res, next) {
//     var doesExist = fs.existsSync(folderPath + req.url);
//     if (doesExist) {
//       res.sendFile(folderPath + req.url);
//     } else {
//       next();
//     }
//   };
// };

// // directly rendering with `nunjucks.render`
// app.get('/', function (req, res, next) {
//   var locals = {
//     allTweets: tweetBank.list()
//   };
//   nunjucks.render(
//     __dirname + '/views/index.html',
//     locals,
//     function (err, renderedContent) {
//       if (err) {
//         console.error(err);
//       } else {
//         res.send(renderedContent);
//       }
//     }
//   );
// });

//    important name warning!
//       vvvvvvvvvvv
app.set('view engine', 'html'); // if/when somebody calls `res.render` append `.html` to that by default

app.engine('html', nunjucks.render); // if/when somebody calls `res.render` on an `.html` file, use `nunjucks.render` to render it

nunjucks.configure('views', {
  noCache: true
}); // hey nunjucks, when you go to `nunjucks.render` something, looks up files in the `'views'` folder by default

var theRouter = require('./routes/index');
app.use(theRouter);
app.get('/pizza', function (req, res, next) {
  response.send('yumm.');
});

var port = 3000;
app.listen(port, function (err) {
  if (err) {
    console.log('Theres something in my ears, Im not listening', err);
  } else {
    console.log('Awaiting your every command on port', port);
  }
});
