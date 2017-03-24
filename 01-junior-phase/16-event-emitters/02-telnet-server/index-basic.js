'use strict'

// built-in
// it just builds server to make raw TCP connections
var net = require('net')
var fs = require('fs')

var telnetServer = net.createServer();


// not an http server!
// it can be connected to with pure tcp connections
telnetServer.listen(8124)



telnetServer.on('connection', function(connection){

	console.log('someone connected!')
	// connection.write('Welcome!\n')

	// I can write any info I want to you!
	// setInterval(function(){
	// 	connection.write('Hello new best friend! ')
	// }, 1000)


	// setInterval(function(){
	// 	fs.readFile('./text-one.txt', function(err, data){
	// 		connection.write(data.toString())
	// 	})
	// }, 1000)

	// or use fs.watch (new and unstable) or fs.watchFile (old and deprecated)
	fs.watchFile('./text-one.txt', function(curr, prev){
		fs.readFile('./text-one.txt', function(err, data){
			connection.write(data.toString())
		})
	})

})