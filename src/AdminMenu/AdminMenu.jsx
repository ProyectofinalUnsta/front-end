import { useContext } from 'react'
import { useAdminMenu } from '../hooks/useAdminMenu'
import { useWidth } from '../hooks/useWidth'
import { ConfiguracionIcon } from '../icons/ConfiguracionIcon'
import { CrearIcon } from '../icons/CrearIcon'
import { HomeIcon } from '../icons/HomeIcon'
import { MiUserIcon } from '../icons/MiUserIcon'
import { ToDoListIcon } from '../icons/ToDoListIcon'
import './style/adminMenu.css'
import { LoginContext } from '../context/LoginContext'
import {PanelUserActions} from '../AdminComponents/PanelUserActions'
export const AdminMenu = () =>{
    const {displayed} = useAdminMenu()
    const {width} = useWidth()
    const {user} = useContext(LoginContext)
    return (
        <>
        <div className="admin-menu-container" style={{width: displayed ? '96%' : '99%'}}>
          <section className='options-admin-menu'>
           <ul>
            <li><HomeIcon/></li>
            <li><ToDoListIcon/></li>
            <li><CrearIcon/></li>
            <li><ConfiguracionIcon/></li>
           </ul> 
          </section>

          <section className='user-options-admin-menu'>
            <div className='user-options-admin-menu-details'>
                <h2 className='admin-name' style={{display: displayed && width < 470 ? 'none' : 'flex'}}>{user.nombre}</h2>
                <span className='admin-role-name' style={{display: displayed && width < 470 ? 'none' : 'flex'}}>Admin</span>
            </div>
             <PanelUserActions />
            <figure className='img-container-user'>
               <MiUserIcon width={'26px'} height={'26px'}/>
            </figure>
         </section>
        </div>
        </>
    )
}