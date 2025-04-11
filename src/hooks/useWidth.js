  import { useState, useEffect } from "react"

  export function useWidth () {
    const [width,setwidth] = useState(0)
    const handlewidth  = () => {
       
        setwidth(window.innerWidth)
        console.log(window.innerWidth)
        }

    useEffect(()=>{
        window.addEventListener('resize',handlewidth)
        window.addEventListener('load', handlewidth)
   
        return () => {
           window.removeEventListener('resize', handlewidth)
           window.removeEventListener('load', handlewidth)
        }
       },[])

       return {width}
  }
  
    