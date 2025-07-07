import {createContext } from "react";
import { useState } from "react";
export const FileContext = createContext()

export const FileProvider = ({children}) => {

    const [archivos, setArchivos] = useState([]);
    const [presentaciones,setPresentaciones] = useState([])
    const [loading, setLoading] = useState(false);
    const [porMi,setPorMi] = useState(false)
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
                gmail: '',
                eventCode: '',
                uploadCode: '',
                file: null
            });

      const [formsData, setFormsData] = useState({
                user: '',
                eventId:'',
                nombreEvento:'',
                file: null
            });

    return(
        <FileContext.Provider value={{
            archivos,
            setArchivos,
            loading,
            setLoading,
            error,
            setError,
            success,
            setSuccess,
            showForm,
            setShowForm,
            formData,
            setFormData,
            presentaciones,
            setPresentaciones,
            formsData,
            setFormsData,
            porMi,setPorMi
        }}>
           {children}
        </FileContext.Provider>
    )
}