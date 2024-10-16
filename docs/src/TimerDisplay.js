import React from 'react';

function TimerDisplay({ seconds, isBreak, statusText }) {
  // 秒数を分と秒に変換
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="time-display">
      <span>{`${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`}</span>
      {/* ステータスの表示は外部から渡された値で行う */}
      {statusText && <p className="status-text">{statusText}</p>}
    </div>
  );
}

export default TimerDisplay;
