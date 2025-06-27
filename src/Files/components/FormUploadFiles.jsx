import useFiles from "../hook/useFiles"
import { FileField } from "./FieldsFile"
import { FieldFile } from "./FieldsFile"
export const FormUploadFiles = () => {
    const {handleSubmit,loading,formData,handleInputChange,handleFileChange} = useFiles()
    return (
        <>
         <form onSubmit={handleSubmit} className="upload-form">
       
        <FieldFile type={'text'} id={'eventCode'} name={'eventCode'} label={'Código del Evento:'} placeholder={'Ingrese el código del evento'}
        loading={loading}
        event={handleInputChange}
        value={formData.eventCode}
        />
        
        <FieldFile 
        type={'text'} id={'uploadCode'} name={'uploadCode'} label={'Código de Subida:'} placeholder={'Ingrese el código de subida'}
        loading={loading} event={handleInputChange}
        value={formData.uploadCode}
        />
        
        <FileField event={handleFileChange} loading={loading}/> 
                              
         <button 
          type="submit" className="btn-submit"disabled={loading} >
            {loading ? 'Subiendo...' : 'Subir Archivo'}
         </button>
    </form>
    </>
    )
}