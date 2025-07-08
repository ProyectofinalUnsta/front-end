import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminMenu } from '../hooks/useAdminMenu'
import { useWidth } from '../hooks/useWidth'
import { ConfiguracionIcon } from '../icons/ConfiguracionIcon'
import { CrearIcon } from '../icons/CrearIcon'
import { ExitIcon } from '../icons/ExitIcon'
import { MiUserIcon } from '../icons/MiUserIcon'
import { ToDoListIcon } from '../icons/ToDoListIcon'
import './style/adminMenu.css'
import { LoginContext } from '../context/LoginContext'
import {PanelUserActions} from '../AdminComponents/PanelUserActions'
import { useState } from 'react'
import React from 'react'

const HomeButton = ({ onClick }) => {
    return (
        <button 
            onClick={onClick} 
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
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0'
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
            }}
        >
            <ExitIcon fill="#333" />
        </button>
    )
}

export const AdminMenu = () =>{
    const {displayed} = useAdminMenu()
    const {width} = useWidth()
    const {user} = useContext(LoginContext)
    const navigate = useNavigate()
    const [showLogout, setShowLogout] = useState(false)
    const { setUser, setToken } = useContext(LoginContext)

    // Cerrar el menú al hacer click fuera
    React.useEffect(() => {
      if (!showLogout) return;
      const handleClick = (e) => {
        if (!e.target.closest('.user-options-admin-menu')) setShowLogout(false)
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [showLogout])

    const handleHomeClick = () => {
        navigate('/')
    }

    const handleLogout = () => {
        setUser({ nombre: '', email: '', logged: false })
        setToken(null)
        window.localStorage.removeItem('registred')
        document.cookie = 'usuario=; Max-Age=0; path=/;'
        document.cookie = 'token=; Max-Age=0; path=/;'
        navigate('/')
    }

    return (
        <>
        <div className="admin-menu-container" style={{width: displayed ? '96%' : '99%'}}>
          <section className='options-admin-menu'>
           <ul>
            <li><HomeButton onClick={handleHomeClick} /></li>
           </ul> 
          </section>

          <section className='user-options-admin-menu'
            style={{position:'relative',cursor:'pointer'}}
            onClick={()=>setShowLogout(v=>!v)}
          >
            <div className='user-options-admin-menu-details' style={{zIndex:2}}>
                <h2 className='admin-name' style={{display: displayed && width < 470 ? 'none' : 'flex'}}>{user.nombre}</h2>
                <span className='admin-role-name' style={{display: displayed && width < 470 ? 'none' : 'flex'}}>Admin</span>
            </div>
            <figure className='img-container-user' style={{zIndex:2}}>
               <MiUserIcon width={'26px'} height={'26px'}/>
            </figure>
            {showLogout && (
              <div
                style={{
                  position:'absolute',top:'60px',right:'0',background:'#fff',border:'1px solid #e0e0e0',borderRadius:10,minWidth:180,boxShadow:'0 4px 24px #0002',padding:'10px 0',display:'flex',flexDirection:'column',alignItems:'center',transition:'all .2s',zIndex:1000
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    background:'none',color:'#d32f2f',border:'none',borderRadius:6,padding:'10px 0',fontWeight:600,width:'100%',fontSize:16,cursor:'pointer',transition:'background .2s',textAlign:'center',outline:'none'
                  }}
                  onMouseEnter={e=>e.currentTarget.style.background='#fbe9e7'}
                  onMouseLeave={e=>e.currentTarget.style.background='none'}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
         </section>
        </div>
        </>
    )
}