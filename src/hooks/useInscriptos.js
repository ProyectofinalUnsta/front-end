import { useContext , useEffect, useState } from "react"
import { InscriptoContext } from "../context/InscriptoContext"
import { getInscripcionEvento, postInscribirEvento } from "../utils/peticiones"
import { useNavegacion } from "./useNavegacion"
import { useLocation } from "react-router"

export default function useInscriptos ({_id,title}) {
const location = useLocation()
const {navigatewithoutparams} = useNavegacion()
const {gmail,setGmail,nombre,setNombre,apellido,setApellido,data,setData} = useContext(InscriptoContext)
const [showSuccess, setShowSuccess] = useState(false);
const [inscripto,setInscripto] = useState(false)

const ruta = '/'
class InscritosActions {
    static updateGmail (gmail) {
        setGmail(gmail)
     
    }
    static updateNombre (nombre) {
      setNombre(nombre)
   
    }
     static updateApellido (apellido) {
      setApellido(apellido)
    
    }
}

const handleInscriptosSubmit = async (e) => {
 e.preventDefault()
  const response = await postInscribirEvento(gmail,nombre,apellido,_id,title)
  if(response.status == 201) {
     setShowSuccess(true)
     setTimeout(() => {
        saveDataInLocal()
        setData(true)
                document.getElementById('event-registration-popup').style.display = 'none';
                setShowSuccess(false);
                navigatewithoutparams(ruta);
            }, 2000);
    return response
  }

}

const saveDataInLocal = () => {
       localStorage.setItem('Inscripto-Gmail',gmail)
       localStorage.setItem('Inscripto-Nombre',nombre)
       localStorage.setItem('Inscripto-Apellido',apellido)
       localStorage.setItem('Inscripto-Data', true)
    }

  const getInscripcion = async (gmail,id) => {
    const response = await getInscripcionEvento(gmail,id)
    const inscripcion = response.data.inscrito
     return setInscripto(inscripcion)
  }

useEffect(() => {
  if (location.pathname.startsWith(`/Eventos/${_id}`)) {

      getInscripcion(gmail, _id);
  }
}, [location.pathname, _id, gmail]);


    return {nombre,apellido,gmail , InscritosActions , handleInscriptosSubmit , data , showSuccess, setShowSuccess , getInscripcion , inscripto}
}