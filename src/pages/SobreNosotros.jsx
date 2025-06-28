import React, { Suspense } from "react";
import '../global/layout.css'
import '../global/global.css'
const  NavBar = React.lazy(()=> import('../Navbar/NavBar.jsx'))
const  Footer = React.lazy(()=> import('../footer/footer.jsx')) 
const CardsSobreNos = React.lazy(()=> import('../Productos/CardsSobreNosotros'))

export default function SobreNosotros() {
  return (
    <>
    <Suspense fallback={<div>cargando..</div>}>
    <nav className='nav-container'>
    <NavBar/>
    </nav>
    </Suspense>

      <section className="text-light py-5 text-center bg-dark mb-5">
        <h1 className="display-3 fw-bold">PROYECTO FINAL</h1>
        <p className="lead fst-italic mb-1">Trabajo Grupal</p>
        <p className="lead fw-light">#UNSTA</p>
      </section>

      <section className="d-flex flex-column align-items-center justify-content-center text-center mb-4" style={{marginBottom:'2.5rem'}}>
        <h2 className="display-5 fw-semibold" style={{marginBottom:'0.2rem'}}>Integrantes</h2>
        <div style={{width:'110px', borderBottom:'2.5px solid #1f2937', margin:'0 auto', marginBottom:'1.5rem'}}></div>
      </section>
      <Suspense fallback={<div>Cargando..</div>}>
      <div className="mb-5 w-full flex flex-col gap-5 justify-center items-center ">
          <CardsSobreNos />
      </div>
      </Suspense>
    <Suspense fallback={<div>cargando..</div>}>
    <Footer/>
    </Suspense>
    </>
  );
}