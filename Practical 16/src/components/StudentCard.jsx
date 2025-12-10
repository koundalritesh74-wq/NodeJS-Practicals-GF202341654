import React from 'react';

function StudentCard({ name, course, score }) {
  // Basic styling to make it look like a card
  const style = {
    border: '1px solid black',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px',
    width: '200px',
    display: 'inline-block', // Allows them to sit side-by-side
    backgroundColor: '#f0f0f0'
  };

  return (
    <div style={style}>
      <h3>Student ID</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Course:</strong> {course}</p>
      <p><strong>Score:</strong> {score}</p>
    </div>
  );
}

export default StudentCard;
