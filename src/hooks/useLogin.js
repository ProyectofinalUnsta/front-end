import { useContext, useState } from "react"
import { LogInUser } from "../utils/peticiones"
import Cookies from 'js-cookie'
import { LoginContext } from "../context/LoginContext"
import { useNavegacion } from "./useNavegacion"
export function useLogin () {


const {token,setToken,setUser} = useContext(LoginContext)

const navegacion = useNavegacion()
const [userform,setUserForm] = useState({
    email:'',
    password:''
})

const [error,setError] = useState({
    estado:false,
    message:''
})
const [loading,setLoading] = useState({value:false,message:'Cargando..'})
const handleUser = (target,value) => {

    setUserForm((prevState)=>({
     ...prevState,
     [target]:value
    }))
}

const handleSubmit = async (e) => {
   setLoading({value:true})
    e.preventDefault()
    let res = await LogInUser(userform)

    if(res.status != 200){
   setError({estado:true,message:'credenciales invalidas'})
   setUserForm(()=> (
    {
        email:'',
        password:''
    }
   ))
    setLoading({value:false})
    return
    }
    if(res.status == 200) {
    setLoading({value:false})
    Cookies.set('token', res.data.token , {expires:2})
   setToken(res.data.token)
    Cookies.set('usuario', JSON.stringify({
        nombre: res.data.user.displayName || res.data.user.username, 
        email: res.data.user.mail, 
        logged: true,
        profileImage: res.data.user.profileImage
    }), {expires:2})
    setUser({
        nombre: res.data.user.displayName || res.data.user.username,  
        email: res.data.user.mail, 
        logged: true,
        profileImage: res.data.user.profileImage
    })
    navegacion.navigatewithoutparams({ruta:'/Admin'})

    }

}



    return {handleUser,handleSubmit,error,userform,token,loading}
}