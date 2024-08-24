import React, { useEffect, useState } from "react";

export default function ClearThePoints() {
  const [points, setPoints] = useState<
    Array<{ number: number; x: number; y: number; clicked: boolean }>
  >([]);
  const [time, setTime] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [gameState, setGameState] = useState<string>("normal");
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [totalPoints, setTotalPoints] = useState<number>(0);

  useEffect(() => {
    if (gameState === "playing") {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const createPoints = (pointNumber: number) => {
    const margin = 3;
    return Array.from({ length: pointNumber }, (_, i) => ({
      number: i + 1,
      x: margin + Math.random() * (100 - 2 * margin),
      y: margin + Math.random() * (100 - 2 * margin),
      clicked: false,
    })).sort(() => Math.random() - 0.5);
  };

  const handleStartGame = () => {
    const pointNumber = parseInt(inputValue);
    if (pointNumber > 0) {
      const arrayPoints = createPoints(pointNumber);
      setPoints(arrayPoints);
      setTotalPoints(pointNumber);
      setGameState("playing");
      setCurrentNumber(1);
      setTime(0);
    }
  };

  const handlePointClick = (point: number) => {
    if (point === currentNumber) {
      setPoints((prevPoints) =>
        prevPoints.map((p) =>
          p.number === point ? { ...p, clicked: true } : p
        )
      );

      setTimeout(() => {
        setPoints((prevPoints) => prevPoints.filter((p) => p.number !== point));
      }, 1000);

      if (currentNumber === totalPoints) {
        setGameState("cleared");
      } else {
        setCurrentNumber((prevNumber) => prevNumber + 1);
      }
    } else {
      setGameState("gameOver");
    }
  };

  const handleRestartGame = () => {
    const pointNumber = parseInt(inputValue);
    if (pointNumber > 0) {
      const arrayPoints = createPoints(pointNumber);
      setPoints(arrayPoints);
      setTotalPoints(pointNumber);
      setGameState("playing");
      setCurrentNumber(1);
      setTime(0);
    }
  };

  const renderHeader = () => {
    switch (gameState) {
      case "gameOver":
        return <h1 style={{ color: "red" }}>Game Over</h1>;
      case "cleared":
        return <h1 style={{ color: "green" }}>Cleared</h1>;
      default:
        return <h1>LET'S PLAY</h1>;
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {renderHeader()}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "8px",
        }}
      >
        <div style={{ marginBottom: "8px" }}>
          <label htmlFor="pointNumber" style={{ marginRight: "8px" }}>
            Points:
          </label>
          <input
            id="pointNumber"
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div>
          <span style={{ marginRight: "8px" }}>Time:</span>
          <span>{time.toFixed(1)}s</span>
        </div>
      </div>
      <button
        onClick={gameState === "playing" ? handleRestartGame : handleStartGame}
      >
        {gameState === "playing" ? "Reset" : "Play"}
      </button>
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
              onClick={() => handlePointClick(number)}
            >
              {number}
            </button>
          );
        })}
      </div>
    </div>
  );
}
