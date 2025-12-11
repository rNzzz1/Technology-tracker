// src/pages/TechnologyList.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useTechnologies from '../hooks/useTechnologies'
import FilterButtons from '../components/FilterButtons'
import SearchBar from '../components/SearchBar'
import TechnologyCard from '../components/TechnologyCard'
import TechnologyNotes from '../components/TechnologyNotes'
import Modal from '../components/Modal/Modal'
import AddTechnologyForm from '../components/AddTechnologyForm/AddTechnologyForm'
import QuickActions from '../components/QuickActions'

function TechnologyList() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    addTechnology,
    deleteTechnology,
    markAllAsCompleted,
    resetAllStatuses,
    exportData,
    importData
  } = useTechnologies()

  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const navigate = useNavigate()

  const filteredTechnologies = technologies.filter(tech => {
    if (activeFilter !== 'all' && tech.status !== activeFilter) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        tech.title.toLowerCase().includes(q) ||
        tech.description.toLowerCase().includes(q) ||
        tech.notes.toLowerCase().includes(q) ||
        tech.category.toLowerCase().includes(q)
      )
    }
    return true
  })

  const handleDeleteTechnology = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
      deleteTechnology(id)
    }
  }

  const handleRandomSelect = () => {
    const notStartedTechs = technologies.filter(
      tech => tech.status === 'not-started'
    )
    if (notStartedTechs.length === 0) {
      alert('🎉 Все технологии уже начаты или завершены!')
      return
    }
    const randomTech =
      notStartedTechs[Math.floor(Math.random() * notStartedTechs.length)]
    updateStatus(randomTech.id, 'in-progress')
    alert(`🎲 Выбрана технология: ${randomTech.title}`)
  }

  return (
    <div>
      <header className="app-header">
        <h1>📚 Список технологий</h1>
        <p>Управляйте статусом изучения и заметками по технологиям</p>

        <button
          className="add-tech-btn"
          onClick={() => setShowAddModal(true)}
        >
          ➕ Добавить технологию
        </button>
      </header>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resultsCount={filteredTechnologies.length}
        totalCount={technologies.length}
      />

      <FilterButtons
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        technologies={technologies}
      />

      {/* Быстрые действия перенесены сюда */}
      <QuickActions
        onMarkAllCompleted={markAllAsCompleted}
        onResetAll={resetAllStatuses}
        onRandomSelect={handleRandomSelect}
        technologies={technologies}
        exportData={exportData}
        importData={importData}
      />

      <div className="technology-list">
        {filteredTechnologies.map(tech => (
          <div key={tech.id} className="technology-card-wrapper">
            <div className="card-header-actions">
              <span className={`tech-category tech-category-${tech.category}`}>
                {tech.category}
              </span>
              <button
                className="delete-tech-btn"
                onClick={() => handleDeleteTechnology(tech.id)}
                title="Удалить технологию"
              >
                🗑️
              </button>
            </div>

            <div className="technology-card-with-link">
              <TechnologyCard
                id={tech.id}
                title={tech.title}
                description={tech.description}
                status={tech.status}
                onStatusChange={updateStatus}
              />

              <div className="card-footer-actions">
                <button
                  type="button"
                  className="card-more-link"
                  onClick={() => navigate(`/technology/${tech.id}`)}
                >
                  Подробнее
                </button>
              </div>
            </div>
            <div className="technology-notes-wrapper">
            <TechnologyNotes
              techId={tech.id}
              notes={tech.notes}
              onNotesChange={updateNotes}
            />
            </div>
          </div>
        ))}

        {filteredTechnologies.length === 0 && (
          <div className="no-results">
            <p>🔍 Технологии не найдены</p>
            <p>Попробуйте изменить поисковый запрос или фильтр</p>
            <button
              className="add-tech-btn secondary"
              onClick={() => setShowAddModal(true)}
            >
              ➕ Добавить первую технологию
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="➕ Добавить новую технологию"
        size="medium"
      >
        <AddTechnologyForm
          onAdd={addTechnology}
          onClose={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  )
}

export default TechnologyList
