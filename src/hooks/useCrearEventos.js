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
      const {handlesucess} = useAdminMenu()
       const {navigatewithoutparams} = useNavegacion()
        const handletext = (e) => {
            console.log(e.target.value)
           setForm((prevData) => ({
            ...prevData,
            ['descripcion']:e.target.value
           }))
        }
    
        const handledate = (e) => {
            
         let arr = String(e.target.value)
         let copy = arr.split('-')
    
         let mes = parser(copy[1])
         let datetoShow = `${mes} ${copy[2]}, ${copy[0]}`
    
         setForm((prevData) => ({
            ...prevData,
            ['fecha']:datetoShow
         }))
    
        }
        const handleTime = (e) => {
            const { value, id } = e.target;
            const hora = value.split(':');
            const esAM = hora[0] < 12;
          
            let nuevaEntrada = form.horaentrada || "";
            let nuevaSalida = form.horasalida || "";
          
            if (id === 'hora_entrada') {
              nuevaEntrada = `${value} ${esAM ? 'AM' : 'PM'} `;
            }
          
            if (id === 'hora_salida') {
              nuevaSalida = `- ${value} ${esAM ? 'AM' : 'PM'}`;
            }
          
            setForm((prevData) => ({
              ...prevData,
              horaentrada: nuevaEntrada,
              horasalida: nuevaSalida,
              hora: `${nuevaEntrada}${nuevaSalida}`,
            }));
          };
          

        const handleFoto = (e) => {
            let foto = e.target.files[0]
            console.log(foto)
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

            const {horaentrada,horasalida, ...data} = form
            let sendToBack = data
            console.log(sendToBack)
             let res = await createEvent(sendToBack,token)
             if(res?.status === 200) {
             handlesucess(true)
              if (onSuccess) onSuccess();
              navigatewithoutparams({ruta:'/Admin/'})
             }
        }
    
    

    return {handlesubmit,handleFoto,handleform,handletext,handledate,lenght,error,handleTime,setLength,handlecategoria,form }
}