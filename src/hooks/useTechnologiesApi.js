// src/hooks/useTechnologiesApi.js
import { useState, useEffect } from 'react'

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTechnologies = async () => {
    try {
      setLoading(true)
      setError(null)

      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockTechnologies = [
        {
          title: 'React',
          description: 'Библиотека для создания пользовательских интерфейсов',
          category: 'frontend',
        },
        {
          title: 'Node.js',
          description: 'Среда выполнения JavaScript на сервере',
          category: 'backend',
        },
        {
          title: 'TypeScript',
          description: 'Типизированное надмножество JavaScript',
          category: 'frontend',
        },
      ]

      setTechnologies(mockTechnologies)
    } catch (err) {
      setError('Не удалось загрузить технологии')
      console.error('Ошибка загрузки:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTechnologies()
  }, [])

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
  }
}

export default useTechnologiesApi
