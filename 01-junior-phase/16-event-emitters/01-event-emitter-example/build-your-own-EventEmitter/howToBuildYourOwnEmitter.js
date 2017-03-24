// --------------- IMPLEMENTING IT

// make constructor with an object to store everything that
// is listening with this eventEmitter
var EventEmitter = function(){
	this.subscribers = {};
}

// the listening part:
// we pass it an eventName, and a function to run
// we store the eventName and the function in the subscribers object
EventEmitter.prototype.on = function(eventName, listenerFn){
	
	if(!this.subscribers[eventName]){
		this.subscribers[eventName] = []
	}

	this.subscribers[eventName].push(listenerFn);
}

// when we emit, we emit the eventName and a payload
EventEmitter.prototype.emit = function(eventName, payload){
	if(!this.subscribers[eventName]) return


	// Grab the remaining arguments to our emit function.
	var remainingArgs = [].slice.call(arguments, 1);

	// For each subscriber, call it with our arguments.
	this.subscribers[eventName].forEach(function (listener) {
		listener.apply(null, remainingArgs);
	});		

}


// ----------------- USING IT

var myEmitter = new EventEmitter()

myEmitter.on('purchase', function(num, item){
	console.log('I want to buy' , num, item)
})

myEmitter.emit('purchase', 23, 'fishes')

