import { useEffect, useState, useContext } from "react";
import { getpublicDownloads, getrecuentoInscripciones, obtenerListaDisertante } from "../utils/peticiones";
import endpoints from "../utils/endpoints";
import { LoginContext } from "../context/LoginContext";
import { getEventsById } from "../utils/peticiones";
export function useDisertanteFilter  ()  {
const [filteredEvents,setFilteredEvents] = useState([])
const [keyword,setkeyword] = useState()
const [id,setId] = useState()
const {token,user} = useContext(LoginContext)


const getinitialLista = async () => {
const {email} = user
const events = await getEventsById(`${endpoints.eventoPorId}${email}`, token);
if(events.length) {
 setFilteredEvents(events[0])
setkeyword(events[0].title)
setId(events[0]._id)
return events   
}
else {
setId(null)
setkeyword(null)
setFilteredEvents([])
return
}

}


const getListaInscriptosMetricas = async (keyword) => {
const response = await getrecuentoInscripciones(user.email)
const data = response.filter(inscriptos => inscriptos.nombreEvento == keyword)
if(!data.length){
    return []
}
return data[0]

}

const getListaDisertantesMetricas = async (id) => {
if(id) {
const response = await obtenerListaDisertante(id)
const {data} = response
return data
}
else {
const data = []
return data
}
}

const handlefilterEvent = async (keyword) => {
const eventos = await getinitialLista()
const newFilteredEventos = eventos.filter((eventos) => eventos.title == keyword)
setFilteredEvents(newFilteredEventos[0])
const id = newFilteredEventos[0]._id
setId(id);
setkeyword(newFilteredEventos[0].title)
return;
}

const handlePublicDownloads = async (id) => {
    if(id) {
     const response = await getpublicDownloads(id)
    return response
    }
    else {
    const response = []
    return response
    }

}


useEffect(()=>{
getinitialLista()
},[])




return {id,keyword,handlePublicDownloads,getListaDisertantesMetricas,getListaInscriptosMetricas,filteredEvents,handlefilterEvent}
}