import React from "react"
import { CreateEvento } from "../AdminComponents/CreateEvento"
import { MenuAdminProvider } from "../context/MenuAdminContext"
const  LayoutAdmin = React.lazy(()=>import('./LayoutAdmin'))

export default function  AdminCreatePage  ()  {
    return(
        <>
         <MenuAdminProvider>
           <LayoutAdmin children={<CreateEvento/>}/>
         </MenuAdminProvider>
        </>
    )
}