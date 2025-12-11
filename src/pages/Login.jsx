// src/pages/Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // простая проверка как в методичке: фиксированный логин/пароль
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', username)

      if (onLogin) {
        onLogin(username)
      }

      navigate('/dashboard')
    } else {
      alert('Неверный логин или пароль')
    }
  }

  return (
    <div className="page login-page">
      <h1>Вход</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Логин</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="add-tech-btn">
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login
