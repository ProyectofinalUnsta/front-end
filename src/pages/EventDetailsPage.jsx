import { useLocation } from "react-router"
import {Layout} from './Layout'
import { CardDetails } from "../Productos/components/CardDetails"

export default function EventDetailsPage ()  {
    const location = useLocation()

    const {_id,lugar,fecha,hora,title,descripcion} = location.state || {}

    return(
        <>
        <Layout children={<CardDetails _id={_id} lugar={lugar} fecha={fecha} hora={hora} title={title} descripcion={descripcion}/>}/>
        </>
    )
}