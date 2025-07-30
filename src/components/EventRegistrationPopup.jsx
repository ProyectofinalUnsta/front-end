import { useLocation } from 'react-router';
import useInscriptos from '../hooks/useInscriptos';
import '../Productos/style/carddetails.css'

export const EventRegistrationPopup = ({Modal,closeModal}) => {
    const location = useLocation()
    const {_id,title} = location.state || {}
    const {InscritosActions,data, handleInscriptosSubmit,showSuccess, setShowSuccess } = useInscriptos({_id,title})



    return (
       Modal == true ?
        <div id="event-registration-popup" className="event-registration-popup">
            <div className="popup-content">
                <h2>Registro en el Evento</h2>
                 <button style={{background: 'linear-gradient(135deg, #dc2626,rgb(235, 199, 37))',color:'black'}} className='mb-4 mt-4' onClick={()=>closeModal()}>Cerrar</button>
                <form>
                    <input
                        type="email"
                        placeholder="Ingresa tu correo electrónico"
                        onChange={(e) => InscritosActions.updateGmail(e.target.value)}
                        required
                    />
                     <input
                        type="text"
                        placeholder="Ingresa tu nombre"
                        onChange={(e) => InscritosActions.updateNombre(e.target.value)}
                        required
                    />
                     <input
                        type="text"
                        placeholder="Ingresa tu apellido"
                        onChange={(e) => InscritosActions.updateApellido(e.target.value)}
                        required
                    />
                     <input
                        type="text"
                        placeholder="Nombre Evento"
                        value={title}
                        disabled
                        required
                    />

                     <input
                        type="text"
                        placeholder="Id Evento"
                        value={_id}
                        disabled
                        required
                    />
                    <button onClick={(e)=>handleInscriptosSubmit(e)} type="submit">Registrarse</button>
                </form>
                <div className={`success-message ${showSuccess ? 'show' : ''}`}>
                    ¡Ya estás registrado! Redirigiendo al inicio...
                </div>
           
            </div>
        </div>
        : null
    );
}; 