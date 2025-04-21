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
        <section className="text-light py-3 text-center mb-5">
          <h1 className='text' >PROYECTO FINAL</h1>
          <p className='description'>TRABAJO GRUPAL</p>
          <p className='description' >Nadie llega a la cima sin la ayuda de otros.</p>
          <p className='description' >Se agradece a UNSTA</p>
        </section>
        <h1 className="description display-4 text-center">Integrantes: </h1>
        <hr />
      </div>
      <section><CardsSobreNos /></section>
      <hr />
      <Footer/>
    </>

    
  );
}
