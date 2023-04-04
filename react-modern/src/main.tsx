import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { SchoolProvider } from './school-context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SchoolProvider>
      <App />
   </SchoolProvider>
  </React.StrictMode>,
)
