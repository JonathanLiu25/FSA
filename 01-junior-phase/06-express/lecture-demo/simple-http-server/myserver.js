var http = require('http');
var server = http.createServer();

// when a request comes in, do something (whatever is in the callback)
server.on('request', function (request, response) {
  response.end('this is what you get for asking');
});

// start listening on port 5432, and once you've started, do something (whatever is in the callback)
server.listen(5432, function () {
  console.log('OK OK Im awake what do you want?');
  console.log('...port 5432 please');
});
