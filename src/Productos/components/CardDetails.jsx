import { DateIcon } from '../../icons/DateIcon'
import { PlaceIcon } from '../../icons/PlaceIcon'
import { useNavegacion } from '../../hooks/useNavegacion'
import '../style/carddetails.css'
export const CardDetails = ({_id,lugar,fecha,hora,nombre,Longdescripcion}) => {

    const {handlenavigate} = useNavegacion()
    const ruta = '/Eventos/CargarDatos'

return (
    <>
    <div className="card-details-container"> 
     <section className='info-side'>
        <header>
            <h2 className='event-name'>{nombre}</h2>
            <p className='details-info'> <DateIcon/> Desde {fecha} a las {hora} hora local </p>
        </header>
       <article className='articule-descripcion'>
        <p className='descripcion-event'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam justo, dapibus ut urna ac, luctus mollis lectus. Mauris nec enim dignissim elit finibus faucibus. Ut convallis arcu neque, sed iaculis tellus auctor a. Praesent auctor egestas mi a ultrices. Nullam non imperdiet leo. Integer leo leo, gravida sed posuere ac, ultricies non augue. Phasellus congue in diam sed ultricies. Nam et eleifend erat. Sed vitae lacus vitae elit accumsan ullamcorper nec et erat. Integer varius quis mauris non tincidunt. Vivamus aliquam porta tempor.
        </p>
       </article>
     </section>
     <section className='options-side'>
        <img src="https://kzmo4ra0ji5m2etf47ef.lite.vusercontent.net/placeholder.svg?height=400&width=600" alt="" className='img-detail-event' />
        <footer className='btn-container-event-details'>
            <p className='place-event'> <PlaceIcon/>{lugar}</p>
            <button className='dark-btn dark' onClick={()=>handlenavigate({ruta,params:{_id,nombre}})}>Ingresar como disertante</button>
        </footer>
     </section>
    </div>
    </>
)
}
