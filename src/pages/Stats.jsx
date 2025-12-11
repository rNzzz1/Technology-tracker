// src/pages/Stats.jsx
import React from 'react'
import useTechnologies from '../hooks/useTechnologies'
import ProgressDashboard from '../components/ProgressDashboard'

function Stats() {
  const { progress: overallProgress, categoryProgress } = useTechnologies()

  return (
    <div className="page">
      <header className="app-header">
        <h1>📊 Статистика прогресса</h1>
        <p>График и сводка по изучению технологий</p>
      </header>

      {/* здесь уже есть “график” прогресса по категориям */}
      <ProgressDashboard
        overallProgress={overallProgress}
        categoryProgress={categoryProgress}
      />
    </div>
  )
}

export default Stats
