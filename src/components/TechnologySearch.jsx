import { useState, useEffect, useRef } from 'react'
import useDebounce from '../hooks/useDebounce'

function TechnologySearch({ onResults }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // для отмены fetch
  const abortControllerRef = useRef(null)

  const debouncedSearch = useDebounce(searchTerm, 500)

  useEffect(() => {
    const query = debouncedSearch.trim()

    // если строка пустая — очищаем результаты и не обращаемся к API
    if (!query) {
      onResults([])
      setError(null)
      setLoading(false)
      return
    }

    const searchTechnologies = async () => {
      // отменяем предыдущий запрос
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      const controller = new AbortController()
      abortControllerRef.current = controller

      try {
        setLoading(true)
        setError(null)

        // здесь у тебя может быть реальный API;
        // пока имитируем его с задержкой и фильтрацией по mock‑данным
        await new Promise(resolve => setTimeout(resolve, 500))

        const mockFromApi = [
          {
            id: 1,
            title: 'React',
            description: 'Библиотека для создания пользовательских интерфейсов',
            category: 'frontend',
          },
          {
            id: 2,
            title: 'Node.js',
            description: 'Среда выполнения JavaScript на сервере',
            category: 'backend',
          },
          {
            id: 3,
            title: 'TypeScript',
            description: 'Типизированное надмножество JavaScript',
            category: 'frontend',
          },
        ]

        const q = query.toLowerCase()
        const filtered = mockFromApi.filter(tech =>
          tech.title.toLowerCase().includes(q) ||
          tech.description.toLowerCase().includes(q) ||
          tech.category.toLowerCase().includes(q)
        )

        onResults(filtered)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Ошибка при поиске технологий')
          console.error(err)
        }
      } finally {
        setLoading(false)
      }
    }

    searchTechnologies()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [debouncedSearch, onResults])

  return (
    <div className="technology-search">
      <h3>Поиск технологий (API)</h3>

      <div className="search-box">
        <input
          type="text"
          placeholder="Введите название технологии..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {loading && <span className="search-loading">⌛</span>}
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default TechnologySearch
