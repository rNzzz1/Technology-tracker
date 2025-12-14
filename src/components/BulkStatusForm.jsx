import React, { useState } from 'react'

function BulkStatusForm({ technologies, onApply, onCancel }) {
  const [selectedIds, setSelectedIds] = useState([])
  const [status, setStatus] = useState('not-started')

  const toggleTech = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedIds.length === 0) return
    onApply(selectedIds, status)
  }

  return (
    <form onSubmit={handleSubmit} className="bulk-status-form">
      <h2>Массовое изменение статуса</h2>

      <div className="form-group">
        <label htmlFor="bulk-status">Новый статус</label>
        <select
          id="bulk-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-describedby="bulk-status-help"
        >
          <option value="not-started">Не начато</option>
          <option value="in-progress">В процессе</option>
          <option value="completed">Изучено</option>
        </select>
        <p id="bulk-status-help" className="field-help">
          Статус будет применён ко всем выбранным технологиям.
        </p>
      </div>

      <fieldset className="form-group">
        <legend>Выберите технологии</legend>
        <ul className="bulk-status-list">
          {technologies.map(tech => (
            <li key={tech.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(tech.id)}
                  onChange={() => toggleTech(tech.id)}
                  aria-label={`Выбрать технологию ${tech.title}`}
                />
                <span>{tech.title}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="form-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={onCancel}
        >
          Отмена
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={selectedIds.length === 0}
        >
          Применить статус
        </button>
      </div>
    </form>
  )
}

export default BulkStatusForm
