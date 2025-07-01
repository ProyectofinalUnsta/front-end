import { createContext, useState } from "react";

export const EventsContext = createContext()


export const EventsProvider = ({children}) => {
const [eventoscreados,setEventosCreados] = useState([])
const [eventosinscripto,setEventosInscriptos] = useState()
    return (
        <EventsContext.Provider value={{
        eventoscreados,setEventosCreados,
        eventosinscripto,setEventosInscriptos
        }}>
        {children}
        </EventsContext.Provider>
    )
}