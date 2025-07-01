import { useGetEventsById } from "../../hooks/useGetEventsById"
import useFiles from "../hook/useFiles"
import { FileField } from "./FieldsFile"
import { FieldFile } from "./FieldsFile"
export const FormUploadPresentaciones = () => {
    const {handlePresentacionesSubmit,loading,handleInputChange,handleFileChange , handleSelectChange , formsData} = useFiles()
    const {eventoscreados,isloading} = useGetEventsById()
     

    return (
        <>
         <form onSubmit={handlePresentacionesSubmit} className="upload-form" disabled={isloading}>

              <div className="form-group">
               <label htmlFor="select">Evento</label>
                <select name="select" id="select" onChange={(e)=> handleSelectChange(e)}>
                {eventoscreados.map(evento => (
                <option key={evento._id}  value={JSON.stringify({_id:evento._id,title:evento.title})} >
                {evento.title}
                </option>
            ))}
        </select>
        </div>
            
        <FieldFile type={'text'} id={'eventCode'} name={'eventCode'} label={'Nombre Evento'} 
        value={formsData.nombreEvento}
        loading={true}
        />

        <FieldFile type={'text'} id={'eventCode'} name={'eventCode'} label={'Código del Evento'} 
        value={formsData.eventId}
        loading={true}
        />

         <FieldFile type={'text'} id={'user'} name={'user'} label={'Nombre y apellido'} 
        loading={loading} event={handleInputChange}
        value={formsData.user}
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