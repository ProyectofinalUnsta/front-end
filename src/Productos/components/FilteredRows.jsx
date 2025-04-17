import '../style/filter.css'
export const FilteredRows = ({nombre, id}) => {
    return (
    <>
    <article className='rowed-filters'>
        <label htmlFor={id} >{nombre}</label>
         <input id={id} type="text"  placeholder='Buscar Eventos.' className='input' />
     </article>
    </>
    )
}

export const FilteredRowCategory = ({nombre,id}) => {
    return(
        <>
          <article className='rowed-filters'>
        <label htmlFor={id} >{nombre}</label>
        <select name={nombre} id={id} className="input">
            <option className="option" value="All">Todas</option>
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