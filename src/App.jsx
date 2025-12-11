import React, { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import TechnologyList from './pages/TechnologyList'
import TechnologyDetail from './pages/TechnologyDetail'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'
import Stats from './pages/Stats'
import Settings from './pages/Settings'



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const user = localStorage.getItem('username') || ''
    setIsLoggedIn(loggedIn)
    setUsername(user)
  }, [])

  const handleLogin = (user) => {
    setIsLoggedIn(true)
    setUsername(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    setIsLoggedIn(false)
    setUsername('')
  }

  return (
    <div className="App">
      <Navigation
        isLoggedIn={isLoggedIn}
        username={username}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/" element={<Home />} />
        <Route path="/Technology-tracker/" element={<Home />} />

        <Route path="/technologies" element={<TechnologyList />} />
        <Route path="/technology/:id" element={<TechnologyDetail />} />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
