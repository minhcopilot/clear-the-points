import React, { useState } from "react";
import { Header } from "./Header";
import { Controls } from "./Controls";
import { GameBoard } from "./GameBoard";
import { useTimer } from "../hooks/useTimer";
import { useGameLogic } from "../hooks/useGameLogic";

export default function ClearThePoints() {
  const [inputValue, setInputValue] = useState<string>("");
  const {
    points,
    gameState,
    currentNumber,
    totalPoints,
    startGame,
    handlePointClick,
    restartGame,
  } = useGameLogic(parseInt(inputValue));
  const { time, resetTimer } = useTimer(gameState === "playing");

  const handleStartGame = () => {
    startGame();
    resetTimer();
  };

  const handleRestartGame = () => {
    restartGame();
    resetTimer();
  };

  return (
    <div style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
      <Header gameState={gameState} />
      <Controls
        inputValue={inputValue}
        setInputValue={setInputValue}
        time={time}
        gameState={gameState}
        onStartGame={handleStartGame}
        onRestartGame={handleRestartGame}
      />
      <GameBoard
        points={points}
        currentNumber={currentNumber}
        totalPoints={totalPoints}
        onPointClick={handlePointClick}
      />
    </div>
  );
}
