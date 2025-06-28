import { Link } from 'react-router-dom';
import './style/explore.css';

export default function Explore() {
  return (
    <section className="explore-section">
      <h2 className="explore-title">Explora Eventos</h2>
      <p className="explore-subtitle">
        Descubre una amplia variedad de eventos que se adaptan a tus intereses y necesidades
      </p>
      
      <div className="explore-cards">
        <div className="explore-card">
          <div className="card-icon">🎓</div>
          <h3 className="card-title">Eventos Académicos</h3>
          <p className="card-description">
            Conferencias, seminarios y talleres para expandir tu conocimiento profesional
          </p>
          <Link to="/eventos" className="card-button">
            Explorar
          </Link>
        </div>
        
        <div className="explore-card">
          <div className="card-icon">🎉</div>
          <h3 className="card-title">Eventos Sociales</h3>
          <p className="card-description">
            Celebración, networking y eventos recreativos para conectar con otros
          </p>
          <Link to="/eventos" className="card-button">
            Explorar
          </Link>
        </div>
        
        <div className="explore-card">
          <div className="card-icon">💼</div>
          <h3 className="card-title">Eventos Empresariales</h3>
          <p className="card-description">
            Ferias comerciales, exposiciones y eventos corporativos
          </p>
          <Link to="/eventos" className="card-button">
            Explorar
          </Link>
        </div>
      </div>
    </section>
  );
} 