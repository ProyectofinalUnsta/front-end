import { Link } from "react-router"
import { MisArchivosIcon } from "../../icons/MisArchivosIcon"

export const MisArchivosSection = ({displayed}) => {
    return (
        <>
            <li className="listed-app-menu-admin-item">
                {
                    displayed ? (
                        <>
                            <MisArchivosIcon />
                            <Link to={'/MisArchivos'}>Mis Archivos</Link>
                        </>
                    ) : (
                        <Link to={'/MisArchivos'}><MisArchivosIcon /></Link>
                    )
                }
            </li>
        </>
    );
}; 