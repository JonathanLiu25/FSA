'use strict'

var net = require('net')

var telnetServer = net.createServer();

var connectionPool = [];

// not an http server!
// it can be connected to with pure tcp connections
telnetServer.listen(8124)

telnetServer.on('connection', function(connection){
	connectionPool.push(connection)

	connection.write('Welcome!\n')

	connection.on('data', function(data){
		let idx = connectionPool.indexOf(connection)

		for(let i = 0; i < connectionPool.length; i++){
			if(i !== idx){
				connectionPool[i].write(data.toString())
			}
		}
		
	})
})