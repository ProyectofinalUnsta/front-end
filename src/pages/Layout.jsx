import '../global/global.css'
import '../global/layout.css'

import React, { Suspense } from 'react'
const  NavBar = React.lazy(()=> import('../Navbar/NavBar'))  
const  Footer = React.lazy(()=> import('../footer/footer'))
import { CarruselEventos } from '../Productos/components/CarruselEventos';

export const Layout = ({children, banner, explore, why }) => {
    return(
        <>
        <div className='padre-container'>
          <Suspense fallback={<div>Cargando...</div>}>
        <nav className='nav-container'>
            <NavBar/>
        </nav>
        </Suspense>
        {banner ? 
        <Suspense fallback={<div>Cargando..</div>}>
        <div >
        <section className='banner-container'>
           {banner}
        </section>  
        </div>
        </Suspense>
       : null}
        
         {explore ?
          <Suspense fallback={<div>Cargando..</div>}>
         <section className='explore-container'>
               {explore}
           </section> 
           </Suspense>
           : null}
        {why ?
        <Suspense fallback={<div>Cargando..</div>}>
         <section className='why-container'>
           {why}
        </section> 
        </Suspense>
        : null}
        <section className='sections-container'>
          {children}
        </section>
        <CarruselEventos />
        <Suspense fallback={<div>Cargando...</div>}>
        <section>
          <Footer/> 
        </section>
         </Suspense>
        </div>
        </>
    )
}