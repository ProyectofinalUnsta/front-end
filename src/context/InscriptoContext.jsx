import { createContext, useState } from "react";

export const InscriptoContext = createContext()


export const InscriptoProvider = ({children}) => {

    const [gmail,setGmail] = useState(()=> localStorage.getItem('Inscripto-Gmail') || '')
    const [nombre,setNombre] = useState(()=> localStorage.getItem('Inscripto-Nombre') || '')
    const [apellido,setApellido] = useState(()=> localStorage.getItem('Inscripto-Apellido') || '')
    const [data,setData] = useState(()=> localStorage.getItem('Inscripto-Data') || false)

    return(
        <InscriptoContext.Provider value={{
           gmail,setGmail,
           nombre,setNombre,
           apellido,setApellido,
           data,setData
        }}>
            {children}
        </InscriptoContext.Provider>
    )
}