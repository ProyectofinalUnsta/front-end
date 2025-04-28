import './style/navbaradmin.css'

import { useAdminMenu } from '../hooks/useAdminMenu'
import { LogoSection } from './components/LogoSection'
import { MainSection } from './components/MainSection'
import { CloseMenu } from './components/CloseMenu'
import { AppsSection } from './components/AppsSection'

export const AdminNavbar = () => {

    const {displayed,handlePopUpDisplayed} = useAdminMenu()
 
    return(
        <>
         <div className={ displayed == true ? "navbar-admin-container displayed" : "navbar-admin-container closed"}  onMouseEnter={()=>handlePopUpDisplayed()} onMouseLeave={()=>handlePopUpDisplayed()}>
           <header className='navbar-admin-header'>
           <LogoSection displayed={displayed}/>
            <MainSection/>
           </header>
            <CloseMenu/>
            <section className='main-content-admin-menu' style={{alignItems: displayed ? 'start' : 'center', paddingLeft: displayed ? '30px' : '0px' }}>
               <h2 className='Apps-title'>APPS</h2>
               <AppsSection/>
            </section> 
         </div>
        </>
    )
}
