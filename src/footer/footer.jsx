import { useWidth } from "../hooks/useWidth";
import "./style/footer.css";

export const Footer = () => {
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
        <p>© 2025 - PROYECTO FINAL</p>
        <div className="social-icons flex-row flex">
          <a
            href="https://www.unsta.edu.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/UNSTA_isologotipo-1.png" alt="Unsta Logo" width="auto" />
          </a>
        </div>
        <ul>
          <li>
            <a href="/">Políticas</a>
          </li>
          <li>
            <a href="/SobreNosotros">Sobre Nosotros</a>
          </li>
          <li>
            <a href="/">Contactanos:</a>
            <div class="mb-4">
              <a
                href="#"
                class="text-gray-400 hover:text-white mx-2"
                target="_blank"
              >
                Facebook
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-white mx-2"
                target="_blank"
              >
                Twitter
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-white mx-2"
                target="_blank"
              >
                Instagram
              </a>
            </div>
          </li>
        </ul>
        <li>
          <p>&copy; Todos los derechos reservados</p>
        </li>
      </section>
    </>
  );
};

export const NormalFooter = () => {
  return (
    <>
      <section className="normal-footer">
        <p>© 2025 - PROYECTO FINAL</p>
        <div className="social-icons flex-row flex">
          <a
            href="https://www.unsta.edu.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/UNSTA_isologotipo-1.png" alt="Unsta Logo" width="auto" />
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
              <div class="mb-4">
                <a href="/Error404">Contactanos:</a>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white mx-2"
                  target="_blank"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white mx-2"
                  target="_blank"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white mx-2"
                  target="_blank"
                >
                  Instagram
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div className="footer-copy">
          <p>&copy; Todos los derechos reservados</p>
          <p>© 2025 - PROYECTO FINAL</p>
        </div>
      </section>
    </>
  );
};
