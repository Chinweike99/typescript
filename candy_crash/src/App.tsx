import React from 'react';
import Board from './Components/Board';

function App() {
  const handleClick = (count: number) => {
    console.log(`Count: ${count}`);
  };

  return (
    <div className='bg-gradient-to-r from-blue-500 to-purple-500 '>
      <Board />
    </div>
  );
}

export default App;