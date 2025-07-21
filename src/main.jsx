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
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <AuthProvider>
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
  </ServerProvider>
  </AuthProvider>
  </QueryClientProvider>,
)
