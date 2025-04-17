
import { useContext, useRef } from 'react'
import { FiltersContext } from '../context/FiltersContext'
import { useProducts } from './useProducts'

export function useFilters () {

const {setFilters,filteredProducts,setFilteredProducts} = useContext(FiltersContext)
const {itemsinPage} = useProducts()
const timeoutRef = useRef(null);


const handlefilter = (event) => {
  const { id, value } = event.target;

  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  timeoutRef.current = setTimeout(() => {
    setFilters((prev) => {
      const updated = { ...prev };

      if (id === "Buscar") {
        if(value === ""){
         
          resetfilters()
        }
        updated.nombre = value;
        handlefilterNombre(value); 
      } else {
        if(value === "all"){
          resetfilters()
          return
        }
        updated.category = value;
        handleFilterCategory(value);
      }

      return updated;
    });
  }, [500]); 
};

const resetfilters = () => {

  const initialState ={
    category:'all',
    nombre:'',
    date:''
  }

  setFilteredProducts(itemsinPage)
  setFilters(initialState)

}

 const handlefilterNombre = (value) => {

   let result = filteredProducts.filter(item=> item.nombre.toLowerCase().includes(value.toLowerCase()))

   setFilteredProducts(result)
 }

 const handleFilterCategory = (value) => {

   const result = filteredProducts.filter(items=> items.category == value)
   setFilteredProducts(result)

 }

return {handlefilter, resetfilters, filteredProducts}

}