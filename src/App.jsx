import {  Route, BrowserRouter,  Routes} from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
import { SobreNosotros } from "./pages/SobreNosotros"
import {ErrorPage} from './pages/ErrorPage'
import { EventDetailsPage } from './pages/EventDetailsPage'
import { AdminPage } from './pages/AdminPage'

function App() {

  return (
    <>
    
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path='/Eventos' element={<ProductsPage/>}/>
          <Route path='/Eventos/:id' element={<EventDetailsPage/>}/>
          <Route path="/SobreNosotros" element={<SobreNosotros />} />
          <Route path='/Admin' element={<AdminPage/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
        </BrowserRouter>

    </>
  )
}

export default App 
