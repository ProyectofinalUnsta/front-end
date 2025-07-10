import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MenuProvider } from './context/MenuContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { FiltersProvider } from './context/FiltersContext.jsx'
import { LoginProvider } from './context/LoginContext.jsx'
import { ServerProvider } from './context/ServerContext.jsx'
import { FileProvider } from './context/FileContext.jsx'
import { EventsProvider } from './context/EventsContext.jsx'
import { InscriptoProvider } from './context/InscriptoContext.jsx'
import { DisertanteProvider } from './context/DisertanteContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ServerProvider>
    <DisertanteProvider>
    <InscriptoProvider>
    <EventsProvider>
    <FileProvider>
  <LoginProvider>
  <MenuProvider>
    <ProductProvider>
      <FiltersProvider>
      <App/>
      </FiltersProvider>
    </ProductProvider>
  </MenuProvider>
  </LoginProvider>
  </FileProvider>
  </EventsProvider>
  </InscriptoProvider>
  </DisertanteProvider>
  </ServerProvider>,
)
