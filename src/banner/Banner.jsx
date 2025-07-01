import React, { Suspense } from 'react'
import './style/banner.css'
import { useNavegacion } from '../hooks/useNavegacion.js'
const Spline = React.lazy(()=> import('./Spline.jsx'))
const Banner = () => {
const { navigatewithoutparams } = useNavegacion()
const explore = '/Eventos'
const join = '/register'

    return(
        <>
        <div className="banner">
          <aside className='article-banner'>
            <h1  className='text-banner'>Descubrí y crea eventos inolvidables</h1>
            <p className='description-banner'>Crea, descubre y comparte eventos únicos que te conectan con personas y experiencias increíbles.</p>
            <div className="button-container">
              <button className="btn-explore" onClick={()=> navigatewithoutparams({ruta:explore})}>Explorar eventos</button>
              <button className="btn-join" onClick={()=> navigatewithoutparams({ruta:join})}>Unirse ahora</button>
            </div>
          </aside>
          <Suspense fallback={<div>Cargando..</div>}>
             <aside  className='article-banner'>
          <Spline/>
          </aside>
          </Suspense>
        </div>
        </>
    )
}


export default Banner