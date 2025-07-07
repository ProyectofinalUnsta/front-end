import { createContext, useState } from "react";

export const EventsContext = createContext()


export const EventsProvider = ({children}) => {
const [archivoscreados,setArchivosCreados] = useState([])
const [eventosinscripto,setEventosInscriptos] = useState([])
const [eventoscreados,setEventosCreados] = useState([])
    return (
        <EventsContext.Provider value={{
        archivoscreados,setArchivosCreados,
        eventosinscripto,setEventosInscriptos,
        eventoscreados,setEventosCreados
        }}>
        {children}
        </EventsContext.Provider>
    )
}