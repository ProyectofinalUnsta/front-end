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
  }
  catch(err){
   console.log(err)

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


export const Ping = async () => {
  try {
    await axios.get(endpoints.keepserveralive).then((res)=> { return res })
    await axios.get(endpoints.keepmailalive).then((res)=> { return res })
    await axios.get(endpoints.keepservicealive).then((res)=> { return res })
  } catch (err) {
    return err
  }
}

export const postInscribirEvento = async (gmail,nombre,apellido,IdEvento,nombreEvento) => {
const idEvento = IdEvento.toString()
const response = await axios.post(endpoints.inscripciones,
  {gmail,
  nombre,
  apellido,
  nombreEvento,
 idEvento
})
return response
}

export const getInscripcionEvento = async (gmail,idEvento) => {

  const response = await axios.get(`${endpoints.inscripciones}inscripto`, {params:{
    gmail,
    idEvento,
  }})
  return response
}

export const getArchivosEvetnoInscripto = async (gmail) => {
  const response = await axios.get(`${endpoints.inscripciones}inscriptos/${gmail}`)
  return response
}

export const getPresentacionesByMail = async (gmail) => {
   const response = await axios.get(`${endpoints.presentaciones}mispresentaciones/${gmail}`)
  return response
}

export const verificarCodigoDisertante = async (Code,id) => {
 const response = await axios.post(`${endpoints.disertantes}verifyCode`,{code:Code,id})
  return response
}

export const obtenerListaDisertante  = async (id) => {
  const IdEvento = id
  const response = await axios.get(`${endpoints.disertantes}listadeDisertante/${IdEvento}`)
  return response
}

export const getrecuentoInscripciones = async (email) => {
  const res = await axios.get(`${endpoints.inscripciones}recuentos/admin?adminEmail=${email}`)
  return res.data
}

export const getpublicDownloads = async (id) => {
  const res = await axios.get(`${endpoints.publicdownloads}TotalDownloads/${id}`)
  return res.data
}

export const getDisertanteRegistro = async ({_id,gmail}) => {
  const IdEvento = _id
  const res = await axios.get(`${endpoints.disertantes}isertante/${IdEvento}?gmail=${gmail}`)
  return res.data
}

export const crearDisertante = async ({gmail , IdEvento , fullName}) => {
  const res = await axios.post(`${endpoints.disertantes}crearDisertante`, {gmail , IdEvento , fullName})
  return res.data
}