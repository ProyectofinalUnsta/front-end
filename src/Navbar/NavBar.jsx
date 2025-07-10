import { HamburguerIcon } from '../icons/HamburguerIcon'
import './style/navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { useWidth } from '../hooks/useWidth'
import { useMenu } from '../hooks/useMenu'
import { LogoIcon } from '../icons/LogoIcon'
import { useRegister } from '../hooks/useRegister'
import { useLogin } from '../hooks/useLogin'
import { EventRegistrationPopup } from '../components/EventRegistrationPopup'
import { useState } from 'react'

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
          <Link to={'/'} className='logo-eventum'>
            <LogoIcon style={{marginRight: '0.5rem'}}/>
          </Link>
       </section>
        </>
    )
}

export const NavSection = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    return(
        <>
        <section className='nav-section'>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/Eventos'}>Eventos</Link></li>
                <li><Link to={'/Sobrenosotros'}>Sobre Nosotros</Link></li>
                <li><Link to={'/MisArchivos'}>Mis Archivos</Link></li>
                
            </ul>
        </section>
        </>
    )
}

export const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className="dropdown-container">
            <button 
                className="dropdown-btn"
                onClick={toggleDropdown}
                onBlur={() => setTimeout(closeDropdown, 150)}
            >
                <span>Acceso</span>
                <svg 
                    className={`dropdown-arrow ${isOpen ? 'rotate' : ''}`}
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none"
                >
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            
            {isOpen && (
                <div className="dropdown-menu">
                    {/* <Link to="/login" className="dropdown-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                            <polyline points="10,17 15,12 10,7"/>
                            <line x1="15" y1="12" x2="3" y2="12"/>
                        </svg>
                        Iniciar Sesión
                    </Link> */}
                    <Link to="/register" className="dropdown-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        Registrarse
                    </Link>
                    <Link to="/login" className="dropdown-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        Acceso Disertantes
                    </Link>
                </div>
            )}
        </div>
    );
};

export const BtnSection = () => {
    const {isregistred} = useRegister()
    const {token} = useLogin()
    return (
        <section className='btn-section'>
            {token != null ? (
                <Link to="/Admin" className='admin-btn'>
                    Panel Admin
                </Link>
            ) : (
                <DropdownMenu />
            )}
        </section>
    );
}

export const EvalNav = () => {
    const {width} = useWidth()
    return(
        <> 
        {width < 1221 
        ? <MobileNav/>  
        : <NormalNav/>
        }
        </>
    )
}

export const HamburguerMenu = () => {
    const {handleMenu} = useMenu()
    return(
        <>
        <div onClick={()=> handleMenu()} className="hamburger-btn">
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
            <aside className={menu == true ? 'active modal' : 'modal'}>
                {menu == true ?
                <section>
                    <NavSection />
                </section> : null
                } 
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