import { ArrowIcon } from '../icons/ArrowIcon'
import { Link } from 'react-router'
import './style/explore.css'
export const ExplorarEventos = () => {
return (
    <>

        <header className='header-explore'>
           <h2 className='explore-title'>Crea Momentos Inolvidables</h2> 
        </header>
        <section className='paragraph-container'>
            <p className='explore-paragraph'>
            Cada evento que organizas con Eventum se convierte en un reflejo de tu visión. Nuestra plataforma combina un diseño intuitivo con herramientas potentes, dándote el poder de crear, gestionar y elevar experiencias que dejan huella.
            </p>
        </section>
        <footer className='btn-container'>
            <button className='explore-btn'> <Link to={"/Eventos"}>Explorar Eventos</Link> <ArrowIcon width={'22px'} backgorund={'#00000000'} fill={'#fff'} stroke={'#fff'} /> </button>
        </footer>

    </>
)
}