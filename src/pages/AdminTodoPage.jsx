import { ElementsContextProvider } from "../AdminComponents/context/ElementsContext"
import { Todo } from "../AdminComponents/Todo"

export const AdminTodoPage = () => {

    return(
        <ElementsContextProvider>
        <Todo/>
        </ElementsContextProvider>
    )
}