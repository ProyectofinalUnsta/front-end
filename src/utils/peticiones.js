import axios from "axios"
import FormData from "form-data"
export const getitems = async  () => {
      
    let res =  await axios.get('https://back-end-fiq8.onrender.com/api/').then((res)=> {return res})
       return res.data 
}



export const createEvent = async (data) => {

     const formData = new FormData()
    formData.append('image', data.imagen)

     for (let key in data) {
    if (key !== 'imagen') {
      formData.append(key, data[key])
    }
  }
    try {
      let res = await axios.post('https://back-end-fiq8.onrender.com/api/admin/',formData,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
      })
     return res
    }catch(err){
        console.log(err.message)
    }
  
}


export const RegisterUser = async (data) => {
  try {
    let res = await axios.post('https://back-end-fiq8.onrender.com/api/auth/register',data)
    return res
  }catch(err){
    return err.message
  }
}


export const LogInUser = async (data) => {
try {
  let res = await axios.post('https://back-end-fiq8.onrender.com/api/auth/login',data)
  return res
}catch(err){
  return err.message
}
}


export const LogOut = async () => {
  try {
    let res = await axios.post('https://back-end-fiq8.onrender.com/api/auth/logout')
    return res
  }catch(err){
    return err.message
  }
}