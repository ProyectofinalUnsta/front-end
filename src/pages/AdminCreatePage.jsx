import { CreateEvento } from "../AdminComponents/CreateEvento"
import { MenuAdminProvider } from "../context/MenuAdminContext"
import { LayoutAdmin } from "./LayoutAdmin"

export const AdminCreatePage = () => {
    return(
        <>
         <MenuAdminProvider>
           <LayoutAdmin children={<CreateEvento/>}/>
         </MenuAdminProvider>
        </>
    )
}