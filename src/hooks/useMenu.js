import { useContext } from "react";
import { MenuContext } from "../context/MenuContext";

export function useMenu () {
    const {menu,setMenu} = useContext(MenuContext)
   

    const handleMenu = () => {
        setMenu(!menu)
     
    }

   
    return {menu , handleMenu}
}