import React, { useState, useEffect, useRef } from "react";
import {Pause, Play, Timer,RotateCcw} from "lucide-react"

const TimerButton = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handlePausePlay = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSeconds(0);
  };

  // format time as mm:ss
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const secsRemaining = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${secsRemaining
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-2 bg-[var(--navy)] text-white px-4 py-2 rounded-lg shadow-md font-mono text-xs">
      <div className="flex gap-2 items-center justify-center">
      <Timer className="w-4 h-4" />
       <span>{formatTime(seconds)}</span>
      </div>
      
      <button
        onClick={handlePausePlay}
        className="px-1 py-1 rounded bg-[var(--steel)] hover:bg-[var(--steel-dark)] cursor-pointer"
      >
        {isRunning ? (
          <Pause className="w-4 h-4" />
        ) : ( 
          <Play className="w-4 h-4" />
         )
         }
      </button>

      <button
        onClick={handleReset}
        className="px-2 py-1 rounded bg-[var(--steel)] hover:bg-[var(--steel-dark)]"
      >
        <RotateCcw className="w-4 h-4" /> 
      </button>
    </div>
  );
};

export default TimerButton;