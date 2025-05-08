import { MainBannerAdmin } from "../AdminComponents/MainBannerAdmin"
import { MenuAdminProvider } from "../context/MenuAdminContext"
import { LayoutAdmin } from "./LayoutAdmin"
import Roadmap from "../RoadMap/RoadMap"
export const AdminPage = () => {
    return(
        <MenuAdminProvider>
        <LayoutAdmin children={<MainBannerAdmin/>}/>
        </MenuAdminProvider>
    )
}