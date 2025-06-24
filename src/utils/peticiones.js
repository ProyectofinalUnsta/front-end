import axios from "axios";
import FormData from "form-data";
import endpoints from './endpoints.js'


export const getitems = async  () => {
      
    let res =  await axios.get(endpoints.get).then((res)=> {return res})
       return res.data 
}

export const getEventsById = async (endpoint,token) => {
    let res =  await axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res)=> {return res}).catch((err)=> {return err})
    return res.data 
}


export const createEvent = async (data, token) => {
     const formData = new FormData()
    formData.append('image', data.imagen)

     for (let key in data) {
    if (key !== 'imagen') {
      formData.append(key, data[key])
    }
  }
    try {
      let res = await axios.post(endpoints.post ,formData,{
        headers:{
            'Content-Type': 'multipart/form-data',
             'Authorization': `Bearer ${token}`
        }
      })
      console.log(res)
     return res
    }catch(err){
        console.log(err.message)
    }
  
}


export const RegisterUser = async (data) => {
  try {
    let res = await axios.post(endpoints.register ,data)
    return res
  }catch(err){
   console.log(err)
    return `${err.response.data.error} ${err.status}`
  }
}


export const LogInUser = async (data) => {
try {
  let res = await axios.post(endpoints.login ,data)
  return res
}catch(err){
  return err.message
}
}


export const LogOut = async () => {
  try {
    let res = await axios.post(endpoints.logout)
    return res
  }catch(err){
    return err.message
  }
}