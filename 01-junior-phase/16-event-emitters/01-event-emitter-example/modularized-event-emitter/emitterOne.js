var myEmitterInstance = require('./myEmitterInstance')

// 4 - give an example of emitting something:
setInterval(function(){
	myEmitterInstance.emit('currentTime', {
		timeNow: new Date()
	})
}, 1000)