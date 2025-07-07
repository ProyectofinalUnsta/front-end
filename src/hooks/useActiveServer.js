import { useContext, useEffect } from "react"
import { ServerContext } from "../context/ServerContext"
import { Ping } from "../utils/peticiones"
export  function useServerActive (interval) {
      
  // hook que sirve para evitar el sleep de   los 3 servidores de back-end ! 

    useContext(ServerContext)
 
    // useEffect(()=> {
    //  Ping()
    //  const id =  setInterval(Ping, interval)
    //  return () => clearInterval(id)
    // },[interval])

    return {}
}