// src/components/RoadmapImporter.jsx
import React, { useState } from 'react'
import useTechnologiesApi from '../hooks/useTechnologiesApi'

function RoadmapImporter({ onImportTechnologies }) {
  const { technologies, loading, error } = useTechnologiesApi()
  const [importing, setImporting] = useState(false)

  const handleImportExample = async () => {
    if (loading) return

    if (!technologies || technologies.length === 0) {
      alert('Нет технологий для импорта')
      return
    }

    try {
      setImporting(true)
      onImportTechnologies(technologies)
      alert(`Импортировано технологий: ${technologies.length}`)
    } catch (err) {
      alert('Ошибка импорта технологий')
      console.error(err)
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="roadmap-importer">
      <h3>Импорт дорожной карты</h3>
      <p>Загрузите набор технологий из внешнего API (mock).</p>

      <div className="import-actions">
        <button
          className="add-tech-btn"
          onClick={handleImportExample}
          disabled={loading || importing}
        >
          {loading ? 'Загрузка...' : importing ? 'Импорт...' : 'Импорт примера дорожной карты'}
        </button>
      </div>

      {error && (
        <div className="error-message" style={{ marginTop: '8px', color: '#e03131' }}>
          {error}
        </div>
      )}
    </div>
  )
}

export default RoadmapImporter
