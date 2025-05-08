import { ToDoListIcon } from "../../icons/ToDoListIcon"
import { Link } from "react-router"
export const ToDoSection = ({displayed}) => {

    return(
        <>
            <li className="listed-app-menu-admin-item">
                    {
                        displayed ? <>
                        <ToDoListIcon/>
                        <Link to={'/Admin/Todo'}>Todo</Link>
                        </>
                        : <Link to={'/Admin/Todo'}><ToDoListIcon/></Link>
                    }
  
                  </li>
        </>
    )
}