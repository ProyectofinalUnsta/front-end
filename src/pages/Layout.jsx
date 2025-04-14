import '../global/global.css'
import '../global/Layout.css'
import { NavBar } from '../Navbar/NavBar'
export const Layout = ({children, banner}) => {
    return(
        <>
        <div className='padre-container'>
        <nav className='nav-container'>
            <NavBar/>
        </nav>
        {banner ? <section className='banner-container'>
           {banner}
        </section> : null}
        
        <section className='sections-container'>
          {children}
        </section>
        </div>
        </>
    )
}