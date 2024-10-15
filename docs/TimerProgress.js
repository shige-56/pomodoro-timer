import React from 'react';

function TimerProgress({ progress }) {
  const radius = 120;  // 円の半径
  const strokeWidth = 14;  // バーの太さを調整
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg className="progress-ring" width="280" height="280" viewBox="0 0 280 280">  {/* サイズを280pxに固定 */}
      {/* 背景の円 */}
      <circle
        stroke="#ddd"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx="140"  // 中央に配置
        cy="140"
      />
      {/* 進捗を示す円 */}
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
          transform: 'rotate(-90deg)',  // 12時位置から開始
          transformOrigin: '140px 140px',  // 中央基準で回転
          strokeLinecap: 'round',  // 両端を丸く
        }}
      />
    </svg>
  );
}

export default TimerProgress;
