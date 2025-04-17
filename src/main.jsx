import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MenuProvider } from './context/MenuContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { FiltersProvider } from './context/FiltersContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <MenuProvider>
    <ProductProvider>
      <FiltersProvider>
      <App/>
      </FiltersProvider>
    </ProductProvider>
  </MenuProvider>,
)
