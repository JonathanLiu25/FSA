// Here is our constructor function, available globally (set to the window object!)
window.EventEmitter = class EventEmitter {
  constructor() {
    this.subscribers = {};
  }

  on(eventName, eventListener) {
    // If this instance's subscribers object does not yet
    // have the key matching the given event name, create the
    // key and assign the value of an empty array.
    if (!this.subscribers[eventName]) {
        this.subscribers[eventName] = [];
    }

    // Push the given listener function into the array
    // located on the instance's subscribers object.
    this.subscribers[eventName].push(eventListener);
  }

  emit(eventName) {
    // If there are no subscribers to this event name, why even?
    if (!this.subscribers[eventName]) {
        return;
    }

    // Grab the remaining arguments to our emit function.
    const remainingArgs = [...arguments].slice(1);

    // For each subscriber, call it with our arguments.
    this.subscribers[eventName].forEach(listener => listener.apply(null, remainingArgs));
  }
}