var myEmitterInstance = require('./myEmitterInstance')

// 6 - we need to get it to listen for the event:
myEmitterInstance.on('currentTime', function(event){
	console.log(event.timeNow)
})