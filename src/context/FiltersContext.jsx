import { createContext, useEffect, useState } from 'react'
import {useProducts} from '../hooks/useProducts'

export const FiltersContext = createContext()

export function FiltersProvider  ({children}) {

const [filter,setFilters] = useState({
    category:'all',
    nombre:'',
    date:''
})
const {itemsinPage} = useProducts()
const [filteredProducts,setFilteredProducts] = useState(itemsinPage)

useEffect(()=>{
    setFilteredProducts(itemsinPage)
},[itemsinPage])

return(
    <FiltersContext.Provider value={{
        filter,
        setFilters,
        filteredProducts,
        setFilteredProducts
    }}>

       {children}
    </FiltersContext.Provider>
)
}