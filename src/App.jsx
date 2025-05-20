import {  Route, BrowserRouter,  Routes} from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
import { SobreNosotros } from "./pages/SobreNosotros"
import {ErrorPage} from './pages/ErrorPage'
import { EventDetailsPage } from './pages/EventDetailsPage'
import { AdminPage } from './pages/AdminPage'
import { DisertantePage } from './pages/DisertantePage'
import { AdminCreatePage } from './pages/AdminCreatePage'
import { AdminTodoPage } from './pages/AdminTodoPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'


function App() {

  return (
    <>
    
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path='/Eventos' element={<ProductsPage/>}/>
          <Route path='/Eventos/:id' element={<EventDetailsPage/>}/>
          <Route path='/Eventos/CargarDatos/:id' element={<DisertantePage/>}/>
          <Route path="/SobreNosotros" element={<SobreNosotros />} />
          <Route path='/Admin' element={<AdminPage/>}/>
          <Route path='/Admin/CrearEvento' element={<AdminCreatePage/>}/>
          <Route path='/Admin/Todo' element={<AdminTodoPage/>}/>
           <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
        </BrowserRouter>

    </>
  )
}

export default App 
