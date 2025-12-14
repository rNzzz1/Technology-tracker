import React, { createContext, useContext, useState, useCallback } from 'react'
import { Snackbar, Alert } from '@mui/material'

const NotificationsContext = createContext(null)

export const useNotifications = () => useContext(NotificationsContext)

export function NotificationsProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState({
    message: '',
    severity: 'info',
    autoHideDuration: 4000,
  })

  const showNotification = useCallback(
    (message, severity = 'info', autoHideDuration = 4000) => {
      setOptions({ message, severity, autoHideDuration })
      setOpen(true)
    },
    []
  )

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <NotificationsContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={options.autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}      // встроенный крестик MUI
          severity={options.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {options.message}
        </Alert>
      </Snackbar>
    </NotificationsContext.Provider>
  )
}
