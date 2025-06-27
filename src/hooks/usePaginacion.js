import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export function usePaginacion () {
    const {currenntPage,setCurrentPage,totalpages} = useContext(ProductContext)
   
    const next = () => {
        if(currenntPage < totalpages) {
              setCurrentPage( ()=> currenntPage + 1)
        }
    }
    const back = () => {
      if(currenntPage > 1){
           setCurrentPage( ()=> currenntPage - 1)
      }
    }

    return {currenntPage,setCurrentPage,back,next}
}