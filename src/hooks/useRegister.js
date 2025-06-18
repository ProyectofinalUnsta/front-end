import { useContext, useEffect, useState } from "react";
import { RegisterUser } from "../utils/peticiones";
import { Validator } from "../utils/Validator";
import { LoginContext } from "../context/LoginContext";
export function useRegister () {

const {isregistred,setisRegistred} = useContext(LoginContext)

const [form,setForm] = useState({
    username:'',
    password:'',
    email:''
})

const [error,setError] = useState({
    message:'',
    error:false
})

const [success,setSucces] = useState(false)

const handleFormChange = (value,target) => {

    setForm((prevState)=>({
        ...prevState,
        [target]:value
    }))
}

const handleRegister = async (e) => {
    e.preventDefault()
     let response = await RegisterUser(form)
     if(response.status == 201){
    window.localStorage.setItem('registred',true)
    setisRegistred(true)
    setSucces(true)
     }
     else {
        setForm({username:'',password:'',email:''})
        setError((prevstate)=>({
          ...prevstate,
          message:response,
          error:true
        }))
     }
}


useEffect(()=>{
if(form.password != ''){
let res = Validator.password(form.password)
setError(res)
}

},[form.password])



return {handleFormChange,handleRegister,error,success,isregistred}
}