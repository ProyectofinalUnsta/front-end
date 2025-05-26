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
        <div className="social-icons flex-row flex gap-2 mt-4 mb-4 ">
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
            className="flex items-center justify-center"
          >
        <EventumSvg width={'22px'} heigth={'32px'} fill={'#000'} stroke={'#000'}/>
          </a>
        </div>
        <ul>
        <div class="mb-2 flex flex-row items-center justify-center">
          <li>
            <a href="/"
             class="text-gray-400 hover:text-white mx-2"
             target="_blank"
            >Políticas</a>
          </li>
          <li>
            <a href="/SobreNosotros"
             class="text-gray-400 hover:text-white mx-2"
             target="_blank"
             >Sobre Nosotros</a>
          </li>
          </div>
          <li>
            <a href="/"
             class="text-gray-400 hover:text-white mx-2"
             target="_blank">Contactanos</a>
            <div class="mt-2">
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
        <li className="footer-copy">
          <p>©2025 Todos los derechos reservados</p>
        </li>
      </section>
    </>
  );
};

export const NormalFooter = () => {
  return (
    <>
      <section className="normal-footer">
        <div className="social-icons flex-row flex gap-4 mt-4 mb-4">
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
            className="flex items-center justify-center"
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
          <p>©2025 Todos los derechos reservados - Eventum</p>

        </div>
      </section>
    </>
  );
};
