var express = require('express')
var socketio = require('socket.io')

// 1 - make JUST the app. 
// create the express app:
var app = express()

app.use(express.static(__dirname))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))

app.get('/', function(req, res){
	res.sendFile(__dirname + './views/index.html')
})

// socketio needs access to the server (that express normally creates for itself in secret)


var server = app.listen(1339, function(){
	console.log('listening on port 1339')
})

// ---------- FOR SOCKETIO
var io = socketio(server)

io.on('connection', function(socket){
	console.log('success')
	console.log(socket.id)
	
	socket.on('mousemove', function(x,y){
		// broadcast.emit means to send it to every listener
		// (except this socket that is emitting it)
		// check out this stackOverflow Q: http://stackoverflow.com/questions/7352164/update-all-clients-using-socket-io
		
		// emit to the client that just connectedis the *current* socket of the client that just connected
		// socket.emit('eventName', data); 
		// OR emit to all sockets:
		// io.sockets.emit('eventName', data);
		// OR emit to all sockets except the one which just connected:
		// io.sockets.emit('users_count', clients);

		io.sockets.emit('othermousemove', x, y)
		console.log(x,y)
	})

// })

})







