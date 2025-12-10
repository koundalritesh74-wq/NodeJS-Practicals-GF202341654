// Import the file system module.
const fs = require('fs');

// Path to the file we will read.
const filePath = 'temp.txt';

// Log a message to show the script has started.
console.log('Starting the blocking file read...');

try {
  // This is a blocking (synchronous) file read.
  // The script will pause here until the entire file has been read.
  const data = fs.readFileSync(filePath, 'utf8');
  console.log('File content (Blocking):');
  console.log(data);
} catch (err) {
  // Handle any errors that occur during the file read.
  console.error('An error occurred:', err.message);
}

// This message will only be logged after the file read is complete.
console.log('...Finished the blocking file read.');
