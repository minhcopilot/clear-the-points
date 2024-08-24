import React from "react";

interface Point {
  number: number;
  x: number;
  y: number;
  clicked: boolean;
}

interface GameBoardProps {
  points: Point[];
  currentNumber: number;
  totalPoints: number;
  onPointClick: (number: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  points,
  currentNumber,
  totalPoints,
  onPointClick,
}) => {
  return (
    <div
      style={{
        marginTop: "12px",
        padding: "8px",
        outline: "1px solid black",
        height: "700px",
        width: "700px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {points.map(({ number, x, y, clicked }) => {
        const isCurrentPoint = number === currentNumber;
        return (
          <button
            key={number}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid black",
              textAlign: "center",
              backgroundColor: clicked ? "red" : "white",
              color: clicked ? "white" : "black",
              transition: "opacity 1s ease-out, background-color 1s ease",
              lineHeight: "50px",
              zIndex: isCurrentPoint
                ? totalPoints + 1
                : totalPoints - number + 1,
            }}
            onClick={() => onPointClick(number)}
          >
            {number}
          </button>
        );
      })}
    </div>
  );
};
