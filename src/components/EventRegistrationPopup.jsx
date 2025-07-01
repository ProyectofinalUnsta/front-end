import { useLocation } from 'react-router';
import useInscriptos from '../hooks/useInscriptos';

export const EventRegistrationPopup = () => {
    const location = useLocation()
    const {_id,title} = location.state || {}
    const {gmail,nombre,apellido,InscritosActions,data, handleInscriptosSubmit,showSuccess, setShowSuccess } = useInscriptos({_id,title})

const closeModal = () => {
      document.getElementById('event-registration-popup').style.display = 'none';
}


    return (
        <div id="event-registration-popup" className="event-registration-popup">
            <div className="popup-content">
                <h2>Registro en el Evento</h2>
                <button style={{background:'red',color:'black'}} className='mb-4' onClick={()=>closeModal()}>Cerrar</button>
                <form onSubmit={handleInscriptosSubmit}>
                    <input
                        type="email"
                        placeholder="Ingresa tu correo electrónico"
                        value={gmail}
                        onChange={(e) => InscritosActions.updateGmail(e.target.value)}
                        disabled={data != true ? false : true}
                        required
                    />
                     <input
                        type="text"
                        placeholder="Ingresa tu nombre"
                        value={nombre}
                        onChange={(e) => InscritosActions.updateNombre(e.target.value)}
                        required
                    />
                     <input
                        type="text"
                        placeholder="Ingresa tu apellido"
                        value={apellido}
                        onChange={(e) => InscritosActions.updateApellido(e.target.value)}
                        required
                    />
                     <input
                        type="text"
                        placeholder="Nombre Evento"
                        value={title}
                        disabled={true}
                        required
                    />

                     <input
                        type="text"
                        placeholder="Id Evento"
                        value={_id}
                        disabled={true}
                        required
                    />
                    <button type="submit">Registrarse</button>
                </form>
                <div className={`success-message ${showSuccess ? 'show' : ''}`}>
                    ¡Ya estás registrado! Redirigiendo al inicio...
                </div>
           
            </div>
        </div>
    );
}; 