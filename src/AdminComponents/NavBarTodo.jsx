import { HandIcon } from './icons/HandIcon'
import { CursorIcon } from './icons/CursorIcon'
import { TextIcon } from './icons/TextIcon'
import { StickyNoteIcon } from './icons/StickyNoteIcon'
import { ArrowIcon } from '../icons/ArrowIcon'
import './style/todonavbar.css'
import { useTodoTools } from './mocks/useTodoTools'
import { ExitIcon } from '../icons/ExitIcon'
import { useNavigate } from 'react-router-dom'

export const NavbarTodo = () => {

const {createNote,createText} = useTodoTools()
const navigate = useNavigate();
const handleHomeClick = () => {
    navigate('/Admin');
}

return(
    <div className="navbar-todo">
       <ul>
        <li  className='flex items-center justify-center'><HandIcon width={'24px'} height={'24px'}  /></li>
        <li className='flex items-center justify-center'><CursorIcon  width={'12px'} height={'24px'} /></li>
        <li onClick={()=>createNote()} className='flex items-center justify-center'><StickyNoteIcon width={'24px'} height={'24px'} /></li>
        <li onClick={()=>createText()} className='flex items-center justify-center'><TextIcon width={'24px'} height={'24px'} /></li>
        <li className='flex items-center justify-center'><ArrowIcon width={'18px'} height={'24px'} backgorund={'transparent'} fill={'#000'}  /></li>
        <li className='flex items-center justify-center'>
            <button 
                onClick={handleHomeClick}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0',
                    borderRadius: '6px',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px'
                }}
                onMouseEnter={e => e.target.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
            >
                <ExitIcon fill="#333" />
            </button>
        </li>
       </ul>
    </div>
)
}