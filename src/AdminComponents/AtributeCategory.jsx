export const AtributeCategory = ({nombre,label,event}) => {
    return(
    <div class="form-group">
           <label htmlFor="descripcion">{label}</label>
        <select name={nombre} className="input" onChange={(e)=>event(e)}>
       <option className="option" value="all">Todas</option>
            <option className="option" value="Medicina">Medicina</option>
            <option className="option" value="Bebidas">Bebidas</option>
            <option className="option" value="Tecnologia">Tecnologia</option>
            <option className="option" value="Negocios">Negocios</option>
            <option className="option" value="Arte">Arte</option>
            <option className="option" value="Educacion">Educacion</option>
            <option className="option" value="Moda">Moda</option>
        </select>
    </div>
    )
}