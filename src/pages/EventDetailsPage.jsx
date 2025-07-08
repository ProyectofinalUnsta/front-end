import { useLocation } from "react-router"
import {Layout} from './Layout'
import { CardDetails } from "../Productos/components/CardDetails"
import { useEffect, useState } from 'react'
import axios from 'axios'
import endpoints from '../utils/endpoints'

export default function EventDetailsPage ()  {
    const location = useLocation()
    const {_id,lugar,fecha,hora,title,descripcion,imagen} = location.state || {}
    const [evento, setEvento] = useState({ _id, lugar, fecha, hora, title, descripcion, imagen })

    useEffect(() => {
      // Si no hay imagen, buscar el evento por id
      if (!_id) return
      if (!imagen) {
        axios.get(`${endpoints.eventoPorId}${_id}`)
          .then(res => {
            // Si el backend devuelve un array, tomar el primero
            const ev = Array.isArray(res.data) ? res.data[0] : res.data
            setEvento(ev)
          })
      }
    }, [_id, imagen])

    return(
        <>
        <Layout children={<CardDetails {...evento} />}/>
        </>
    )
}