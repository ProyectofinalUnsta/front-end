import { LogOut } from "../utils/peticiones"
import Cookies from 'js-cookie'
import { useNavegacion } from "./useNavegacion"
import { useContext } from "react"
import { LoginContext } from "../context/LoginContext"

export function useUserActions () {

const {setToken,setUser} = useContext(LoginContext)

const navegacion = useNavegacion()

const handleLogOut = async () => {
 let res = await LogOut()
 if(res.status == 200){
    Cookies.remove('token')
    setToken(null)
    Cookies.remove('usuario')
     setUser({nombre:'', logged: false})
    navegacion.navigatewithoutparams({ruta:'/'})
 }
}





return {handleLogOut}

}