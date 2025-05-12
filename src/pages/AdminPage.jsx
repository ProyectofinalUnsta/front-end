import { MainBannerAdmin } from "../AdminComponents/MainBannerAdmin"
import { MenuAdminProvider } from "../context/MenuAdminContext"
import { LayoutAdmin } from "./LayoutAdmin"

export const AdminPage = () => {
    return(
        <MenuAdminProvider>
        <LayoutAdmin children={<MainBannerAdmin/>}/>
        </MenuAdminProvider>
    )
}