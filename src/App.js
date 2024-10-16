import React, { useState, useEffect } from 'react';
import TimerDisplay from './TimerDisplay';
import TimerProgress from './TimerProgress';
import SettingsForm from './SettingsForm';
import usePomodoroTimer from './usePomodoroTimer';
import './App.css';

function App() {
  const [workTime, setWorkTime] = useState(25 * 60);
  const [shortBreak, setShortBreak] = useState(5 * 60);
  const [longBreak, setLongBreak] = useState(10 * 60);
  const [maxCycles, setMaxCycles] = useState(4);
  const [showPopup, setShowPopup] = useState(false);

  const { seconds, isActive, isPaused, isBreak, cycleCount, isCompleted, toggle, reset } = 
    usePomodoroTimer(workTime, shortBreak, longBreak, maxCycles);

  useEffect(() => {
    if (isCompleted) {
      setShowPopup(true);  // ポップアップを表示
    }
  }, [isCompleted]);

  const closePopup = () => {
    setShowPopup(false);  // ポップアップを閉じる
    reset();  // タイマーをリセット
  };

  const getStatusText = () => {
    if (!isActive) return '';
    if (isPaused) return '一時停止中';
    if (isBreak) {
      return (cycleCount + 1 === maxCycles) ? '長い休憩中' : '短い休憩中';
    }
    return '作業中';
  };

  return (
    <div className="App">
      <h1>ポモドーロタイマー</h1>
      <div className="timer-container">
        <TimerProgress 
          progress={isBreak 
            ? (cycleCount + 1 === maxCycles 
                ? ((longBreak - seconds) / longBreak) * 100
                : ((shortBreak - seconds) / shortBreak) * 100
              )
            : ((workTime - seconds) / workTime) * 100
          } 
        />
        <TimerDisplay seconds={seconds} isBreak={isBreak} />
        <p className="status-text">{getStatusText()}</p>
        <p className="cycle-display">ポモドロー回数: {isActive ? cycleCount + 1 : 0} / {maxCycles}</p>
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

      {showPopup && (
        <div className="popup" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="popup-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
            <h2>ポモドローを達成しました。おめでとうございます！</h2>
            <button onClick={closePopup}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
