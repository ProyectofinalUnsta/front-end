import '../style/card.css'
import {DateIcon } from '../../icons/DateIcon'
import { PlaceIcon } from '../../icons/PlaceIcon'
import { RelojIcon } from '../../icons/RelojIcon'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
export const Card = ({products}) => {
    const {_id,nombre,descripcion,fecha,hora,lugar} = products
    const navegar = useNavigate()
    const navigate = (_id) => {
      navegar(`/eventos/${_id}`)
    }
    return(
        <>
        <div className="event-card" key={_id}>
            <figure >
                <img className='img-container' src="https://kzmo4ra0ji5m2etf47ef.lite.vusercontent.net/placeholder.svg?height=400&width=600" alt="" />
            </figure>
            <section className='text-event'>
                <h2 className='text-name'>{nombre}</h2>
                <small className='text-descripcion'>
                    {descripcion}
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
               <a className='btn-event' onClick={()=>navigate(_id)}>Ver detalles</a>
              </section>
        </div>
        </>
    )
}