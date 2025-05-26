import '../style/card.css'
import {DateIcon } from '../../icons/DateIcon'
import { PlaceIcon } from '../../icons/PlaceIcon'
import { RelojIcon } from '../../icons/RelojIcon'
import { useNavegacion } from '../../hooks/useNavegacion'
export const Card = ({products}) => {
  
    const {_id,title,descripcion,fecha,hora,lugar,categoria,imagen} = products
    const {handlenavigate} = useNavegacion()
    const ruta = '/Eventos'

    return(
        <>
        <div className="event-card" key={_id}>
            <figure >
                <img className='img-container' src={imagen} alt="" loading='lazy' />
            </figure>
            <section className='text-event'>
                <h2 className='text-name'>{title}</h2>
                <small className='text-descripcion'>
                    {categoria}
                </small>
            </section>
            <section className='events-details'>
              <article className='events-details-rows'>
               <DateIcon/>
               <span className='event-details-text'>{fecha}</span>
              </article>
              <article className='events-details-rows'>
                <RelojIcon/>
                <span className='event-details-text'>{hora}</span>
              </article>
              <article  className='events-details-rows'>
                <PlaceIcon/>
                <span className='event-details-text'>{lugar}</span>
              </article>
            </section>
            <section className='event-btn'>
               <a className='btn-event' onClick={()=>handlenavigate({ruta, params:{_id,lugar,fecha,hora,title,descripcion,categoria}})}>Ver detalles</a>
              </section>
        </div>
        </>
    )
}