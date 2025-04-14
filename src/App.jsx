import {  Route, BrowserRouter,  Routes} from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
function App() {


  return (
    <>

        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path='/Eventos' element={<ProductsPage/>}/>
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App 
