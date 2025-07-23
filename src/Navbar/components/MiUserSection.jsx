import { MiUserIcon } from "../../icons/MiUserIcon"
import { Link } from "react-router"
import { useContext } from "react"
import { LoginContext } from "../../context/LoginContext"

export const MiUserSection = ({displayed}) => {
    const { user } = useContext(LoginContext)
    
    return (
        <>
        <li className="listed-app-menu-admin-item">
            {
            displayed ? <>
            {user?.profileImage ? (
                <img 
                    src={user.profileImage} 
                    alt="Foto de perfil" 
                    className="user-profile-image"
                    style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #7367F0'
                    }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                    }}
                />
            ) : (
                <MiUserIcon/>
            )}
            <Link to={'/usuario'}>Usuario</Link>
            </>
            : <Link to={'/usuario'}>
                {user?.profileImage ? (
                    <img 
                        src={user.profileImage} 
                        alt="Foto de perfil" 
                        className="user-profile-image-small"
                        style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid #7367F0'
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }}
                    />
                ) : (
                    <MiUserIcon/>
                )}
            </Link>
            }
        </li>
        </>
    )
}