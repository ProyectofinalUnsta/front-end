import React from 'react';
import './PoliticasPage.css';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

export default function PoliticasPage() {
  return (
    <div className="politicas-container">
      <div className="home-btn-wrapper left">
        <Link to="/" className="home-btn" title="Volver al inicio">
          <IoArrowBack size={22} />
        </Link>
      </div>
      <h1>Políticas y Términos de Uso</h1>
      <section>
        <h2>Sobre este proyecto</h2>
        <p>
          Este sitio web es un trabajo final desarrollado para la Universidad del Norte Santo Tomás de Aquino (<a href="https://www.unsta.edu.ar/" target="_blank" rel="noopener noreferrer">UNSTA</a>). El sistema está destinado a la gestión de eventos y presentaciones académicas, y su uso está limitado a fines educativos y de demostración institucional.
        </p>
      </section>
      <section>
        <h2>Política de Privacidad</h2>
        <p>
          No recopilamos datos personales sensibles de los usuarios fuera de los necesarios para la gestión de eventos y presentaciones. Los datos almacenados no serán compartidos con terceros y se utilizan exclusivamente para el funcionamiento interno del sistema.
        </p>
      </section>
      <section>
        <h2>Términos de Uso</h2>
        <p>
          El acceso y uso de esta plataforma está restringido a miembros autorizados de la UNSTA y participantes de los eventos gestionados. Queda prohibido el uso con fines comerciales o ajenos al propósito académico para el que fue creado.
        </p>
      </section>
      <section>
        <h2>Propiedad Intelectual</h2>
        <p>
          Todo el contenido, código fuente y documentación asociados a este proyecto son propiedad de sus autores y de la UNSTA. El uso, reproducción o distribución sin autorización está prohibido.
        </p>
      </section>
    </div>
  );
} 