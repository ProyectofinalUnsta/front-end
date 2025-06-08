import { Link } from "react-router-dom"
import { MisArchivosIcon } from "../../icons/MisArchivosIcon"

export const AdminFilesSection = ({displayed}) => {
    return (
        <>
            <li className="listed-app-menu-admin-item">
                {
                    displayed ? (
                        <>
                            <MisArchivosIcon />
                            <Link to={'/Admin/Archivos'}>Administrar Archivos</Link>
                        </>
                    ) : (
                        <Link to={'/Admin/Archivos'}><MisArchivosIcon /></Link>
                    )
                }
            </li>
        </>
    );
}; 