import { useState } from "react"
import { parser } from "../utils/parsearfecha"

export function useCrearEventos () {

        const [lenght,setLength] = useState(0)
        const [error,setError] = useState()
        const [form,setForm] = useState({
            nombre:'',
            detalle:'',
            fecha:'',
            hora:null,
            horaentrada: null,
            horasalida: null,
            lugar:'',
            descripcion:'',
            categoria:'',
            foto:'',
        })
    
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
                    ['foto']:foto
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

    
        const handlesubmit = () => {
            const {horaentrada,horasalida, ...data} = form
            const sendToBack = data
            console.log(sendToBack)
        }
    
    

    return {handlesubmit,handleFoto,handleform,handletext,handledate,lenght,error,handleTime,setLength,handlecategoria,form}
}