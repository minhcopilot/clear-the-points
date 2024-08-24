import React from "react";

interface HeaderProps {
  gameState: "normal" | "playing" | "gameOver" | "cleared";
}

export const Header: React.FC<HeaderProps> = ({ gameState }) => {
  const getHeaderText = () => {
    switch (gameState) {
      case "gameOver":
        return <h1 style={{ color: "red" }}>Game Over</h1>;
      case "cleared":
        return <h1 style={{ color: "green" }}>Cleared</h1>;
      default:
        return <h1>LET'S PLAY</h1>;
    }
  };

  return <header>{getHeaderText()}</header>;
};
