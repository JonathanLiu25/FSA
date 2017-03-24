// 1 - events is a built-in module
var events = require('events')

// 2 - directly reference the Event Emitter constructor from the module
var EventEmitter = events.EventEmitter

// 3 - make an instance of an event emitter
var myEmitterInstance = new EventEmitter();

// 4 - give an example of emitting something:
setInterval(function(){
	myEmitterInstance.emit('currentTime', {
		timeNow: new Date()
	})
}, 1000)

// 5 - If we run it right now, why do we not see anything?

// 6 - we need to get it to listen for the event:
myEmitterInstance.on('currentTime', function(event){
	console.log(event.timeNow)
})

// 7 - we can add multiple listeners:
myEmitterInstance.on('currentTime', function(event){
	console.log('woah the time changed!')
})


