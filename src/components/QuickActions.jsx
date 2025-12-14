// src/components/QuickActions.jsx
import React, { useState } from 'react'
import Modal from './Modal/Modal'
import './QuickActions.css'
import { useNotifications } from '../components/NotificationsProvider'

function QuickActions({
  onMarkAllCompleted,
  onResetAll,
  onRandomSelect,
  technologies,
  exportData,
  importData
}) {
  const { showNotification } = useNotifications()
  const [showExportModal, setShowExportModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [importText, setImportText] = useState('')
  const [importError, setImportError] = useState('')

  const notStartedCount = technologies.filter(tech => tech.status === 'not-started').length
  const completedCount = technologies.filter(tech => tech.status === 'completed').length

  const handleExport = () => {
    const data = exportData()
    setShowExportModal(true)

    navigator.clipboard.writeText(data)
      .then(() => {
        showNotification('Данные скопированы в буфер обмена', 'success')
      })
      .catch(err => {
        console.error('Ошибка копирования:', err)
        showNotification('Не удалось скопировать данные в буфер обмена', 'error')
      })
  }

  const handleImport = () => {
    const success = importData(importText)
    if (success) {
      setImportText('')
      setImportError('')
      setShowImportModal(false)
      showNotification('Данные успешно импортированы', 'success')
    } else {
      setImportError('❌ Ошибка импорта. Проверьте формат данных.')
      showNotification('Ошибка импорта: неверный формат JSON или структуры данных', 'error')
    }
  }

  return (
    <div className="quick-actions">
      <h3>⚡ Быстрые действия</h3>

      <div className="action-buttons">
        <button
          className="action-btn mark-all-btn"
          onClick={onMarkAllCompleted}
          title="Отметить все технологии как изученные"
        >
          ✅ Отметить все как выполненные
          <span className="action-count">{completedCount}/{technologies.length}</span>
        </button>

        <button
          className="action-btn reset-btn"
          onClick={onResetAll}
          title="Сбросить статусы всех технологий"
        >
          🔄 Сбросить все статусы
        </button>

        <button
          className="action-btn random-btn"
          onClick={onRandomSelect}
          disabled={notStartedCount === 0}
          title={notStartedCount === 0 ? 'Все технологии уже начаты' : 'Выбрать случайную технологию'}
        >
          🎲 Случайный выбор
          <span className="action-count">{notStartedCount}</span>
        </button>

        <button
          className="action-btn export-btn"
          onClick={handleExport}
          title="Экспортировать данные в JSON"
        >
          📤 Экспорт данных
        </button>

        <button
          className="action-btn import-btn"
          onClick={() => setShowImportModal(true)}
          title="Импортировать данные из JSON"
        >
          📥 Импорт данных
        </button>
      </div>

      {/* Модалка экспорта */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="📤 Экспорт данных"
        size="large"
      >
        <div className="modal-export-content">
          <p>✅ Данные успешно экспортированы и скопированы в буфер обмена!</p>
          <p className="export-hint">
            Вы можете вставить данные в текстовый редактор или сохранить в файл.
          </p>

          <div className="export-data-container">
            <pre className="export-data">
              {exportData()}
            </pre>
          </div>

          <div className="modal-actions">
            <button
              className="modal-btn secondary"
              onClick={() => {
                const data = exportData()
                const blob = new Blob([data], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `tech-tracker-backup-${new Date().toISOString().split('T')[0]}.json`
                a.click()
                URL.revokeObjectURL(url)
              }}
            >
              💾 Скачать файл
            </button>
            <button
              className="modal-btn primary"
              onClick={() => setShowExportModal(false)}
            >
              Готово
            </button>
          </div>
        </div>
      </Modal>

      {/* Модалка импорта */}
      <Modal
        isOpen={showImportModal}
        onClose={() => {
          setShowImportModal(false)
          setImportText('')
          setImportError('')
        }}
        title="📥 Импорт данных"
        size="medium"
      >
        <div className="modal-import-content">
          <p>Вставьте данные JSON для импорта:</p>

          <textarea
            value={importText}
            onChange={(e) => {
              setImportText(e.target.value)
              setImportError('')
            }}
            placeholder='{"exportedAt": "...", "technologies": [...]}'
            rows="8"
            className={`import-textarea ${importError ? 'error' : ''}`}
          />

          {importError && (
            <div className="import-error">
              {importError}
            </div>
          )}

          <div className="import-hint">
            ⚠️ Внимание: Импорт заменит все текущие данные!
          </div>

          <div className="modal-actions">
            <button
              className="modal-btn secondary"
              onClick={() => setShowImportModal(false)}
            >
              Отмена
            </button>
            <button
              className="modal-btn primary"
              onClick={handleImport}
              disabled={!importText.trim()}
            >
              Импортировать
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default QuickActions
