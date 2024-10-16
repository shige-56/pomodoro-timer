// TimerControls.js
import React from 'react';

const TimerControls = ({ isActive, onToggle, onReset }) => {
  return (
    <div className="buttons">
      <button onClick={onToggle}>
        {isActive ? '一時停止' : '開始'}
      </button>
      <button onClick={onReset}>リセット</button>
    </div>
  );
};

export default TimerControls;
