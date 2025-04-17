import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export function usePaginacion () {
    const {currenntPage,setCurrentPage} = useContext(ProductContext)


    return {currenntPage,setCurrentPage}
}