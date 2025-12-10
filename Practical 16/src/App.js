import React from 'react';
import StudentCard from './components/StudentCard';
import SimpleForm from './components/SimpleForm';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Practical 16 Assignment</h1>

      {/* Task 1 Requirements: Render 3 cards with different values */}
      <h2>Task 1: Student Cards</h2>
      <div>
        <StudentCard name="Amit Sharma" course="B.Tech" score={85} />
        <StudentCard name="Priya Singh" course="BCA" score={92} />
        <StudentCard name="Rohan Das" course="B.Sc" score={78} />
      </div>

      {/* Task 2 Requirements: Render the form */}
      <SimpleForm />
    </div>
  );
}

export default App;
