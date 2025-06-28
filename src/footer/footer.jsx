import { useWidth } from "../hooks/useWidth";
import { EventumSvg } from "../icons/EventumSvg";
import { UnstaLogo } from "../icons/UnstaLogo";
import "./style/footer.css";

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
              <a href="/">Políticas</a>
            </li>
            <li>
              <a href="/SobreNosotros">Sobre Nosotros</a>
            </li>
            <li>
              <a href="/">Contactanos</a>
            </li>
            <li>
              <a href="#" target="_blank">Facebook</a>
            </li>
            <li>
              <a href="#" target="_blank">Twitter</a>
            </li>
            <li>
              <a href="#" target="_blank">Instagram</a>
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
            href="http://localhost:5173/"
            target="_blank"
            rel="noopener noreferrer"
          >
        <EventumSvg width={'42px'} heigth={'42px'} fill={'#000'} stroke={'#000'}/>
          </a>
        </div>

        <div className="footer-links">
          <ul>
            <li>
              <a href="/Error404">Políticas</a>
            </li>
            <li>
              <a href="/SobreNosotros">Sobre Nosotros</a>
            </li>
            <li>
              <a href="/Error404">Contactanos</a>
            </li>
            <li>
              <a href="#" target="_blank">Facebook</a>
            </li>
            <li>
              <a href="#" target="_blank">Twitter</a>
            </li>
            <li>
              <a href="#" target="_blank">Instagram</a>
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
