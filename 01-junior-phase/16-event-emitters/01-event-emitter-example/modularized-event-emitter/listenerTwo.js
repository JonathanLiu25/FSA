var myEmitterInstance = require('./myEmitterInstance')

// 7 - we can add multiple listeners:
myEmitterInstance.on('currentTime', function(event){
	console.log('woah the time changed again!')
})