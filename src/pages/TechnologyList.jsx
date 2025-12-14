// src/pages/TechnologyList.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useTechnologies from '../hooks/useTechnologies'
import useTechnologiesApi from '../hooks/useTechnologiesApi'
import FilterButtons from '../components/FilterButtons'
import SearchBar from '../components/SearchBar'
import TechnologyCard from '../components/TechnologyCard'
import TechnologyNotes from '../components/TechnologyNotes'
import Modal from '../components/Modal/Modal'
import AddTechnologyForm from '../components/AddTechnologyForm/AddTechnologyForm'
import QuickActions from '../components/QuickActions'
import RoadmapImporter from '../components/RoadmapImporter'
import TechnologySearch from '../components/TechnologySearch'
import DeadlineForm from '../components/DeadlineForm'
import BulkStatusForm from '../components/BulkStatusForm'



function TechnologyList() {
    const {
        technologies,
        updateStatus,
        updateNotes,
        updateDeadline,
        updateStatusBulk,
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
  const [apiSearchResults, setApiSearchResults] = useState([])
  const [showDeadlineModal, setShowDeadlineModal] = useState(false)
  const [selectedTechId, setSelectedTechId] = useState(null)
  const [showBulkStatusModal, setShowBulkStatusModal] = useState(false)




  const navigate = useNavigate()


  
  // API-хук для первичной загрузки (используем только состояния)
  const {
    technologies: apiTechnologies,
    loading: apiLoading,
    error: apiError,
    refetch: refetchApi,
  } = useTechnologiesApi()

  // Первичная загрузка: если локальный список пуст, берём данные из API
  useEffect(() => {
    if (technologies.length === 0 && apiTechnologies.length > 0) {
      apiTechnologies.forEach(tech => {
        // Добавляем через твой addTechnology, чтобы всё ушло в localStorage
        addTechnology({
          title: tech.title,
          description: tech.description,
          category: tech.category,
        })
      })
    }
  }, [apiTechnologies, technologies.length, addTechnology])

  const filteredTechnologies = technologies.filter(tech => {
    if (activeFilter !== 'all' && tech.status !== activeFilter) return false
  
    const q = (searchQuery || '').toLowerCase()
  
    if (q) {
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

  // Импорт “дорожной карты” в текущий список
  const handleImportRoadmap = (listFromApi) => {
    listFromApi.forEach(tech => {
      addTechnology({
        title: tech.title,
        description: tech.description,
        category: tech.category || 'other',
      })
    })
  }
  const handleRandomSelect = () => {
    if (technologies.length === 0) return
  
    const randomIndex = Math.floor(Math.random() * technologies.length)
    const randomTech = technologies[randomIndex]
  
    // например, просто перейти на страницу технологии
    navigate(`/technology/${randomTech.id}`)
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

      {/* Состояния загрузки/ошибок от API */}
      {apiLoading && technologies.length === 0 && (
        <div className="app-loading">
          <p>Загрузка технологий из API...</p>
        </div>
      )}

      {apiError && (
        <div className="app-error">
          <p>{apiError}</p>
          <button className="add-tech-btn secondary" onClick={refetchApi}>
            Попробовать снова
          </button>
        </div>
      )}

      {/* Импорт дорожной карты */}
      <RoadmapImporter onImportTechnologies={handleImportRoadmap} />

      <TechnologySearch onResults={setApiSearchResults} />

      <SearchBar
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    resultsCount={filteredTechnologies.length}
    totalCount={technologies.length}
    />



        {apiSearchResults.length > 0 && (
        <div className="api-search-results">
            <h3>Результаты поиска из API: {apiSearchResults.length}</h3>
            <ul>
            {apiSearchResults.map(tech => (
                <li key={tech.id}>
                <strong>{tech.title}</strong> — {tech.category}
                </li>
            ))}
            </ul>
        </div>
        )}


      <FilterButtons
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        technologies={technologies}
      />

<QuickActions
  onMarkAllCompleted={markAllAsCompleted}
  onResetAll={resetAllStatuses}
  onRandomSelect={handleRandomSelect}
  technologies={technologies}
  exportData={exportData}
  importData={importData}
/>
<button
  className="add-tech-btn secondary"
  onClick={() => setShowBulkStatusModal(true)}
>
  ✏️ Массовое изменение статуса
</button>


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
            deadline={tech.deadline}      // передаём срок
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
                <button
                type="button"
                className="card-more-link"
                onClick={() => {
                    setSelectedTechId(tech.id)
                    setShowDeadlineModal(true)
                }}
                >
                Установить срок
                </button>

              </div>
            </div>

            <TechnologyNotes
              techId={tech.id}
              notes={tech.notes}
              onNotesChange={updateNotes}
              deadline={tech.deadline}
            />
          </div>
        ))}

        {filteredTechnologies.length === 0 && !apiLoading && (
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
      <Modal
        isOpen={showDeadlineModal}
        onClose={() => setShowDeadlineModal(false)}
        title="Срок изучения технологии"
        size="small"
>
  {selectedTechId && (
    <DeadlineForm
      initialDeadline={
        technologies.find(t => t.id === selectedTechId)?.deadline || ''
      }
      onSave={(newDate) => {
        updateDeadline(selectedTechId, newDate)
        setShowDeadlineModal(false)
      }}
      onCancel={() => setShowDeadlineModal(false)}
    />
  )}
</Modal>
<Modal
  isOpen={showBulkStatusModal}
  onClose={() => setShowBulkStatusModal(false)}
  title="Массовое изменение статусов"
  size="medium"
>
  <BulkStatusForm
    technologies={technologies}
    onApply={(ids, newStatus) => {
      updateStatusBulk(ids, newStatus)
      setShowBulkStatusModal(false)
    }}
    onCancel={() => setShowBulkStatusModal(false)}
  />
</Modal>


    </div>
  )
}

export default TechnologyList
