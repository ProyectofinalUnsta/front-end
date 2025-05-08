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
            foto:'',
        })
    
        const handletext = (e) => {
            console.log(e.target.value)
           setForm((prevData) => ({
            ...prevData,
            ['descripcion']:e.target.value
           }))
            let textlenght = String(e.target.value)
            setLength(textlenght.length)
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
            const { value } = e.target;
    
            let comparasion = String(value)
            let hora = comparasion.split(':')
            if(e.target.id == 'hora_entrada') {
                if(hora[0] < 12) {
                    let entrada = `${e.target.value} AM `
                  setForm((prevData) => ({
                    ...prevData,
                    ['horaentrada']: entrada,
                  }));
                }
                if(hora[0] >= 12) {
                    let entrada = `${e.target.value} PM `
                    setForm((prevData) => ({
                        ...prevData,
                        ['horaentrada']: entrada,
                      }));
                }
    
            }
            if(e.target.id == 'hora_salida'){
                if(hora[0] < 12) {
                    let salida = `- ${e.target.value} AM`
                    setForm((prevData) => ({
                        ...prevData,
                        ['horasalida']: salida,
                      }));
                }
                if(hora[0] >= 12) {
                  let salida = `- ${e.target.value} PM`
                  setForm((prevData) => ({
                    ...prevData,
                    ['horasalida']: salida,
                  }));  
                }
            
            }
    
            if(form.horaentrada != null && form.horasalida != null){
                setForm((prevData) => ({
                    ...prevData,
                    ['hora']:`${form.horaentrada}${form.horasalida}`,
                  }));
            }
        }
    
        const handleFoto = (e) => {
            let foto = e.target.files[0]
            console.log(foto)
            if(foto.size > 1048576) {
              setError('la imagen no puede superar 1MB')
              return
            }
             if(foto.type != 'image/webp'){
                setError('la imagen debe estar en formato webp')
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

    
        const handlesubmit = () => {
            const {horaentrada,horasalida, ...data} = form
            const sendToBack = data
            console.log(sendToBack)
        }
    
    

    return {handlesubmit,handleFoto,handleform,handletext,handledate,lenght,error,handleTime}
}