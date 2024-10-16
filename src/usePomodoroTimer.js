import { useState, useEffect } from 'react';

function usePomodoroTimer(workTime, shortBreak, longBreak, maxCycles = 4) {
  const [seconds, setSeconds] = useState(workTime);  // 初期値は作業時間
  const [isActive, setIsActive] = useState(false);   // タイマーの状態（作動中かどうか）
  const [isPaused, setIsPaused] = useState(false);   // 一時停止状態かどうか
  const [isBreak, setIsBreak] = useState(false);     // 休憩中かどうか
  const [cycleCount, setCycleCount] = useState(0);   // ポモドーロのサイクル数
  const [isCompleted, setIsCompleted] = useState(false);  // ポモドーロの完了状態

  // 設定が変更されたときにすぐに反映する
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
        setIsBreak(false);  // 休憩終了、作業に戻る
        setSeconds(workTime);
        if (cycleCount + 1 === maxCycles) {
          setIsCompleted(true);  // 最大サイクルに達したら完了フラグをセット
          setIsActive(false);    // タイマーを終了
        } else {
          setCycleCount((prevCount) => prevCount + 1);
        }
      } else {
        setIsBreak(true);  // 作業終了、休憩に入る
        const isFinalCycle = cycleCount + 1 === maxCycles;
        setSeconds(isFinalCycle ? longBreak : shortBreak);  // 最後のサイクルなら長い休憩
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
    setIsCompleted(false);  // タイマーの完了状態をリセット
  };

  return { seconds, isActive, isPaused, isBreak, cycleCount, isCompleted, toggle, reset };
}

export default usePomodoroTimer;
