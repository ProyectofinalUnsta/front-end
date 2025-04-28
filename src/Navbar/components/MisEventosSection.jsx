import { Link } from "react-router"
import { MiEvento } from "../../icons/MiEvento"
export const MisEventosSection = ({displayed}) => {
    return(
        <>
          <li className="listed-app-menu-admin-item">
                {
                displayed ? 
                <>
                <MiEvento/>
                <Link to={'/MisEventos'}>Mis Eventos</Link>
                </>
                : <Link to={'/MisEventos'}><MiEvento/></Link>}

            </li>
        </>
    )
}