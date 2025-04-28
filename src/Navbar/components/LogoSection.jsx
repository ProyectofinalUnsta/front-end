
import { useAdminMenu } from "../../hooks/useAdminMenu"
import { LogoIcon } from "../../icons/LogoIcon"

export const LogoSection = () =>{
const {displayed} = useAdminMenu()
    return(
        <>
         <section className='Logo-admin-container'>
            <LogoIcon prop={true}/>
            <h2 className={displayed == true ? 'logo-text-admin show' : 'logo-text-admin hide'}>Eventum</h2> 
        </section>
        </>
    )
}