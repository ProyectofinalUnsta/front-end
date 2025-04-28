import { useAdminMenu } from "../../hooks/useAdminMenu"
import { PestanaIcon } from "../../icons/PestanaIcon"
export const CloseMenu = () => {
    const {popUpDisplayed,popup,handledisplay} = useAdminMenu()
    return (
        <>
          <div id='pop' className= {popUpDisplayed == true  ? 'close-and-open-btn popUp ' : 'close-and-open-btn'} onClick={()=> handledisplay()}>
            <PestanaIcon orientacion={popup}/>
        </div>
        </>
    )
}