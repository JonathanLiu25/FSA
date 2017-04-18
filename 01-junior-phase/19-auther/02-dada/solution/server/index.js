'use strict';

const app = require('./app');
const db = require('./db');
const fs = require('fs');
const https = require('https');

const port = 8443;
const credentials = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
const server = https.createServer(credentials, app);

server.listen(port, function (err) {
  if (err) throw err;
  console.log('HTTPS server patiently listening on port', port);
  db.sync()
  .then(function () {
    console.log('Oh and btw the postgres server is totally connected, too');
  });
});

module.exports = server;
