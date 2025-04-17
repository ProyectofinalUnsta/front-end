import { Children, createContext, useState } from 'react'
import { intialProducts } from '../reducer/InitialProducts'
export const ProductContext = createContext()


export const ProductProvider = ({children}) => {
const [products,setProducts] = useState(intialProducts)
const itemsPerPage = 12;
const rounded = () => {
    let res = Math.ceil(products.length / itemsPerPage)
    if(res % 1 !== 0){
        res = res + 1
    }
    return res
    }
    const [totalpages,setTotalPages] = useState(()=> {
        let res = rounded()
        return res
    })

const [currenntPage,setCurrentPage] = useState(1)
const inicio = (currenntPage - 1) * itemsPerPage
const fin = inicio + itemsPerPage
const itemsinPage = products.slice(inicio,fin)



    return(
        <ProductContext.Provider value={{
           products,
           setProducts,
           itemsinPage,
           currenntPage,
           setCurrentPage
        }}>
          {children}
        </ProductContext.Provider>
    )
}