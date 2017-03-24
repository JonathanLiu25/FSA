// 1 - events is a built-in module
var events = require('events')

// 2 - directly reference the Event Emitter constructor from the module
var EventEmitter = events.EventEmitter

// 3 - make an instance of an event emitter
var myEmitterInstance = new EventEmitter();

module.exports = myEmitterInstance;