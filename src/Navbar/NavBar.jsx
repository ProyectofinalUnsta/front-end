import { HamburguerIcon } from '../icons/HamburguerIcon'
import './style/navbar.css'
import { Link } from 'react-router'
import { useWidth } from '../hooks/useWidth'
import { useMenu } from '../hooks/useMenu'
import { LogoIcon } from '../icons/LogoIcon'
import { useRegister } from '../hooks/useRegister'
import { useLogin } from '../hooks/useLogin'
import { EventRegistrationPopup } from '../components/EventRegistrationPopup'

export default function NavBar () {
    return(
        <>
        <section className="navbar-container">
           <EvalNav/>
        </section>
        <EventRegistrationPopup />
        </>
    )
}

export const LogoSection = () => {
    return(
        <>
        <section className='logosection-container'>
       <LogoIcon/>
       </section>
        </>
    )
}

export const NavSection = () => {

    return(
        <>
        <section className='nav-section'>
            <ul >
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/Eventos'}>Eventos</Link></li>
                <li><Link to={'/Sobrenosotros'}>Sobre Nosotros</Link></li>
                <li><Link to={'/MisArchivos'}>Mis Archivos</Link></li>
                <li><Link to={'/MisEventos'}>Mis Eventos</Link></li>
            </ul>
        </section>
        </>
    )
}

export const BtnSection = () => {
    const {isregistred} = useRegister()
    const {token} = useLogin()
    return (
        <section className='btn-section'>
            {token != null ? (
                <Link to="/Admin" className='light-btn'>
                    Panel Admin
                </Link>
            ) : (
                <Link to="/login" className='access-btn'>
                    Acceso Disertantes
                </Link>
            )}
        </section>
    );
}


export const EvalNav = () => {
 
    const {width} = useWidth()

    return(
        <> 
      {width < 970 
      ? <MobileNav/>  
      : <NormalNav/>
    }
     </>
    )
}

export const HamburguerMenu = () => {

const {handleMenu} = useMenu('modal')
    return(
        <>
        <div onClick={()=> handleMenu()}>
        <HamburguerIcon />
        </div>
        </>
    )
}

export const MobileNav = () => {

    const {menu} = useMenu()

    return (
        <>
        <section className='mobile-container'>
        <div className='navbar-content'>
            <LogoSection/>
            <HamburguerMenu/>
        </div>
        <aside  className={menu == true ? 'active modal' : 'modal'}>
            <section>
            <NavSection  />
            </section>
            <section className='modal-btn-section'>
            <BtnSection/>
            </section> 
        </aside>
        </section>
        </>
    )
}

export const NormalNav = () => {
    return(
        <>
         <div className='navbar-content'>
            <LogoSection/>
            <NavSection />
            <BtnSection/>
        </div>
        </>
    )
}