// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { NotificationsProvider } from './components/NotificationsProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationsProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </NotificationsProvider>
)
