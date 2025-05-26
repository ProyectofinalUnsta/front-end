
import { useState } from "react"
import { useUserActions } from "../hooks/useActions"
import './style/paneluser.css'

export const PanelUserActions = () => {
const {handleLogOut} = useUserActions()

const [opacity,setOpacity] = useState(0)

const handlefocus = () => {
    setOpacity(1)
}

const handleleave = () => {
    setOpacity(0)
}

    return(
        <div className="user-action-container" style={{opacity: opacity}} onMouseEnter={()=>handlefocus()} onMouseLeave={()=>handleleave()} >
            <button onClick={()=>handleLogOut()}> Cerrar sesion</button>
        </div>
    )

}

