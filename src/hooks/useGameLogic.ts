import { useState, useCallback } from "react";

interface Point {
  number: number;
  x: number;
  y: number;
  clicked: boolean;
}

export const useGameLogic = (initialPointCount: number) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [gameState, setGameState] = useState<
    "normal" | "playing" | "gameOver" | "cleared"
  >("normal");
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [totalPoints, setTotalPoints] = useState<number>(0);

  const createPoints = useCallback((pointNumber: number) => {
    const margin = 3;
    return Array.from({ length: pointNumber }, (_, i) => ({
      number: i + 1,
      x: margin + Math.random() * (100 - 2 * margin),
      y: margin + Math.random() * (100 - 2 * margin),
      clicked: false,
    })).sort(() => Math.random() - 0.5);
  }, []);

  const startGame = useCallback(() => {
    if (initialPointCount > 0) {
      const arrayPoints = createPoints(initialPointCount);
      setPoints(arrayPoints);
      setTotalPoints(initialPointCount);
      setGameState("playing");
      setCurrentNumber(1);
    }
  }, [initialPointCount, createPoints]);

  const handlePointClick = useCallback(
    (point: number) => {
      if (point === currentNumber) {
        setPoints((prevPoints) =>
          prevPoints.map((p) =>
            p.number === point ? { ...p, clicked: true } : p
          )
        );

        setTimeout(() => {
          setPoints((prevPoints) =>
            prevPoints.filter((p) => p.number !== point)
          );
        }, 1000);

        if (currentNumber === totalPoints) {
          setGameState("cleared");
        } else {
          setCurrentNumber((prevNumber) => prevNumber + 1);
        }
      } else {
        setGameState("gameOver");
      }
    },
    [currentNumber, totalPoints]
  );

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  return {
    points,
    gameState,
    currentNumber,
    totalPoints,
    startGame,
    handlePointClick,
    restartGame,
  };
};
