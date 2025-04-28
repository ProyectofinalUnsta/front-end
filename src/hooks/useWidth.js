  import { useState, useEffect } from "react"
import { useLocation } from "react-router"

  export function useWidth () {
    
    const [width,setwidth] = useState(0)
    const location = useLocation()
    const handlewidth  = () => {
        setwidth(window.innerWidth)
        }

       
    useEffect(()=>{
        window.addEventListener('resize',handlewidth)
        window.addEventListener('load', handlewidth)
       
        return () => {
           window.removeEventListener('resize', handlewidth)
           window.removeEventListener('load', handlewidth)
         
        }
       },[])

       useEffect(()=>{
        handlewidth()
       },[location])

       return { width }

  }
  
    