import { Link } from "react-router-dom";
import "../global/Error404.css"; // Asegúrate de que existan estilos en tu CSS

export const ErrorPage = () => {
  return (
    <div className="error404-container">
      {/* <img src="/assets/loading-logo.png" alt="Logo de carga" className="loading-logo" /> */}
      <h1 className="font-404-text">404</h1>
      <h1 className="descripcion-text">¡Oops! Página no encontrada</h1>
      <p className="small-text">Lo sentimos, pero la página que buscas no existe.</p>
      <Link to="/" className="home-link">
        Volver al inicio
      </Link>
    </div>
  );
};

