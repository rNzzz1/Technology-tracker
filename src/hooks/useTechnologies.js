// src/hooks/useTechnologies.js
import useLocalStorage from './useLocalStorage'

// Начальные данные (можешь оставить как есть или использовать при первой инициализации)
const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов React, их жизненного цикла и принципов работы.',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    priority: 1,
    deadline: '',
    resources: []
  },
  // остальные по аналогии...
]

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', [])

  // Функция для обновления статуса технологии
  const updateStatus = (techId) => {
    setTechnologies(prev =>
      prev.map(tech => {
        if (tech.id === techId) {
          const statusOrder = ['not-started', 'in-progress', 'completed']
          const currentIndex = statusOrder.indexOf(tech.status)
          const nextIndex = (currentIndex + 1) % statusOrder.length
          return { ...tech, status: statusOrder[nextIndex] }
        }
        return tech
      })
    )
  }

  // Функция для обновления заметок
  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    )
  }

  // Функция для обновления дедлайна
  const updateDeadline = (techId, newDeadline) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, deadline: newDeadline } : tech
      )
    )
  }
  // Массовое обновление статусов
const updateStatusBulk = (ids, newStatus) => {
  setTechnologies(prev =>
    prev.map(tech =>
      ids.includes(tech.id) ? { ...tech, status: newStatus } : tech
    )
  )
}


  // Функция для отметки всех как выполненных
  const markAllAsCompleted = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'completed' }))
    )
  }

  // Функция для сброса всех статусов
  const resetAllStatuses = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    )
  }

  // Функция для добавления новой технологии
  const addTechnology = (newTech) => {
    const maxId = technologies.length > 0
      ? Math.max(...technologies.map(t => t.id))
      : 0

    const newId = maxId + 1

    setTechnologies(prev => [
      ...prev,
      {
        id: newId,
        status: 'not-started',
        notes: '',
        priority: 1,
        category: 'other',
        deadline: '',
        resources: [],
        ...newTech
      }
    ])
  }

  // Функция для удаления технологии
  const deleteTechnology = (techId) => {
    setTechnologies(prev => prev.filter(tech => tech.id !== techId))
  }

  // Функция для расчета общего прогресса
  const calculateProgress = () => {
    if (technologies.length === 0) return 0
    const completed = technologies.filter(tech => tech.status === 'completed').length
    return Math.round((completed / technologies.length) * 100)
  }

  // Функция для расчета прогресса по категориям
  const calculateCategoryProgress = () => {
    const categories = [...new Set(technologies.map(tech => tech.category))]
    return categories.map(category => {
      const categoryTechs = technologies.filter(tech => tech.category === category)
      const completed = categoryTechs.filter(tech => tech.status === 'completed').length
      return {
        category,
        progress: categoryTechs.length > 0
          ? Math.round((completed / categoryTechs.length) * 100)
          : 0,
        total: categoryTechs.length,
        completed
      }
    })
  }

  // Экспорт данных
  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      technologies: technologies
    }
    return JSON.stringify(data, null, 2)
  }

  // Импорт данных
  const importData = (data) => {
    try {
      const parsed = JSON.parse(data)
      if (parsed.technologies && Array.isArray(parsed.technologies)) {
        setTechnologies(parsed.technologies)
        return true
      }
    } catch (error) {
      console.error('Ошибка импорта данных:', error)
    }
    return false
  }

  return {
    technologies,
    updateStatus,
    updateNotes,
    updateDeadline,
    updateStatusBulk,
    markAllAsCompleted,
    resetAllStatuses,
    addTechnology,
    deleteTechnology,
    progress: calculateProgress(),
    categoryProgress: calculateCategoryProgress(),
    exportData,
    importData
  }
  
}

export default useTechnologies
