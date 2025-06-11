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

const handleUser = (target,value) => {

    setUserForm((prevState)=>({
     ...prevState,
     [target]:value
    }))
}

const handleSubmit = async (e) => {

    e.preventDefault()
    let res = await LogInUser(userform)
    console.log(res)
    if(res.status != 200){
   setError({estado:true,message:'credenciales invalidas'})
   setUserForm(()=> (
    {
        email:'',
        password:''
    }
   ))
    return
    }
    if(res.status == 200) {
    Cookies.set('token', JSON.stringify(res.data.token) , {expires:2})
   setToken(res.data.token)
    Cookies.set('usuario', JSON.stringify({nombre:res.data.user.username, email:data.user.email, logged:true}), {expires:2})
    setUser({nombre:res.data.user.username, logged:true})
    navegacion.navigatewithoutparams({ruta:'/Admin'})

    }

}



    return {handleUser,handleSubmit,error,userform,token}
}