import { createContext } from "react";
import { useState } from "react";
export const DisertanteContext = createContext()

export const DisertanteProvider = ({children}) => {

const [code,setCode] = useState()
const [pass,setPass] = useState(false)
const [error,setError] = useState({message:'',value:false})
const [disertantenombre,setDisertanteNombre] = useState(()=> window.localStorage.getItem('Disertante-Nombre') || '')
const [disertantegmail,setDisertanteGmail] = useState(()=> window.localStorage.getItem('Disertante-Gmail') || '')

    return(
        <DisertanteContext.Provider value={{
            code,setCode,pass,setPass,error,setError,disertantegmail,setDisertanteGmail,
            disertantenombre,setDisertanteNombre
        }}>
            {children}
        </DisertanteContext.Provider>
    )
}