import { useContext } from "react";

import { ProductContext } from "../context/ProductContext";

export function useProducts () {
  
    const {products,itemsinPage} = useContext(ProductContext)




    
    return {products,itemsinPage}
}