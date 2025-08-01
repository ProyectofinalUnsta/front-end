import '../style/card.css'
import {DateIcon } from '../../icons/DateIcon'
import { PlaceIcon } from '../../icons/PlaceIcon'
import { RelojIcon } from '../../icons/RelojIcon'
import { useNavegacion } from '../../hooks/useNavegacion'
import { useEffect, useState } from 'react'
import endpoints from '../../utils/endpoints'
import axios from 'axios'


export const Card = ({products}) => {
  
    const {_id,title,descripcion,fecha,hora,lugar,categoria,imagen} = products
    const {handlenavigate} = useNavegacion()
    const ruta = '/Eventos'
    const [archivos, setArchivos] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      const fetchArchivos = async () => {
        setLoading(true)
        try {
          const res = await axios.get(`${endpoints.presentaciones}event/${_id}`)
          setArchivos(res.data)
        } catch (err) {
          setArchivos([])
        } finally {
          setLoading(false)
        }
      }
      fetchArchivos()
    }, [_id])

    const downloadPresentacion = async (presentacionId) => {
      try {
        const response = await axios.get(`${endpoints.presentaciones}download/${presentacionId}`, {
          responseType: 'blob'
        })
        const blob = new Blob([response.data])
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        const contentDisposition = response.headers['content-disposition']
        let filename = 'archivo'
        if(contentDisposition) {
          const match = contentDisposition.match(/filename="?([^";]+)"?/)
          if(match) filename = match[1]
        }
        link.download = filename
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
      } catch (err) {
        alert('Error al descargar el archivo')
      }
    }

    return(
        <>
        <div className="event-card" key={_id}>
            <figure>
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
               <a className='btn-event' onClick={()=>handlenavigate({ruta, params:{_id,lugar,fecha,hora,title,descripcion,categoria,imagen}})}>Ver detalles</a>
              </section>
            
        </div>
        </>
    )
}