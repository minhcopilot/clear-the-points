import { useState, useEffect } from "react";

export const useTimer = (isRunning: boolean) => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const resetTimer = () => setTime(0);

  return { time, resetTimer };
};
