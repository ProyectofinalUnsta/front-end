
import { useContext, useRef } from 'react'
import { FiltersContext } from '../context/FiltersContext'
import { useProducts } from './useProducts'

export function useFilters () {

const {setFilters,filteredProducts,setFilteredProducts} = useContext(FiltersContext)
const {itemsinPage,products,inicio,fin} = useProducts()
const timeoutRef = useRef(null);


const handlefilter = (event,input) => {
  const { id, value } = event.target;

  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

 if(value == ''){
 resetfilters()
 return
 }

  timeoutRef.current = setTimeout(() => {
    setFilters((prev) => {
      const updated = { ...prev };

      if (id === "Buscar") {
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
  }, [200]); 
};

const resetfilters = () => {
  setFilteredProducts(itemsinPage)
}

 const handlefilterNombre = (value) => {

   let result = filteredProducts.filter(item=> item.title.toLowerCase().includes(value.toLowerCase()))
   if(result.length > 0) return setFilteredProducts(result)
   if(result.length == 0){
     const result2 = products.filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
    let res = result2.slice(inicio,fin)
    setFilteredProducts(res)
    return
   }
 }

 const handleFilterCategory = (value) => {
   const result = filteredProducts.filter(items=> items.categoria == value)
   if(result.length > 0){
     setFilteredProducts(result)
    return
   }
   if(result.length == 0) {
    const result2 = products.filter(items=> items.categoria == value)
    console.log(result2)
     let res = result2.slice(inicio,fin)
    setFilteredProducts(res)
    return
   }
 }

 const clearFilters = (input1,input2) => {
let select = document.getElementById(input1)
select.value = 'all'
let input = document.getElementById(input2)
input.value = ''
setFilteredProducts(itemsinPage)
 }

return {handlefilter, resetfilters, filteredProducts, clearFilters}

}