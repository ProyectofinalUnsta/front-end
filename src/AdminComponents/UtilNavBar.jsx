import { useTodoNavbar } from "./mocks/useTodoNavbar"
import { StickyColors,TextSize,fontStyle,fontFamily,FontColor } from "./mocks/utilprops"
import { RowActions, RowOption } from "./RowOption"
import './style/utilnavbar.css'
export const UtilNavBar = () => {
return(
  <div className="navbar-utils-elements">
     <EvalElement />
  </div>
)
}


export const EvalElement = () => {
  const {type} = useTodoNavbar()
  return(
    type == 'Text' ? <TextInterface /> : <StickyNoteInterface />
  )
}

export const TextInterface = () => {
  const {idElement,handleIsSelected} = useTodoNavbar()
return(
    <div className="options-container-element">
     <article className="elements-utils-options" onClick={(e)=>handleIsSelected(e,true)}>
       <RowOption element={FontColor} target={'color'} title={'Trazo'} id={idElement} />
       <RowOption element={fontFamily} target={'fontFamily'} title={'Tipo Fuente'} id={idElement}/>
       <RowOption element={fontStyle} target={'fontStyle'} title={'Estilo de fuente'} id={idElement}/>
       <RowOption element={TextSize} target={'fontSize'} title={'Tamaño Fuente'} id={idElement}/>
       <RowActions title={'Acciones'} id={idElement}/>
     </article>
    </div>
)
}

export const StickyNoteInterface = () => {
  const {idElement,handleIsSelected} = useTodoNavbar()
return(
  <div className="options-container-element">
    <article className="elements-utils-options" onClick={(e)=>handleIsSelected(e,true)}>
       <RowOption element={StickyColors} target={'background'} title={'Fondo'} id={idElement} />
       <RowOption element={fontFamily} target={'fontFamily'} title={'Tipo Fuente'} id={idElement}/>
       <RowOption element={fontStyle} target={'fontStyle'} title={'Estilo de fuente'} id={idElement}/>
       <RowOption element={TextSize} target={'fontSize'} title={'Tamaño Fuente'} id={idElement}/>
       <RowActions title={'Acciones'} id={idElement}/>
     </article>
  </div>
)
}