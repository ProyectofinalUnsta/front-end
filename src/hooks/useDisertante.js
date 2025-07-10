import { useContext, useEffect } from "react"
import { verificarCodigoDisertante } from "../utils/peticiones"
import { DisertanteContext } from "../context/DisertanteContext"
import { useState } from "react"
import { postPresentaciones } from "../Files/utils/postPresentaciones"
export function useDisertante (_id,title) {
const id = _id

 const {code,setCode,pass,setPass,error,setError,disertantegmail,setDisertanteGmail,disertantenombre,setDisertanteNombre} = useContext(DisertanteContext)


      const [Data, setData] = useState({
        eventId:_id,
        nombreEvento:title,
        codigoDisertante:code,
        file: null
        });

     const [loading,setLoading] = useState(false)
     const [succes,setSucess] = useState(false)

const handleCode = (e) => {
setCode(e.target.value)
}

 const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setError('El archivo no debe superar los 10MB');
                e.target.value = '';
                return;
            }
            setData(prev => ({ ...prev, file }));
        }
    };

const handleDisertanteGmail = (e) => {
setDisertanteGmail(e.target.value)
}

const handleDisertanteNombre = (e) => {
    setDisertanteNombre(e.target.value)
}

const handleSubmitDisertante = async (e) => {
e.preventDefault()
const response = await verificarCodigoDisertante(code,id)

if(response.data.value == false) {
    setError({message:response.data.message,value:true})
    setPass(false)
    setCode('')
}
if(response.data.value == true) {
    setError({message:response.data.message,value:false})
    setPass(true)
}
}

const saveDisertanteInLocal = () => {
   localStorage.setItem('Disertante-Nombre',disertantenombre)
   localStorage.setItem('Disertante-Gmail',disertantegmail)
}

const handlePresentacionesSubmitDisertantes = async (e) => {
       e.preventDefault()

        
         console.log(disertantegmail,Data.file,disertantenombre)

        if ( !disertantegmail || !Data.file || !disertantenombre) {
            setError({message:'Todos los campos son obligatorios',value:true});
            return;
        }
        const format = Data.file.name.split('.')


          const formDataToSend = new FormData();
        formDataToSend.append('file', Data.file);
        formDataToSend.append('user', disertantenombre);
        formDataToSend.append('gmail', disertantegmail);
        formDataToSend.append('event', _id);
        formDataToSend.append('format',format[1])
        try {
            saveDisertanteInLocal()
              setLoading(true);
             const response = await postPresentaciones(formDataToSend)
             console.log(response)
             setSucess(true);
            setData({ file: null });
         
        } catch (err) {
            console.error('Error:', err);
            setError({message:err.response?.data?.error || 'Error al subir el archivo', value:true });
            setSucess(false)
        } finally {
             setLoading(false);
        }

    }




useEffect(()=> {
const preview = document.getElementById("preview");

if(Data.file == null) return;

 const file = Data.file;
 console.log(file)
  if (file ) {
    const url = URL.createObjectURL(file);
    preview.src = url;
  }
},[Data.file, Data.file != ''])


return {succes,pass,handleCode,error,handleSubmitDisertante,code,setData,Data,handleFileChange,disertantegmail,handleDisertanteGmail,disertantenombre,handleDisertanteNombre,handlePresentacionesSubmitDisertantes,loading}
}