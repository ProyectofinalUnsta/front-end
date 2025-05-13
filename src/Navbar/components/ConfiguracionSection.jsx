import { Link } from "react-router"
import { ConfiguracionIcon } from "../../icons/ConfiguracionIcon"
export const ConfiguracionSection = ({displayed}) => {
    return(
        <>
         <li className="listed-app-menu-admin-item">
            {
            displayed ? <>
            <ConfiguracionIcon/>
            <Link to={'/Admin/configuracion'}>Configuracion</Link>
            </>
            : <Link to={'/Admin/configuracion'}><ConfiguracionIcon/></Link>
            }
           
            </li>
        </>
    )
}