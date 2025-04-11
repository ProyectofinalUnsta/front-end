import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MenuProvider } from './context/MenuContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <MenuProvider>
    <App />
  </MenuProvider>,
)
