import { useState } from "react";
import './style/sticky.css'
import { useTodoTools } from "./mocks/useTodoTools";
import { useElementsMethods } from "./mocks/useElementsMethods";
import { useTodoNavbar } from "./mocks/useTodoNavbar";
export const Sticky = ({el,event,pos,draggingId}) => {

  const {editNombreNote,editDescripcionNote,editEstadoNote} = useTodoTools()
  const {handleKeyDown,handleBlur,handleDoubleClick} = useElementsMethods()
  const {handleElementSelected,handleIsSelected,handleType} = useTodoNavbar()
    const [editing, setEditing] = useState(false);
    const [editDescripcion,setedit] = useState(false);

    return (
        <>
            <article
              key={el.id}
              style={{
                height: 'auto',
                background: el.background,
                fontFamily: el.fontFamily,
                fontSize: el.fontSize,
                position: 'absolute',
                top: `${pos.y}px`,
                left: `${pos.x}px`,
                cursor: draggingId.current === el.id ? 'grabbing' : 'grab',
                userSelect: 'none',
                zIndex:10
              }}
              className="sticky-note"
              onMouseDown={(e) => event(e, el.id)}
              onTouchStart={(e)=> event(e,el.id)}
              onClick={(e)=>{handleElementSelected(el.id);handleIsSelected(e,true);handleType(el.type)}}
            >
                <header className="header-sticky-note">
              {editing 
        ? <input value={el.nombre}  onChange={(e) => editNombreNote(el.id,e)} onBlur={()=>handleBlur(setEditing,editDescripcion,setEditing)} 
        onKeyDown={(e)=>handleKeyDown(e,setEditing)} autoFocus/> 
        : <span onDoubleClick={()=>handleDoubleClick(setEditing)}> {el.nombre} </span>  }
                </header>
                <main className="descripcion-sticy-note">
    {editDescripcion 
    ? <textarea 
    style={{color:'#2c2c2c'}}
        value= {el.descripcion} 
        onChange={(e)=> editDescripcionNote(el.id,e)} 
        onBlur={()=>handleBlur(editDescripcion,setEditing)}
        onKeyDown={(e)=> handleKeyDown(e,setedit)}
      /> 
    : <p onDoubleClick={()=>setedit(true)}>{el.descripcion}</p>}
                </main>
                <footer>
                    <select name="select" id="select" defaultValue={el.estado} onChange={(e)=>editEstadoNote(el.id,e)}>
                      <option  value="No realizado">No realizado</option>
                      <option value="En Curso">En Curso</option>
                      <option  value="Realizado">Realizado</option>
                    </select>
                </footer>
            </article>
        </>
    )
}