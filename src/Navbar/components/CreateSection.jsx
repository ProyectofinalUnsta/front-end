import { Link } from "react-router-dom"
import { CrearIcon } from "../../icons/CrearIcon"
export const CreateSection = ({displayed}) => {
    return (
     <>
       <li className="listed-app-menu-admin-item">
        {displayed ? 
            <>
            <CrearIcon/>
            <Link to={'/Admin/CrearEvento'}>Crear Evento</Link>
            </> 
            : <Link to={'/Admin/CrearEvento'}><CrearIcon/></Link> }
        </li>
     </>
    )
}