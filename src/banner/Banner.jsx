import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import './style/banner.css'
import { useNavegacion } from '../hooks/useNavegacion.js'
const Spline = React.lazy(()=> import('./Spline.jsx'))
const Banner = () => {
    return(
        <div className="banner">
          <aside className='article-banner'>
            <h1 className='text-banner'>Crea Momentos Inolvidables</h1>
            <p className='description-banner'>Cada evento que organizas con Eventum se convierte en un reflejo de tu visión. Nuestra plataforma combina un diseño intuitivo con herramientas potentes, dándote el poder de crear, gestionar y elevar experiencias que dejen huella.</p>
            <div className="button-container">
              <Link to="/eventos" className="btn-explore">Explorar eventos</Link>
              <Link to="/login" className="btn-explore">Unirse ahora</Link>
            </div>
          </aside>
          <Suspense fallback={<div className="spline-loading">Cargando..</div>}>
             <aside  className='article-banner'>
                <Spline/>
             </aside>
          </Suspense>
        </div>
    )
}

export default Banner