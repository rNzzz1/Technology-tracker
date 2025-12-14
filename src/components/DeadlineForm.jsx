import React, { useState, useEffect } from 'react'

function DeadlineForm({ initialDeadline = '', onSave, onCancel }) {
    const [deadline, setDeadline] = useState(initialDeadline || '')
    const [error, setError] = useState('')
    const [isFormValid, setIsFormValid] = useState(false)
    
    const validate = (value) => {
      let newError = ''
    
      if (!value.trim()) {
        newError = 'Укажите дату дедлайна'
      } else {
        const deadlineDate = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
    
        if (isNaN(deadlineDate.getTime())) {
          newError = 'Некорректный формат даты'
        } else if (deadlineDate < today) {
          newError = 'Дедлайн не может быть в прошлом'
        }
      }
    
      setError(newError)
      setIsFormValid(newError === '')
    }
    
    useEffect(() => {
      validate(deadline)
    }, [deadline])
    

  const handleChange = (e) => {
    setDeadline(e.target.value)
  }
  

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(deadline)
  }
  

  return (
    <form onSubmit={handleSubmit} className="deadline-form" noValidate>
      <h2>Установка срока изучения</h2>

      <div className="form-group">
        <label htmlFor="deadline" className="required">
          Дедлайн
        </label>
        <input
       id="deadline"
       name="deadline"
       type="date"
       value={deadline}
       onChange={(e) => setDeadline(e.target.value)}
        className={error ? 'error' : ''}
        aria-describedby={error ? 'deadline-error' : undefined}
        aria-invalid={error ? 'true' : 'false'}
        required
        />

        {error && (
          <span
            id="deadline-error"
            className="error-message"
            role="alert"
          >
            {error}
          </span>
        )}
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Отмена
        </button>
        <button
        type="submit"
        className="btn-primary"
        >
        Сохранить срок
        </button>

      </div>
    </form>
  )
}

export default DeadlineForm
