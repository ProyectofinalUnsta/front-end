import { useAdminMenu } from "../../hooks/useAdminMenu"
import { AnalitycsOption } from "./AnalitycsOption"
import { HomeOption } from "./HomeOption"
import { HomeIcon } from "../../icons/HomeIcon"
import { PestanaIcon } from "../../icons/PestanaIcon"

export const MainSection = () => {

    const {displayed,handleAdminMenu,rotacion} = useAdminMenu()
    
    return(
        <>
         <section className='main-options-admin' >
            <div className= {displayed ? 'defualt-select-admin' : 'defualt-select-admin more-padding'} onClick={()=>handleAdminMenu()} >
            <div className='flex flex-row gap-3 items-center justify-center ' >
            <HomeIcon />
                <h2 className={displayed == true ? 'show' : 'hide'}>DashBoard</h2>
                </div>
                <PestanaIcon orientacion={rotacion}/>
                </div>
            <div id='options' className='options-real-list'>
            <HomeOption/>
            <AnalitycsOption/>
              </div>
            </section>
        </>
    )
}