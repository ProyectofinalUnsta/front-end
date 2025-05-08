import './style/todo.css';
import { NavbarTodo } from './NavBarTodo';
import { Sticky } from './Sticky';
import { useTodoTools } from './mocks/useTodoTools';
import { useTodoUtils } from './mocks/useTodoUtils';
import { TextDisplayed } from './TextDisplayed';
import { UtilNavBar } from './UtilNavBar';
import { useTodoNavbar } from './mocks/useTodoNavbar';
export const Todo = () => {

const {mappedElements} = useTodoTools()
const {zoomLayerRef,handleTouchStart,handleTouchMove,handleWheel,handleStart,zoomIn,zoomOut,zoom,displayZoom,positions,draggingId,offset,parentRef} = useTodoUtils()
const {handleIsSelected,isSelected} = useTodoNavbar()
  return (
<div
id='Padre'
  className="lined-paper"
  onWheel={handleWheel}
  onTouchStart={(e)=>handleTouchStart(e)}
  onTouchMove={(e)=>handleTouchMove(e)}
  style={{ width: '100%', height: '100%', overflow: 'auto', zIndex:0 }}
>
  <header className="header-options" style={{ left: `${offset.x}px` }}>
    <NavbarTodo />
  </header>

  <div
    ref={parentRef}
    style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: `${offset.y}px`,
      left: `${offset.x}px`,
      zIndex: 0,
    }}
  >
    <div
      ref={zoomLayerRef}
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: '0 0',
        width: '1000%',
        height: '5000%',
        position: 'relative',
        zIndex:0
      }}
     onClick={(e)=>handleIsSelected(e,false)}
    >
      {isSelected == true ? <UtilNavBar/> : null}
      {mappedElements.map((el) => {
        const pos = positions.get(el.id) || { x: 50, y: 50 };
        return (
          el.type == 'Sticky' ? <Sticky key={el.id} pos={pos} el={el} draggingId={draggingId} event={handleStart} /> :  <TextDisplayed key={el.id} pos={pos} el={el} draggingId={draggingId} event={handleStart}/>
        
        );
      })}
    </div>
  </div>

  <footer className="zoom-options" style={{ position: 'fixed', bottom: 0, left: 0, zIndex: 10 }}>
    <div className="btn-zoom-container">
      <button onClick={zoomOut}>-</button>
      <h2>{displayZoom}</h2>
      <button onClick={zoomIn}>+</button>
    </div>
  </footer>
</div>
  );
};
