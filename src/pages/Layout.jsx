import '../global/global.css'
import '../global/Layout.css'
import { NavBar } from '../Navbar/NavBar'
import { Footer } from '../footer/footer'
import { useNebulosaBackground } from '../hooks/useNebulosaBackground'
import { SobreNosotros } from '../pages/SobreNosotros'

export const Layout = ({children, banner, explore, why }) => {
    
  const mountRef = useNebulosaBackground() 

    return(
        <>
        <div className='padre-container'>
        <nav className='nav-container'>
            <NavBar/>
        </nav>
        {banner ? 
        <div >
        <section ref={mountRef} className='banner-container'>
           {banner}
        </section>  
        </div>
       : null}
        
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