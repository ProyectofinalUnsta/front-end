import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
import SobreNosotros from "./pages/SobreNosotros"
import { ErrorPage } from './pages/ErrorPage'
import { EventDetailsPage } from './pages/EventDetailsPage'
import { AdminPage } from './pages/AdminPage'
import { DisertantePage } from './pages/DisertantePage'
import { MisArchivos } from './pages/MisArchivos'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path='/Eventos' element={<ProductsPage/>} />
          <Route path='/Eventos/:id' element={<EventDetailsPage/>} />
          <Route path='/Eventos/CargarDatos/:id' element={<DisertantePage/>} />
          <Route path="/SobreNosotros" element={<SobreNosotros />} />
          <Route path='/Admin' element={<AdminPage/>} />
          <Route path='/MisArchivos' element={<MisArchivos />} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App 

