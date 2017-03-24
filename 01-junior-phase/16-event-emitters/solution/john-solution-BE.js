// 2 - set up socket.io on backend:
var io = socketio(server);

// // use socket server as an event emitter in order to listen for new connctions
io.on('connection', function(socket){
  //receives the newly connected socket
  //called for each browser that connects to our server
  console.log('A new client has connected')
  console.log('socket id: ', socket.id)

})


// 5 - listen for the ImDrawing event on the server

io.on('connection', function(socket){
  //receives the newly connected socket
  //called for each browser that connects to our server
  console.log('A new client has connected')
  console.log('socket id: ', socket.id)

  // server is receiving draw data from the client here 
  // so we want to broadcast that data to all other connected clients 
  socket.on('imDrawing', function(start, end, color){
    console.log('catching the draw event here')
    // we need to emit an event all sockets except the socket that originally emitted the 
    // the draw data to the server 
    // broadcasting means sending a message to everyone else except for the 
    // the socket that starts it 
    socket.broadcast.emit('otherDraw', start, end, color); 
  }); 
})