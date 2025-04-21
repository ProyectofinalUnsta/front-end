import CardsSobreNos from "../Productos/CardsSobreNosotros";
// import { Layout } from "./Layout";
import { NavBar } from '../Navbar/NavBar'
import { Footer } from '../footer/footer'

export function SobreNosotros() {
  return (
    <>
  <NavBar/>
      {/* <Layout /> */}
      <div>
        <section className="seccionInfoPROYECTOFINAL text-light py-3 text-center mb-5">
          <h1>PROYECTO FINAL</h1>
          <p>TRABAJO GRUPAL</p>
          <p>Nadie llega a la cima sin la ayuda de otros.</p>
          <p>Se agradece a UNSTA</p>
        </section>
        <h1 className="display-4 text-center">Integrantes: </h1>
        <hr />
      </div>
      <section><CardsSobreNos /></section>
      <hr />
      <Footer/>
    </>

    
  );
}
