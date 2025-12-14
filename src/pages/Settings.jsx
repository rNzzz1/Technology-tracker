// src/pages/Settings.jsx
import React from 'react'

function Settings({ themeMode, onToggleTheme }) {
    const isDark = themeMode === 'dark'
  
    return (
      <div className="settings-page">
        <h1>Настройки</h1>
  
        <div className="settings-item">
          <span className="settings-label">Тема</span>
          <button
  type="button"
  className={`theme-toggle-pill ${themeMode === 'dark' ? 'theme-toggle-pill--dark' : 'theme-toggle-pill--light'}`}
  onClick={onToggleTheme}
>
  <span className="theme-toggle-pill__thumb" />
  <span className="theme-toggle-pill__label">
    {themeMode === 'dark' ? 'Тёмная' : 'Светлая'}
  </span>
  <span className="theme-toggle-pill__icon">
    {themeMode === 'dark' ? '🌙' : '☀️'}
  </span>
</button>


        </div>
      </div>
    )
  }
  
  export default Settings
