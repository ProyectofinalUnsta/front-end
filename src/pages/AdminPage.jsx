import React from "react"
import { MainBannerAdmin } from "../AdminComponents/MainBannerAdmin"
import { MenuAdminProvider } from "../context/MenuAdminContext"
const  LayoutAdmin = React.lazy(()=> import('./LayoutAdmin')) 

export default function AdminPage ()  {
    return(
        <MenuAdminProvider>
        <LayoutAdmin children={<MainBannerAdmin/>}/>
        </MenuAdminProvider>
    )
}