import { PopUp } from "../PopUp/PopUp"
import { useLocation } from "react-router"
import "./DisertantePage.css"
import { useDisertante } from "../hooks/useDisertante"
import { SucessPopUp } from "../Files/components/SucessPopUp"

export default function DisertantePage() {
    const location = useLocation()
    const {title,_id} = location.state || {}
   const {succes,loading,pass,handleCode,error,handleSubmitDisertante,code,Data,handleDisertanteNombre,handleFileChange,disertantegmail,handleDisertanteGmail,disertantenombre,handlePresentacionesSubmitDisertantes} = useDisertante(_id,title)



    return (
        <div className="disertante-page-container">
            {pass == false ? (
                <>
                    <PopUp 
                        role={'Disertante'} 
                        namebtn={'Enviar'} 
                        event={handleCode}
                        submit={handleSubmitDisertante}
                        error={error} 
                        nombre={title}
                        code={code}
                    />
                    <div className="register-button-container">
                        <button 
                            className="register-event-btn" 
                            onClick={() => {
                                document.getElementById('event-registration-popup').style.display = 'flex';
                            }}
                        >
                            Registrarse en el evento
                        </button>
                    </div>
                </>
            ) : null}

            <header className="w-full h-30 bg-white flex flex-col gap-6 rounded-2xl shadow-lg ">
                <small style={{marginLeft:'10px',marginTop:'10px'}} className="text-gray-500 ml-4 mr-4">{_id}</small>
                <h2 className="text-center text-md md:text-2xl nowrap">{title}</h2>
            </header>

                <form className="upload-disertante-form">
        
            <div className="form-disertante-group">
                <input
                type={'text'}
                id={'nombreEvento'}
                name={'nombreEvento'}
                value={Data.nombreEvento}
                disabled
                required
                className="input-upload-disertante text-center"
                />
             
            </div>

              <div className="form-disertante-group">
                <input
                type={'text'}
                id={'CodigoEvento'}
                name={'CodigoEvento'}
                value={code}
                disabled
                required
                className="input-upload-disertante text-green-700 text-center"
                />
            </div>

             <div className="form-disertante-group">
                <input
                type={'text'}
                id={'Rol'}
                name={'Rol'}
                value={'Disertante'}
                disabled
                required
                className="input-upload-disertante text-center"
                />
            </div>
            
             <div className="form-disertante-group">
                <label className="text-md font-poppins" htmlFor="user">Nombre y Apellido</label>
                <input
                type={'text'}
                id={'user'}
                name={'user'}
                value={disertantenombre}
                placeholder="Juan Perez"
                onChange={(e)=>handleDisertanteNombre(e)}
                required
                style={{borderColor : error.value == true ? 'red' : 'gray'}}
                className="input-upload-disertante "
                />
                {error.value == true ? <small style={{color:'red'}} >{error.message}</small> : null}
            </div>

              <div className="form-disertante-group">
                <label className="text-md font-poppins" htmlFor="gmail">gmail</label>
                <input
                type={'text'}
                id={'gmail'}
                name={'gmail'}
                value={disertantegmail}
                placeholder="example@gmail.com"
                onChange={(e)=>handleDisertanteGmail(e)}
                required
                style={{borderColor : error.value == true ? 'red' : 'gray'}}
                className="input-upload-disertante "
                />
                {error.value == true ? <small style={{color:'red'}}>{error.message}</small> : null}
            </div>

         <div className="form-disertante-group">
           <label htmlFor="file">Archivo:</label>
             <input
            type="file"
            id="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
            onChange={(e)=>handleFileChange(e)}
            required
               />
        <small className="text-xs">Formatos permitidos: PDF, DOC, DOCX, PPT, PPTX, JPG, PNG (Máx. 10MB)</small>
    </div>
    {Data.file != null ?  <div className="form-disertante-group">
        <label className="text-center" htmlFor="">Preview</label>
          <img id="preview" alt="" width={'100%'} height={'200px'} />
    </div> : null
    
    }
      <button 
      disabled={loading == true}
      onClick={(e)=>handlePresentacionesSubmitDisertantes(e)}
      className="register-event-btn">
        Subir Archivo</button>
        </form>

         {succes == true ? <SucessPopUp/> : null }

        </div>
    )
    
}
