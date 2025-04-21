import { Link } from "react-router-dom";
import "../global/Error404.css"; // Asegúrate de que existan estilos en tu CSS

const Error404 = () => {
  return (
    <div className="error404-container">
      <img src="/assets/loading-logo.png" alt="Logo de carga" className="loading-logo" />
      <h1>¡Oops! Página no encontrada</h1>
      <p>Lo sentimos, pero la página que buscas no existe.</p>
      <Link to="/" className="home-link">
        Volver al inicio
      </Link>
    </div>
  );
};

export default Error404;