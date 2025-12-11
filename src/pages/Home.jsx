// pages/Home.jsx
import React from 'react'
import useTechnologies from '../hooks/useTechnologies'
import ProgressDashboard from '../components/ProgressDashboard'
import { Link } from 'react-router-dom'

function Home() {
  const {
    technologies,
    markAllAsCompleted,
    resetAllStatuses,
    progress: overallProgress,
    categoryProgress,
    exportData,
    importData
  } = useTechnologies()

  const selectRandomTech = () => {
    const notStartedTechs = technologies.filter(tech => tech.status === 'not-started')
    if (notStartedTechs.length === 0) {
      alert('🎉 Все технологии уже начаты или завершены!')
      return
    }
    const randomTech = notStartedTechs[Math.floor(Math.random() * notStartedTechs.length)]
    alert(`🎲 Выбрана технология: ${randomTech.title}`)
  }

  return (
    <div>
      <header className="app-header">
        <h1>📚 Трекер изучения технологий</h1>
        <p>Отслеживайте свой прогресс в изучении современных технологий</p>
  
        <Link to="/technologies" className="btn-primary-link">
          Перейти к списку технологий
        </Link>
      </header>
  
      <ProgressDashboard
        categoryProgress={categoryProgress}
        overallProgress={overallProgress}
      />
    </div>
  )
  
}

export default Home
