import React from 'react';

function TimerProgress({ progress }) {
  const radius = 120;  // 円の半径
  const strokeWidth = 14;  // バーの太さを調整
  const circumference = 2 * Math.PI * radius;

  // 無効な進捗率に対するガード
  const safeProgress = isNaN(progress) || !isFinite(progress) ? 0 : progress;
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  return (
    <svg className="progress-ring" width="280" height="280" viewBox="0 0 280 280">
      <circle
        stroke="#ddd"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx="140"
        cy="140"
      />
      <circle
        className="progress-ring__circle"
        stroke="#ffb6c1"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx="140"
        cy="140"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset,
          transform: 'rotate(-90deg)',
          transformOrigin: '140px 140px',
          strokeLinecap: 'round',
          transition: 'stroke-dashoffset 1s linear', // スムーズなアニメーション
        }}
      />
    </svg>
  );
}

export default TimerProgress;
