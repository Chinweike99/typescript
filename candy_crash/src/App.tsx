import React from 'react';
import Board from './Components/Board';

function App() {
  const handleClick = (count: number) => {
    console.log(`Count: ${count}`);
  };

  return (
    <div>
      <h1>Your fun time ....</h1>

      <Board />
    </div>
  );
}

export default App;