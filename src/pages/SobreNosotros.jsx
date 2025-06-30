import React, { Suspense } from "react";
import '../global/layout.css'
import '../global/global.css'
const  NavBar = React.lazy(()=> import('../Navbar/NavBar.jsx'))
const  Footer = React.lazy(()=> import('../footer/footer.jsx')) 
const CardsSobreNos = React.lazy(()=> import('../Productos/CardsSobreNosotros'))

export default function SobreNosotros() {
  return (
    <div className="sobre-nosotros-page">
      <Suspense fallback={<div>cargando..</div>}>
        <nav className='nav-container'>
          <NavBar/>
        </nav>
      </Suspense>

      {/* Historia Section */}
      <section className="historia-section">
        <div className="container">
          <div className="historia-content">
            <h2 className="historia-title">Nuestra Historia</h2>
            <div className="historia-divider"></div>
            <div className="historia-text">
              <p>
                Eventum nació de la necesidad de resolver un problema real en el mundo de los congresos y eventos: 
                la gestión eficiente de las presentaciones de los disertantes. En un entorno donde las transiciones 
                fluidas y el acceso oportuno a materiales son cruciales, creamos una plataforma integral que 
                transforma la experiencia de gestión de eventos.
              </p>
              <p>
                Nuestro proyecto, desarrollado como trabajo final de la Tecnicatura Universitaria en Desarrollo 
                y Calidad de Software de la UNSTA, ofrece una solución completa que permite a los ponentes 
                cargar, organizar y proyectar sus archivos de presentación de forma sencilla y eficiente.
              </p>
              <p>
                Con características como carga versátil de archivos (PDF, PowerPoint, videos), organización 
                intuitiva, gestión de sesiones, previsualización y una interfaz de proyección sencilla, 
                Eventum está diseñado para revolucionar la forma en que se gestionan las presentaciones 
                en eventos académicos y profesionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrantes Section */}
      <section className="integrantes-section">
        <div className="container">
          <div className="integrantes-header">
            <h2 className="integrantes-title">Nuestro Equipo</h2>
            <div className="integrantes-divider"></div>
            <p className="integrantes-subtitle">
              Conoce a los desarrolladores que hicieron posible Eventum
            </p>
          </div>
          
          <Suspense fallback={<div className="loading-cards">Cargando equipo...</div>}>
            <div className="cards-container">
              <CardsSobreNos />
            </div>
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<div>cargando..</div>}>
        <Footer/>
      </Suspense>
    </div>
  );
}