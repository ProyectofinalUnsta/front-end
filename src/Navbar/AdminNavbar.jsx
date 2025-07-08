import './style/navbaradmin.css'

import { useAdminMenu } from '../hooks/useAdminMenu'
import { LogoSection } from './components/LogoSection'
import { MainSection } from './components/MainSection'
import { CloseMenu } from './components/CloseMenu'
import { AppsSection } from './components/AppsSection'
import { useContext } from 'react'
import { LoginContext } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'

export const AdminNavbar = () => {

    const {displayed,handlePopUpDisplayed} = useAdminMenu()
    const { setUser, setToken } = useContext(LoginContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        setUser({ nombre: '', email: '', logged: false })
        setToken(null)
        window.localStorage.removeItem('registred')
        document.cookie = 'usuario=; Max-Age=0; path=/;'
        document.cookie = 'token=; Max-Age=0; path=/;'
        navigate('/')
    }
 
    return(
        <>
         <div className={ displayed == true ? "navbar-admin-container displayed" : "navbar-admin-container closed"}  onMouseEnter={()=>handlePopUpDisplayed()} onMouseLeave={()=>handlePopUpDisplayed()}>
           <header className='navbar-admin-header'>
           <LogoSection displayed={displayed}/>
            <MainSection/>
           </header>
            <CloseMenu/>
            <section className='main-content-admin-menu' style={{alignItems: displayed ? 'start' : 'center', paddingLeft: displayed ? '30px' : '0px' }}>
               <h2 className='Apps-title'>APPS</h2>
               <AppsSection/>
               {/* Botón de cerrar sesión eliminado, se agregará como menú desplegable en el usuario */}
            </section> 
         </div>
        </>
    )
}
