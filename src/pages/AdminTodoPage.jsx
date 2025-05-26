import { ElementsContextProvider } from "../AdminComponents/context/ElementsContext"
import { Todo } from "../AdminComponents/Todo"

export default function AdminTodoPage  () {

    return(
        <ElementsContextProvider>
        <Todo/>
        </ElementsContextProvider>
    )
}