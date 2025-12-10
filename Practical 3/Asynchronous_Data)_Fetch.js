// A function to simulate fetching user data from an API.
// It is an asynchronous operation.
function fetchUserData() {
    console.log('Fetching user data...');
  
    // Use setTimeout to simulate a network request that takes time.
    // This is a non-blocking operation. The program will continue to execute
    // the lines below this function call while the timer is running.
    setTimeout(() => {
      console.log('Data received.');
      // In a real application, you would handle the fetched data here.
    }, 2000); // Simulates a 2-second delay
  }
  
  // Call the function to start the asynchronous operation.
  fetchUserData();
  
  // This message will be logged immediately, showing that the script does not wait
  // for the fetchUserData function to complete.
  console.log('Continuing with other tasks...');
