import { useContext, useCallback, useState, useEffect } from "react"
import { LoginContext } from "../context/LoginContext"
import endpoints from "../utils/endpoints";
import { getEventsById, getPresentacionesByMail } from "../utils/peticiones";
import { EventsContext } from "../context/EventsContext";
import { getArchivosEvetnoInscripto } from "../utils/peticiones";
import { FileContext } from "../context/FileContext";
export function useGetEventsById () {

const {token,user} = useContext(LoginContext)
const{porMi} = useContext(FileContext)
const { archivoscreados,setArchivosCreados,eventosinscripto,setEventosInscriptos} = useContext(EventsContext)
const [eventos, setEventos] = useState([]);
const [email,setEmail] = useState('')
 const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [isfetched,setIsFetched] = useState(false)

const handleGetEventosById = async (e) => {
    e.preventDefault()
      setIsLoading(true);
        setError(null);
        try {
            const response = await getEventsById(`${endpoints.eventoPorId}${email}`,token)
            setEventos(response);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err.message);
            setEventos([]);
        } finally {
            setIsLoading(false);
        }

}

const handleEventosCreadosPorMi = useCallback(
  async () => {
    
    setIsLoading(true);
    const { email } = user;

    try {
      const response = await getEventsById(`${endpoints.eventoPorId}${email}`, token);
      setEventosCreados(response);
      setIsFetched(true)
    } catch (err) {
      setError(err.message);
      setEventosCreados([]);
    } finally {
      setIsLoading(false);
    }
  },
  [user, token, endpoints.eventoPorId] // dependencias necesarias
);

const getArchivosEventosInscriptos = async () => {
const gmail = localStorage.getItem('Inscripto-Gmail')
const data = await getArchivosEvetnoInscripto(gmail)
setEventosInscriptos(data.data)
console.log(data.data)
}

const getArchivosCreadosPorMi = async() => {
const gmail = localStorage.getItem('Inscripto-Gmail')
const data = await getPresentacionesByMail(gmail)
setArchivosCreados(data.data)

}

useEffect(()=> {
if(isfetched != true){
handleEventosCreadosPorMi()

}
},[isfetched])

useEffect(()=> {
getArchivosEventosInscriptos()
getArchivosCreadosPorMi()
},[porMi])


    return {eventos,error,isAuthenticated , handleGetEventosById , setEmail ,setIsAuthenticated , email , isLoading , archivoscreados , eventosinscripto}
}