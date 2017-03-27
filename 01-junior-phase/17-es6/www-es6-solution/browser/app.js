// we need this socket object to send messages to our server 
const socket = io(window.location.origin); 

socket.on('connect', () => {
  console.log('I have made a persistent two-way connection to the server!'); 
  
  // the draw event is emitted in whiteboard.js and caught here
  whiteboard.on('draw', (start, end, color) => socket.emit('imDrawing', start, end, color))

  socket.on('otherDraw', (start, end, color) => whiteboard.draw(start, end, color))
})

// // rooms: 
// const socket = io(location.origin);
//
// socket.on('connect', () => {
//     const room = 'room';
//     socket.emit('wantToJoinRoomPlox', room);
//     whiteboard.on('draw', (start, end, color) => socket.emit('newDraw', start, end, color));
//     socket.on('drawHistory', drawHistory => {
//         drawHistory.forEach(draw => whiteboard.draw(draw.start, draw.end, draw.color));
//     });
//     socket.on('someoneElseDrew', (start, end, color) => whiteboard.draw(start, end, color));
// });