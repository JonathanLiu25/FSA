console.log('JS has loaded')

// the socket.io.js file gives us a global io object
// we want to use a socket to out website
var socket = io(window.location.origin)

socket.on('connect', function(){
	console.log('connected successfully')
})

$('body').on('mousemove', function(event){
	console.log(event)
	var x = event.clientX
	var y = event.clientY
	console.log(x, y)
	socket.emit('mousemove', x, y)
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




// we can view all the info being transmitted
// by going to network, WS, frames