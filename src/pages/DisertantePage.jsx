import { PopUp } from "../PopUp/PopUp"
import { useLocation } from "react-router"
import "./DisertantePage.css"
import { useDisertante } from "../hooks/useDisertante"
import { SucessPopUp } from "../Files/components/SucessPopUp"
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { DisertanteContext } from "../context/DisertanteContext";

export default function DisertantePage() {
    const location = useLocation()
    const params = useParams();
    // Si location.state existe, usarlo; si no, usar el id de la URL
    const _id = (location.state && location.state._id) || params.id;
    const title = (location.state && location.state.title) || '';
    const { setPass, setCode, setError, setDisertanteGmail, setDisertanteNombre } = useContext(DisertanteContext);
    const {succes,loading,pass,handleCode,error,handleSubmitDisertante,code,Data,handleDisertanteNombre,handleFileChange,disertantegmail,handleDisertanteGmail,disertantenombre,handlePresentacionesSubmitDisertantes} = useDisertante(_id,title)
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    // Limpiar contexto al montar
    useEffect(() => {
        setPass(false);
        setCode("");
        setError({ message: "", value: false });
        setDisertanteGmail("");
        setDisertanteNombre("");
    }, [_id]);


    useEffect(() => {
        if (succes === true) {
            setShowPopup(true);
            const timer = setTimeout(() => {
                setShowPopup(false);
                navigate('/');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [succes, navigate]);


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
            ) : (
                <>
                    {showPopup && <SucessPopUp />}
                    <header className="disertante-header-card">
                        <small className="disertante-event-id">{_id}</small>
                        <h2 className="disertante-title">{title}</h2>
                    </header>
                    <form className="upload-disertante-form" autoComplete="off">
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
                            <label className="input-label" htmlFor="user">Nombre y Apellido</label>
                            <input
                                type={'text'}
                                id={'user'}
                                name={'user'}
                                value={disertantenombre}
                                placeholder="Juan Perez"
                                onChange={(e)=>handleDisertanteNombre(e)}
                                required
                                style={{borderColor : error.value == true ? 'red' : 'gray'}}
                                className="input-upload-disertante"
                            />
                            {error.value == true ? <small className="error-message">{error.message}</small> : null}
                        </div>
                        <div className="form-disertante-group">
                            <label className="input-label" htmlFor="gmail">Gmail</label>
                            <input
                                type={'email'}
                                id={'gmail'}
                                name={'gmail'}
                                value={disertantegmail}
                                placeholder="example@gmail.com"
                                onChange={(e)=>handleDisertanteGmail(e)}
                                required
                                style={{borderColor : error.value == true ? 'red' : 'gray'}}
                                className="input-upload-disertante"
                            />
                            {error.value == true ? <small className="error-message">{error.message}</small> : null}
                        </div>
                        <div className="form-disertante-group file-upload-group">
                            <label className="input-label" htmlFor="file">Archivo</label>
                            <div className="file-upload-wrapper">
                                <input
                                    type="file"
                                    id="file"
                                    accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                                    onChange={(e)=>handleFileChange(e)}
                                    required
                                    className="input-file-upload"
                                />
                                <label htmlFor="file" className="file-upload-btn">Seleccionar archivo</label>
                                <span className="file-upload-name">{Data.file ? Data.file.name : 'Ningún archivo seleccionado'}</span>
                            </div>
                            <small className="file-upload-info">Formatos permitidos: PDF, DOC, DOCX, PPT, PPTX, JPG, PNG (Máx. 10MB)</small>
                        </div>
                        {Data.file != null ?  <div className="form-disertante-group">
                            <label className="input-label" htmlFor="">Vista previa</label>
                            <img id="preview" alt="Preview archivo" className="file-preview-img" />
                        </div> : null}
                        <button 
                            disabled={loading === true}
                            onClick={(e)=>handlePresentacionesSubmitDisertantes(e)}
                            className="register-event-btn main-upload-btn">
                            {loading ? 'Subiendo...' : 'Subir Archivo'}
                        </button>
                    </form>
                </>
            )}
        </div>
    )
}
