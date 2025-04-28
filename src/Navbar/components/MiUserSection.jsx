import { MiUserIcon } from "../../icons/MiUserIcon"
import { Link } from "react-router"

export const MiUserSection = ({displayed}) => {
    return (
        <>
        <li className="listed-app-menu-admin-item">
            {
            displayed ? <>
            <MiUserIcon/>
            <Link to={'/usuario'}>Usuario</Link>
            </>
            : <Link to={'/usuario'}><MiUserIcon/></Link>
            }
        </li>
        </>
    )
}