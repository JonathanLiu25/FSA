const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const volleyball = require('volleyball');
const router = require('./routes');



const app = express();

app.use(volleyball);

nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render)

//body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', router);

app.use(function(req, res, next) {
  const err = new Error('Nothing found here!!!');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status = err.status || 500;
  res.render('error');
})

const PORT = 3000;
app.listen(PORT, function() {
  console.log('listening impatiently on port', PORT);
})