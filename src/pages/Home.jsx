// src/pages/Home.jsx
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page">
      <header className="app-header">
        <h1>📚 Добро пожаловать на главную страницу!</h1>
        <p>Это стартовая страница нашего приложения.</p>

        <div className="home-actions">
          <Link to="/technologies" className="home-btn primary">
            Перейти к списку технологий
          </Link>
          <Link to="/stats" className="home-btn">
            Открыть статистику
          </Link>
          <Link to="/settings" className="home-btn">
            Открыть настройки
          </Link>
        </div>
      </header>
    </div>
  )
}

export default Home
