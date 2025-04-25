import '../global/global.css'
import '../global/Layout.css'
import { NavBar } from '../Navbar/NavBar'
import { Footer } from '../footer/footer'
// import { SobreNosotros } from '../pages/SobreNosotros'
export const Layout = ({children, banner, explore, why }) => {
    return(
        <>
        <div className='padre-container'>
        <nav className='nav-container'>
            <NavBar/>
        </nav>
        {banner ? <section className='banner-container'>
           {banner}
        </section> : null}
        
         {explore ? <section className='explore-container'>
               {explore}
           </section> : null}
        {why ? <section className='why-container'>
           {why}
        </section> : null}
        <section className='sections-container'>
          {children}
        </section>

        <section> <Footer/> </section>
       
        </div>
        </>
    )
}