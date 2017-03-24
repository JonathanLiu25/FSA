http://192.168.0.2:1337/
console.log on back end
connect on front end
send messages down to client
look at network, frames, WS

FE - send mouse move data up to server
BE - just console.log the mouse move data
BE - now emit the othermousemove data back down to the clients
FE - console.log the othermousemove data
FE - do jquery to get othermousemove data to show


<!-- BACK END -->

// ------- add socket.io!

// 2 - add socket.io, just console.log the socket.id
// then go to front end!
// var io = socketio(server);


// io.on('connection', function(socket){
// 	console.log(socket.id, 'connected successfully')
// 	setInterval(function(){
// 		socket.emit('consoleMessage', 'WELCOME!')
// 	}, 500)
	
// 	socket.on('mousemove', function(x,y){
// 		// broadcast.emit means to send it to every listener
// 		// (except this socket that is emitting it)
// 		// check out this stackOverflow Q: http://stackoverflow.com/questions/7352164/update-all-clients-using-socket-io
		
// 		// emit to the client that just connectedis the *current* socket of the client that just connected
// 		// socket.emit('eventName', data); 
// 		// OR emit to all sockets:
// 		// io.sockets.emit('eventName', data);
// 		// OR emit to all sockets except the one which just connected:
// 		// io.sockets.emit('users_count', clients);

// 		io.sockets.emit('othermousemove', x, y)
// 		console.log(x,y)
// 	})

// })






<!-- FRONT END -->

socket.on('connect', function(){
	console.log('connected successfully')
	console.log(socket)
	<!-- people can connect now -->
})

$('body').on('mousemove', function(ev){
	console.log(event)
	var x = event.x
	var y = event.y

	socket.emit('mousemove', x, y)
})

socket.on('consoleMessage', function(data){
	console.log(data)
})

socket.on('othermousemove', function(x,y){
	var $div =$('<div></div>')

	$div
		.css({width: 5, height: 5, background: 'red', position: 'fixed'})
		.css({left: x, top: y})
		.appendTo($('body'))


	setTimeout(function(){
		$div.remove()
	},400)
})
