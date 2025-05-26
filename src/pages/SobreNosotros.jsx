import CardsSobreNos from "../Productos/CardsSobreNosotros";
import React, { Suspense } from "react";

const  NavBar = React.lazy(()=> import('../Navbar/NavBar'))
const  Footer = React.lazy(()=> import('../footer/footer')) 

export default function SobreNosotros() {
  return (
    <>
    <Suspense fallback={<div>cargando..</div>}>
    <NavBar/>
    </Suspense>

      <section className="text-light py-5 text-center bg-dark mb-5">
        <h1 className="display-3 fw-bold">PROYECTO FINAL</h1>
        <p className="lead fst-italic mb-1">Trabajo Grupal</p>
        <p className="lead fw-light">#UNSTA</p>
      </section>

     
      <section className="d-flex justify-content-center text-center mb-4">
        <div>
          <h2 className="display-5 fw-semibold">Integrantes</h2>
          <hr className="mx-auto" style={{ width: "100px", borderTop: "2px solid #000" }} />
        </div>
      </section>

      <div className="container mb-5">
        <CardsSobreNos />
      </div>
    <Suspense fallback={<div>cargando..</div>}>
    <Footer/>
    </Suspense>
    </>
  );
}