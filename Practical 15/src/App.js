import React from 'react';
import './App.css';
import WelcomeMessage from './components/WelcomeMessage';
import Counter from './components/Counter';

function App() {
  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* Task 1 */}
      <WelcomeMessage />
      
      <hr style={{ margin: '30px 0' }} />
      
      {/* Task 2 */}
      <Counter />
    </div>
  );
}

export default App;
