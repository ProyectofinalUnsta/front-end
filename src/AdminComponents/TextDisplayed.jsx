import { useState } from "react";
import { useTodoTools } from "./mocks/useTodoTools";
import { useElementsMethods } from "./mocks/useElementsMethods";
import { useTodoNavbar } from "./mocks/useTodoNavbar";
import './style/text.css'
export const TextDisplayed = ({el, pos ,event, draggingId}) => {
    const [editing, setEditing] = useState(false);
    const {editText} = useTodoTools()
    const {handleDoubleClick,handleBlur,handleKeyDown} = useElementsMethods()
      const {handleElementSelected,handleIsSelected,handleType} = useTodoNavbar()
       

    return(
        <>
   {editing == true ? <input type="text" style={{position:'absolute',  top: `${pos.y}px`,left: `${pos.x}px`, border:'none', background:'transparent', fontFamily:`${el.fontFamily}`, fontSize:`${el.fontSize}`, color:`${el.color}`}} value={el.nombre} onBlur={handleBlur} 
    onKeyDown={(e)=>handleKeyDown(e,setEditing)} autoFocus  onChange={(e)=> editText(el.id,e)}/>  
 : <span  key={el.id} style={{
  height: 'auto',
  color:el.color,
  fontFamily: el.fontFamily,
  fontSize: el.fontSize,
  fontStyle: el.fontStyle,
  position: 'absolute',
  top: `${pos.y}px`,
  left: `${pos.x}px`,
  cursor: draggingId.current === el.id ? 'grabbing' : 'grab',
  userSelect: 'none',
  zIndex:10}}
  onMouseDown={(e) => event(e, el.id)}
  onTouchStart={(e)=> event(e,el.id)}
  onDoubleClick={()=>handleDoubleClick(setEditing)}
  onClick={(e)=>{handleElementSelected(el.id);handleIsSelected(e,true);handleType(el.type)}}
    >{el.nombre}</span>}
        </>
    )
}