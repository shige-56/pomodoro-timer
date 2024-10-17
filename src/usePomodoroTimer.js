import { useState, useEffect } from 'react';

// シンプルなシステム音風の通知用オーディオファイルを定義
const workEndSound = new Audio(process.env.PUBLIC_URL + '/sounds/work-end.mp3');  // 作業終了
const shortBreakEndSound = new Audio(process.env.PUBLIC_URL + '/sounds/short-break-end.mp3');  // 短い休憩終了
const cycleCompleteSound = new Audio(process.env.PUBLIC_URL + '/sounds/cycle-complete.mp3');  // サイクル完了

function usePomodoroTimer(workTime, shortBreak, longBreak, maxCycles = 4) {
  const [seconds, setSeconds] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setSeconds(isBreak ? (cycleCount + 1 === maxCycles ? longBreak : shortBreak) : workTime);
    }
  }, [workTime, shortBreak, longBreak, isActive, isBreak, cycleCount, maxCycles]);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (!isActive || isPaused) {
      clearInterval(interval);
    }

    if (seconds === 0) {
      clearInterval(interval);

      if (isBreak) {
        setIsBreak(false);
        setSeconds(workTime);
        if (cycleCount + 1 === maxCycles) {
          cycleCompleteSound.play();  // サイクル完了音を再生
          setIsCompleted(true);
          setIsActive(false);
        } else {
          setCycleCount((prevCount) => prevCount + 1);
          shortBreakEndSound.play();  // 短い休憩終了音を再生
        }
      } else {
        setIsBreak(true);
        const isFinalCycle = cycleCount + 1 === maxCycles;
        setSeconds(isFinalCycle ? longBreak : shortBreak);
        workEndSound.play();  // 作業終了音を再生
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, isBreak, workTime, shortBreak, longBreak, cycleCount, maxCycles, isPaused]);

  const toggle = () => {
    if (isActive) {
      setIsPaused(!isPaused);
    } else {
      setIsActive(true);
    }
  };

  const reset = () => {
    setIsActive(false);
    setIsPaused(false);
    setIsBreak(false);
    setSeconds(workTime);
    setCycleCount(0);
    setIsCompleted(false);
  };

  return { seconds, isActive, isPaused, isBreak, cycleCount, isCompleted, toggle, reset };
}

export default usePomodoroTimer;
