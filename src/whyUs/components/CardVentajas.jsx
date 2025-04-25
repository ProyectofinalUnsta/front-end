import { ArrowIcon } from '../../icons/ArrowIcon'
import '../style/cardventajas.css'
export const CardVentajas = ({items}) => {
    const {id,emoji, titulo, ventaja} = items
    return (
        <>
        <article className='article-ventaja' key={id}>
         <header className='header-why-us'>
            <h2 className='emoji'>{emoji}</h2>
            <h2 className='header-title-why-us'>{titulo}</h2>
         </header>
         <aside className='body-section-why-us'>
            <p className='ventaja-why-us'>{ventaja}</p>
         </aside>
         <footer>
            <a className='anchor-saber-mas' href="">saber mas <ArrowIcon backgorund={'#00000000'} width={'16px'} fill={'#326fca'} stroke={'#326fca'}/>  </a>
         </footer>
        </article>
        </>
    )
}