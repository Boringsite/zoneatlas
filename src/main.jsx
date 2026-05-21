import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './WorldTimezone.jsx'
import InstallPrompt from './InstallPrompt.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <InstallPrompt />
  </React.StrictMode>,
)
