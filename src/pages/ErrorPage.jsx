import { Link } from "react-router-dom";
import "../global/Error404.css"; // Asegúrate de que este archivo CSS exista
import missileImage from '../assets/missile-impact.png'; // Importa tu imagen del misil

export default function ErrorPage() {
  return (
    <div className="error404-container">
      {/* Usamos la imagen importada y le aplicamos una clase para el estilo y la animación */}
      <img src={missileImage} alt="Misil girando" className="spinning-missile" />
      
      <h1 className="font-404-text">Error 404</h1>
      <h1 className="descripcion-text">¡Oops! Página no encontrada</h1>
      <p className="small-text">Lo sentimos, pero la página que buscas no existe.</p>
      
      <Link to="/" className="home-link">
        Volver al inicio
      </Link>
    </div>
  );
}