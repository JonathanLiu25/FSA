const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');

// create a server
const app = express();

// logging middleware
app.use(volleyball);

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// static file serving middleware
app.use(express.static(__dirname));

// our data model, no database (for simplicity), just this array
let incrementingId = 1;
const diaryEntries = [];

// all entries
app.get('/api/diary', function (req, res, next) {
  res.json(diaryEntries);
});

// create a new entry
app.post('/api/diary', function (req, res, next) {
  req.body.id = incrementingId++;
  diaryEntries.push(req.body);
  res.status(201).end();
});

// update an existing entry
app.put('/api/diary/:entryId', function (req, res, next) {
  const entry = diaryEntries.find(elem => elem.id === req.params.entryId);
  Object.assign(entry, req.body);
  res.status(204).end();
});

// delete an existing entry
app.delete('/api/diary/:entryId', function (req, res, next) {
  const entryIndex = diaryEntries.findIndex(elem => elem.id === req.params.entryId);
  diaryEntries.splice(entryIndex, 1);
  res.status(204).end();
});

// start the server
const port = 8080;
app.listen(port, function (err) {
  if (err) {
    console.error('I failed to start the server, how disappointing');
    console.error(err);
  } else {
    console.log(`Listening! Connect at http://localhost:${port}`);
  }
})
