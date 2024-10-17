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

  // ポモドーロ完了時のポップアップ表示
  useEffect(() => {
    if (isCompleted) {
      setShowPopup(true);
    }
  }, [isCompleted]);

  // bodyにフェーズごとのクラスを適用
  useEffect(() => {
    const bodyClass = isBreak
      ? cycleCount + 1 === maxCycles
        ? 'long-break-phase'
        : 'short-break-phase'
      : 'work-phase';

    document.body.className = bodyClass;

    // クリーンアップ時にbodyのクラスを削除
    return () => {
      document.body.className = '';
    };
  }, [isBreak, cycleCount, maxCycles]);

  // 現在の状態に応じたテキストを返す
  const getStatusText = () => {
    if (!isActive) return '';
    if (isPaused) return '一時停止中';
    if (isBreak) {
      return cycleCount + 1 === maxCycles ? '長い休憩中' : '短い休憩中';
    }
    return '作業中';
  };

  const closePopup = () => {
    setShowPopup(false);
    reset();
  };

  return (
    <div className="App">
      <h1>ポモドーロタイマー</h1>
      <div className="timer-container">
        <TimerProgress
          progress={
            isBreak
              ? (cycleCount + 1 === maxCycles
                  ? ((longBreak - seconds) / longBreak) * 100
                  : ((shortBreak - seconds) / shortBreak) * 100)
              : ((workTime - seconds) / workTime) * 100
          }
        />
        <TimerDisplay seconds={seconds} isBreak={isBreak} />
        <p className="status-text">{getStatusText()}</p>
        <p className="cycle-display">
          ポモドロー回数: {isActive ? cycleCount + 1 : 0} / {maxCycles}
        </p>
      </div>
      <div className="button-group">
        <button onClick={toggle}>
          {isActive ? (isPaused ? '再開' : '一時停止') : '開始'}
        </button>
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
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>ポモドーロを達成しました。<br />お疲れ様でした！🎉</h2>
            <button onClick={closePopup}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
