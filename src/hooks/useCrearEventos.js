import { useContext, useState } from "react"
import { parser } from "../utils/parsearfecha"
import { createEvent } from "../utils/peticiones"
import { useNavegacion } from "./useNavegacion"
import { useAdminMenu } from "./useAdminMenu"
import { LoginContext } from "../context/LoginContext"

export function useCrearEventos (onSuccess) {
        const {user,token} = useContext(LoginContext)
        const [lenght,setLength] = useState(0)
        const [error,setError] = useState()
        const [form,setForm] = useState({
            title:'',
            breveDescripcion:'',
            fecha:'',
            hora:null,
            horaentrada: null,
            horasalida: null,
            lugar:'',
            descripcion:'',
            categoria:'',
            imagen:'',
            email:user.email
        })
        const [loading,setloading] = useState({value:false,message:'Enviar'})
      const {handlesucess} = useAdminMenu()
       const {navigatewithoutparams} = useNavegacion()
        const handletext = (e) => {

           setForm((prevData) => ({
            ...prevData,
            ['descripcion']:e.target.value
           }))
        }
    
        const handledate = (e) => {
            setForm((prevData) => ({
                ...prevData,
                ['fecha']: e.target.value // formato YYYY-MM-DD
            }))
        }
        const handleTime = (e) => {
            const { value, id } = e.target;
            let nuevaEntrada = form.horaentrada || "";
            let nuevaSalida = form.horasalida || "";
          
            if (id === 'hora_entrada') {
              nuevaEntrada = value; // formato HH:mm
            }
          
            if (id === 'hora_salida') {
              nuevaSalida = value; // formato HH:mm
            }
          
            setForm((prevData) => ({
              ...prevData,
              horaentrada: nuevaEntrada,
              horasalida: nuevaSalida,
              hora: `${nuevaEntrada} - ${nuevaSalida}`,
            }));
          };
          

        const handleFoto = (e) => {
            let foto = e.target.files[0]

            if(foto.size > 1048576) {
              setError('la imagen no puede superar 1MB')
              return
            }
             else {
                setForm((prevData) => ({
                    ...prevData,
                    ['imagen']:foto
                }))
                setError(false)
            }
        }

        const handleform = (valor,nombre) => {
         setForm((prevData)=>({
            ...prevData,
            [nombre]:valor
         }))
        }

        const handlecategoria = (e) => {
           setForm((prevData)=> ({
            ...prevData,
            ['categoria']:e.target.value
           }))
        }

    
        const handlesubmit = async () => {
           setloading({value:true,message:'Cargando..'})
            const {horaentrada,horasalida, ...data} = form
            let sendToBack = data

             let res = await createEvent(sendToBack,token)
             if(res?.status === 200) {
              setloading({value:false,message:'Enviar'})
             handlesucess(true)
              if (onSuccess) onSuccess();
              navigatewithoutparams({ruta:'/Admin/'})
             }
            setloading({value:false,message:'Enviar'})
        }
    
    

    return {loading,handlesubmit,handleFoto,handleform,handletext,handledate,lenght,error,handleTime,setLength,handlecategoria,form }
}