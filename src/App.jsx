import './App.css'
import Router from './Router/Router'
import { useServerActive } from './hooks/useActiveServer'

function App() {
  useServerActive(14 * 60 * 1000)
  return (
   <Router/> 
  )
}

export default App 

