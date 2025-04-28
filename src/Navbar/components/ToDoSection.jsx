import { ToDoListIcon } from "../../icons/ToDoListIcon"
import { Link } from "react-router"
export const ToDoSection = ({displayed}) => {

    return(
        <>
            <li className="listed-app-menu-admin-item">
                    {
                        displayed ? <>
                        <ToDoListIcon/>
                        <Link to={'/Todo'}>Todo</Link>
                        </>
                        : <Link to={'/Todo'}><ToDoListIcon/></Link>
                    }
  
                  </li>
        </>
    )
}