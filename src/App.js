import React from 'react';
import Chessboard from './components/Chessboard';

function App() {
  const rows = 8;
  const cols = 8;
  const bishopPos = [3, 2];
  const horsePos = [6, 6];
  const inactiveCells = [
    [0, 3],
    [2, 0],
    [4, 3],
    [2, 6],
    [0, 7],
    [6, 7],
    [7, 1],
  ];

  return (
    <div>
      <Chessboard rows={rows} cols={cols} bishopPos={bishopPos} horsePos={horsePos} inactiveCells={inactiveCells} />
    </div>
  );
}

export default App;
