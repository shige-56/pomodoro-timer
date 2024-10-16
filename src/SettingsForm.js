import React, { useState, useEffect } from 'react';

function SettingsForm({ 
  workTime, setWorkTime, 
  shortBreak, setShortBreak, 
  longBreak, setLongBreak, 
  maxCycles, setMaxCycles, 
  isActive 
}) {
  const [localWorkTime, setLocalWorkTime] = useState(workTime / 60 || 1);
  const [localShortBreak, setLocalShortBreak] = useState(shortBreak / 60 || 1);
  const [localLongBreak, setLocalLongBreak] = useState(longBreak / 60 || 1);
  const [localMaxCycles, setLocalMaxCycles] = useState(maxCycles || 1);

  useEffect(() => {
    setLocalWorkTime(Math.max(Math.floor(workTime / 60), 1));
    setLocalShortBreak(Math.max(Math.floor(shortBreak / 60), 1));
    setLocalLongBreak(Math.max(Math.floor(longBreak / 60), 1));
    setLocalMaxCycles(Math.max(maxCycles, 1));
  }, [workTime, shortBreak, longBreak, maxCycles]);

  const handleInputChange = (setter) => (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 || e.target.value === '') {
      setter(value);  // 数値が1以上、または空のときにステートを更新
    }
  };

  const handleBlurTime = (setter, value, defaultValue) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 1) {
      setter(defaultValue * 60);  // 1未満なら初期値に戻す
    } else {
      setter(numValue * 60);  // 分から秒に変換して反映
    }
  };

  const handleBlurCycles = (setter, value, defaultValue) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 1) {
      setter(defaultValue);  // 1未満なら初期値に戻す（60倍しない）
    } else {
      setter(numValue);  // そのまま反映
    }
  };

  return (
    <div className="settings-container">
      <div className="setting-group">
        <label>作業時間 (分)</label>
        <input
          type="number"
          min="1"
          value={localWorkTime}
          onChange={handleInputChange(setLocalWorkTime)}
          onBlur={() => handleBlurTime(setWorkTime, localWorkTime, 25)}
          disabled={isActive}
        />
      </div>
      <div className="setting-group">
        <label>短い休憩 (分)</label>
        <input
          type="number"
          min="1"
          value={localShortBreak}
          onChange={handleInputChange(setLocalShortBreak)}
          onBlur={() => handleBlurTime(setShortBreak, localShortBreak, 5)}
          disabled={isActive}
        />
      </div>
      <div className="setting-group">
        <label>長い休憩 (分)</label>
        <input
          type="number"
          min="1"
          value={localLongBreak}
          onChange={handleInputChange(setLocalLongBreak)}
          onBlur={() => handleBlurTime(setLongBreak, localLongBreak, 10)}
          disabled={isActive}
        />
      </div>
      <div className="setting-group">
        <label>ポモドロー回数</label>
        <input
          type="number"
          min="1"
          value={localMaxCycles}
          onChange={handleInputChange(setLocalMaxCycles)}
          onBlur={() => handleBlurCycles(setMaxCycles, localMaxCycles, 4)}
          disabled={isActive}
        />
      </div>
    </div>
  );
}

export default SettingsForm;
