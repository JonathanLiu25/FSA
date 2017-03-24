Frontend
	- mousedown event that sets drawing to true
	- mousemove event with drawing true calls whiteboard.draw with shouldBroadcast set to true
	- whiteboard.draw calls whiteboard.emit (because whiteboard inherits from the EE class)
		- this runs each listener that has been registered on whiteboard object of the event emitted with the data sent	
		- based on `app.js` whiteboard has a listener already registered, so that is indeed run
	- running the listener for the whiteboard event 'draw' emits a socket event (which connects us to the backend) with the drawing data
Backend
	- io has a listener registered to this event, so it is run.
	- this listener broadcasts (emits to all other sockets io has registered) an event based on this draw
Frontend
	- each client socket now receives this event and runs all registered listeners
	- the listener registered calls whiteboard.draw (with shouldBroadcast set to undefined), which draws the other users artwork onto this new clients page