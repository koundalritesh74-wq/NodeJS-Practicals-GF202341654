import React, { useState } from 'react';

function SimpleForm() {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    setMessage(`You typed: ${inputValue}`);
  };

  return (
    <div style={{ marginTop: '20px', padding: '20px', borderTop: '2px solid #333' }}>
      <h2>Simple Form</h2>
      <input 
        type="text" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type here..."
      />
      <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>
        Submit
      </button>
      
      {/* Only show the message if it exists */}
      {message && <h3 style={{ color: 'blue' }}>{message}</h3>}
    </div>
  );
}

export default SimpleForm;
