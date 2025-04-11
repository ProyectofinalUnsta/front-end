
import { useMenu } from "../hooks/useMenu"

export const HamburguerIcon = () => {
   const {menu} = useMenu()
    return(
        <>
        <button  className={menu == true ? 'open-menu btn-menu' : 'btn-menu'}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
        </button>
        </>
    )
}