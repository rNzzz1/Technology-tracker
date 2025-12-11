import useLocalStorage from './useLocalStorage'

// Начальные данные для технологий
const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов React, их жизненного цикла и принципов работы.',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    priority: 1
  },
  {
    id: 2,
    title: 'JSX Syntax',
    description: 'Освоение синтаксиса JSX, понимание различий между JSX и HTML.',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    priority: 1
  },
  {
    id: 3,
    title: 'State Management',
    description: 'Работа с состоянием компонентов, использование useState и useEffect хуков.',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    priority: 2
  },
  {
    id: 4,
    title: 'Props & Context',
    description: 'Передача данных между компонентами и использование Context API.',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    priority: 2
  },
  {
    id: 5,
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript, работа с модулями и событиями.',
    status: 'not-started',
    notes: '',
    category: 'backend',
    priority: 3
  },
  {
    id: 6,
    title: 'Express.js Framework',
    description: 'Создание REST API с помощью Express.js, работа с маршрутизацией.',
    status: 'not-started',
    notes: '',
    category: 'backend',
    priority: 3
  },
  {
    id: 7,
    title: 'MongoDB Database',
    description: 'Работа с NoSQL базой данных MongoDB, CRUD операции.',
    status: 'not-started',
    notes: '',
    category: 'database',
    priority: 4
  },
  {
    id: 8,
    title: 'Git & GitHub',
    description: 'Система контроля версий, работа с ветками и пулл-реквестами.',
    status: 'not-started',
    notes: '',
    category: 'tools',
    priority: 1
  }
]

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', [])
  // Функция для обновления статуса технологии
  const updateStatus = (techId) => {
    setTechnologies(prev => 
      prev.map(tech => {
        if (tech.id === techId) {
          // Циклически меняем статус: not-started → in-progress → completed → not-started
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
      ...newTech,          // то, что пришло извне, перекрывает дефолты при наличии
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
        progress: categoryTechs.length > 0 ? Math.round((completed / categoryTechs.length) * 100) : 0,
        total: categoryTechs.length,
        completed
      }
    })
  }

  // Функция для экспорта данных
  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      technologies: technologies
    }
    return JSON.stringify(data, null, 2)
  }

  // Функция для импорта данных
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