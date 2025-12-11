// src/pages/TechnologyDetail.jsx
import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import useTechnologies from '../hooks/useTechnologies'
import TechnologyNotes from '../components/TechnologyNotes'

function TechnologyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    technologies,
    updateStatus,
    updateNotes,
    deleteTechnology
  } = useTechnologies()

  const techId = Number(id)
  const technology = technologies.find(t => t.id === techId)

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {id} не найдена.</p>
        <Link to="/technologies" className="btn">
          ← Вернуться к списку
        </Link>
      </div>
    )
  }

  const handleStatusChange = (newStatus) => {
    updateStatus(techId, newStatus)
  }

  const handleDelete = () => {
    if (window.confirm('Удалить эту технологию?')) {
      deleteTechnology(techId)
      navigate('/technologies')
    }
  }

  return (
    <div className="page technology-detail-page">
      <div className="page-header">
        <button
          className="back-link"
          onClick={() => navigate(-1)}
        >
          ← Назад
        </button>
        <h1>{technology.title}</h1>
        <button className="delete-tech-btn" onClick={handleDelete}>
          🗑️
        </button>
      </div>

      <div className="technology-detail">
        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
          <p className="tech-category">Категория: {technology.category}</p>
        </div>

        <div className="detail-section">
          <h3>Статус</h3>
          <div className="status-buttons">
            <button
              onClick={() => handleStatusChange('not-started')}
              className={
                technology.status === 'not-started'
                  ? 'status-btn active'
                  : 'status-btn'
              }
            >
              Не начато
            </button>
            <button
              onClick={() => handleStatusChange('in-progress')}
              className={
                technology.status === 'in-progress'
                  ? 'status-btn active'
                  : 'status-btn'
              }
            >
              В процессе
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className={
                technology.status === 'completed'
                  ? 'status-btn active'
                  : 'status-btn'
              }
            >
              Завершено
            </button>
          </div>
        </div>

        <div className="detail-section">
          <h3>Заметки</h3>
          <TechnologyNotes
            techId={technology.id}
            notes={technology.notes}
            onNotesChange={updateNotes}
          />
        </div>
      </div>
    </div>
  )
}

export default TechnologyDetail
