import React from 'react';

function SettingsForm({ workTime, setWorkTime, shortBreak, setShortBreak, longBreak, setLongBreak, maxCycles, setMaxCycles, isActive }) {

  const handleInputChange = (e, setter) => {
    const value = e.target.value;
    // バリデーション: 空文字や負の数を防ぐ
    if (value === '' || isNaN(value) || parseInt(value, 10) < 1) {
      setter(1);  // 最低でも1に設定
    } else {
      setter(parseInt(value, 10));
    }
  };

  return (
    <div className="settings-container">
      <div className="setting-group">
        <label>作業時間 (分)</label>
        <input
          type="number"
          value={workTime / 60}  // 秒数から分に変換して表示
          onChange={(e) => handleInputChange(e, (val) => setWorkTime(val * 60))}
          disabled={isActive}  // タイマーがアクティブな場合は入力不可
        />
      </div>
      <div className="setting-group">
        <label>短い休憩 (分)</label>
        <input
          type="number"
          value={shortBreak / 60}
          onChange={(e) => handleInputChange(e, (val) => setShortBreak(val * 60))}
          disabled={isActive}  // タイマーがアクティブな場合は入力不可
        />
      </div>
      <div className="setting-group">
        <label>長い休憩 (分)</label>
        <input
          type="number"
          value={longBreak / 60}
          onChange={(e) => handleInputChange(e, (val) => setLongBreak(val * 60))}
          disabled={isActive}  // タイマーがアクティブな場合は入力不可
        />
      </div>
      <div className="setting-group">
        <label>ポモドロー回数</label>
        <input
          type="number"
          value={maxCycles}
          onChange={(e) => handleInputChange(e, setMaxCycles)}
          disabled={isActive}  // タイマーがアクティブな場合は入力不可
        />
      </div>
    </div>
  );
}

export default SettingsForm;
