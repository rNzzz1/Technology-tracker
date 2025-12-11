// src/components/Navigation.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navigation({ isLoggedIn, username, onLogout }) {
  const location = useLocation()

  const isActive = (path) =>
    location.pathname === path ||
    location.pathname === `/Technology-tracker${path === '/' ? '/' : path}`

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <Link to="/">
          <h2>📚 Technology Tracker</h2>
        </Link>
      </div>

      <ul className="nav-menu">
        <li>
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            Главная
          </Link>
        </li>
        <li>
          <Link
            to="/technologies"
            className={isActive('/technologies') ? 'active' : ''}
          >
            Технологии
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className={isActive('/dashboard') ? 'active' : ''}
          >
            Дашборд
          </Link>
        </li>
      </ul>

      <div className="nav-user">
        {isLoggedIn ? (
          <>
            <span>👤 {username}</span>
            <button className="logout-btn" onClick={onLogout}>
              Выйти
            </button>
          </>
        ) : (
          <Link to="/login" className={isActive('/login') ? 'active' : ''}>
            Войти
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navigation
