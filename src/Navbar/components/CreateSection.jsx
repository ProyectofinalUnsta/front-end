import { Link } from "react-router"
import { CrearIcon } from "../../icons/CrearIcon"
export const CreateSection = ({displayed}) => {
    return (
     <>
       <li className="listed-app-menu-admin-item">
        {displayed ? 
            <>
            <CrearIcon/>
            <Link to={'/'}>Crear Evento</Link>
            </> 
            : <Link to={'/'}><CrearIcon/></Link> }
        </li>
     </>
    )
}