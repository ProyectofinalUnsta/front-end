import { useWidth } from "../hooks/useWidth";
import { EventumSvg } from "../icons/EventumSvg";
import { UnstaLogo } from "../icons/UnstaLogo";
import "./style/footer.css";
import { Link } from "react-router-dom";

export default function Footer  ()  {
  const { width } = useWidth();

  return (
    <>
      <footer className="footer-container">
        {width < 970 ? <MobileFooter /> : <NormalFooter />}
      </footer>
    </>
  );
};

export const MobileFooter = () => {
  return (
    <>
      <section className="mobile-footer">
        <div className="social-icons">
        <a
            href="https://www.unsta.edu.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
        <UnstaLogo width={'42px'} heigth={'42px'} fill={'#000'} stroke={'#000'}/>
          </a>
          <a
            href="http://localhost:5173/"
            target="_blank"
            rel="noopener noreferrer"
          >
        <EventumSvg width={'22px'} heigth={'32px'} fill={'#000'} stroke={'#000'}/>
          </a>
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <Link to="/politicas">Políticas</Link>
            </li>
            <li>
              <a href="/SobreNosotros">Sobre Nosotros</a>
            </li>
            <li>
              <Link to="/contactanos">Contactanos</Link>
            </li>
            <li>
              <a href="https://x.com/eventumLat" target="_blank" rel="noopener noreferrer">Twitter</a>
            </li>
            <li>
              <a href="https://www.instagram.com/eventum.lat/" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
          </ul>
        </div>
        <div className="footer-copy">
          <p>©2025 Todos los derechos reservados</p>
        </div>
      </section>
    </>
  );
};

export const NormalFooter = () => {
  return (
    <>
      <section className="normal-footer">
        <div className="social-icons">
          <a
            href="https://www.unsta.edu.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
        <UnstaLogo width={'42px'} heigth={'42px'} fill={'#000'} stroke={'#000'}/>
          </a>
          <a
            href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            target="_blank"
            rel="noopener noreferrer"
          >
        <EventumSvg width={'42px'} heigth={'42px'} fill={'#000'} stroke={'#000'}/>
          </a>
        </div>

        <div className="footer-links">
          <ul>
            <li>
              <Link to="/politicas">Políticas</Link>
            </li>
            <li>
              <a href="/SobreNosotros">Sobre Nosotros</a>
            </li>
            <li>
              <Link to="/contactanos">Contactanos</Link>
            </li>
            <li>
              <a href="https://x.com/eventumLat" target="_blank" rel="noopener noreferrer">Twitter</a>
            </li>
            <li>
              <a href="https://www.instagram.com/eventum.lat/" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
          </ul>
        </div>

        <div className="footer-copy">
          <p>©2025 Todos los derechos reservados - Eventum</p>
        </div>
      </section>
    </>
  );
};
