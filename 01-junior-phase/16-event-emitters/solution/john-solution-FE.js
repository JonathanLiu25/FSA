// 1 - in app.js
whiteboard.on('draw', function(){
	console.log('drawing!')
})

whiteboard.on('draw', function(start, end, color){
	console.log(start, end, color)
})


// 3 - set up socket.io on front-end:
// we need this socket object to send messages to our server 
var socket = io(window.location.origin); // information about your specific client (window)

socket.on('connect', function(){
  console.log('I have made a persistent two-way connection to the server!'); 
})

// 4 - emit a drawing event to the server
var socket = io(window.location.origin); // information about your specific client (window)

socket.on('connect', function(){
  console.log('I have made a persistent two-way connection to the server!'); 
	// ******************** //
	whiteboard.on('draw', function(start, end, color){
		console.log(start, end, color)
		socket.emit('ImDrawing', start, end, color)
	})
	// ******************** //

})


// 6 - make front-end listen for other people drawing
var socket = io(window.location.origin); // information about your specific client (window)

socket.on('connect', function(){
  console.log('I have made a persistent two-way connection to the server!'); 

	whiteboard.on('draw', function(start, end, color){
		console.log(start, end, color)
		socket.emit('ImDrawing', start, end, color)
	})

	// ******************** //
	socket.on('otherDraw', function(start, end, color){
		whiteboard.draw(start, end, color)
	})
	// ******************** //
})



