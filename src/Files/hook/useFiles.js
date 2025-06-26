import { useContext, useEffect } from "react";
import { postFiles } from "../utils/postFiles";
import { deleteFiles } from "../utils/deleteFiles";
import { FileContext } from "../../context/FileContext";
import { getFiles } from "../utils/getFiles";
import { LoginContext } from "../../context/LoginContext";
export default function useFiles () {

const {archivos,setArchivos,loading,setLoading,error,setError,success,setSuccess,showForm,setShowForm,formData,setFormData} = useContext(FileContext)
const {user} = useContext(LoginContext)

const CargarArchivos = async (user) => {
    const {email} = user
     try {
            setLoading(true);
            const response = await getFiles(email)
            setArchivos(response.data);
            setError('');
        } catch (err) {
            console.error('Error:', err);
            setError('Error al cargar los archivos');
        } finally {
            setLoading(false);
        }
}

        useEffect(()=> {
      CargarArchivos(user)
        },[])

        useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);


    const handleSubmit = async (e) => {
       e.preventDefault()

         setError('');
        setSuccess('');

        if ( !formData.eventCode || !formData.uploadCode || !formData.file) {
            setError('Todos los campos son obligatorios');
            return;
        }

          const formDataToSend = new FormData();
        formDataToSend.append('file', formData.file);
        formDataToSend.append('gmail', user.email);
        formDataToSend.append('eventCode', formData.eventCode);
        formDataToSend.append('uploadCode', formData.uploadCode);

        try {
              setLoading(true);
             await postFiles(formDataToSend)
            setSuccess('Archivo subido exitosamente');
            setFormData({ gmail: '', eventCode: '', uploadCode: '', file: null });
            setShowForm(false);
            await CargarArchivos(user)
        } catch (err) {
            console.error('Error:', err);
            setError(err.response?.data?.error || 'Error al subir el archivo');
        } finally {
             setLoading(false);
        }

    }

    const handleDelete = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar este archivo?')) return;

        try {
            setLoading(true);
            await deleteFiles(id)
            setSuccess('Archivo eliminado exitosamente');
            await CargarArchivos(user);
        } catch (err) {
            console.error('Error:', err);
            setError('Error al eliminar el archivo');
        } finally {
            setLoading(false);
        }
    }

     const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setError('El archivo no debe superar los 10MB');
                e.target.value = '';
                return;
            }
            setFormData(prev => ({ ...prev, file }));
        }
    };
    

    return {handleSubmit,handleDelete,handleInputChange,handleFileChange,archivos,loading,showForm,success,error,setShowForm,formData,setLoading}
}