import { useAdminMenu } from "../../hooks/useAdminMenu"
import { ToDoSection } from "./ToDoSection"
import { MiUserSection } from "./MiUserSection"
import { CreateSection } from "./CreateSection"
import { MisEventosSection } from "./MisEventosSection"
import { ConfiguracionSection } from "./ConfiguracionSection"

export const AppsSection = () => {

    const{displayed} = useAdminMenu()

    return(
        <>
         <div className='all-options-admin-menu'>
               <ul >
                 <ToDoSection displayed={displayed}/>
                 <CreateSection displayed={displayed}/>
                  <MisEventosSection displayed={displayed}/>
                  <ConfiguracionSection displayed={displayed}/>
                 <MiUserSection displayed={displayed}/>
               </ul>
               </div>
        </>
    )
}