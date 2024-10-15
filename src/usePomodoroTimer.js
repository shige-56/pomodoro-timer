import { useState, useEffect } from 'react';

function usePomodoroTimer(workTime, shortBreak, longBreak, maxCycles = 4) {
  const [seconds, setSeconds] = useState(workTime);  // 初期値は作業時間
  const [isActive, setIsActive] = useState(false);   // タイマーの状態（作動中かどうか）
  const [isPaused, setIsPaused] = useState(false);   // 一時停止状態かどうか
  const [isBreak, setIsBreak] = useState(false);     // 休憩中かどうか
  const [cycleCount, setCycleCount] = useState(0);   // ポモドーロのサイクル数

  // タイマーが作動していない場合、設定変更をリアルタイムで反映
  useEffect(() => {
    if (!isActive && !isBreak) {
      setSeconds(workTime);
    } else if (!isActive && isBreak && cycleCount % maxCycles === 0) {
      setSeconds(longBreak);
    } else if (!isActive && isBreak) {
      setSeconds(shortBreak);
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
        setCycleCount((prevCount) => prevCount + 1);
      } else {
        setIsBreak(true);
        setSeconds(cycleCount % maxCycles === 0 ? longBreak : shortBreak);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, isBreak, workTime, shortBreak, longBreak, cycleCount, maxCycles, isPaused]);

  const toggle = () => {
    if (isActive) {
      setIsPaused(!isPaused);  // 一時停止と再開を切り替える
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
  };

  return { seconds, isActive, isPaused, isBreak, cycleCount, toggle, reset };
}

export default usePomodoroTimer;
