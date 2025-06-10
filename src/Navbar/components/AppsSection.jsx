import { useAdminMenu } from "../../hooks/useAdminMenu"
import { ToDoSection } from "./ToDoSection"
import { MiUserSection } from "./MiUserSection"
import { CreateSection } from "./CreateSection"
import { MisEventosSection } from "./MisEventosSection"
import { ConfiguracionSection } from "./ConfiguracionSection"
import { MisArchivosSection } from "./MisArchivosSection"
import { AdminFilesSection } from "./AdminFilesSection"

export const AppsSection = () => {

    const{displayed} = useAdminMenu()

    return(
        <>
         <div className='all-options-admin-menu'>
               <ul >
                 <ToDoSection displayed={displayed}/>
                 <CreateSection displayed={displayed}/>
                  <MisEventosSection displayed={displayed}/>
                  <AdminFilesSection displayed={displayed}/>
                  <ConfiguracionSection displayed={displayed}/>
                 <MiUserSection displayed={displayed}/>
               </ul>
               </div>
        </>
    )
}