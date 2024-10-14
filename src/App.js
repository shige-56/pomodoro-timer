import React, { useState, useEffect } from 'react';
import TimerDisplay from './TimerDisplay';
import TimerProgress from './TimerProgress';
import SettingsForm from './SettingsForm';
import usePomodoroTimer from './usePomodoroTimer';
import './App.css';

function App() {
  const [workTime, setWorkTime] = useState(1500);
  const [shortBreak, setShortBreak] = useState(300);
  const [longBreak, setLongBreak] = useState(900);
  const [maxCycles, setMaxCycles] = useState(4);

  const { seconds, isActive, isBreak, cycleCount, toggle, reset, isPaused } = usePomodoroTimer(workTime, shortBreak, longBreak, maxCycles);

  const getStatusText = () => {
    if (!isActive) return '';
    if (isPaused) return '一時停止中';
    if (isBreak) return cycleCount % maxCycles === 0 ? '長い休憩中' : '短い休憩中';
    return '作業中';
  };

  useEffect(() => {
    if (!isActive || isPaused) {
      document.body.classList.add('paused');
    } else {
      document.body.classList.remove('paused');
    }
  }, [isActive, isPaused]);

  return (
    <div className="App">
      <h1>ポモドーロタイマー</h1>
      <div className="timer-container">
        <TimerProgress progress={((workTime - seconds) / workTime) * 100} />
        <TimerDisplay seconds={seconds} isBreak={isBreak} />
        {/* タイマー表示の下にステータスを表示 */}
        <p className="status-text">{getStatusText()}</p>
        <p className="cycle-display">ポモドロー回数: {cycleCount} / {maxCycles}</p>
      </div>
      <div className="button-group">
        <button onClick={toggle}>{isActive ? (isPaused ? '再開' : '一時停止') : '開始'}</button>
        <button onClick={reset}>リセット</button>
      </div>
      <SettingsForm
        workTime={workTime}
        setWorkTime={setWorkTime}
        shortBreak={shortBreak}
        setShortBreak={setShortBreak}
        longBreak={longBreak}
        setLongBreak={setLongBreak}
        maxCycles={maxCycles}
        setMaxCycles={setMaxCycles}
        isActive={isActive}
      />
    </div>
  );
}

export default App;
