import {  Route, BrowserRouter,  Routes} from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
import { SobreNosotros } from "./pages/SobreNosotros";
function App() {


  return (
    <>

        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path='/Eventos' element={<ProductsPage/>}/>
          <Route path="/SobreNosotros" element={<SobreNosotros />} />
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App 
