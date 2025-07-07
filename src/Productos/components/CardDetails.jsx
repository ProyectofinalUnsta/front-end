import { DateIcon } from '../../icons/DateIcon'
import { PlaceIcon } from '../../icons/PlaceIcon'
import { useNavegacion } from '../../hooks/useNavegacion'
import '../style/carddetails.css'
import { EventRegistrationPopup } from '../../components/EventRegistrationPopup'
import { BackArrowIcon } from '../../icons/BackArrowIcon'
import { useNavigate } from 'react-router-dom'
import useInscriptos from '../../hooks/useInscriptos'
import { useState } from 'react'

export const CardDetails = ({_id,lugar,fecha,hora,title,descripcion}) => {
   const {inscripto} =  useInscriptos({_id,title})
   const [openregistromodal,setOpenRegistroModal] = useState(false)

  const closeModal = () => {
    setOpenRegistroModal(false)
  }

    const {handlenavigate} = useNavegacion()
    const navigate = useNavigate()
    const ruta = '/Eventos/CargarDatos'
    
    return (
        <>
        <div className="back-button" onClick={() => navigate(-1)}>
            <BackArrowIcon />
            <span>Volver</span>
        </div>
        <div className="card-details-container"> 
            <section className='info-side'>
                <header>
                    <h2 className='event-name'>{title}</h2>
                    <p className='details-info'> <DateIcon/> Desde {fecha} a las {hora} hora local </p>
                </header>
                <article className='articule-descripcion'>
                    <p className='descripcion-event'>
                        {descripcion}
                    </p>
                </article>
            </section>
            <section className='options-side'>
                <img src="https://kzmo4ra0ji5m2etf47ef.lite.vusercontent.net/placeholder.svg?height=400&width=600" alt="" className='img-detail-event' />
                <footer className='btn-container-event-details'>
                    <p className='place-event'> <PlaceIcon/>{lugar}</p>
                    <button className='dark-btn dark' onClick={()=>handlenavigate({ruta,params:{_id,title}})}>
                        Ingresar como disertante
                    </button>
                    {inscripto === false ?  <button 
                        className='register-event-btn' 
                        onClick={() => setOpenRegistroModal(!openregistromodal)}
                    >
                        Registrarse en el evento
                    </button> : <button 
                        className='register-event-btn'>
                        Ya estas inscripto! </button>}
                </footer>
            </section>
        </div>
        <EventRegistrationPopup Modal={openregistromodal} closeModal={closeModal} _id={_id} title={title} />
        </>
    )
}
