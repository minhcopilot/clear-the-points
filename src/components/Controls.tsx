import React from "react";

interface ControlsProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  time: number;
  gameState: "normal" | "playing" | "gameOver" | "cleared";
  onStartGame: () => void;
  onRestartGame: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  inputValue,
  setInputValue,
  time,
  gameState,
  onStartGame,
  onRestartGame,
}) => {
  return (
    <div style={{ marginBottom: "8px" }}>
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
      <button onClick={gameState === "playing" ? onRestartGame : onStartGame}>
        {gameState === "playing" ? "Reset" : "Play"}
      </button>
    </div>
  );
};
