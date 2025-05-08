import { useTodoTools } from "./mocks/useTodoTools"

export const RowOption = ({element,id,title,target}) => {

    const {styleElements} = useTodoTools()
    return(
        <>
        <h2>{title}</h2>
        <div className="rowed-element-option">
        {element.map((element)=>(
            <div className="element-option tooltip-container" style={{background: element.type ? `${element.nombre}` : '#f3f3f3'}} onClick={()=>styleElements.changeProps(id,target,element.nombre)}>
            {element.type ? null : <h3 style={{fontFamily:`${element.nombre}`, fontStyle:`${element.nombre}`, marginTop: '4px'}}>{element.displayName}</h3>} 
            <span className="tooltip-text">{element.nombre}</span>
            </div>
        ))}
          </div>
        </>
    )
}