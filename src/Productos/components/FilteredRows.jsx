import '../style/filter.css'
import { useFilters } from '../../hooks/useFilters'

export const FilteredRows = ({nombre, id}) => {
        const {handlefilter} = useFilters()
    return (
    <>
    <article className='rowed-filters'>
        <label htmlFor={id} >{nombre}</label>
         <input id={id} type="text"  placeholder='Buscar Eventos por nombre' className='input' onChange={(e)=> handlefilter(e,id)}/>
     </article>
    </>
    
    )
}

export const FilteredRowCategory = ({nombre,id}) => {
    const {handlefilter} = useFilters()
    return(
        <>
          <article className='rowed-filters'>
        <label htmlFor={id} >{nombre}</label>
        <select name={nombre} id={id} className="input" onChange={(e)=>handlefilter(e,id)}>
            <option className="option" value="all">Todas</option>
            <option className="option" value="Medicina">Medicina</option>
            <option className="option" value="Bebidas">Bebidas</option>
            <option className="option" value="Tecnologia">Tecnologia</option>
            <option className="option" value="Negocios">Negocios</option>
            <option className="option" value="Arte">Arte</option>
            <option className="option" value="Educacion">Educacion</option>
            <option className="option" value="Moda">Moda</option>
        </select>
     </article>
        </>
    )
}