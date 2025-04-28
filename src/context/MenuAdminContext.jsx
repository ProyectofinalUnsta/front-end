import { createContext } from "react"
import { useState, useRef } from "react"
export const MenuAdminContext = createContext()

export const MenuAdminProvider = ({children}) => {

    const [rotacion,setRotacion] = useState(90)
    const [displayed,setDisplayed] = useState(true)
    const selectedesRef = {
        home: useRef(null),
        analitycs: useRef(null)
    }
    const [refactiva,setRefActiva] = useState(()=> window.localStorage.getItem('clave') || 'home')
    const [active,setActive] = useState(true)
    const [popup,setPopUp] = useState(180)
    const [popUpDisplayed,setPopUpDisplayed] = useState(false)



    return(
        <MenuAdminContext.Provider value={{
            rotacion,
            setRotacion,
            displayed,
            setDisplayed,
            selectedesRef,
            refactiva,
            setRefActiva,
            active,
            setActive,
            popup,
            setPopUp,
            popUpDisplayed,
            setPopUpDisplayed
        }}>
            {children}
        </MenuAdminContext.Provider>
    )
}