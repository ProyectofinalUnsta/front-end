import { createContext, useState } from "react";

export const EventsContext = createContext()


export const EventsProvider = ({children}) => {
const [archivoscreados,setArchivosCreados] = useState([])
const [eventosinscripto,setEventosInscriptos] = useState([])
    return (
        <EventsContext.Provider value={{
        archivoscreados,setArchivosCreados,
        eventosinscripto,setEventosInscriptos
        }}>
        {children}
        </EventsContext.Provider>
    )
}