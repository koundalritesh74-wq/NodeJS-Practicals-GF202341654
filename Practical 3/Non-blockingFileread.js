// Import the file system module.
const fs = require('fs');

// Path to the file we will read.
const filePath = 'temp.txt';

// Log a message to show the script has started.
console.log('Starting the non-blocking file read...');

// This is a non-blocking (asynchronous) file read.
// The script will not wait for the file to be read. Instead, it will
// immediately move on to the next line of code.
fs.readFile(filePath, 'utf8', (err, data) => {
  // This function (the callback) will be executed once the file read is complete.
  if (err) {
    // Handle any errors that occur.
    console.error('An error occurred:', err.message);
    return;
  }
  // Log the file content once it's available.
  console.log('File content (Non-Blocking):');
  console.log(data);
});

// This message will be logged immediately, before the file content is displayed.
console.log('...This message appears before the file content.');
