import { createContext, useState } from "react";

export const ElementsContext = createContext()



export const ElementsContextProvider = ({children}) => {
    const [MappedElements,setMappedElements] = useState(JSON.parse(window.localStorage.getItem('elements')) ||  [] )
    const [isSelected,setisSelected] = useState(false)
    const [idElement,setIdElement] = useState(null)
    const [type ,setType] = useState('')
    return <ElementsContext.Provider value={{
        MappedElements,
        setMappedElements,
        isSelected,
        setisSelected,
        idElement,
        setIdElement,
        setType,
        type
    }}>
        {children}
    </ElementsContext.Provider>
} 