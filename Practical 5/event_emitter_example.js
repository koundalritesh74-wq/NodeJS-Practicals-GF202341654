// 1. Import the EventEmitter class from the 'events' module
const EventEmitter = require('events');

// 2. Create an instance of EventEmitter
const myEmitter = new EventEmitter();

// 3. Define the event name
const eventName = 'greet';

// 4. Set up a listener using the .on() method
// This function will execute whenever the 'greet' event is emitted.
myEmitter.on(eventName, (name) => {
  console.log(`Hello, ${name}! The '${eventName}' event was received.`);
});

// 5. Emit the 'greet' event using the .emit() method
console.log("Emitting the 'greet' event...");
myEmitter.emit(eventName, 'NodeJS'); // The second argument 'NodeJS' is passed to the listener function

console.log("Script finished.");
