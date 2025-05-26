import '../global/global.css'
import '../global/layout.css'

import React, { Suspense } from 'react'
const  NavBar = React.lazy(()=> import('../Navbar/NavBar'))  
const  Footer = React.lazy(()=> import('../footer/footer'))


export const Layout = ({children, banner, explore, why }) => {
    


    return(
        <>
        <div className='padre-container'>
        <nav className='nav-container'>
          <Suspense fallback={<div>Cargando...</div>}>
            <NavBar/>
          </Suspense>
        
        </nav>
        {banner ? 
        <div >
        <section className='banner-container'>
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

        <section> 
           <Suspense fallback={<div>Cargando...</div>}>
             <Footer/> 
          </Suspense>
        </section>
       
        </div>
        </>
    )
}