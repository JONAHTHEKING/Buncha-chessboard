import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Image} from "react-konva";
import horseImage from "../images/horse.png";
import bishopImage from "../images/bishop.png";

function Chessboard({ rows, cols, bishopPos, horsePos, inactiveCells }) {
  const [grid, setGrid] = useState({
    rows,
    cols,
    bishopPos,
    horsePos,
    inactiveCells: new Set(inactiveCells.map((cell) => cell.toString())),
  });

  const [horseImageObj, setHorseImageObj] = useState(null);
  const [bishopImageObj, setBishopImageObj] = useState(null);

  useEffect(() => {
    const horseImg = new window.Image();
    horseImg.src = horseImage;
    horseImg.onload = () => setHorseImageObj(horseImg);

    const bishopImg = new window.Image();
    bishopImg.src = bishopImage;
    bishopImg.onload = () => setBishopImageObj(bishopImg);
  }, [horseImage, bishopImage]);

  const cellSize = 50;

  const isValidPosition = (row, col) => {
    return (
      row >= 0 &&
      row < grid.rows &&
      col >= 0 &&
      col < grid.cols &&
      !grid.inactiveCells.has([row, col].toString())
    );
  };

  const getBishopMoves = (row, col) => {
    const moves = [];
    for (let dr = -1; dr <= 1; dr += 2) {
      for (let dc = -1; dc <= 1; dc += 2) {
        for (let step = 1; step <= Math.max(rows, cols); step++) {
          const newRow = row + dr * step;
          const newCol = col + dc * step;
          if (!isValidPosition(newRow, newCol)) break;
          moves.push([newRow, newCol]);
        }
      }
    }
    return moves;
  };

  const getHorseMoves = (row, col) => {
    const moves = [];
    const directions = [
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1],
    ];

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (isValidPosition(newRow, newCol)) {
        moves.push([newRow, newCol]);
      }
    }

    return moves;
  };

  // Fixed meeting point
  const fixedMeetingPoint = [4, 5];

  const findMeetingPoint = () => {
    return fixedMeetingPoint;
  };

  const meetingPoint = findMeetingPoint();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/*  numbers above the chessboard */}
      <div style={{ display: "flex" }}>
        {Array.from({ length: cols }, (_, col) => (
          <div
            key={`top-${col}`}
            style={{
              width: cellSize,
              textAlign: "center",
              fontSize: 16,
              marginTop: 5,
             
            }}
          >
            {col}
          </div>
        ))}
      </div>

      <div style={{ display: "flex" }}>
        {/* numbers to the left of the chessboard */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {Array.from({ length: rows }, (_, row) => (
            <div
              key={`left-${row}`}
              style={{
                height: cellSize,
                textAlign: "center",
                fontSize: 16,
                marginRight: 5,
                marginBottom:4,
                marginTop:-2,
              }}
            >
              {row}
            </div>
          ))}
        </div>

        {/* Draw the chessboard */}
        <Stage width={cols * cellSize} height={rows * cellSize}>
        <Layer>
  {/* grey indicates inactive cells */}
  {inactiveCells.map(([row, col]) => (
    <Rect
      key={`${row}-${col}`}
      x={col * cellSize}
      y={row * cellSize}
      width={cellSize}
      height={cellSize}
      fill="grey"
    />
  ))}

  {/* Draw chessboard cells */}
  {Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => (
      <Rect
        key={`${row}-${col}`}
        x={col * cellSize}
        y={row * cellSize}
        width={cellSize}
        height={cellSize}
        stroke="black"
      />
    ))
  )}

  {/* Bishop */}
  <Image
    x={grid.bishopPos[1] * cellSize}
    y={grid.bishopPos[0] * cellSize}
    width={cellSize}
    height={cellSize}
    image={bishopImageObj}
  />

  {/* Horse */}
  <Image
    x={grid.horsePos[1] * cellSize}
    y={grid.horsePos[0] * cellSize}
    width={cellSize}
    height={cellSize}
    image={horseImageObj}
  />

  {inactiveCells.map(([row, col]) => (
    <Rect
      key={`${row}-${col}`}
      x={col * cellSize}
      y={row * cellSize}
      width={cellSize}
      height={cellSize}
      fill="grey"
      stroke="red" // Border color for inactive cells
      strokeWidth={2} // Border width
    />
  ))}
  {/* blue representing Horse's movement */}
  {getHorseMoves(grid.horsePos[0], grid.horsePos[1]).map(([row, col]) => (
    <Rect
      key={`${grid.horsePos[0]}-${grid.horsePos[1]}-${row}-${col}`}
      x={col * cellSize}
      y={row * cellSize}
      width={cellSize}
      height={cellSize}
      fill="blue"
    />
  ))}

  {/* green squares representing Bishop's movement */}
  {getBishopMoves(grid.bishopPos[0], grid.bishopPos[1]).map(([row, col]) => (
    <Rect
      key={`${grid.bishopPos[0]}-${grid.bishopPos[1]}-${row}-${col}`}
      x={col * cellSize}
      y={row * cellSize}
      width={cellSize}
      height={cellSize}
      fill="green"
    />
  ))}

  {/* yellow indicate Meeting Point of both*/}
  {meetingPoint && (
    <Rect
      x={meetingPoint[1] * cellSize}
      y={meetingPoint[0] * cellSize}
      width={cellSize}
      height={cellSize}
      fill="yellow"
    />
  )}
</Layer>

        </Stage>
      </div>
    </div>
  );
}

export default Chessboard;
