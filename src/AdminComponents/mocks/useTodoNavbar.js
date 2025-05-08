import { useContext } from "react";
import { ElementsContext } from "../context/ElementsContext";
export function useTodoNavbar () {
const { isSelected,setisSelected,idElement,setIdElement,type,setType} = useContext(ElementsContext)

const handleIsSelected = (event,value) => {
    event.stopPropagation();
    console.log(value)
    setisSelected(value)
}

const handleElementSelected = (id) => {

    setIdElement(id)
}

const handleType = (typo) => {
setType(typo)
}




return {handleIsSelected,handleElementSelected,idElement,isSelected,handleType,type}
}