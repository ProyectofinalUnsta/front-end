import { useContext, useState } from "react"
import { LoginContext } from "../context/LoginContext"
import endpoints from "../utils/endpoints";
import { getEventsById } from "../utils/peticiones";
export function useGetEventsById () {

const {token} = useContext(LoginContext)
const [eventos, setEventos] = useState([]);
const [email,setEmail] = useState('')
 const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);

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



    return {eventos,error,isAuthenticated , handleGetEventosById , setEmail ,setIsAuthenticated , email , isLoading}
}