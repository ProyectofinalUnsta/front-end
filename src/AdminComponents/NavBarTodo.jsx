import { HandIcon } from './icons/HandIcon'
import { CursorIcon } from './icons/CursorIcon'
import { TextIcon } from './icons/TextIcon'
import { StickyNoteIcon } from './icons/StickyNoteIcon'
import { ArrowIcon } from '../icons/ArrowIcon'
import './style/todonavbar.css'
import { useTodoTools } from './mocks/useTodoTools'

export const NavbarTodo = () => {

const {createNote,createText} = useTodoTools()

return(
    <div className="navbar-todo">
       <ul>
        <li  className='flex items-center justify-center'><HandIcon width={'24px'} height={'24px'}  /></li>
        <li className='flex items-center justify-center'><CursorIcon  width={'12px'} height={'24px'} /></li>
        <li onClick={()=>createNote()} className='flex items-center justify-center'><StickyNoteIcon width={'24px'} height={'24px'} /></li>
        <li onClick={()=>createText()} className='flex items-center justify-center'><TextIcon width={'24px'} height={'24px'} /></li>
        <li className='flex items-center justify-center'><ArrowIcon width={'18px'} height={'24px'} backgorund={'transparent'} fill={'#000'}  /></li>
       </ul>
    </div>
)
}